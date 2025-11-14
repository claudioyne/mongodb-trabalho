# 🚀 MongoDB Local - Demonstração Prática (NoSQL)

Este projeto demonstra o uso de um **banco de dados NoSQL (MongoDB)** instalado localmente no seu PC.  
O objetivo é mostrar como esse tipo de banco **escala facilmente com grandes inserções de dados** e como visualizar os dados tanto na interface web quanto no MongoDB Compass.

---

## 🧩 Tecnologias utilizadas
- **Node.js** — para executar o servidor e scripts.
- **MongoDB Local** — banco de dados NoSQL instalado no seu PC.
- **Express.js** — servidor web para a interface.
- **Driver oficial do MongoDB** — para conectar o Node.js ao banco.

---

## 📋 Pré-requisitos

1. **MongoDB instalado e rodando** no seu PC
   - Certifique-se de que o serviço MongoDB está ativo
   - Por padrão, o MongoDB roda em `mongodb://localhost:27017`

2. **Node.js instalado** (versão 14 ou superior)

---

## 🚀 Como usar

### 1. Instalar dependências
```bash
npm install
```

### 2. Iniciar o servidor
```bash
npm start
```

### 3. Acessar a interface web
Abra seu navegador e acesse: **http://localhost:3000**

### 4. Inserir dados
- Clique no botão **"Inserir 1000 Documentos"** na interface web
- O sistema irá inserir 1000 documentos no banco de dados
- Você verá o tempo de inserção e poderá visualizar os dados na tabela

---

## 📊 Visualizando dados no MongoDB Compass

O **MongoDB Compass** é a interface gráfica oficial do MongoDB. Veja como visualizar seus dados:

### Passo 1: Conectar ao banco local
1. Abra o **MongoDB Compass**
2. Na tela de conexão, use a string: `mongodb://localhost:27017`
3. Clique em **"Connect"**

### Passo 2: Navegar até o banco
1. No painel esquerdo, você verá os bancos de dados disponíveis
2. Procure pelo banco **"demonstracao"** (criado automaticamente pelo código)
3. Clique nele para expandir

### Passo 3: Visualizar a coleção
1. Dentro do banco **"demonstracao"**, você verá a coleção **"dados"**
2. Clique na coleção **"dados"** para ver todos os documentos inseridos
3. Você poderá:
   - Ver todos os documentos em formato JSON
   - Filtrar documentos usando a barra de pesquisa
   - Ordenar por qualquer campo
   - Ver estatísticas da coleção
   - Editar documentos individualmente

### Passo 4: Usar filtros e consultas
No MongoDB Compass, você pode:
- **Filtrar**: Use a barra de filtro no topo (ex: `{numero: {$gt: 500}}`)
- **Ordenar**: Clique nos cabeçalhos das colunas
- **Pesquisar**: Use a barra de pesquisa para encontrar textos específicos
- **Agregar**: Use a aba "Aggregations" para fazer consultas complexas

---

## 🎯 Funcionalidades da Interface Web

- ✅ **Inserir 1000 documentos** com um clique
- ✅ **Visualizar dados** em uma tabela bonita e responsiva
- ✅ **Estatísticas em tempo real** (total, média, etc.)
- ✅ **Limpar banco** quando necessário
- ✅ **Atualizar dados** para ver as últimas inserções
- ✅ **Ajustar limite** de documentos exibidos

---

## 📁 Estrutura do Projeto

```
mongodb-trabalho/
├── index.js          # Servidor Express e lógica do MongoDB
├── package.json      # Dependências do projeto
├── public/
│   └── index.html    # Interface web
└── Readme.md         # Este arquivo
```

---

## 🔍 Estrutura dos Documentos

Cada documento inserido tem a seguinte estrutura:
```json
{
  "numero": 1,
  "texto": "Registro número 1",
  "timestamp": "2025-11-13T18:00:00.000Z",
  "categoria": "Categoria 1",
  "valor": 123.45
}
```

---

## 💡 Dicas

- O MongoDB Compass é excelente para **explorar e entender** a estrutura dos dados
- A interface web é ideal para **demonstrações rápidas** e visualizações
- Você pode usar ambos simultaneamente para ter uma visão completa
- O banco de dados persiste mesmo após fechar o servidor

---

