# Smart To-Do List Frontend

Este é o frontend da aplicação Smart To-Do List, desenvolvido com Next.js e TypeScript.

## Funcionalidades

- ✅ Criar tarefas manualmente
- ✅ Marcar/desmarcar tarefas como concluídas
- ✅ Editar tarefas existentes
- ✅ Deletar tarefas
- ✅ Gerar tarefas automaticamente usando IA
- ✅ Interface reativa e moderna
- ✅ Progresso visual das tarefas

## Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones
- **React Hooks** - Gerenciamento de estado

## Como Executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Executar em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acessar a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Estrutura do Projeto

```
src/
├── app/                 # Páginas da aplicação (App Router)
├── components/          # Componentes React reutilizáveis
│   ├── CreateTaskForm.tsx
│   ├── AITaskGenerator.tsx
│   ├── TaskItem.tsx
│   └── TaskList.tsx
├── hooks/              # Hooks personalizados
│   └── useTasks.ts
├── services/           # Serviços de API
│   └── api.ts
└── types/              # Definições de tipos TypeScript
    └── task.ts
```

## API Endpoints

O frontend se comunica com os seguintes endpoints do backend:

- `GET /tasks` - Listar todas as tarefas
- `POST /tasks` - Criar nova tarefa
- `PATCH /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa
- `POST /tasks/ai` - Gerar tarefas com IA

## Scripts Disponíveis

- `npm run dev` - Executar em modo de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Executar build de produção
- `npm run lint` - Executar linter
