# Smart To-Do List API

Backend da aplicação Smart To-Do List desenvolvido com NestJS, TypeScript e Prisma.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js para aplicações escaláveis
- **TypeScript** - Tipagem estática
- **Prisma** - ORM moderno para banco de dados
- **SQLite** - Banco de dados local
- **OpenAI** - Integração com IA para geração de tarefas
- **Joi** - Validação de variáveis de ambiente
- **Class Validator** - Validação de DTOs

## 📋 Funcionalidades

- ✅ CRUD completo de tarefas
- 🤖 Geração automática de tarefas com IA
- 🔄 Reset de todas as tarefas
- 📊 Persistência em banco SQLite
- 🔒 Validação de dados
- 🌍 CORS configurado para frontend

## 🛠️ Pré-requisitos

- Node.js 18+
- pnpm (recomendado) ou npm

## ⚙️ Instalação

1. **Instalar dependências:**
   ```bash
   pnpm install
   ```

2. **Configurar variáveis de ambiente:**
   Crie um arquivo `.env` na raiz do projeto:
   ```env
   DATABASE_URL="file:./dev.db"
   OPEN_ROUTER_API_KEY="sua-chave-do-open-router"
   PORT=3001
   ```

3. **Configurar banco de dados:**
   ```bash
   # Gerar cliente Prisma
   pnpm prisma generate

   # Executar migrações
   pnpm prisma migrate dev

   # (Opcional) Visualizar banco
   pnpm prisma studio
   ```

## 🚀 Como Executar

### Desenvolvimento
```bash
# Executar em modo desenvolvimento com hot reload
pnpm start:dev
```

### Produção
```bash
# Build da aplicação
pnpm build

# Executar build de produção
pnpm start:prod
```

### Debug
```bash
# Executar em modo debug
pnpm start:debug
```

## 📡 Endpoints da API

### Tarefas

#### `GET /tasks`
Lista todas as tarefas.

**Resposta:**
```json
[
  {
    "id": "uuid",
    "title": "Título da tarefa",
    "isCompleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### `POST /tasks`
Cria uma nova tarefa.

**Body:**
```json
{
  "title": "Título da nova tarefa"
}
```

#### `PATCH /tasks/:id`
Atualiza uma tarefa existente.

**Body:**
```json
{
  "title": "Novo título",
  "isCompleted": true
}
```

#### `DELETE /tasks/:id`
Remove uma tarefa específica.

#### `DELETE /tasks/reset`
Remove todas as tarefas do banco.

### IA

#### `POST /tasks/ai`
Gera tarefas automaticamente usando IA.

**Body:**
```json
{
  "prompt": "Planejar uma viagem para Paris"
}
```

**Resposta:**
```json
[
  {
    "id": "uuid",
    "title": "Pesquisar passagens aéreas",
    "isCompleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 🗄️ Estrutura do Banco

### Tabela `Task`
```sql
CREATE TABLE Task (
  id          TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  isCompleted BOOLEAN DEFAULT false,
  createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 📁 Estrutura do Projeto

```
src/
├── main.ts                 # Ponto de entrada da aplicação
├── app.module.ts           # Módulo principal
├── modules/                # Módulos da aplicação
│   └── tasks/             # Módulo de tarefas
│       ├── tasks.controller.ts
│       ├── tasks.module.ts
│       ├── dto/           # Data Transfer Objects
│       └── useCases/      # Casos de uso
└── shared/                # Recursos compartilhados
    ├── config/           # Configurações
    └── database/         # Configuração do banco
```

## 🔧 Scripts Disponíveis

- `pnpm start:dev` - Executar em desenvolvimento
- `pnpm build` - Build para produção
- `pnpm start:prod` - Executar build de produção
- `pnpm lint` - Executar linter
- `pnpm format` - Formatar código

## 🧪 Testes

```bash
# Executar testes unitários
pnpm test

# Executar testes em modo watch
pnpm test:watch

# Executar testes end-to-end
pnpm test:e2e

# Cobertura de testes
pnpm test:cov
```

## 🔍 Debug

```bash
# Executar em modo debug
pnpm start:debug

# Debug de testes
pnpm test:debug
```

## 🌐 CORS

A API está configurada para aceitar requisições do frontend em `http://localhost:3000`.

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DATABASE_URL` | URL do banco SQLite | `file:./dev.db` |
| `OPENAI_API_KEY` | Chave da API OpenAI | - |
| `PORT` | Porta da aplicação | `3001` |

## 🔗 Integração com Frontend

A API está configurada para trabalhar com o frontend Next.js na porta 3000. Certifique-se de que o frontend está configurado para apontar para `http://localhost:3001`.

## 📄 Licença

Este projeto é parte do teste técnico Smart To-Do List.
