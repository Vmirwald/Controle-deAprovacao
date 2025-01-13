<template>
  <div class="container-fluid layout-view py-3">
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

          <div class="col-md-12" v-if="selectedTema">
            <div class="row gx-3">
              <!-- Card Unidades -->
              <div class="col-md-6">
                <GenericCard :title="'Unidades'" :showNewButton="false">
                  <template #content>
                    <div class="row text-center mb-3">
                      <div class="col-3">
                        <h6>Aprovados</h6>
                        <p>{{ graphDataCongregacao[0] }}</p>
                      </div>
                      <div class="col-3">
                        <h6>Apoios</h6>
                        <p>{{ graphDataCongregacao[1] }}</p>
                      </div>
                      <div class="col-3">
                        <h6>Rejeições</h6>
                        <p>{{ graphDataCongregacao[2] }}</p>
                      </div>
                      <div class="col-3">
                        <h6>Total Unidades</h6>
                        <p>{{ totalUnidades }}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <GenericGraph
                          v-if="graphDataCongregacao.length"
                          :key="graphKeyCongregacao"
                          :title="'Distribuição de Apoio nas Unidades'"
                          :labels="['Aprovaram Texto', 'Apoiam Discussão', 'Não Aprovam ou Apoiam']"
                          :data="graphDataCongregacao.slice()"
                          :colors="['#4caf50', '#2196f3', '#FF0000']"
                        />
                        <GenericTable2
                          :headers="tableHeadersUnidades"
                          :rows="tableRowsUnidades"
                          :description-key="'Comentários'"
                        />
                      </div>
                    </div>
                  </template>
                </GenericCard>
              </div>

              <!-- Card Departamentos -->
              <div class="col-md-6">
                <GenericCard :title="'Departamentos'" :showNewButton="false">
                  <template #content>
                    <div v-if="tableRowsDepartamentos.length">
                      <div class="row text-center mb-3">
                        <div class="col-3">
                          <h6>Aprovados</h6>
                          <p>{{ graphDataDepartamentos[0] }}</p>
                        </div>
                        <div class="col-3">
                          <h6>Apoios</h6>
                          <p>{{ graphDataDepartamentos[1] }}</p>
                        </div>
                        <div class="col-3">
                          <h6>Rejeições</h6>
                          <p>{{ graphDataDepartamentos[2] }}</p>
                        </div>
                        <div class="col-3">
                          <h6>Total Departamentos</h6>
                          <p>{{ totalDepartamentos }}</p>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-12">
                          <GenericGraph
                            v-if="graphDataDepartamentos.length"
                            :key="graphKeyDepartamentos"
                            :title="'Distribuição de Apoio nos Departamentos'"
                            :labels="['Aprovaram Texto', 'Apoiam Discussão', 'Não Aprovam ou Apoiam']"
                            :data="graphDataDepartamentos.slice()"
                            :colors="['#4caf50', '#2196f3', '#FF0000']"
                          />

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
      selectedTema: "",
      votacoesCongregacao: [],
      votacoesDepartamentos: [],
      graphDataCongregacao: [0, 0, 0],
      graphDataDepartamentos: [0 , 0, 0],
      totalUnidades: 0,
      totalDepartamentos: 0,
      unidades: [],
      tableHeadersUnidades: [
        { text: "Campus", value: "Campus", filterable: true },
        { text: "Sigla", value: "Sigla", filterable: true },
        { text: "Unanimidade", value: "Unanimidade", filterable: true },
        { text: "Aprovado", value: "Aprovado", filterable: true },
        { text: "Apoio", value: "Apoio", filterable: true },
        { text: "Favoráveis", value: "Favoráveis", filterable: true },
        {text: "Contrários", value: "Contrários", filterable: true},
        { text: "Abstenções", value: "Abstenções", filterable: true },
      ],
      tableHeadersDepartamentos: [
        { text: "Campus", value: "Campus", filterable: true },
        { text: "Sigla", value: "Sigla", filterable: true },
        { text: "Nome", value: "Nome", filterable: true },
        { text: "Unanimidade", value: "Unanimidade", filterable: true },
        { text: "Aprovado", value: "Aprovado", filterable: true },
        { text: "Apoio", value: "Apoio", filterable: true },
        { text: "Favoráveis", value: "Favoráveis", filterable: true },
        { text: "Contrários", value: "Contrários", filterable: true },
        { text: "Abstenções", value: "Abstenções", filterable: true },
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
  },
  watch: {
    selectedTema(newTema) {
      if (newTema) {
        this.loadDashboardData();
      }
    },
  },
  methods: {
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
        this.calculateGraphData();
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
    calculateGraphData() {
      const aprovam = this.votacoesCongregacao.filter((votacao) => votacao.Aprovado === "Sim").length;
      const apoiam = this.votacoesCongregacao.filter((votacao) => votacao.Apoio === "Sim" && votacao.Aprovado === "Não").length;
      const naoAprovam = this.votacoesCongregacao.filter((votacao) => votacao.Apoio === "Não" && votacao.Aprovado === "Não").length;

      // Atualiza os dados e força reatividade
      this.graphDataCongregacao = [aprovam, apoiam, naoAprovam];
      this.graphKeyCongregacao++; // Incrementa a chave

      const deptAprovam = this.votacoesDepartamentos.filter((votacao) => votacao.Aprovado === "Sim").length;
      const deptApoiam = this.votacoesDepartamentos.filter((votacao) => votacao.Apoio === "Sim" && votacao.Aprovado === "Não").length;
      const deptNaoAprovam = this.votacoesDepartamentos.filter((votacao) => votacao.Apoio === "Não" && votacao.Aprovado === "Não").length;

      this.graphDataDepartamentos = [deptAprovam, deptApoiam, deptNaoAprovam];
      this.graphKeyDepartamentos++; // Incrementa a chave

      console.log("Dados convertidos para gráfico de congregação:", this.graphDataCongregacao);
      console.log("Dados convertidos para gráfico de departamentos:", this.graphDataDepartamentos);
    },
    populateTables() {
      this.tableRowsUnidades = this.votacoesCongregacao.map((votacao) => {
        const unidade = this.unidades.find((u) => u.id === votacao.unidadeID);
        return {
          Campus: unidade ? unidade.Campus : "N/A",
          Sigla: unidade ? unidade.Sigla : "N/A",
          Unanimidade: votacao.Unanimidade || "N/A",
          Aprovado: votacao.Aprovado || "N/A",
          Apoio: votacao.Apoio || "N/A",
          Favoráveis: votacao.Placar?.Favoraveis || 0,
          Contrários: votacao.Placar?.Contrarios || 0,
          Abstenções: votacao.Placar?.Abstencoes || 0,
          Comentários: votacao.Comentarios || ""
        };
      });
    },
    populateDepartamentosTable() {
      // Realiza o merge entre as tabelas
      this.tableRowsDepartamentos = this.votacoesDepartamentos.map((votacao) => {
        const departamento = this.departamentos.find((d) => d.id === votacao.dptID);
        const unidade = this.unidades.find((u) => u.id === departamento?.UnidadeID);
        console.log(this.departamentos.id)
        return {
          Campus: unidade ? unidade.Campus : "N/A",
          Nome: departamento ? departamento.Nome : "N/A",
          Sigla: unidade ? unidade.Sigla : "N/A",
          Unanimidade: votacao.Unanimidade || "N/A",
          Aprovado: votacao.Aprovado || "N/A",
          Apoio: votacao.Apoio || "N/A",
          Favoráveis: votacao.Placar?.Favoraveis || 0,
          Contrários: votacao.Placar?.Contrarios || 0,
          Abstenções: votacao.Placar?.Abstencoes || 0,
          Comentários: votacao.Comentarios || "",
        };
      });
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
  },
};
</script>

<style scoped>
.tab-content {
  margin-top: 1rem;
}
</style>
