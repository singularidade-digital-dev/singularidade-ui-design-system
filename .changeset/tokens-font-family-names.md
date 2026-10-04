---
'@singularidade/tokens': patch
---

`font.family.sans` e `font.family.mono` passam a listar primeiro o nome registrado pelo `@font-face` do `@singularidade/brand-assets` ('Plus Jakarta Sans Variable', 'JetBrains Mono Variable'). Antes só traziam o nome da família estática, que nenhum `@font-face` registra, e os sites caíam para a fonte do sistema. O nome estático continua na lista como reserva.
