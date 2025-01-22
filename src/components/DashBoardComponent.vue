<template>
  <div class="container-fluid layout-view py-1">
    <GenericCard :showNewButton="false">
      <template #title>
        <div class="title-container">
          <!-- Dropdown de Temas -->
          <div class="dropdown-container">
            <select
              id="tema-dropdown"
              class="form-select"
              v-model="selectedTema"
            >
              <option v-for="(tema, index) in temas" :key="index" :value="tema.id">
                {{ tema.Titulo }}
              </option>
            </select>
          </div>

          <!-- Botão de Logout -->
          <button
            v-if="isAuthenticated"
            class="logout-button"
            @click="handleLogout"
          >
            Sair
          </button>
        </div>
      </template>

      <template #content>
        <div class="row">
          <div class="col-md-12" v-if="selectedTema">
            <div class="row gx-3">
              <!-- Card Unidades -->
              <div class="col-md-6">
                <GenericCard :showNewButton="false">
                  <template #title>
                    <div class="mb-3">
                      <div class="d-flex flex-wrap gap-2">
                        <button
                          v-for="(campus, index) in CampusDropdown"
                          :key="index"
                          :class="['btn', 'btn-outline-primary', { 'active btn-primary': selectedCampus.includes(campus.Campus) }]"
                          @click="toggleCampusSelection(campus.Campus)"
                        >
                          {{ campus.Campus }}
                        </button>
                      </div>
                    </div>
                  </template>

                  <template #content>
                    
                    <div class="row">
                      <div class="col-md-12">
                        <div class="row">
                          <div class="col-md-6">
                            <GenericGraph
                              v-if="graphDataCongregacao.length"
                              :key="graphKeyCongregacao"
                              :title="'Tramitação nas Unidades'"
                              :labels="['Aprovaram Texto', 'Não Aprovaram', 'Faltam Posicionar']"
                              :values="[graphDataFormatted[0][0], graphDataFormatted[0][3], graphDataFormatted[0][2]]"
                              :colors="['#4caf50', '#FF0000', '#FFC222']"
                              :unitName="'Unidades'"
                              :singularUnitName="'Unidade'"
                              :totalText="'Unidades'"
                            />


                          </div>
                          <div class="col-md-6">
                            <GenericGraph
                              v-if="graphDataCongregacao.length"
                              :key="graphKeyCongregacao"
                              :title="'Aprovação nas Unidades'"
                              :labels="['Aprovaram Texto', 'Apoiam', ]"
                              :values="[graphDataFormatted[0][0], graphDataFormatted[0][1]]"
                              :colors="['#4caf50', '#256A99']"
                              :unitName="'Unidades'"
                              :singularUnitName="'Unidade'"
                              :totalText="'Unidades'"
                            />


                          </div>
                        </div>
                        <div class="row">
                          <GenericTable2
                          :headers="tableHeadersUnidades"
                          :rows="tableRowsUnidades"
                          :description-key="'Comentários'"
                          />
                        </div>
                      </div>
                    </div>
                  </template>
                </GenericCard>
              </div>

              <!-- Card Departamentos -->
              <div class="col-md-6">
                <GenericCard :showNewButton="false">
                  <template #title>
                    <div class="mb-3 dropdown">
                      <button
                        class="btn btn-primary dropdown-toggle"
                        type="button"
                        id="dropdownUnidadeButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {{ selectedUnidade === "Todas" ? "Selecione a Unidade" : selectedUnidade }}
                      </button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownUnidadeButton">
                        <li>
                          <button
                            v-for="sigla in uniqueUnidadeSiglas"
                            :key="sigla"
                            class="dropdown-item"
                            @click="selectUnidade(sigla)"
                          >
                            {{ sigla }}
                          </button>
                        </li>
                      </ul>
                    </div>
                  </template>

                  <template #content>
                    <div v-if="tableRowsDepartamentos.length">
                      
                      <div class="row">
                        <div class="col-md-12">
                          <div class="row">
                            <div class="col-md-6">
                              <GenericGraph
                                v-if="graphDataDepartamentos.length"
                                :key="graphKeyDepartamentos"
                                :title="'Tramitação nos Departamentos'"
                                :labels="['Aprovaram Texto', 'Faltam Posicionar', 'Não Aprovaram ']"
                                :values="[graphDataFormatted[1][0], graphDataFormatted[1][2], graphDataFormatted[1][3]]"
                                :colors="['#4caf50', '#FFC222', '#FF0000']"
                                :unitName="'Departamentos'"
                                :singularUnitName="'Departamento'"
                                :totalText="'Departamentos'"
                              />
                            </div>
                            <div class="col-md-6">
                              <GenericGraph
                                v-if="graphDataDepartamentos.length"
                                :key="graphKeyDepartamentos"
                                :title="'Aprovação nos Departamentos'"
                                :labels="['Aprovaram Texto', 'Apoiam',]"
                                :values="[graphDataFormatted[1][0], graphDataFormatted[1][1]]"
                                :colors="['#4caf50', '#256A99']"
                                :unitName="'Departamentos'"
                                :singularUnitName="'Departamento'"
                                :totalText="'Departamentos'"
                              />
                            </div>
                          </div>

                          <GenericTable2
                            :headers="tableHeadersDepartamentos"
                            :rows="tableRowsDepartamentos"
                            :description-key="'Comentários'"
                          />
                        </div>
                      </div>
                    </div>
                    <p v-else class="text-center text-muted">Nenhum dado disponível para Departamentos.</p>
                  </template>
                </GenericCard>
              </div>
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
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/service/firebase";

