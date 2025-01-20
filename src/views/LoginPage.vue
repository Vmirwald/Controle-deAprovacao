<template>
  <div class="login-page">
    <div class="login-card">
      <h1>Bem-vindo</h1>
      <p class="subtitle">Faça login para continuar</p>
      <form @submit.prevent="login">
        <!-- Campo de E-mail -->
        <div class="form-group">
          <label for="email">E-mail</label>
          <div class="input-wrapper">
            <i class="fas fa-envelope input-icon"></i>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Digite seu e-mail"
              required
            />
          </div>
        </div>
        
        <!-- Campo de Senha -->
        <div class="form-group">
          <label for="password">Senha</label>
          <div class="input-wrapper">
            <i class="fas fa-lock input-icon"></i>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Digite sua senha"
              required
            />
          </div>
        </div>
        
        <button type="submit" class="btn-submit">Entrar</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>


<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/'); // Redireciona para a Home
      } catch (error) {
        this.errorMessage = 'Erro ao fazer login: ' + error.message;
      }
    },
  },
};
</script>

<style scoped>
/* Estilo geral da página de login */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  font-family: 'Arial', sans-serif;
}

/* Cartão de login */
.login-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 350px;
  width: 100%;
  text-align: center;
}

/* Título */
.login-card h1 {
  font-size: 2rem;
  color: #333333;
  margin-bottom: 0.5rem;
}

/* Subtítulo */
.subtitle {
  font-size: 1rem;
  color: #777777;
  margin-bottom: 1.5rem;
}

/* Grupo de formulário */
.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

/* Rótulos */
.form-group label {
  display: block;
  font-size: 0.9rem;
  color: #555555;
  margin-bottom: 0.5rem;
}

/* Input Wrapper */
.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #6c757d;
}

/* Inputs */
.form-group input {
  width: 100%;
  padding: 0.8rem 0.8rem 0.8rem 2.5rem; /* Espaço para o ícone */
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 0.9rem;
  outline: none;
  transition: border 0.3s;
}

/* Efeito de foco nos inputs */
.form-group input:focus {
  border: 1px solid #6a11cb;
  box-shadow: 0 0 4px rgba(106, 17, 203, 0.5);
}

/* Botão de Submissão */
.btn-submit {
  width: 100%;
  padding: 0.8rem;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: #ffffff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1rem;
}

/* Efeito ao passar o mouse no botão */
.btn-submit:hover {
  background: linear-gradient(to right, #5b0db5, #1f60d5);
}

/* Mensagem de Erro */
.error-message {
  color: #ff4d4d;
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>
