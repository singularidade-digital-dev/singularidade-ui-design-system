# Secrets e variables do repo

Este repositório é **público**. Nenhum job que roda `pnpm install`/`pnpm build`
(código de terceiros) pode ter `id-token: write` nem credencial AWS.

| Nome                       | Tipo / escopo                                 | Uso                                                                                                      |
| -------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `AWS_LIB_PUBLISH_ROLE_ARN` | Variable do environment `production`          | ARN do role **só de publish no CodeArtifact**, assumido pelo job `maven-publish` do `release.yml`        |
| `AWS_DEPLOY_ROLE_ARN`      | Variable do environment `production` (legado) | Não é mais usada por nenhum workflow deste repo; remover depois que o `release.yml` novo estiver na main |
| `NPM_TOKEN`                | Secret do repo (**ainda não existe**)         | Publicação npm `@singularidade/*` via changesets (hoje falha sem bloquear, `continue-on-error`)          |

## Fluxo de release

- **Push na main** → só o job `changesets` (PR "Version Packages" / npm). **Não publica Maven.**
- **Maven (CodeArtifact)** → só por **tag `v*`** ou **workflow_dispatch**:
  - tag: precisa ser `v<project.version>` e a versão não pode ser `-SNAPSHOT`;
  - dispatch: versão `-SNAPSHOT` só com o input `allow_snapshot=true` (sobrescreve o snapshot congelado que os consumidores Java resolvem).
- O job `build` (sem credenciais, `--ignore-scripts`) gera `packages/tokens/build`, `packages/brand-assets/{build,src}` e sobe como artefato; o job `maven-publish` baixa esse artefato e roda `mvn deploy -Dexec.skip=true` (sem pnpm/npm).

## Role de publish (IAM)

Permissões mínimas (as mesmas de CodeArtifact que o role de deploy tinha):

- `codeartifact:GetAuthorizationToken`, `codeartifact:GetRepositoryEndpoint`, `codeartifact:ReadFromRepository`
- `codeartifact:PublishPackageVersion`, `codeartifact:PutPackageMetadata`
- `codeartifact:DescribeRepository`, `codeartifact:DescribeDomain`
- `sts:GetServiceBearerToken`

**Claim `sub` do OIDC:** o job `maven-publish` usa `environment: production`, então com o template padrão do
GitHub o `sub` é `repo:singularidade-digital-dev/singularidade-ui-design-system:environment:production` (não contém a
tag). Para restringir a tags `v*`, escolher uma das opções:

1. trust no `sub` acima **e** deployment policy do environment `production` restrita a tags `v*`; ou
2. customizar o template do `sub` do repo para incluir `ref`
   (`repo:…:environment:production:ref:refs/tags/v*` na trust).

npm: ao ativar a publicação npm, usar trusted publishing (OIDC do npm) num job próprio sem install scripts, e só
depois que nenhum role AWS confiar mais em `ref:refs/heads/main` deste repo.
