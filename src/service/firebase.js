// Importação das bibliotecas necessárias do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Adicionado para o Firestore

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB3-kGIIrzMp3il9BMmB7e9YIw8MVi7eqY",
    authDomain: "carreiras-usp.firebaseapp.com",
    databaseURL: "https://carreiras-usp-default-rtdb.firebaseio.com",
    projectId: "carreiras-usp",
    storageBucket: "carreiras-usp.firebasestorage.app",
    messagingSenderId: "870850312201",
    appId: "1:870850312201:web:edc7a5a5e757c9187620d8"
  };


// Inicialização do Firebase
const app = initializeApp(firebaseConfig);

// Exportar autenticação e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

