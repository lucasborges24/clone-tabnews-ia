# AGENTS.md

Este arquivo orienta agentes de IA ao trabalhar neste repositório.

## Visão geral

Página única, romântica e interativa ("Lucas & Sofia"), feita em Next.js (App Router) com JavaScript puro. Apesar do nome do repositório (`clone-tabnews-ia`), **não é um clone do TabNews**.

O visual imita uma planta arquitetônica (papel com grade, rótulos de canto, cotas).

## Comandos

```bash
npm run dev     # servidor de desenvolvimento
npm run build   # build de produção
npm start       # serve o build de produção
```

## Convenções

- Idioma: textos da interface, comentários e mensagens de commit em português (pt-BR).
- Constantes de comportamento ficam no topo do arquivo em que são usadas. Ajuste-as ali em vez de usar números mágicos.
- Mantenha o tom e a estética: planta técnica, humor de dev, textos curtos e em minúsculas.
- Cores e fontes devem usar as variáveis CSS existentes em `app/globals.css`.

## Cuidados

- **Mobile primeiro**: o site será aberto principalmente no celular. Use `100dvh`, evite depender de hover e teste toques.
- Não commite `.next/` nem `node_modules/`.
- Este projeto é pessoal e tem conteúdo íntimo (nomes, data de casamento). Não altere esse conteúdo sem pedido explícito.
