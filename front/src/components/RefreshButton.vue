<template>
        <v-btn
                class="refresher"
                text
                @click="$emit('click')"
                small
        >
            <v-icon :class="{'loading': isLoading}">mdi-refresh</v-icon>
        </v-btn>
</template>

<script>
export default {
    props: ['isLoading'],
}
</script>

<style scoped lang="scss">
.refresher {
    background-color: grey;
    padding: 0 10px !important;
    min-width: 0 !important;
}

.v-icon {
    font-size: 20px;
}

.loading {
    animation: loader 1s infinite;
    display: flex;
}
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
