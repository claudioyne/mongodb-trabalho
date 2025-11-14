// index.js
import { MongoClient } from "mongodb";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// String de conexão com o MongoDB local
// localhost:27017 é a porta padrão do MongoDB
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Cria o servidor Express
const app = express();
const PORT = 3000;

// Middleware do Express
// express.json() permite que o servidor entenda requisições com JSON no body
// express.static() serve os arquivos da pasta "public" (HTML, CSS, JS)
app.use(express.json());
app.use(express.static("public"));

// Variáveis globais para o banco e coleção
// Vamos preencher essas variáveis quando conectar
let db, collection;

// Função que conecta ao MongoDB
// Se o banco "demonstracao" não existir, ele será criado automaticamente
// O mesmo vale para a coleção "dados"
async function conectarMongoDB() {
  try {
    await client.connect();
    console.log("Conectado ao MongoDB local");
    
    // Seleciona o banco de dados (ou cria se não existir)
    db = client.db("demonstracao");
    
    // Seleciona a coleção (ou cria se não existir)
    // Coleção no MongoDB = tabela no SQL
    collection = db.collection("dados");
    return true;
  } catch (erro) {
    console.error("Erro ao conectar ao MongoDB:", erro);
    return false;
  }
}

// Rota GET na raiz - serve a página HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Rota POST para inserir 1000 documentos
// Quando você clica no botão "Inserir 1000 Documentos" na interface, ela chama essa rota
app.post("/api/inserir", async (req, res) => {
  try {
    // Marca o tempo inicial para calcular quanto tempo levou
    const inicio = Date.now();
    const dados = [];
    
    // Cria um array com 1000 objetos
    // Cada objeto é um documento que será inserido no MongoDB
    for (let i = 0; i < 1000; i++) {
      dados.push({
        numero: i + 1,
        texto: `Registro número ${i + 1}`,
        timestamp: new Date(), // Data/hora atual
        categoria: `Categoria ${Math.floor(i / 100) + 1}`, // Categoria 1 a 10
        valor: Math.random() * 1000 // Valor aleatório entre 0 e 1000
      });
    }

    // insertMany insere todos os documentos de uma vez
    // É mais rápido que inserir um por um
    const resultado = await collection.insertMany(dados);
    const tempo = Date.now() - inicio;

    // Retorna JSON com o resultado
    res.json({
      sucesso: true,
      inseridos: resultado.insertedCount, // Quantos foram inseridos
      tempo: tempo, // Tempo em milissegundos
      mensagem: `${resultado.insertedCount} documentos inseridos em ${tempo}ms`
    });
  } catch (erro) {
    // Se der erro, retorna status 500 e a mensagem de erro
    res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

// Rota GET para buscar os dados
// A interface web chama essa rota para mostrar os documentos na tabela
app.get("/api/dados", async (req, res) => {
  try {
    // Pega o limite da query string (ex: /api/dados?limite=50)
    // Se não tiver, usa 100 como padrão
    const limite = parseInt(req.query.limite) || 100;
    
    // find({}) busca todos os documentos (objeto vazio = sem filtro)
    // sort({ numero: 1 }) ordena por número em ordem crescente
    // limit(limite) limita quantos documentos retornar
    // toArray() converte o cursor em um array JavaScript
    const dados = await collection
      .find({})
      .sort({ numero: 1 })
      .limit(limite)
      .toArray();
    
    // Conta quantos documentos existem no total (sem limite)
    const total = await collection.countDocuments();

    res.json({
      sucesso: true,
      total: total, // Total de documentos no banco
      exibindo: dados.length, // Quantos estão sendo retornados agora
      dados: dados // Array com os documentos
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

// Rota DELETE para limpar todos os documentos
// deleteMany({}) com objeto vazio deleta tudo
app.delete("/api/limpar", async (req, res) => {
  try {
    const resultado = await collection.deleteMany({});
    res.json({
      sucesso: true,
      deletados: resultado.deletedCount, // Quantos foram deletados
      mensagem: `${resultado.deletedCount} documentos removidos`
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

// Rota GET para buscar estatísticas
// Usa aggregation pipeline do MongoDB para calcular média, máximo e mínimo
app.get("/api/estatisticas", async (req, res) => {
  try {
    const total = await collection.countDocuments();
    
    // Pipeline de agregação
    // $group agrupa todos os documentos (por isso _id: null)
    // e calcula média, máximo e mínimo do campo "valor"
    const pipeline = [
      {
        $group: {
          _id: null, // null = agrupa tudo junto
          mediaValor: { $avg: "$valor" }, // Média dos valores
          maxValor: { $max: "$valor" }, // Valor máximo
          minValor: { $min: "$valor" } // Valor mínimo
        }
      }
    ];
    
    // aggregate() executa o pipeline e retorna os resultados
    const stats = await collection.aggregate(pipeline).toArray();
    
    res.json({
      sucesso: true,
      totalDocumentos: total,
      estatisticas: stats[0] || {} // stats[0] porque o resultado vem em array
    });
  } catch (erro) {
    res.status(500).json({
      sucesso: false,
      erro: erro.message
    });
  }
});

// Função principal que inicia tudo
// Primeiro tenta conectar no MongoDB, depois inicia o servidor Express
async function iniciar() {
  const conectado = await conectarMongoDB();
  
  if (conectado) {
    // Se conectou no MongoDB, inicia o servidor web na porta 3000
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Acesse a interface web para visualizar os dados`);
    });
  } else {
    // Se não conseguiu conectar, mostra erro e não inicia o servidor
    console.log("Erro: MongoDB nao esta rodando localmente");
    console.log("Certifique-se de que o servico MongoDB esta ativo");
  }
}

// Chama a função iniciar quando o arquivo é executado
iniciar();
