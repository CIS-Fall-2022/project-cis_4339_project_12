<template>
    <main>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Create New Event</h1>
        <EventForm/>
    </main>

</template>
<script>
import EventForm from "../../components/event/eventForm.vue";
export default{
    components: {EventForm}
}
</script>