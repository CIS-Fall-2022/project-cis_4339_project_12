<template>
    <main>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Event Update</h1>
        <UpdateClient :id="id" />
        
    </main>

</template>
<script>
import UpdateClient from "../../components/event/eventDetails.vue";
export default{
    components: {UpdateClient},
    props: ["id"]
}
</script>