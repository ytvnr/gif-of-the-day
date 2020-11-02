<template>
    <section class="dashboard">
        <v-skeleton-loader
            class="mx-auto"
            min-width="300"
            type="card"
        ></v-skeleton-loader>
        <v-skeleton-loader
            class="mx-auto"
            min-width="300"
            type="card"
        ></v-skeleton-loader>
    </section>
</template>

<script>

export default {
    name: "dashboard",
    components: {
    },
    data() {
        return {
        };
    },
    beforeCreate() {
    },
    watch: {
    },
    methods: {
    }
}
</script>

<style scoped lang="scss">
.dashboard {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
}
</style>
