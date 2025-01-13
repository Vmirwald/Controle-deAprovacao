<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  Chart.register(...registerables);
  
  export default {
    props: {
      title: {
        type: String,
        default: "",
      },
      labels: {
        type: Array,
        required: true,
        validator(value) {
          return value.every((label) => typeof label === "string");
        },
      },
      data: {
        type: Array,
        required: true,
        validator(value) {
          return value.every((num) => typeof num === "number" && num >= 0);
        },
      },
      colors: {
        type: Array,
        required: true,
        validator(value) {
          return value.every((color) => typeof color === "string");
        },
      },
      width: {
        type: String,
        default: "100%",
      },
      height: {
        type: String,
        default: "400px",
      },
    },
    data() {
      return {
        selectedIndex: null, // Index da seção selecionada
      };
    },
    mounted() {
      this.createChart();
    },
    methods: {
      createChart() {
        const ctx = this.$refs.chartCanvas.getContext("2d");
  
        this.chart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: this.labels,
            datasets: [
              {
                data: this.data,
                backgroundColor: this.colors,
                hoverOffset: 15,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: {
                enabled: true,
              },
            },
            onHover: (event, elements) => {
              if (elements.length) {
                const chartElement = elements[0];
                const dataset = this.chart.data.datasets[chartElement.datasetIndex];
                dataset.hoverOffset = 20;
                this.chart.update();
              }
            },
            onLeave: () => {
              this.chart.data.datasets.forEach((dataset, index) => {
                dataset.hoverOffset = this.selectedIndex === index ? 20 : 15; // Destaca o selecionado
              });
              this.chart.update();
            },
            onClick: (event, elements) => {
              if (elements.length) {
                const chartElement = elements[0];
                const index = chartElement.index;
  
                // Define o índice selecionado
                this.selectedIndex = index;
  
                // Atualiza os offsets para manter o selecionado expandido
                this.chart.data.datasets.forEach((dataset, idx) => {
                  dataset.hoverOffset = idx === this.selectedIndex ? 20 : 15;
                });
  
                this.chart.update();
  
                // Emite o evento para o componente pai
                const label = this.labels[index];
                this.$emit("section-clicked", label);
              }
            },
          },
        });
      },
    },
    beforeUnmount() {
      if (this.chart) {
        this.chart.destroy();
      }
    },
  };
  </script>
  
  <style scoped>
  canvas {
    display: block;
    margin: 0 auto;
  }
  </style>
  