export default {
  name: "DashBoardComponent",
  components: {
    GenericCard,
    GenericGraph,
    GenericTable2,
  },
  data() {
    return {
      graphKeyCongregacao: 1,
      graphKeyDepartamentos: 2,
      temas: [],
      CampusDropdown: [],
      selectedCampus: [],
      allCampi: [],
      selectedUnidade: "Todas",
      uniqueUnidadeSiglas: [],
      selectedTema: "",
      votacoesCongregacao: [],
      votacoesDepartamentos: [],
      graphDataCongregacao: [0, 0, 0],
      graphDataDepartamentos: [0 , 0, 0],
      totalUnidades: 0,
      totalDepartamentos: 0,
      unidades: [],
      tableHeadersUnidades: [
        { text: "Sigla", value: "Sigla", filterable: true },
        { text: "Aprovado", value: "Aprovado", filterable: false },
        { text: "Favoráveis", value: "Favoráveis", filterable: false },
        {text: "Contrários", value: "Contrários", filterable: false},
        { text: "Abstenções", value: "Abstenções", filterable: false},
      ],
      tableHeadersDepartamentos: [
        
        { text: "Nome", value: "Nome", filterable: true },
        { text: "Aprovado", value: "Aprovado", filterable: false },
        { text: "Favoráveis", value: "Favoráveis", filterable: false },
        { text: "Contrários", value: "Contrários", filterable: false },
        { text: "Abstenções", value: "Abstenções", filterable: false },
      ],
      Comentarios: 'Comentários',
      tableRowsUnidades: [], // Colunas adicionais para departamentos
      tableRowsDepartamentos: [],
    };
  },
  computed: {
    hasData() {
      return (dataset) => dataset && dataset.length > 0;
    },
    graphDataFormatted() {
      const totalUnidadesNoCampus = this.unidades.filter((u) => this.selectedCampus.includes(u.Campus)).length;

      const totalDepartamentosNaUnidade = this.selectedUnidade === "Todas"
        ? this.departamentos.length
        : this.departamentos.filter((d) => d.UnidadeID === this.selectedUnidade).length;

      // Garantir que `this.graphDataCongregacao` e `this.graphDataDepartamentos` tenham valores válidos
      const dataCongregacao = [
        this.graphDataCongregacao[0] || 0,
        this.graphDataCongregacao[1] || 0,
        totalUnidadesNoCampus - (this.graphDataCongregacao[0] || 0)  - (this.graphDataCongregacao[2] || 0),
        this.graphDataCongregacao[2] || 0,
        this.totalUnidades
      ];

      const dataDepartamentos = [
        this.graphDataDepartamentos[0] || 0,
        this.graphDataDepartamentos[1] || 0,
        totalDepartamentosNaUnidade - (this.graphDataDepartamentos[0] || 0)  - (this.graphDataDepartamentos[2] || 0),
        this.graphDataDepartamentos[2] || 0,
      ];

      return [dataCongregacao, dataDepartamentos];
    },
  },
  watch: {
    selectedCampus: {
      handler(newSelection) {
        if (newSelection.length === 0 && this.selectedCampus.length !== this.allCampi.length) {
          this.selectedCampus = [...this.allCampi];
        }
        this.filterTableRowsByCampus(newSelection);
        this.calculateGraphDataCongregacao();
      },
      immediate: true,
      deep: true,
    },
    selectedUnidade: {
      handler(newSelection) {
        if (newSelection === "Todas") {
          this.filterTableRowsByUnidade("Todas");
        } else if (newSelection && this.uniqueUnidadeSiglas.includes(newSelection)) {
          this.filterTableRowsByUnidade(newSelection);
          this.calculateGraphDataDepartamentos();
        }
      },
      immediate: true,
    },
    selectedTema: {
      handler(newTema) {
        if (newTema) {
          this.loadDashboardData();
        }
      },
      immediate: true,
    },
  },
  methods: {
    selectUnidade(sigla) {
      this.selectedUnidade = sigla;
    },
    toggleCampusSelection(campus) {
      if (this.selectedCampus.includes(campus)) {
        this.selectedCampus = this.selectedCampus.filter((c) => c !== campus);
      } else {
        this.selectedCampus.push(campus);
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
    async loadDashboardData() {
      try {
        await this.fetchVotacoes();
        this.calculateGraphDataCongregacao();
        this.calculateGraphDataDepartamentos();
        this.populateTables();
        this.populateDepartamentosTable();
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      }
    },
    async fetchVotacoes() {
      try {
        const congregacaoSnapshot = await getDocs(
          query(collection(db, "VotacoesCongregacao"), where("temaID", "==", this.selectedTema))
        );
        this.votacoesCongregacao = congregacaoSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const departamentosSnapshot = await getDocs(
          query(collection(db, "VotacoesDepartamentos"), where("temaID", "==", this.selectedTema))
        );
        this.votacoesDepartamentos = departamentosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const unidadesSnapshot = await getDocs(collection(db, "Unidades"));
        this.unidades = unidadesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Erro ao buscar votações ou unidades:", error);
      }
    },
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
    calculateGraphDataCongregacao() {
      // Dados para Congregação
      const aprovamCongregacao = this.tableRowsUnidades.filter((row) => row.Aprovado === "Sim").length;
      const apoiamCongregacao = this.tableRowsUnidades.filter((row) => row.Aprovado === "Não" && row.Comentários.trim() !== "").length;
      const naoAprovamCongregacao = this.tableRowsUnidades.filter((row) => row.Aprovado === "Não").length // && row.Comentários.trim() === "").length;
      
      this.graphDataCongregacao = [
        aprovamCongregacao,
        apoiamCongregacao,
        naoAprovamCongregacao,
        this.tableRowsUnidades.length - aprovamCongregacao - apoiamCongregacao - naoAprovamCongregacao, // Restantes
      ];

      // Incrementa as chaves dos gráficos
      this.graphKeyCongregacao++;
    },

    calculateGraphDataDepartamentos(){
      // Dados para Departamentos
      const aprovamDepartamentos = this.tableRowsDepartamentos.filter((row) => row.Aprovado === "Sim").length;
      const apoiamDepartamentos = this.tableRowsDepartamentos.filter((row)=>row.Aprovado === "Não" && row.Comentários.trim() !== "").length;
      const naoAprovamDepartamentos = this.tableRowsDepartamentos.filter((row) => row.Aprovado === "Não").length// && row.Comentários.trim() === "").length;

      this.graphDataDepartamentos = [
        aprovamDepartamentos,
        apoiamDepartamentos,
        naoAprovamDepartamentos,
        this.tableRowsDepartamentos.length - aprovamDepartamentos - apoiamDepartamentos, - naoAprovamDepartamentos, // Restantes
      ];

      this.graphKeyDepartamentos++;
    },
    populateTables() {
      const seenCampi = new Set();
      this.CampusDropdown = this.votacoesCongregacao
        .map((votacao) => {
          const unidade = this.unidades.find((u) => u.id === votacao.unidadeID);
          return unidade ? unidade.Campus : null;
        })
        .filter((campus) => {
          if (campus && !seenCampi.has(campus)) {
            seenCampi.add(campus);
            return true;
          }
          return false;
        })
        .map((campus) => ({ Campus: campus }));

      this.allCampi = this.CampusDropdown.map((campus) => campus.Campus);
      this.selectedCampus = [...this.allCampi];
      this.filterTableRowsByCampus(this.selectedCampus);

      // Atualiza os dados do gráfico
      this.calculateGraphDataCongregacao();
    },

    filterTableRowsByCampus(selectedCampus) {
      this.tableRowsUnidades = this.votacoesCongregacao
        .map((votacao) => {
          const unidade = this.unidades.find((u) => u.id === votacao.unidadeID);
          return {
            Campus: unidade ? unidade.Campus : "N/A",
            Sigla: unidade ? unidade.Sigla : "N/A",
            Aprovado: votacao.Aprovado || "N/A",
            Apoio: votacao.Apoio || "N/A",
            Favoráveis: votacao.Placar?.Favoraveis || 0,
            Contrários: votacao.Placar?.Contrarios || 0,
            Abstenções: votacao.Placar?.Abstencoes || 0,
            Comentários: votacao.Comentarios || "",
          };
        })
        .filter((row) => selectedCampus.includes(row.Campus))
        .map((row) => ({
          Sigla: row.Sigla,
          Aprovado: row.Aprovado,
          Favoráveis: row.Favoráveis,
          Contrários: row.Contrários,
          Abstenções: row.Abstenções,
          Comentários: row.Comentários,
        }));

      // Atualiza os dados do gráfico
      this.calculateGraphDataCongregacao();
    },

    populateDepartamentosTable() {
      const uniqueUnidadeSiglas = new Set();

      this.tableRowsDepartamentos = this.votacoesDepartamentos.map((votacao) => {
        const departamento = this.departamentos.find((d) => d.id === votacao.dptID);
        const unidade = this.unidades.find((u) => u.id === departamento?.UnidadeID);

        if (unidade && unidade.Sigla) {
          uniqueUnidadeSiglas.add(unidade.Sigla);
        }

        return {
          Nome: departamento ? departamento.Nome : "N/A",
          Aprovado: votacao.Aprovado || "N/A",
          Favoráveis: votacao.Placar?.Favoraveis || 0,
          Contrários: votacao.Placar?.Contrarios || 0,
          Abstenções: votacao.Placar?.Abstencoes || 0,
          Comentários: votacao.Comentarios || "",
        };
      });

      this.uniqueUnidadeSiglas = ["Todas", ...Array.from(uniqueUnidadeSiglas)];
      if (!this.selectedUnidade || !this.uniqueUnidadeSiglas.includes(this.selectedUnidade)) {
        this.selectedUnidade = "Todas";
      }

      // Atualiza os dados do gráfico
      this.calculateGraphDataDepartamentos();
    },

    filterTableRowsByUnidade(selectedUnidade) {
      if (selectedUnidade === "Todas") {
        this.tableRowsDepartamentos = this.votacoesDepartamentos.map((votacao) => {
          const departamento = this.departamentos.find((d) => d.id === votacao.dptID);
          return {
            Nome: departamento ? departamento.Nome : "N/A",
            Sigla: departamento ? departamento.UnidadeID : "N/A",
            Aprovado: votacao.Aprovado || "N/A",
            Favoráveis: votacao.Placar?.Favoraveis || 0,
            Contrários: votacao.Placar?.Contrarios || 0,
            Abstenções: votacao.Placar?.Abstencoes || 0,
            Comentários: votacao.Comentarios || "",
          };
        });
      } else {
        this.tableRowsDepartamentos = this.votacoesDepartamentos
          .map((votacao) => {
            const departamento = this.departamentos.find((d) => d.id === votacao.dptID);
            return {
              Nome: departamento ? departamento.Nome : "N/A",
              Sigla: departamento ? departamento.UnidadeID : "N/A",
              Aprovado: votacao.Aprovado || "N/A",
              Favoráveis: votacao.Placar?.Favoraveis || 0,
              Contrários: votacao.Placar?.Contrarios || 0,
              Abstenções: votacao.Placar?.Abstencoes || 0,
              Comentários: votacao.Comentarios || "",
            };
          })
          .filter((row) => row.Sigla === selectedUnidade);
      }

      this.tableRowsDepartamentos = this.tableRowsDepartamentos.map((row) => ({
        Nome: row.Nome,
        Aprovado: row.Aprovado,
        Favoráveis: row.Favoráveis,
        Contrários: row.Contrários,
        Abstenções: row.Abstenções,
        Comentários: row.Comentários,
      }));

      // Atualiza os dados do gráfico
      this.calculateGraphDataDepartamentos();
    },
    async fetchDepartamentosData() {
      try {
        const departamentosSnapshot = await getDocs(collection(db, "Departamentos"));
        this.departamentos = departamentosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const unidadesSnapshot = await getDocs(collection(db, "Unidades"));
        this.unidades = unidadesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const votacoesSnapshot = await getDocs(collection(db, "VotacoesDepartamentos"));
        this.votacoesDepartamentos = votacoesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Preenche a tabela
        this.populateDepartamentosTable();
      } catch (error) {
        console.error("Erro ao buscar dados dos departamentos:", error);
      }
    },
  },
  async mounted() {
    
    await this.fetchTemas();
    await this.fetchTotalUnidades();
    await this.fetchTotalDepartamentos();
    await this.fetchDepartamentosData();
    await this.fetchVotacoes();
    this.filterTableRowsByCampus(this.selectedCampus);
    if (this.temas.length > 0) {
      this.selectedTema = this.temas[0].id;
    };
    


  },
};
</script>
<script setup>
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, onMounted } from 'vue';

const auth = getAuth();
const isAuthenticated = ref(false); // Estado de autenticação

// Verificar se o usuário está autenticado
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user; // Atualiza o estado com base no usuário logado
  });
});

