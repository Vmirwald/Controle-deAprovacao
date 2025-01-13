<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header.value"
            :class="header.align || 'text-center'"
            :style="{ verticalAlign: header.verticalAlign || 'middle' }"
          >
            {{ header.text }}
            <!-- Campo de filtro para cada coluna -->
            <div v-if="header.filterable" class="mt-2">
              <input
                type="text"
                class="form-control form-control-sm"
                v-model="filters[header.value]"
                @input="applyFilters"
                placeholder="Filtrar"
              />
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <!-- Linhas de dados -->
        <tr v-for="(row, index) in filteredRows" :key="index" @click="$emit('rowClick', row)">
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
        <tr v-if="filteredRows.length === 0">
          <td :colspan="headers?.length || 1" class="text-center">Nenhum dado disponível</td>
        </tr>
      </tbody>
    </table>

    <!-- Tooltip/Modal for mobile -->
    <div
      v-if="tooltipVisible"
      class="tooltip-container"
      @click="tooltipVisible = false"
    >
      <div class="tooltip-content">
        <p>{{ tooltipContent }}</p>
        <button class="btn btn-primary" @click="tooltipVisible = false">Fechar</button>
      </div>
    </div>
  </div>
</template>
<script>
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
      default: "comments",
    },
  },
  data() {
    return {
      tooltipVisible: false,
      tooltipContent: "",
      filters: {}, // Armazena os valores dos filtros
      filteredRows: [], // Dados filtrados
    };
  },
  watch: {
    rows: {
      handler(newRows) {
        this.filteredRows = [...newRows];
      },
      immediate: true,
    },
  },
  methods: {
    getColumnAlignment(key) {
      const header = this.headers.find((header) => header.value === key);
      return header?.align || "text-center";
    },
    applyFilters() {
      this.filteredRows = this.rows.filter((row) => {
        return Object.keys(this.filters).every((key) => {
          const filterValue = this.filters[key]?.toLowerCase() || "";
          const rowValue = row[key]?.toString().toLowerCase() || "";
          return rowValue.includes(filterValue);
        });
      });
    },
  },
};
</script>
<style scoped>
/* Info icon styles */
.info-icon {
  color: #007bff;
  cursor: pointer;
}

.info-icon:hover {
  color: #0056b3;
}

/* Tooltip/Modal for mobile */
.tooltip-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.tooltip-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.tooltip-content button {
  margin-top: 1rem;
}
</style>
