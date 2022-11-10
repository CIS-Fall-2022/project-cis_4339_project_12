<template>
    <main>
        <div>
            <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Find Client</h1>
          </div>
        <FindClient/>
    </main>
</template>
<script>
import FindClient from "../../components/client/findClient.vue";
export default{
    components:{FindClient}
}
</script>