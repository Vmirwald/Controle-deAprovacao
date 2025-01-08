<template>
    <div class="table-responsive">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <!-- Ajustado para lidar com headers como objetos -->
            <th
              v-for="header in headers"
              :key="header.value"
              :class="header.align || 'text-center'"
              :style="{ verticalAlign: header.verticalAlign || 'middle' }"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Garante que rows está inicializado antes de tentar mapear -->
          <tr v-for="(row, index) in rows || []" :key="index" @click="$emit('rowClick', row)">
            <td v-for="(value, key) in row" :key="key" :class="getColumnAlignment(key)">
              <!-- Verifica se é a chave da descrição -->
              <span v-if="key === descriptionKey && value">
                <span class="info-icon" :title="value">
                  <i class="fas fa-info-circle"></i>
                </span>
              </span>
              <span v-else>{{ value }}</span>
            </td>
          </tr>
          <!-- Exibe uma mensagem se não houver dados -->
          <tr v-if="rows && rows.length === 0">
            <td :colspan="headers?.length || 1" class="text-center">Nenhum dado disponível</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  //import GenericButton from '@/components/generic/GenericButton.vue'; // Importando o componente
  
  const items = ref([]);
  //const error = ref(false);
  
  export default {
    props: {
      headers: {
        type: Array,
        default: () => [],
      },
      rows: {
        type: Array,
        default: () => [],
      },
      descriptionKey: {
        type: String,
        default: "descricao",
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
        return this.showActions ? this.columns.length + 1 : this.columns.length;
      },
      // Define a largura total da tabela com base no número de colunas.
      tableWidth() {
        return `${this.columnCount * 150}px`; // Ajuste 150px conforme necessário para cada coluna.
      }
    },
    methods: {
        
      getColumnAlignment(key) {
        const header = this.headers.find((header) => header.value === key);
        return header?.align || "text-center";
      },
      getVerticalAlignment(key) {
        const header = this.headers.find((header) => header.value === key);
        return header?.verticalAlign || "middle";
      },
      // Retorna o estilo de largura de cada coluna com base no número total de colunas.
      getColumnStyle() {
        return {
          width: `${100 / this.columnCount}%`,
        };
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
    watch: {
      currentPage() {
        this.fetchData();
      },
    },
    components: {
      //GenericButton // Registrando o componente
    }
  };
  </script>
  
  <style scoped>
  .table-responsive {
    overflow-x: auto;
  }
  .table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
    font-size: .9em;
    align-content: center;
  }
 
  .table-hover tbody tr:hover {
    background-color: #f1f3f5;
    cursor: pointer;
  }
  
  .info-icon {
    color: #007bff;
    cursor: pointer;
  }
  .info-icon:hover {
    color: #0056b3;
  }
  </style>