// Método para deslogar
function handleLogout() {
  signOut(auth)
    .then(() => {
      alert('Você saiu com sucesso!');
      window.location.href = '#/login'; // Redireciona para a tela de login
    })
    .catch((error) => {
      console.error('Erro ao sair:', error.message);
    });
}
</script>

<style scoped>
.layout-view {
  height: 100vh; /* Altura total da viewport menos um espaço reservado */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Evita scroll na página */
}


.col-md-6 {
  flex: 1; /* Cada coluna ocupa metade da largura da linha */
  max-height: 100%; /* Impede o crescimento excessivo em altura */
  display: flex;
  flex-direction: column;
}

.generic-card {
  flex: 1; /* Faz o card ocupar todo o espaço disponível */
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Remove scroll interno */
  
}

.card-header,
.card-footer {
  flex-shrink: 0; /* Impede que o header e footer encolham */
  padding: 0.5rem;
}

.card-body {
  height: 100%;
  flex-grow: 1; /* Permite que o conteúdo cresça */
  overflow-y: auto; /* Habilita scroll interno caso necessário */
}

.tab-content {
  margin-top: 1rem;
}

/* Container para o título */
.title-container {
  display: flex;
  align-items: center;
  justify-content: space-between; /* Garante o espaçamento entre os itens */
  width: 100%;
}

/* Estilo para o dropdown */
.dropdown-container {
  flex: 1; /* Ocupará o espaço restante */
  margin-right: 1rem; /* Espaço entre o dropdown e o botão */
}

#tema-dropdown {
  width: 100%;
}

/* Botão de Logout */
.logout-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: var(--color-danger, #dc3545);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.logout-button:hover {
  background-color: var(--color-danger-dark, #c82333);
}

</style>
