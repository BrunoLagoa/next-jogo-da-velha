# Jogo da Velha com Next.js

Este é um projeto de Jogo da Velha desenvolvido com Next.js, criado usando [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tecnologias Utilizadas

- [Next.js](https://nextjs.org)
- [React](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Pusher](https://pusher.com) - Para comunicação em tempo real entre jogadores

## Como Executar o Projeto

1. Primeiro, instale as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

2. Certifique-se de estar usando a versão correta do Node.js:

```bash
nvm use
```

3. Configure as credenciais do Pusher no arquivo `src/config/pusherConfig.ts`:

```typescript
export const pusherConfig = {
  appId: 'SEU_APP_ID',
  key: 'SUA_KEY',
  secret: 'SEU_SECRET',
  cluster: 'SEU_CLUSTER',
  useTLS: true
};
```

4. Inicie o servidor de desenvolvimento Next.js:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

5. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

**Importante**: Certifique-se de configurar corretamente as credenciais do Pusher para que o jogo multiplayer funcione corretamente.

## Estrutura do Projeto

- `src/app/page.tsx`: Página principal do jogo
- `src/components/`: Componentes React do jogo
- `src/hooks/`: Hooks personalizados
- `src/types/`: Tipos TypeScript
- `src/utils/`: Funções utilitárias

## Como Contribuir

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Deploy no Vercel

A maneira mais fácil de fazer o deploy do seu app Next.js é usando a [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dos criadores do Next.js.

Confira nossa [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para mais detalhes.
