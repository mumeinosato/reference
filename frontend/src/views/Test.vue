<template>
    <form>
        <v-textarea v-model="content"></v-textarea>
        <v-btn @click="submit">Submit</v-btn>
    </form>
</template>

<script>
export default {
    data() {
        return {
            content: ""
        };
    },
    methods: {
        submit() {
            console.log(this.content);
        }
    }
};
</script>
