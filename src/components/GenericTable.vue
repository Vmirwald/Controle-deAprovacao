<template>
  <div :class="tableClass">
    <h3>{{ errorMessage }}</h3>
    <div class="table-container">
      <!-- Table -->
      <table :class="['table table-hover', tableStyleClass]" :style="{ width: tableWidth }">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.value" :class="header.align">
              {{ header.text }}
            </th>
            <th v-if="showActions" :class="actionsHeaderClass">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in rows" :key="index" class="table-row">
            <td v-for="header in headers" :key="header.value" :class="header.align">
              <span class="cell-content">{{ item[header.value] }}</span>
            </td>
            <!-- Actions Column -->
            <td v-if="showActions" :class="actionsCellClass">
              <div class="btn-group">
                <GenericButton
                  action="Query"
                  label="Query"
                  iconClass="fas fa-question-circle"
                  btnClass="btn btn-warning btn-sm action-btn"
                  @click="onQuery(item)"
                />
                <GenericButton
                  action="Update"
                  label="Update"
                  iconClass="fas fa-refresh"
                  btnClass="btn btn-success btn-sm action-btn"
                  @click="onUpdate(item)"
                />
                <GenericButton
                  action="Delete"
                  label="Delete"
                  iconClass="fas fa-trash"
                  btnClass="btn btn-danger btn-sm action-btn"
                  @click="onDelete(item)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination Controls -->
      <div class="pagination-container">
        <button :disabled="currentPage === 1" @click="previousPage">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="nextPage">Next</button>
      </div>
    </div>
  </div>
</template>


<script>
import apiService from '@/services/apiService';
import { RequestPayload } from '@/models/LinconWsModel';
import { ref } from 'vue';
import GenericButton from '@/components/generic/GenericButton.vue'; // Importando o componente

const items = ref([]);
//const error = ref(false);

export default {
  props: {
    endpoint: {
      type: String,
      required: false,
    },
    headers: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true, // Ou defina um valor padrão
      default: () => [], // Define um array vazio como padrão
    },
    showActions: {
      type: Boolean,
      default: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    tableClass: {
      type: String,
      default: '',
    },
    tableStyleClass: {
      type: String,
      default: '',
    },
    paginationClass: {
      type: String,
      default: 'pagination',
    },
    actionButtonClass: {
      type: String,
      default: 'btn-action',
    },
    actionsHeaderClass: {
      type: String,
      default: 'actions-header',
    },
    actionsCellClass: {
      type: String,
      default: 'actions-cell',
    },
  },
  data() {
    return {
      items: items,
      currentPage: 1,
      totalPages: 1,
      errorMessage : ""
    };
  },
  computed: {
    // Calcula o número total de colunas, incluindo a coluna de ações, se existir.
    columnCount() {
      return Array.isArray(this.headers) ? (this.showActions ? this.headers.length + 1 : this.headers.length) : 0;
    },
    // Define a largura total da tabela com base no número de colunas.
    tableWidth() {
      return `${this.columnCount * 150}px`; // Ajuste 150px conforme necessário para cada coluna.
    }
  },
  methods: {
    // Retorna o estilo de largura de cada coluna com base no número total de colunas.
    getColumnStyle() {
      return {
        width: this.columnCount > 0 ? `${100 / this.columnCount}%` : 'auto',
      };
    },
    async fetchData() {
      const offset = (this.currentPage - 1) * this.pageSize;
      const payload = new RequestPayload();
      payload.nPagina = offset;
      payload.nQuantidade = this.totalPages;
      console.log('Disparando chamada para ' + this.endpoint);
      await apiService.postData(`${this.endpoint}`, payload)
        .then(async response => {
          if (response !== undefined) {
            const data = response.data.d;
            items.value = data;
            console.log("GenericTable - total itens " + data.length);
            this.totalPages = Math.ceil(data.length / this.pageSize);
            console.log("GenericTable - total de páginas " + this.totalPages);
          }
        })
        .catch((ex) => {
          //error.value = true;
          //this.errorMessage = "Erro ao carregar os dados";
          console.error('Error fetching data:', ex);
        });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchData();
      }
    },
    onQuery(item) {
      this.$emit('query', item);
    },
    onUpdate(item) {
      this.$emit('update', item);
    },
    onDelete(item) {
      console.log("GenericTable - OnDelete" + item)
      this.$emit('delete', item);
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    currentPage() {
      this.fetchData();
    },
  },
  components: {
    GenericButton // Registrando o componente
  }
};
</script>

