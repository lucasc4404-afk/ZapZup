# ZapZup - Plataforma Oficial de Gestão Operacional

Plataforma unificada desenvolvida para a gestão integral da empresa **ZapZup**, contemplando o ecossistema completo de governança: **Donos, Responsáveis, Escalas, Funcionários, Missões, Materiais, Fotos & Vídeos, Mural de Avisos e Comunicação em tempo real**.

---

## 🎨 Identidade Visual & Logomarca

- **Cores Oficiais de Referência**:
  - 🟢 **Verde** (`zap.green` / `#10b981` / `#059669`)
  - 🔵 **Azul** (`zap.blue` / `#2563eb` / `#1d4ed8`)
  - 🟠 **Laranja** (`zap.orange` / `#f97316` / `#ea580c`)
  - ⚪ **Branco** (`#ffffff`) e tons de ardósia para modo escuro/claro.
- **Espaço para Logomarca Oficial**:
  - O componente `LogoPlaceholder` em `src/components/ui/logo-placeholder.tsx` foi estruturado e dimensionado para receber o asset oficial (SVG/PNG) da marca ZapZup sem romper os layouts de navegação.

---

## 🏗️ Arquitetura do Projeto

```
c:\pasta\ZapZup\
├── .env.example                     # Modelo de variáveis de ambiente do Supabase
├── next.config.mjs                  # Configurações do Next.js e alias @
├── package.json                     # Scripts e dependências do projeto
├── postcss.config.mjs               # Configuração do PostCSS / Tailwind
├── tailwind.config.ts               # Paleta de cores ZapZup e design system
├── tsconfig.json                    # Tipagem estrita TypeScript e path aliases
└── src/
    ├── app/                         # Rotas (App Router Next.js 14)
    │   ├── (auth)/login/            # Fluxo de Autenticação
    │   ├── (dashboard)/             # Layout administrativo com Sidebar & Header
    │   │   ├── dashboard/           # Visão Executiva & Painel Geral
    │   │   ├── escalas/             # Planejamento de Escalas e Plantões
    │   │   ├── funcionarios/        # Gestão de Donos, Responsáveis e Funcionários
    │   │   ├── missoes/             # Ordens de Serviço e Checklists
    │   │   ├── materiais/           # Controle de Estoque, Insumos e Equipamentos
    │   │   ├── midia/               # Fotos, Vídeos e Comprovações Operacionais
    │   │   ├── avisos/              # Mural de Avisos e Comunicados Internos
    │   │   └── comunicacao/         # Chat e Canais em Tempo Real
    │   ├── globals.css              # Variáveis CSS e temas
    │   ├── layout.tsx               # Root Layout com metadados e fontes
    │   └── page.tsx                 # Portal de Acesso e Apresentação dos Papéis
    ├── components/
    │   ├── layout/                  # Sidebar, Header, Navegação responsiva
    │   └── ui/                      # Design system (LogoPlaceholder, Button, Card, Badge, Input)
    ├── database/
    │   └── schema.sql               # Schema PostgreSQL oficial com RLS e triggers
    ├── lib/
    │   ├── supabase/                # Clientes Supabase (Browser, Server, Middleware)
    │   └── utils.ts                 # Utilitários de classes (cn) e formatação
    ├── modules/                     # Módulos com Regras de Negócio por Domínio
    │   ├── auth/                    # Contexto de autenticação e formulário de login
    │   ├── escalas/                 # Regras de conflito e validação de plantões
    │   ├── missoes/                 # Regras de prioridade e checklist de missões
    │   └── materiais/               # Validação de estoque crítico e movimentações
    ├── services/                    # Camada de integração de dados com o Supabase
    │   ├── avisosService.ts
    │   ├── comunicacaoService.ts
    │   ├── escalasService.ts
    │   ├── funcionariosService.ts
    │   ├── materiaisService.ts
    │   ├── midiaService.ts
    │   └── missoesService.ts
    └── types/                       # Modelos de dados e definições TypeScript
        ├── index.ts
        └── supabase.ts
```

---

## 🗄️ Banco de Dados (Supabase / PostgreSQL)

O arquivo `src/database/schema.sql` contém a estrutura completa para execução no **SQL Editor** do Supabase:

1. **perfis**: Donos, Responsáveis e Funcionários vinculados ao `auth.users`.
2. **unidades**: Polos, filiais e bases operacionais da ZapZup.
3. **escalas** & **escala_participantes**: Turnos, plantões, confirmação de presença e check-in.
4. **missoes** & **missao_tarefas**: Ordens de serviço, prioridades, checklists e prazos.
5. **materiais** & **materiais_movimentacoes**: Almoxarifado, ferramentas, estoque mínimo e retiradas.
6. **midias**: Fotos e vídeos operacionais com vínculo a missões e escalas.
7. **avisos** & **aviso_leituras**: Mural de comunicados com níveis de destinatário e confirmação de leitura.
8. **comunicacao_canais** & **comunicacao_mensagens**: Chat em tempo real segmentado por missão e unidade.
9. **RLS (Row Level Security)**: Políticas ativas de isolamento e segurança para todos os registros.

---

## 🚀 Como Executar o Projeto

1. **Configurar o arquivo `.env.local`**:
   Copie `.env.example` para `.env.local` e preencha as chaves do seu projeto Supabase:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
   SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
   ```

2. **Executar o Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000`.

3. **Compilar para Produção**:
   ```bash
   npm run build
   npm run start
   ```
