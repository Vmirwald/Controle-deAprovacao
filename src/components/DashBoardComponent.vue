<template>
  <div class="container-fluid layout-view">
    <GenericCard :title="'Controle de Aprovação'" :showNewButton="false">
      <template #content>
        <div class="mt-4">
          <div class="row">
            <!-- Card Unidades -->
            <div class="col-md-6">
              <GenericCard :title="'Unidades'" :showNewButton="false">
                <template #content>
                  <!-- Gráfico de Unidades -->
                  <GenericGraph
                    :title="'Distribuição de Apoio nas Unidades'"
                    :labels="['Aprovaram Texto', 'Apoiam Discussão', 'Não Apoiaram']"
                    :data="[8, 4, 30]"
                    :colors="['#4caf50', '#2196f3', '#f44336']"
                    width="100%"
                    height="300px"
                    @section-clicked="setActiveTabUnidades"
                  />
                  <!-- Abas Dinâmicas -->
                  <div class="tabs-container mt-3">
                    <ul class="nav nav-tabs">
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ active: activeTabUnidades === 'Aprovaram Texto' }"
                          @click="setActiveTabUnidades('Aprovaram Texto')"
                          href="#"
                        >
                          Aprovaram Texto
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ active: activeTabUnidades === 'Apoiam Discussão' }"
                          @click="setActiveTabUnidades('Apoiam Discussão')"
                          href="#"
                        >
                          Apoiam Discussão
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          :class="{ active: activeTabUnidades === 'Não Apoiaram' }"
                          @click="setActiveTabUnidades('Não Apoiaram')"
                          href="#"
                        >
                          Não Apoiaram
                        </a>
                      </li>
                    </ul>
                    <div class="tab-content mt-3">
                      <div
                        v-if="activeTabUnidades === 'Aprovaram Texto'"
                        class="tab-pane active"
                      >
                        <ul>
                          <li>Museu de Arqueologia e Etnologia (MAE) (Unanimidade) (04.04.2024)</li>
                          <li>Escola de Enfermagem (EE) (Unanimidade) (09.10.2024)</li>
                          <li>Faculdade de Saúde Pública (FSP) (Unanimidade) (24.10.2024)</li>
                          <li>Instituto de Biociências (IB) 23 a favor, 3 abstenções (25.10.2024)</li>
                        </ul>
                      </div>
                      <div
                        v-if="activeTabUnidades === 'Apoiam Discussão'"
                        class="tab-pane active"
                      >
                        <ul>
                          <li>Unidade A - Informações relevantes</li>
                          <li>Unidade B - Detalhes complementares</li>
                        </ul>
                      </div>
                      <div
                        v-if="activeTabUnidades === 'Não Apoiaram'"
                        class="tab-pane active"
                      >
                        <p>Não há informações disponíveis para esta categoria.</p>
                      </div>
                    </div>
                  </div>
                </template>
              </GenericCard>
            </div>

            <!-- Card Departamentos -->
            <div class="col-md-6">
              <GenericCard :title="'Departamentos'" :showNewButton="false">
                <template #content>
                  <!-- Destaques Departamentos -->
                  <div class="mb-4">
                    <h5>Resumo dos Departamentos</h5>
                    <p>28 departamentos discutiram o tema</p>
                    <p>26 deles aprovaram a proposta (20 por unanimidade)</p>
                  </div>

                  <!-- Dropdown para Seleção de Unidades -->
                  <div class="mb-4">
                    <label for="unit-dropdown" class="form-label">Selecione uma Unidade:</label>
                    <select
                      id="unit-dropdown"
                      class="form-select"
                      v-model="selectedUnit"
                      @change="updateTableData"
                    >
                      <option value="" disabled>Escolha uma unidade</option>
                      <option v-for="(unit, index) in units" :key="index" :value="unit">
                        {{ unit }}
                      </option>
                    </select>
                  </div>

                  <!-- GenericTable2 para Departamentos -->
                  <GenericTable2
                    v-if="filteredDepartments.length > 0"
                    :rows="filteredDepartments"
                    :headers="tableHeaders"
                    :descriptionKey="'comments'"
                  />
                  <p v-else class="text-center mt-3">Nenhum departamento encontrado.</p>
                </template>
              </GenericCard>
            </div>
          </div>
        </div>
      </template>
    </GenericCard>
  </div>
</template>

<script>
import GenericCard from "@/components/GenericCard.vue";
import GenericGraph from "@/components/GenericGraph.vue";
import GenericTable2 from "@/components/GenericTable2.vue";

export default {
  name: "DashBoardComponent",
  components: {
    GenericCard,
    GenericGraph,
    GenericTable2,
  },
  data() {
    return {
      // Abas para Unidades
      activeTabUnidades: "Aprovaram Texto",
      // Unidades e Departamentos
      units: [
        "Escola de Enfermagem de Ribeirão Preto (EERP)",
        "Escola de Engenharia de São Carlos (EESC)",
        "Escola Politécnica (POLI)",
        "Faculdade de Ciências Farmacêuticas (FCF)",
      ],
      selectedUnit: "",
      departments: [],
      filteredDepartments: [],
      tableHeaders: [
        { text: "Departamento", value: "department", align: "left" },
        { text: "Unanimidade", value: "unanimity", align: "center" },
        { text: "Votos a Favor", value: "votesFor", align: "right" },
        { text: "Votos Contra", value: "votesAgainst", align: "right" },
        { text: "Abstenções", value: "abstentions", align: "center" },
      ],
    };
  },
  methods: {
    fetchData() {
      fetch(`${import.meta.env.BASE_URL}data.json`) // Substitua com o caminho correto do JSON
        .then((response) => response.json())
        .then((data) => {
          this.departments = data.departments;
        })
        .catch((error) => console.error("Erro ao carregar dados:", error));
    },
    setActiveTabUnidades(tab) {
      this.activeTabUnidades = tab;
    },
    updateTableData() {
      this.filteredDepartments = this.departments
        .filter((dept) => dept.unit === this.selectedUnit)
        .map(({ unit, ...rest }) => rest); // Remove a propriedade 'unit'
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.tabs-container {
  margin-top: 1rem;
}

.nav-tabs {
  border-bottom: 1px solid #ddd;
}

.nav-link {
  cursor: pointer;
}

.nav-link.active {
  font-weight: bold;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-bottom-color: transparent;
}

.text-center {
  text-align: center;
}
</style>
