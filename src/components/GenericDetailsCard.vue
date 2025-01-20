<template>
  <div 
    class="generic-details selectable-card" 
    @click="handleClick"
  >
    <div 
      v-for="(row, index) in rows || []" 
      :key="index" 
      class="row "
    >
      <div 
        v-for="(col, colIndex) in row.columns || []" 
        :key="colIndex" 
        :class="typeof col.class === 'function' ? col.class(data, context) : col.class || 'col-sm'"
      >
        <template v-if="col.type === 'text'">
          <strong class="d-inline-block d-md-block">{{ col.label }}:</strong>
          {{ col.formatter ? col.formatter(data, context) : (data?.[col.field] || 'Não informado') }}
        </template>

        <template v-else-if="col.type === 'badge'">
          <div class="badge-container">
            <span 
              v-if="data?.[col.field] !== undefined" 
              :class="typeof col.class === 'function' ? col.class(data, context) : col.class || 'badge badge-default'"
            >
              {{ col.formatter ? col.formatter(data, context) : data[col.field] }}
            </span>
          </div>
        </template>

        <template v-else-if="col.type === 'icon'">
          <span 
            v-if="data?.[col.field]" 
            :title="data[col.field]" 
            class="info-icon"
          >
            <i :class="col.icon || 'fas fa-info-circle'"></i>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>  

<script>
export default {
  props: {
    rows: {
      type: Array,
      required: true, // Define a estrutura de exibição
    },
    data: {
      type: Object,
      required: true, // Dados dinâmicos a serem exibidos
    },
    context: {
      type: Object,
      default: () => ({}), // Contexto adicional para formatadores
    },
    onClick: {
      type: Function,
      required: false, // Callback para o clique
    },
  },
  methods: {
    handleClick() {
      if (this.onClick) {
        this.onClick(this.data); // Passa os dados clicados para o callback
      }
    },
  },
};
</script>

<style scoped>
.selectable-card {
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.selectable-card:hover {
  background-color: #f8f9fa;
}
.info-icon {
  color: #007bff;
  cursor: pointer;
}
.info-icon:hover {
  color: #0056b3;
}
.badge-container {
  display: inline-flex; /* Mantém os badges em linha */
  flex-wrap: wrap; /* Permite quebra em múltiplas linhas para telas menores */
  gap: 0.5rem; /* Espaçamento entre badges */
  margin-bottom: 0.5rem; /* Espaçamento vertical para evitar sobreposição */
  justify-content: flex-start; /* Alinhamento horizontal */
  align-items: center; /* Alinha os itens ao centro */
}
.badge {
  background-color: #007bff;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  white-space: nowrap; /* Evita quebra de linha */
  text-align: center;
}

.badge-primary {
  background-color: #007bff !important;
  color: #fff !important;
}

.badge-secondary {
  background-color: #6c757d !important;
  color: #fff !important;
}

.badge-success {
  background-color: #28a745 !important;
  color: #fff !important;
}

.badge-danger {
  background-color: #dc3545 !important;
  color: #fff !important;
}

@media (max-width: 768px) {
  .badge-container {
    flex-direction: column; /* Alinha 
    os badges verticalmente */
    align-items: flex-start; /* Alinha os badges à esquerda */
  }
  .badge {
    width: 100%; /* Ocupa 100% do espaço disponível */
    text-align: left; /* Alinha o texto à esquerda */
    align-content: center;
  }
}
</style>
