<template>
    <main>
        <table>
            <thead>
                <tr>
                    <th>Event Name</th>
                    <th>Event Date</th>
                    <th>Attendee Count</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="eventDetail in eventData">
                    <td>{{eventDetail.eventName}}</td>
                    <td></td>
                    <td>{{eventDetail.totalAttendees}}</td>
                </tr>
            </tbody>
        </table>
    </main>

</template>
<script>
export default {
    name: "EventTable",
    props:{
        eventData:{
            type: Object,
            required: true
        }
    }
}
</script>