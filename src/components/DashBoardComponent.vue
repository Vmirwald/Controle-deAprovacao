<template>
  <div class="container-fluid layout-view">
    <GenericCard :title="'Controle de Aprovação'" :showNewButton="false">
      <template #content>
        <div class="mt-4">
          <!-- Dropdown de Temas -->
          <div class="mb-3">
            <label for="tema-dropdown" class="form-label">Selecione um Tema:</label>
            <select
              id="tema-dropdown"
              class="form-select"
              v-model="selectedTema"
            >
              <option value="" disabled>Escolha um tema</option>
              <option v-for="(tema, index) in temas" :key="index" :value="tema.id">
                {{ tema.Titulo }}
              </option>
            </select>
          </div>

          <div class="row">
            <!-- Card Unidades -->
            <div class="col-md-6">
              <GenericCard :title="'Panorâma Geral'" :showNewButton="false">
                <template #content>
                  <!-- Gráfico de Unidades -->
                  <div class="row">
                    <div class="col-md-6" >
                      <h4>Congregação</h4>
                    </div>
                    <div class="col-md-6">
                      <h4>Reunião de Departamento</h4>
                    </div>
                    
                  </div>
                  <div class="row">
                    
                    <div class="col-md-2 mb-3">
                      <div class="row">
                        {{ graphData[0] }}
                      </div>
                      <div class="row">
                        {{ graphData[1] }}
                      </div>
                      <div class="row">
                        {{ totalUnidades }}
                      </div>                     
                    </div>
                    <div class="col-md-4 mb-3">
                      
                      <GenericGraph
                        :key="graphKey"
                        :title="'Distribuição de Apoio nas Unidades'"
                        :labels="['Aprovaram Texto', 'Apoiam Discussão', 'Não Aprovam ou Apoiam']"
                        :data="graphData"
                        :colors="['#4caf50', '#2196f3', '#FF0000']"
                        :selectedLabel="activeTabUnidades"
                        @section-clicked="setActiveTabUnidades"
                      />
                    </div>

                    <div class="col-md-2 mb-3">
                      <div class="row">
                        
                      </div>
                      <div class="row">
                        
                      </div>
                      <div class="row">
                        
                      </div>                      
                    </div>
                    <div class="col-md-4 mb-3">
                      
                      <GenericGraph
                        :key="graphKey"
                        :title="'Distribuição de Apoio nas Unidades'"
                        :labels="['Aprovaram Texto', 'Apoiam Discussão', 'Não Aprovam ou Apoiam']"
                        :data="graphData"
                        :colors="['#4caf50', '#2196f3', '#FF0000']"
                        :selectedLabel="activeTabUnidades"
                        @section-clicked="setActiveTabUnidades"
                      />
                    </div>
                  </div>

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
                        <li
                          v-for="(unit, index) in aprovamTexto"
                          :key="index"
                        >
                          {{ formatUnitDisplay(unit) }}
                        </li>
                      </ul>
                    </div>
                    <div v-if="activeTabUnidades === 'Apoiam Discussão'">
                      <ul>
                        <li
                          v-for="(unit, index) in apoiamDiscussao"
                          :key="index"
                        >
                          {{ formatUnitDisplay(unit) }}
                        </li>
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
                  <!-- Dropdown Cidade -->
                  <div class="mb-3">
                    <label for="cidade-dropdown" class="form-label">Selecione a Cidade:</label>
                    <select
                      id="cidade-dropdown"
                      class="form-select"
                      v-model="selectedCidade"
                      @change="fetchUnidades"
                    >
                      <option value="" disabled>Escolha uma cidade</option>
                      <option v-for="cidade in cidades" :key="cidade" :value="cidade">
                        {{ cidade }}
                      </option>
                    </select>
                  </div>

                  <!-- Dropdown Unidade -->
                  <div class="mb-3">
                    <label for="unidade-dropdown" class="form-label">Selecione a Unidade:</label>
                    <select
                      id="unidade-dropdown"
                      class="form-select"
                      v-model="selectedUnidade"
                      @change="fetchDepartamentos"
                      :disabled="!unidades.length"
                    >
                      <option value="" disabled>Escolha uma unidade</option>
                      <option v-for="unidade in unidades" :key="unidade.id" :value="unidade">
                        {{ unidade.Nome }}
                      </option>
                    </select>
                  </div>

                  <!-- Dropdown Departamento -->
                  <div class="mb-3">
                    <label for="departamento-dropdown" class="form-label">Selecione o Departamento:</label>
                    <select
                      id="departamento-dropdown"
                      class="form-select"
                      v-model="selectedDepartamento"
                      :disabled="!departamentos.length"
                    >
                      <option value="" disabled>
                        {{ departamentos.length ? "Escolha um departamento" : "Nenhum departamento cadastrado" }}
                      </option>
                      <option v-for="departamento in departamentos" :key="departamento.id" :value="departamento">
                        {{ departamento.Nome }}
                      </option>
                    </select>
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
import { collection, getDocs, query, where } from "firebase/firestore";
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
      graphKey: 0,
      
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
      ],
      temas: [],
      selectedTema: "",
      votacoesCongregacao: [],
      aprovamTexto: [],
      apoiamDiscussao: [],
      nemAprovamApoiam: [],
      cidades: ["São Paulo", "Ribeirão Preto", "Piracicaba", "Bauru", "Lorena", "São Sebastião", "Santos"],
      unidades: [],
      totalUnidades: 0,
      departamentos: [],
      selectedCidade: "",
      selectedUnidade: null,
      selectedDepartamento: null,
    };
  },
  computed: {
    graphData() {
      return [this.aprovamTexto.length, this.apoiamDiscussao.length, this.nemAprovamApoiam.length];
    },
  },
  watch: {
    selectedTema() {
      this.updateTemaFilter();
      this.graphKey++; // Incrementa a chave para recriar o gráfico
    },
  },
  methods: {
    async fetchTotalUnidades() {
      try {
        const querySnapshot = await getDocs(collection(db, "Unidades"));
        this.totalUnidades = querySnapshot.size; // querySnapshot.size contém o número total de documentos
      } catch (error) {
        console.error("Erro ao buscar total de unidades:", error);
      }
    },
    async fetchTemas() {
      try {
        const querySnapshot = await getDocs(collection(db, "Temas"));
        this.temas = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Erro ao buscar temas:", error);
      }
    },
    async fetchVotacoes() {
      try {
        const querySnapshot = await getDocs(collection(db, "VotacoesCongregacao"));
        this.votacoesCongregacao = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Erro ao buscar votações de congregação:", error);
      }
    },
    async fetchUnidades() {
      if (!this.selectedCidade) {
        this.unidades = [];
        this.departamentos = [];
        return;
      }
      try {
        const unidadesQuery = query(
          collection(db, "Unidades"),
          where("Campus", "==", this.selectedCidade)
        );
        const querySnapshot = await getDocs(unidadesQuery);
        this.unidades = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.selectedUnidade = null;
        this.departamentos = [];
      } catch (error) {
        console.error("Erro ao buscar unidades:", error);
      }
    },
    async fetchDepartamentos() {
      if (!this.selectedUnidade) {
        this.departamentos = [];
        this.selectedDepartamento = null;
        return;
      }
      try {
        const departamentosQuery = query(
          collection(db, "Departamentos"),
          where("UnidadeID", "==", this.selectedUnidade.id)
        );
        const querySnapshot = await getDocs(departamentosQuery);
        this.departamentos = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.selectedDepartamento = null;
      } catch (error) {
        console.error("Erro ao buscar departamentos:", error);
      }
    },
    updateTemaFilter() {
      if (!this.selectedTema) {
        this.aprovamTexto = [];
        this.apoiamDiscussao = [];
        return;
      }

      // Filtra as votações com base no tema selecionado
      this.aprovamTexto = this.votacoesCongregacao.filter(
        (votacao) => votacao.temaID === this.selectedTema && votacao.Aprovado === "Sim"
      );

      this.apoiamDiscussao = this.votacoesCongregacao.filter(
        (votacao) =>
          votacao.temaID === this.selectedTema &&
          votacao.Aprovado === "Não" &&
          votacao.Apoio === "Sim"
      );

      this.nemAprovamApoiam = this.votacoesCongregacao.filter(
        (votacao) =>
          votacao.temaID === this.selectedTema &&
          votacao.Aprovado === "Não" &&
          votacao.Apoio === "Não"
      );
    },
    formatUnitDisplay(unit) {
      if (unit.Placar && unit.Placar.Favoraveis !== null) {
        return `${unit.unidadeID} - ${unit.Placar.Favoraveis} a favor, ${unit.Placar.Contrarios} contra, ${unit.Placar.Abstencoes} abstenções - ${unit.DataVotacao}`;
      } else if (unit.Unanimidade === "Sim") {
        return `${unit.unidadeID} (Unanimidade) - ${unit.DataVotacao}`;
      } else {
        return `${unit.unidadeID} - ${unit.DataVotacao}`;
      }
    },
    setActiveTabUnidades(tab) {
      this.activeTabUnidades = tab;
    },
  },
  mounted() {
    this.fetchTotalUnidades(); // Chame o método para buscar o total de unidades
    this.fetchTemas();
    this.fetchVotacoes();
  },
};
</script>


<style scoped>
.tab-content {
  margin-top: 1rem;
}
</style>
