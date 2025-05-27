# 📝 TeachPost - Projeto Full Stack com Docker e CI/CD 

## 🚀 Como Executar Localmente  

### ✅ Pré-requisitos:  
- [Docker](https://www.docker.com/)  
- [Docker Compose](https://docs.docker.com/compose/)  

### ✅ Passo 1: Clonar o repositório  

git clone https://github.com/carloshchavesjr/teachpost.git
cd teachpost

### ✅ Passo 2: Subir a aplicação com Docker Compose 

docker-compose up --build

### ✅ Passo 3: Acessar os Serviços 

Frontend → http://localhost:3001

Backend → http://localhost:3000

Database → localhost:5432

## 📚 Descrição  

O **TeachPost** é um projeto desenvolvido com o objetivo de praticar e demonstrar conhecimentos em:  

- **Desenvolvimento Full Stack** com **NestJS** no backend e **Next.js** no frontend.  
- **Banco de dados relacional** utilizando **PostgreSQL**.  
- **Orquestração de containers** com **Docker Compose**.  
- **Automatização de processos** com **GitHub Actions** para **CI/CD**.  

O sistema é composto por:  

✅ **teachpost-backend** — API REST construída em **NestJS**  
✅ **teachpost-frontend** — Interface de usuário desenvolvida com **React** (Next.js) e estilização com **Tailwind**.  
✅ **Database** — Servidor **PostgreSQL** para persistência de dados  


## 🗂️ Estrutura do Repositório  

teachpost/
├── teachpost-backend/ # Código-fonte do backend (NestJS)
├── teachpost-frontend/ # Código-fonte do frontend (Next.js)
├── .github/workflows/ # Scripts de CI/CD via GitHub Actions
│ └── docker-compose.yml
├── docker-compose.yml # Orquestração completa dos serviços
├── .env # variáveis de ambiente
└── README.md # Documentação detalhada


## ⚙️ Tecnologias Utilizadas  

### 🖥️ Backend  
- **NestJS**  
- **TypeScript**  
- **Prisma ORM**  

### 🌐 Frontend  
- **React**  
- **Next.js**  
- **TypeScript**  

### 🗄️ Banco de Dados  
- **PostgreSQL**  

### 🐳 DevOps  
- **Docker**  
- **Docker Compose**  
- **GitHub Actions**  



