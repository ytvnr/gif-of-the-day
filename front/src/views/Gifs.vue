<template>
    <div class="gifs">
        <div class="gifs__header">
            <v-col cols="12" sm="12" md="12">
                <v-text-field
                    v-model="searchValue"
                    @input="search(true)"
                    label="Your search here"
                    outlined
                    dense
                    autofocus
                    append-icon="mdi-magnify"
                ></v-text-field>
            </v-col>
        </div>
        <god-giphy-powered class="gifs__giphy"/>
        <div class="gifs__container">
            <div class="gifs__container__list">
                <div class="gifs__container__list__item" v-for="gif in gifs" :key="gif.id">
                    <img
                        :src="gif.images.fixed_width.url"
                        :alt="gif.title"
                        @load="loadComplete(gif.id)"
                        :hidden="!loadedGifs.includes(gif.id)"
                        @click="displayedGif = gif"
                    />
                    <v-skeleton-loader
                        v-if="!loadedGifs.includes(gif.id)"
                        class="mx-auto"
                        type="image"
                    ></v-skeleton-loader>
                </div>
            </div>
        </div>
        <god-gif v-if="displayedGif" :gif="displayedGif" @close="displayedGif = null"></god-gif>
    </div>
</template>

<script>

import debounce from 'lodash.debounce';
import Masonry from 'masonry-layout';
import { mapState } from 'vuex';
import GiphyService from '@/services/giphy.service.js';
import TeamsService from '@/services/teams.service';
import FullScreenGifVue from '@/components/FullScreenGif.vue';
import GiphyPowered from '@/components/GiphyPowered.vue';

export default {
    data() {
        return {
            searchValue: '',
            gifs: [],
            displayedGif: null,
            loadedGifs: [],
            pagination: null,
            masonry: null,
            giphyService: new GiphyService(),
            teamsService: new TeamsService()
        }
    },
    computed: mapState(['assignedTeamId' ]),
    components: {
        'god-gif': FullScreenGifVue,
        'god-giphy-powered': GiphyPowered
    },
    mounted() {
        this.initInfiniteScroll();

        this.masonry = new Masonry( document.querySelector('.gifs__container__list'), {
            itemSelector: '.gifs__container__list__item',
            transitionDuration: '0',
            percentPosition: true
        });

        this.getTeamTheme();
    },
    methods: {
        loadComplete(id) {
            this.loadedGifs.push(id);
            this.applyMasonry();
        },
        getTeamTheme()  {
            this.teamsService.getTheme(this.$store.getters.assignedTeamId)
                .then(snapshots => {
                    if (snapshots.size > 1) {
                        throw new Error('Cannot have multiple results');
                    }
                    snapshots.forEach((doc) => {
                        const item = doc.data();
                        this.searchValue = item.theme;
                        this.search(true);
                    })
                });
        },
        search: debounce(function (needReset = false) {
            let offset = this.pagination ? this.pagination.offset + this.pagination.count + 1 : 0;
            if(needReset) {
                this.gifs = [];
                offset = 0;
            }
            this.giphyService.search(this.searchValue, offset)
                .then(resp => JSON.parse(JSON.stringify(resp.data)))
                .then(result => {
                    this.gifs = [
                        ...this.gifs,
                        ...result.data,
                    ];
                    this.pagination = result.pagination;
                    this.applyMasonry();
                })
                .catch(error => {
                    console.error(error)
                });
				
        }, 500),
        applyMasonry() {
            this.masonry = new Masonry( document.querySelector('.gifs__container__list'), {
                itemSelector: '.gifs__container__list__item',
                transitionDuration: '20',
                percentPosition: true
            });
        },
        initInfiniteScroll () {
            const container = document.querySelector('.gifs__container');
            container.onscroll = () => {
                let bottomOfWindow = container.scrollTop === (container.scrollHeight - container.offsetHeight);
                if (bottomOfWindow && this.pagination) {
                    this.search();
                }
            };
        },
    }
}
</script>

<style scoped lang="scss">
.gifs {
    &__container {
        height: calc(100vh - 200px);
        overflow-y: auto;

        &__list {
            max-width: 650px;
            margin: auto;

            &__item {
                width: calc(100% / 3);
                padding: 5px;
                cursor: pointer;

                img {
                    width: 100%;
                }
            }
        }
    }

    &__giphy {
        padding-left: 5px;
    }

    &__loader {
        height: 100px;
    }
}
</style>
