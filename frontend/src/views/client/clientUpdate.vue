<template>
    <main>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Update Client</h1>
        <ClientUpdate :id="id"/>
    </main>
</template>
<script>
import ClientUpdate from "../../components/client/updateClient.vue";
export default{
    components: {ClientUpdate},
    props: ["id"]
}
</script>