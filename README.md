# Smart To-Do List - Teste Técnico Full-Stack

Este desafio prático visa avaliar habilidades como Desenvolvedor Full-Stack Sênior na construção de uma aplicação moderna e funcional. O objetivo é desenvolver uma "Smart To-Do List", uma lista de tarefas que vai além do CRUD tradicional, integrando funcionalidade de Inteligência Artificial.

## 🎯 Descrição do Projeto

A aplicação "Smart To-Do List" permite que usuários gerenciem tarefas de forma inteligente. Além das funcionalidades tradicionais de CRUD, a aplicação integra IA para gerar automaticamente subtarefas a partir de objetivos de alto nível descritos pelo usuário.

### Exemplo de Uso
- **Usuário descreve:** "Planejar uma viagem para Paris"
- **IA gera automaticamente:** Lista de subtarefas como "Pesquisar passagens", "Reservar hotel", "Planejar roteiro", etc.

## 🏗️ Arquitetura

```
teste/
├── api/          # Backend NestJS + TypeScript
├── front/        # Frontend Next.js + TypeScript
└── README.md     # Este arquivo
```

## 🚀 Tecnologias Utilizadas

### Backend
- **NestJS** - Framework Node.js para aplicações escaláveis
- **TypeScript** - Tipagem estática
- **Prisma** - ORM moderno para banco de dados
- **SQLite** - Banco de dados local
- **OpenRouter** - Integração com IA para geração de tarefas
- **Joi** - Validação de variáveis de ambiente
- **Class Validator** - Validação de DTOs

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones modernos
- **React Hooks** - Gerenciamento de estado

## 📋 Funcionalidades Implementadas

### ✅ Backend (NestJS)
- **CRUD completo de tarefas**
  - Criar, ler, atualizar e deletar tarefas
  - Endpoint para resetar todas as tarefas
- **Integração com IA**
  - Endpoint `/tasks/ai` para gerar subtarefas
  - Integração com OpenRouter para inferência de LLM
- **Persistência de dados**
  - Banco SQLite com Prisma
  - Modelo Task com campos: id, title, isCompleted, createdAt, updatedAt
- **Validação e segurança**
  - Validação de DTOs com class-validator
  - Validação de variáveis de ambiente com Joi
  - CORS configurado para frontend

### ✅ Frontend (Next.js)
- **Interface reativa e moderna**
  - Design responsivo com Tailwind CSS
  - Componentes modulares e reutilizáveis
  - Estados de loading e erro
- **Gerenciamento de tarefas**
  - Criar tarefas manualmente
  - Marcar/desmarcar como concluída
  - Editar tarefas inline
  - Deletar tarefas individuais
  - Resetar todas as tarefas
- **Funcionalidade de IA**
  - Interface para descrever objetivos
  - Geração automática de subtarefas
  - Feedback visual durante geração
- **UX/UI aprimorada**
  - Progresso visual das tarefas
  - Separação entre tarefas pendentes e concluídas
  - Animações e transições suaves
  - Confirmação para ações destrutivas

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+
- pnpm (recomendado) ou npm

### 1. Backend (API)
```bash
cd api

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas chaves

# Configurar banco de dados
pnpm prisma generate
pnpm prisma migrate dev

# Executar em desenvolvimento
pnpm start:dev
```

### 2. Frontend
```bash
cd front

# Instalar dependências
pnpm install

# Configurar variáveis de ambiente
echo "NEXT_PUBLIC_API_URL=http://localhost:3001" > .env.local

# Executar em desenvolvimento
pnpm dev
```

### 3. Acessar a aplicação
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/tasks` | Listar todas as tarefas |
| `POST` | `/tasks` | Criar nova tarefa |
| `PATCH` | `/tasks/:id` | Atualizar tarefa |
| `DELETE` | `/tasks/:id` | Deletar tarefa |
| `DELETE` | `/tasks/reset` | Resetar todas as tarefas |
| `POST` | `/tasks/ai` | Gerar tarefas com IA |

## 🔧 Configuração de IA

Para usar a funcionalidade de IA, você precisa:

1. Criar uma conta no [OpenRouter](https://openrouter.ai/)
2. Obter uma API key
3. Configurar no arquivo `.env` do backend:
   ```env
   OPEN_ROUTER_API_KEY="sua-chave-do-open-router"
   ```

## 🎨 Interface do Usuário

A interface foi projetada com foco na usabilidade:

- **Header** - Título e descrição da aplicação
- **Seção de Progresso** - Barra de progresso e botão de reset
- **Gerador de IA** - Campo para descrever objetivos
- **Formulário de Criação** - Adicionar tarefas manualmente
- **Lista de Tarefas** - Separadas por pendentes e concluídas

## 🧪 Testes

### Backend
```bash
cd api
pnpm test          # Testes unitários
pnpm test:e2e      # Testes end-to-end
pnpm test:cov      # Cobertura de testes
```

### Frontend
```bash
cd front
pnpm test          # Testes unitários
pnpm run build     # Verificar build
```

## 📁 Estrutura do Projeto

```
teste/
├── api/
│   ├── src/
│   │   ├── modules/tasks/     # Módulo de tarefas
│   │   ├── shared/           # Recursos compartilhados
│   │   └── main.ts           # Ponto de entrada
│   ├── prisma/
│   │   └── schema.prisma     # Schema do banco
│   └── README.md             # Documentação da API
├── front/
│   ├── src/
│   │   ├── app/              # Páginas (App Router)
│   │   ├── components/       # Componentes React
│   │   ├── hooks/           # Hooks personalizados
│   │   ├── services/        # Serviços de API
│   │   └── types/           # Tipos TypeScript
│   └── README.md            # Documentação do Frontend
└── README.md                # Este arquivo
```

## 🚀 Deploy

### Backend
```bash
cd api
pnpm build
pnpm start:prod
```

### Frontend
```bash
cd front
pnpm build
pnpm start
```

## 📝 Requisitos do Desafio

### ✅ Backend (NestJS + TypeScript)
- [x] Lógica de negócios para gerenciar ciclo de vida de tarefas
- [x] Persistência com SQLite
- [x] Integração com API de IA (OpenRouter)
- [x] Endpoint para receber prompts e gerar subtarefas
- [x] Processamento e persistência de tarefas geradas

### ✅ Frontend (Next.js + TypeScript)
- [x] Gerenciamento de estado reativo
- [x] Interface para criação manual de tarefas
- [x] Funcionalidade de marcar/desmarcar como concluída
- [x] Funcionalidade de deletar tarefas
- [x] Componente de interface para objetivos de IA
- [x] Integração com endpoint de IA
- [x] Atualização em tempo real sem recarregar página

### ✅ Funcionalidade de IA
- [x] Campo de texto para descrição de objetivos
- [x] Botão para acionar geração de tarefas
- [x] Chamada para endpoint do backend
- [x] Atualização da lista com novas tarefas
- [x] Feedback visual durante geração

## 🎯 Diferenciais Implementados

- **Interface moderna e responsiva** com Tailwind CSS
- **Atualizações otimistas** para melhor UX
- **Tratamento robusto de erros** com reversão automática
- **Confirmação para ações destrutivas**
- **Progresso visual** das tarefas
- **Separação inteligente** entre tarefas pendentes e concluídas
- **Animações e transições** suaves
- **Documentação completa** da API e frontend

## 📄 Licença

Este projeto foi desenvolvido como parte de um teste técnico para avaliação de habilidades Full-Stack.

