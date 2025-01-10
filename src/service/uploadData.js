import {db} from './firebase.js'; // Configuração do Firebase
import { collection, doc, setDoc } from 'firebase/firestore';
import fs from 'fs';

/**
 * Função genérica para fazer upload de dados para o Firestore.
 * @param {string} collectionName - Nome da coleção no Firestore.
 * @param {Object} data - Objeto contendo os dados a serem enviados.
 */
async function uploadData(collectionName, data) {
  try {
    console.log(`Iniciando upload para a coleção: ${collectionName}`);
    for (const [docId, docData] of Object.entries(data)) {
      const docRef = doc(collection(db, collectionName), docId); // Referência ao documento com ID
      await setDoc(docRef, docData); // Envia os dados para o Firestore
      console.log(`Documento ${docId} enviado com sucesso para a coleção ${collectionName}.`);
    }
    console.log(`Upload completo para a coleção: ${collectionName}`);
  } catch (error) {
    console.error(`Erro ao subir dados para a coleção ${collectionName}:`, error);
  }
}

// Obter argumentos do terminal
const args = process.argv.slice(2); // Ignorar os dois primeiros argumentos (node e script path)
const [fileName, collectionName] = args;

if (!fileName || !collectionName) {
  console.error('Uso: node uploadData.js <arquivo.json> <nome_da_colecao>');
  process.exit(1);
}

// Ler o arquivo JSON
try {
  const fileData = fs.readFileSync(`./src/service/${fileName}`, 'utf-8');
  const jsonData = JSON.parse(fileData);

  // Subir os dados para o Firestore
  uploadData(collectionName, jsonData);
} catch (error) {
  console.error(`Erro ao ler o arquivo ${fileName}:`, error);
  process.exit(1);
}
