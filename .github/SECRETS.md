# Secrets necessários no repo

| Secret                  | Origem                                                      | Uso                           |
| ----------------------- | ----------------------------------------------------------- | ----------------------------- |
| `NPM_TOKEN`             | npmjs.com → Account → Access Tokens → Automation            | Publica @singularidade/\*     |
| `AWS_CODEARTIFACT_ROLE` | IAM role com permissão `codeartifact:PublishPackageVersion` | Publica em Maven CodeArtifact |

## Setup

1. **npm scope** — verificar que `@singularidade` existe no npmjs.com e o token tem permissão de publish.
2. **IAM Role** — configurar OIDC trust no IAM role (GitHub OIDC provider). O role deve permitir:
   - `codeartifact:GetAuthorizationToken`
   - `codeartifact:GetRepositoryEndpoint`
   - `codeartifact:PublishPackageVersion`
   - `sts:GetServiceBearerToken`
3. Cole o ARN do role em `Settings → Secrets → Actions → AWS_CODEARTIFACT_ROLE`.
4. Gere automation token no npmjs.com com 2FA opcional, cole em `NPM_TOKEN`.

## Trust policy de exemplo (OIDC GitHub → IAM Role)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::539191403497:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:singularidade-digital/singularidade-ui-design-system:*"
        }
      }
    }
  ]
}
```
