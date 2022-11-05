<template>
  <main class="h-screen">
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <section class="flex flex-col mt-10 mx-4">
    <div class="mx-auto">
      <BarChart :chartData="chartData" :loaded="loaded" />
    </div>
    <div>
      <EventTable :eventData="eventData"/>
    </div>
    </section>
  </main>
</template>
<script>
import BarChart from "../components/dashboard/barchart.vue";
import EventTable from "../components/dashboard/eventAttendeeTable.vue";
import axios from "axios";
export default {
  components: { BarChart,EventTable },
  data() {
    return {
      eventData: {},
      loaded: false,
      chartData: {
        datasets: [
          {
            label: "Total Attendees",
            backgroundColor: "#f87979",
            barThickness: 50,
          }
        ]
      }
    }
  },
  mounted() {
    let apiURL = import.meta.env.VITE_ROOT_API + "/eventdata/attendees";
    axios.get(apiURL).then((res) => {
      this.eventData = res.data;
      let labels = [];
      let data = [];
      res.data.forEach(eventDetail => {
        labels.push(eventDetail.eventName);
        data.push(eventDetail.totalAttendees);
      });
      this.chartData.labels = labels;
      this.chartData.datasets[0].data = data;
    })
    this.loaded = true;
  }
};
</script>
