<template>
    <div class="gif">
        <v-icon class="gif__close" @click="$emit('close')">mdi-close</v-icon>
        <img
            class="gif__img"
            :src="gif.images.original.url"
            :alt="gif.title"
            @load="isImageLoad = true"
            :hidden="!isImageLoad"
        />
        <v-skeleton-loader v-if="!isImageLoad" type="image" class="gif__skeleton"></v-skeleton-loader>
        <god-giphy-powered class="gif__giphy" />
    </div>
</template>

<script>
import GiphyPowered from '@/components/GiphyPowered.vue';

export default {
    components: {
        'god-giphy-powered': GiphyPowered
    },
    data() {
        return {
            isImageLoad: false,
        }
    },
    props: ['gif']
}
</script>

<style lang="scss" scoped>
.gif {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 96px);
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;

    &__close {
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 40px;
        padding: 20px;
    }

    &__img {
        max-width: 100%;
        max-height: calc(100vh - 200px);
    }

    &__skeleton {
        width: 80%;
    }

    &__giphy {
        position: absolute;
        bottom: 10px;
        right: 20px;
    }
}
</style>