<style scoped>
/* Estilo para a tabela */
.table-hover tbody tr:hover {
  background-color: #f5f5f5; /* Cor de fundo ao passar o mouse */
}

/* Estilo dos botões */
.action-btn {
  margin: 0.25rem; /* Espaçamento entre os botões */
  border-radius: 0.25rem; /* Bordas arredondadas */
  transition: box-shadow 0.3s ease, transform 0.1s ease; /* Transição suave para sombra e clique */
}

.action-btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra ao passar o mouse */
  transform: translateY(-1px); /* Elevação sutil ao passar o mouse */
}

/* Garantir que os botões fiquem lado a lado */
.btn-group {
  display: flex; /* Display flex para manter os botões lado a lado */
}

/* Contêiner que centraliza a tabela e a paginação */
.table-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Centraliza a tabela e a paginação */
  max-width: 100vw; /* Deixe a largura automática */
  margin: 0 auto; /* Centraliza o contêiner na página */
  padding: 0 1rem; /* Adiciona padding para evitar overflow */
}

/* Centralizar a div de paginação */
.pagination-container {
  display: flex;
  max-width: 100vw;
  justify-content: center; /* Centraliza a div dentro do container */
  align-items: center; /* Alinha verticalmente ao centro */
  margin-top: 1rem; /* Espaçamento superior */
}

/* Ajustes para transformar linhas da tabela em cards em telas pequenas */
@media (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block; /* Todos os elementos são exibidos como blocos */
  }

  thead {
    display: none; /* Esconde o cabeçalho em telas pequenas */
  }

  .table-row {
    margin-bottom: 0.75rem; /* Reduz o espaçamento entre os cards */
    border: 1px solid #ddd; /* Borda do card */
    border-radius: 0.5rem; /* Bordas arredondadas para os cards */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra suave para os cards */
    padding: 0.75rem; /* Reduz o espaçamento interno dos cards */
    background-color: #fff; /* Cor de fundo dos cards */
    max-width: 50%; /* Garante que o card não ultrapasse a largura da tela */
    overflow-x: auto; /* Adiciona rolagem horizontal caso o conteúdo seja muito grande */
    margin-left: auto; /* Centraliza os cards dentro do contêiner */
    margin-right: auto; /* Centraliza os cards dentro do contêiner */
  }

  .table-row td {
    display: flex; /* Cada célula se comporta como uma linha de informação no card */
    justify-content: space-between; /* Espaço entre o label e o valor */
    align-items: center; /* Alinhamento vertical */
    padding: 0.25rem 0; /* Reduz o espaçamento interno de cada item do card */
    border-bottom: 1px solid #eee; /* Divisor entre as células */
    max-width: 50%;
  }

  .table-row td:last-child {
    border-bottom: none; /* Remove o divisor da última célula */
  }

  /* Esconde os rótulos nas células em telas grandes */
  .table-row td[data-label]:before {
    content: attr(data-label); /* Mostra o nome da coluna como rótulo */
    font-weight: bold; /* Negrito para o rótulo */
    display: block; /* Exibe o rótulo */
    width: 100px; /* Largura mínima para o rótulo */
  }

  /* Esconde os rótulos em telas grandes */
  .table-row td[data-label] .label {
    display: none;
  }

  /* Ajusta os botões para ocuparem menos espaço */
  .action-btn {
    font-size: 0.875rem; /* Reduz o tamanho do texto nos botões */
    padding: 0.25rem 0.5rem; /* Reduz o padding dos botões */
  }
}

@media (min-width: 769px) {
  .table-row td[data-label]:before {
    display: none; /* Esconde os rótulos em telas grandes */
  }
}
</style>