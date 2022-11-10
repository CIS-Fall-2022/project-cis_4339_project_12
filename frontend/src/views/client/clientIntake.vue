<template>
    <main>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Client Intake Form</h1>
        <IntakeForm/>
    </main>

</template>
<script>
import IntakeForm from "../../components/client/intakeForm.vue";
export default{
    components: {IntakeForm}
}
</script>