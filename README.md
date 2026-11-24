# Portfólio — React e TypeScript

Fonte da interface do portfólio de Jhonata Selmo. Componentes TSX, estilos CSS e script JavaScript de geração estática.

## Gerar HTML

Requer Node.js 22.13 ou superior.

```sh
npm install
npm run build
python3 -m http.server 8080 --directory dist
```

Abra http://localhost:8080. O build gera `dist/index.html` a partir de `app/page.tsx`.

## Estrutura e decisões

- `app/page.tsx`: componentes React/TypeScript e conteúdo dos projetos.
- `app/globals.css`: estilos e adaptação da interface.
- `scripts/build-static.mjs`: JavaScript que transpila TSX e renderiza React em HTML estático.
- `public/`: mapa e identidade visual.

A saída estática dispensa servidor Node na hospedagem; alterações no conteúdo exigem novo build. Este recorte publica a interface e o gerador estático, sem uma aplicação Next.js completa ou APIs de backend.

[Portfólio principal](https://github.com/jhonataselmo-glitch/jhowselmo) · [Versão online](https://jhonataselmoti-portfolio.cicmalemmar-0319.chatgpt.site) · [LinkedIn](https://www.linkedin.com/in/jhonataselmo/)
