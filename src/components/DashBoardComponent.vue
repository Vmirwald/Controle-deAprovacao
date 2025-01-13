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
                        {{ graphDataCongregacao[0] }}
                      </div>
                      <div class="row">
                        {{ graphDataCongregacao[1] }}
                      </div>
                      <div class="row">
                        {{ totalUnidades }}
                      </div>                     
                    </div>
                    <div class="col-md-4 mb-3">
                      
                      <GenericGraph
                        :key="graphKeyCongregacao"
                        :title="'Distribuição de Apoio nas Unidades'"
                        :labels="['Aprovaram Texto', 'Apoiam Discussão', 'Não Aprovam ou Apoiam']"
                        :data="graphDataCongregacao"
                        :colors="['#4caf50', '#2196f3', '#FF0000']"
                        :selectedLabel="activeTabUnidades"
                        @section-clicked="setActiveTabUnidades"
                      />
                    </div>

                    <div class="col-md-2 mb-3">
                      <div class="row">
                        {{ graphDataDepartamentos[0] }}
                      </div>
                      <div class="row">
                        {{ graphDataDepartamentos[1] }}
                      </div>
                      <div class="row">
                        {{ totalDepartamentos }}
                      </div>                     
                    </div>
                    <div class="col-md-4 mb-3">
                      
                      <GenericGraph
                        :key="graphKeyDepartamentos"
                        :title="'Distribuição de Apoio nas Unidades'"
                        :labels="['Aprovaram Texto', 'Apoiam Discussão', 'Não Aprovam ou Apoiam']"
                        :data="graphDataDepartamentos"
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
      graphKeyCongregacao: 1,
      graphKeyDepartamentos: 2,
      activeTabUnidades: "Aprovaram Texto",
      navbarItems: [
        { id: "Aprovaram Texto", label: "Aprovaram Texto", icon: "fas fa-check-circle", disabled: false },
        { id: "Apoiam Discussão", label: "Apoiam Discussão", icon: "fas fa-comments", disabled: false },
      ],
      temas: [],
      selectedTema: "",
      votacoesCongregacao: [],
      votacoesDepartamentos: [],
      graphDataCongregacao: [0, 0, 0],
      graphDataDepartamentos: [0, 0, 0],
      totalUnidades: 0,
      totalDepartamentos: 0,
      cidades: ["São Paulo", "Ribeirão Preto", "Piracicaba", "Bauru", "Lorena", "São Sebastião", "Santos"],
      unidades: [],
      departamentos: [],
      selectedCidade: "",
      selectedUnidade: null,
      selectedDepartamento: null,
      aprovamTexto: [],
      apoiamDiscussao: [],
      nemAprovamApoiam: [],
    };
  },
  computed: {
    graphData() {
      return [this.aprovamTexto.length, this.apoiamDiscussao.length, this.nemAprovamApoiam.length];
    },
  },
  watch: {
    selectedTema() {
      this.updateAllStats();
      this.graphKeyCongregacao++;
      this.graphKeyDepartamentos++;
    },
  },
  methods: {
    async fetchTotalUnidades() {
      try {
        const querySnapshot = await getDocs(collection(db, "Unidades"));
        this.totalUnidades = querySnapshot.size;
      } catch (error) {
        console.error("Erro ao buscar total de unidades:", error);
      }
    },
    async fetchTotalDepartamentos() {
      try {
        const querySnapshot = await getDocs(collection(db, "Departamentos"));
        this.totalDepartamentos = querySnapshot.size;
      } catch (error) {
        console.error("Erro ao buscar total de unidades:", error);
      }
    },
    async fetchTemas() {
      try {
        const querySnapshot = await getDocs(collection(db, "Temas"));
        this.temas = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Erro ao buscar temas:", error);
      }
    },
    async fetchVotacoes() {
      try {
        const congregacaoSnapshot = await getDocs(collection(db, "VotacoesCongregacao"));
        this.votacoesCongregacao = congregacaoSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const departamentosSnapshot = await getDocs(collection(db, "VotacoesDepartamentos"));
        this.votacoesDepartamentos = departamentosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("Erro ao buscar votações:", error);
      }
    },
    async fetchUnidades() {
      if (!this.selectedCidade) {
        this.unidades = [];
        this.departamentos = [];
        return;
      }
      try {
        const unidadesQuery = query(collection(db, "Unidades"), where("Campus", "==", this.selectedCidade));
        const querySnapshot = await getDocs(unidadesQuery);
        this.unidades = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
        const departamentosQuery = query(collection(db, "Departamentos"), where("UnidadeID", "==", this.selectedUnidade.id));
        const querySnapshot = await getDocs(departamentosQuery);
        this.departamentos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        this.selectedDepartamento = null;
      } catch (error) {
        console.error("Erro ao buscar departamentos:", error);
      }
    },
    calculateStats(base) {
      if (!this.selectedTema || !base.length) return [0, 0, 0];
      const aprovam = base.filter((votacao) => votacao.temaID === this.selectedTema && votacao.Aprovado === "Sim").length;
      const apoiam = base.filter((votacao) => votacao.temaID === this.selectedTema && votacao.Aprovado === "Não" && votacao.Apoio === "Sim").length;
      const naoAprovam = base.filter((votacao) => votacao.temaID === this.selectedTema && votacao.Aprovado === "Não" && votacao.Apoio === "Não").length;
      return [aprovam, apoiam, naoAprovam];
    },
    updateAllStats() {
      this.graphDataCongregacao = this.calculateStats(this.votacoesCongregacao);
      this.graphDataDepartamentos = this.calculateStats(this.votacoesDepartamentos);
      this.aprovamTexto = this.graphDataCongregacao[0];
      this.apoiamDiscussao = this.graphDataCongregacao[1];
      this.nemAprovamApoiam = this.graphDataCongregacao[2];
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
  async mounted() {
    await this.fetchTotalUnidades();
    await this.fetchTotalDepartamentos();
    await this.fetchTemas();
    await this.fetchVotacoes();
    this.updateAllStats();
  },
};
</script>


<style scoped>
.tab-content {
  margin-top: 1rem;
}
</style>
