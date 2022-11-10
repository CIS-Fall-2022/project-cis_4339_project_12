<template>
    <main>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">List of Events</h1>
        <FindEvent/>
    </main>

</template>
<script>
import FindEvent from "../../components/event/findEvents.vue";
export default{
    components: {FindEvent}
}
</script>