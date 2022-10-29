<!-- https://vue-chartjs.org/guide/#creating-your-first-chart -->
<template>
  <main>
    <div>
      <Bar v-if="loaded" :chart-options="chartOptions" :chart-data="chartData" />
    </div>
  </main>
</template>
  
<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartData: {
      type: Object,
      required: true
    },
    loaded: {
      type: Boolean
    }
  },
  data() {
    return {
      chartOptions: {
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: 'Events of past two months attendee count'
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
            }
          },
          y: {
            ticks: {
              beginAtZero: true,
              // https://stackoverflow.com/questions/15751571/change-the-y-axis-values-from-real-numbers-to-integers-in-chart-js
              // Ensures y scale shows as an integer
              callback: (value) => { if (value % 1 === 0) { return value; } }
            },
            grid: {
              display: false
            }
          },
        }
      }
    }
  }
}
</script>