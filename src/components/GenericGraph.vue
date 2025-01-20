<template>
  <div ref="chartContainer" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "ExpandableChart",
  props: {
    title: {
      type: String,
      default: "Meu Gráfico",
    },
    labels: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
      required: true,
    },
    colors: {
      type: Array,
      default: () => ["#4caf50", "#2196f3", "#FF0000", "#FFC222"],
    },
    unitName: {
      type: String,
      default: "Unidades",
    },
    singularUnitName: {
      type: String,
      default: "Unidade",
    },
    totalText: {
      type: String,
      default: "Total Geral", // Texto para exibir junto ao total
    },
  },
  data() {
    return {
      chartInstance: null,
    };
  },
  watch: {
    values: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    labels: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    formatText(value, isTotal = false) {
      if (isTotal) {
        return `${value} ${this.totalText}`;
      } else {
        const unit = value === 1 ? this.singularUnitName : this.unitName;
        return `${value} ${unit}`;
      }
    },
    drawChart() {
      const chartDom = this.$refs.chartContainer;
      this.chartInstance = echarts.init(chartDom);

      const totalValue = this.values.reduce((sum, value) => sum + value, 0);

      const option = {
        title: {
          text: this.title,
          left: "center",
          top: "5%",
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}: {d}%",
        },
        legend: {
          orient: "horizontal",
          left: "5%",
          bottom: "1%",
          textStyle: {
            fontSize: 14,
            color: "#333",
          },
          selectedMode: "multiple",
        },
        series: [
          {
            name: "Dados",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true, // Exibe os labels nas faixas
              position: "inside", // Posição externa às faixas (para dentro, use 'inside')
              formatter: "{c}", // Nome do segmento e valor absoluto
              fontSize: 12,
              fontWeight: "bold"
            },
            labelLine: {
              show: true, // Exibe as linhas conectando os labels às faixas
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "14",
                
              },
            },
            data: this.labels.map((label, index) => ({
              value: this.values[index],
              name: label,
              itemStyle: {
                color: this.colors[index % this.colors.length],
              },
            })),
          },
        ],
        graphic: {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: this.formatText(totalValue, true),
            fontSize: 16,
            fontWeight: "bold",
            fill: "#333",
          },
        },
      };

      this.chartInstance.setOption(option);
      this.addInteractivity();
    },
    updateChart() {
      if (!this.chartInstance) return;

      const totalValue = this.values.reduce((sum, value) => sum + value, 0);

      const updatedData = this.labels.map((label, index) => ({
        value: this.values[index],
        name: label,
        itemStyle: {
          color: this.colors[index % this.colors.length],
        },
      }));

      this.chartInstance.setOption({
        series: [
          {
            data: updatedData,
          },
        ],
        graphic: {
          style: {
            text: this.formatText(totalValue, true),
          },
        },
      });
    },
    addInteractivity() {
    const updateCenterText = () => {
      const selected = this.chartInstance.getOption().legend[0].selected;
      const filteredValues = this.values.filter(
        (_, index) => selected[this.labels[index]]
      );
      const totalSelected = filteredValues.reduce((sum, value) => sum + value, 0);

      this.chartInstance.setOption({
        graphic: {
          style: {
            text: this.formatText(totalSelected, filteredValues.length === this.values.length),
          },
        },
      });
    };

    // Atualiza o texto ao passar o mouse sobre um segmento
    this.chartInstance.on("mouseover", (params) => {
      if (params.seriesType === "pie") {
        const absoluteValue = params.data.value;
        this.chartInstance.setOption({
          graphic: {
            style: {
              text: this.formatText(absoluteValue), // Exibe o valor absoluto
            },
          },
        });
      }
    });

    // Restaura o total quando o mouse sai do gráfico
    this.chartInstance.on("mouseout", () => {
      const totalValue = this.values.reduce((sum, value) => sum + value, 0);
      this.chartInstance.setOption({
        graphic: {
          style: {
            text: this.formatText(totalValue, true), // Restaura o total
          },
        },
      });
    });

    // Atualiza o texto central ao interagir com a legenda
    this.chartInstance.on("legendselectchanged", updateCenterText);

    // Redimensiona o gráfico ao alterar o tamanho da janela
    window.addEventListener("resize", () => {
      this.chartInstance.resize();
    });
  },
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.dispose();
    }
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
