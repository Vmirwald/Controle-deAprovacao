<template>
    <div class="generic-graph" :style="{ width: width, height: height }">
      <h5 class="graph-title">{{ title }}</h5>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from "chart.js";
  
  export default {
    name: "GenericGraph",
    props: {
      title: {
        type: String,
        default: "Gráfico",
      },
      labels: {
        type: Array,
        required: true,
      },
      data: {
        type: Array,
        required: true,
      },
      colors: {
        type: Array,
        default: () => ["#4caf50", "#2196f3", "#ffeb3b", "#f44336"],
      },
      width: {
        type: String,
        default: "100%",
      },
      height: {
        type: String,
        default: "300px",
      },
    },
    mounted() {
      Chart.register(...registerables);
  
      const chart = new Chart(this.$refs.chartCanvas, {
        type: "doughnut",
        data: {
          labels: this.labels,
          datasets: [
            {
              data: this.data,
              backgroundColor: this.colors,
            },
          ],
        },
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.raw || 0;
                  return `${label}: ${value}`;
                },
              },
            },
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              const label = this.labels[index];
              this.$emit("section-clicked", label); // Emitimos o evento com o rótulo clicado
            }
          },
        },
      });
    },
  };
  </script>
  
  <style scoped>
  .generic-graph {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    box-sizing: border-box;
  }
  
  .graph-title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: center;
  }
  </style>
  