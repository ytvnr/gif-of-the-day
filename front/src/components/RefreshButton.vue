<template>
        <v-btn
                class="refresher"
                text
                @click="$emit('click')"
        >
            <v-icon :class="{'loading': isLoading}" left>mdi-refresh</v-icon>
            Refresh
        </v-btn>
</template>

<script>
export default {
    props: ['isLoading'],
    watch: {
        isLoading() {
            console.log('isLoading', this.isLoading)
        }
    }
}
</script>

<style scoped lang="scss">
.refresher {
    width: 120px;
    background-color: grey;

    button {
        margin: 0;
    }
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
