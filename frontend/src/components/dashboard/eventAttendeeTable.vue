<template>
    <main>
        <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
                <tr>
                    <th>&nbsp</th>
                    <th class="p-4 text-left">Event Name</th>
                    <th class="p-4 text-left">Event Date</th>
                    <th class="p-4 text-left">Attendee Count</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
                <tr v-for="eventDetail in eventData">
                    <td>&nbsp</td>
                    <td class="p-2 text-left">{{eventDetail.eventName}}</td>
                    <td class="p-2 text-left">{{formattedDate(eventDetail.eventDate)}}</td>
                    <td class="p-2 text-left">{{eventDetail.totalAttendees}}</td>
                </tr>
                <tr>
                    <td class="bg-gray-50 text-xl font-bold">Totals</td>
                    <td class="p-4 text-left font-bold">{{eventTotal}} Events</td>
                    <td>&nbsp</td>
                    <td class="p-4 text-left font-bold">{{attendeeTotal}} attendee(s)</td>
                </tr>
            </tbody>
        </table>
    </main>

</template>
<script>
import { DateTime } from "luxon";
export default {
    name: "EventTable",
    data(){
        return{
            totalEvents: 0,
            totalAttendees: 0
        }
    },
    props:{
        eventData:{
            type: Object,
        }
    },
    computed:{
        eventTotal(){
            return this.eventData.length
        },
        attendeeTotal(){
            let attendeeCount = 0
            if(this.eventData.length > 0){
                this.eventData.forEach((eventDetail) => {
                    attendeeCount += eventDetail.totalAttendees
                });
            }
            return attendeeCount
        },
    },
    methods:{
        formattedDate(date){
            let eventDate = new Date(date)
            return DateTime.fromJSDate(eventDate).toLocaleString()
        }
    }
}
</script>