<template>
  <main class="h-screen">
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
    </div>
    <section class="flex flex-col mt-10 mx-4" v-if="hasData">
    <div class="mx-auto">
      <BarChart :chartData="chartData" :loaded="loaded" />
    </div>
    <div>
      <EventTable :eventData="eventData"/>
    </div>
    </section>
    <section class="mt-10">
      <p class="font-bold text-center text-2xl" v-if="!hasData">There are no events within the last two months.</p>
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
      hasData: false,
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
  },
  watch:{
    eventData(){
      if (this.eventData){
        this.hasData = true
      }else{
        this.hasData = false
      }
    }
  }
};
</script>
