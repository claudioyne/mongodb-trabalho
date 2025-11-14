# Como visualizar os dados no MongoDB Compass

## Passo 1: Conectar ao banco local

1. Abra o MongoDB Compass
2. Na tela inicial, você verá um campo para inserir a string de conexão
3. Digite: `mongodb://localhost:27017`
4. Clique em "Connect"

Ou, se você já tem uma conexão salva (como "banco-teste"), pode usar ela também.

## Passo 2: Encontrar o banco de dados

Depois de conectar, no painel esquerdo você verá uma lista de bancos de dados. Procure por:

- **demonstracao** (este é o banco criado pelo código)

Se não aparecer, significa que ainda não foi criado. Nesse caso, execute o servidor e insira alguns dados pela interface web primeiro.

## Passo 3: Abrir a coleção

1. Clique no banco "demonstracao" para expandir
2. Você verá a coleção chamada "dados"
3. Clique na coleção "dados"

## Passo 4: Visualizar os documentos

Ao clicar na coleção, você verá:

- Todos os documentos inseridos em formato JSON
- Uma tabela com os campos principais
- Estatísticas da coleção (quantidade de documentos, tamanho, etc.)

## Funcionalidades úteis do Compass

**Filtrar documentos:**
- Use a barra de filtro no topo
- Exemplo: `{numero: {$gt: 500}}` para ver apenas documentos com numero maior que 500
- Exemplo: `{categoria: "Categoria 1"}` para filtrar por categoria

**Ordenar:**
- Clique nos cabeçalhos das colunas na visualização de tabela
- Ou use o campo "Sort" na barra de filtros

**Pesquisar:**
- Use a barra de pesquisa para encontrar textos específicos dentro dos documentos

**Editar documentos:**
- Clique em qualquer documento para abrir em modo de edição
- Você pode modificar campos diretamente
- Clique em "Update" para salvar

**Ver esquema:**
- Na aba "Schema" você pode ver a estrutura dos documentos
- Útil para entender quais campos existem e seus tipos

**Agregações:**
- Na aba "Aggregations" você pode criar pipelines de agregação
- Útil para fazer consultas mais complexas e análises

## Dica

O banco "demonstracao" só aparece depois que você inserir dados pela primeira vez. Se não estiver vendo, execute o servidor (`npm start`), acesse a interface web e clique em "Inserir 1000 Documentos". Depois, atualize a lista de bancos no Compass (botão de refresh no topo).

