// index.js
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://juinenem30_db_user:h7xeAU3pGsd6GdUd@cluster0.ahfanfc.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    console.log("Conectando ao MongoDB Atlas...");
    await client.connect();
    const db = client.db("teste");
    const col = db.collection("insercoes");

    console.log("Inserindo documentos...");
    const dados = [];
    for (let i = 0; i < 10000; i++) {
      dados.push({ numero: i, texto: `Registro número ${i}` });
    }

    const resultado = await col.insertMany(dados);
    console.log(`${resultado.insertedCount} documentos inseridos com sucesso!`);
  } catch (erro) {
    console.error("Erro:", erro);
  } finally {
    await client.close();
    console.log("Conexão encerrada.");
  }
}

run();
