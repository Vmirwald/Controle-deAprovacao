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
                  <!-- Filtro de Temas -->
                  <div class="mb-4">
                    <label for="tema-dropdown" class="form-label">Selecione um Tema:</label>
                    <select
                      id="tema-dropdown"
                      class="form-select"
                      v-model="selectedTema"
                      @change="filterUnitsByTema"
                    >
                      <option value="" disabled>Escolha um tema</option>
                      <option
                        v-for="tema in temaOptions"
                        :key="tema.value"
                        :value="tema.value"
                      >
                        {{ tema.text }}
                      </option>
                    </select>
                  </div>

                  <!-- Gráfico de Unidades -->
                  <GenericGraph
                    :title="'Distribuição de Apoio nas Unidades'"
                    :labels="['Aprovaram Texto', 'Apoiam Discussão', 'Não Apoiaram']"
                    :data="[8, 4, 30]"
                    :colors="['#4caf50', '#2196f3', '#f44336']"
                    :selectedLabel="activeTabUnidades"
                    @section-clicked="setActiveTabUnidades"
                  />

                  <!-- CustomNavbar -->
                  <CustomNavbar
                    :items="navbarItems"
                    :activeItem="activeTabUnidades"
                    @select="setActiveTabUnidades"
                  />

                  <!-- Conteúdo das abas -->
                  <div class="tab-content mt-3">
                    <div v-if="activeTabUnidades === 'Aprovaram Texto'">
                      <ul>
                        <li>Museu de Arqueologia e Etnologia (MAE) (Unanimidade) (04.04.2024)</li>
                        <li>Escola de Enfermagem (EE) (Unanimidade) (09.10.2024)</li>
                        <li>Faculdade de Saúde Pública (FSP) (Unanimidade) (24.10.2024)</li>
                        <li>Instituto de Biociências (IB) 23 a favor, 3 abstenções (25.10.2024)</li>
                      </ul>
                    </div>
                    <div v-if="activeTabUnidades === 'Apoiam Discussão'">
                      <ul>
                        <li>Unidade A - Informações relevantes</li>
                        <li>Unidade B - Detalhes complementares</li>
                      </ul>
                    </div>
                    <div v-if="activeTabUnidades === 'Não Apoiaram'">
                      <p>Não há informações disponíveis para esta categoria.</p>
                    </div>
                  </div>
                </template>
              </GenericCard>
            </div>

            <!-- Card Departamentos -->
            <div class="col-md-6">
              <GenericCard :title="'Departamentos'" :showNewButton="false">
                <template #content>
                  <div class="mb-4">
                    <h5>Resumo dos Departamentos</h5>
                    <p>28 departamentos discutiram o tema</p>
                    <p>26 deles aprovaram a proposta (20 por unanimidade)</p>
                  </div>
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
import CustomNavbar from "@/components/CustomNavbar.vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/service/firebase";

export default {
  name: "DashBoardComponent",
  components: {
    GenericCard,
    GenericGraph,
    CustomNavbar,
  },
  data() {
    return {
      activeTabUnidades: "Aprovaram Texto",
      navbarItems: [
        {
          id: "Aprovaram Texto",
          label: "Aprovaram Texto",
          icon: "fas fa-check-circle",
          disabled: false,
        },
        {
          id: "Apoiam Discussão",
          label: "Apoiam Discussão",
          icon: "fas fa-comments",
          disabled: false,
        },
        {
          id: "Não Apoiaram",
          label: "Não Apoiaram",
          icon: "fas fa-times-circle",
          disabled: false,
        },
      ],
      temaOptions: [], // Lista de temas
      selectedTema: "", // Tema selecionado
    };
  },
  methods: {
    async fetchTemas() {
      try {
        const querySnapshot = await getDocs(collection(db, "Temas"));
        const temas = [];
        querySnapshot.forEach((doc) => {
          const tema = doc.data();
          temas.push({ value: doc.id, text: tema.Titulo });
        });
        this.temaOptions = temas;
      } catch (error) {
        console.error("Erro ao buscar temas:", error);
      }
    },
    filterUnitsByTema() {
      console.log("Tema selecionado:", this.selectedTema);
      // Implemente a lógica para filtrar unidades pelo tema
    },
    setActiveTabUnidades(tab) {
      this.activeTabUnidades = tab;
    },
  },
  mounted() {
    this.fetchTemas();
  },
};
</script>

<style scoped>
.tab-content {
  margin-top: 1rem;
}

.nav-tabs {
  border-bottom: 1px solid #ddd;
}

.text-center {
  text-align: center;
}
</style>
