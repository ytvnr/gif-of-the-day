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
        <div class="gifs__container">
            <div class="gifs__container__list">
                <div class="gifs__container__list__item" v-for="gif in gifs" :key="gif.id">
                    <img :src="gif.images.fixed_width.url" :alt="gif.title" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import debounce from 'lodash.debounce';
import Masonry from 'masonry-layout';
import { mapState } from 'vuex';
import GiphyService from '@/services/giphy.service.js';
import TeamsService from '@/services/teams.service';

export default {
    data() {
        return {
            searchValue: '',
            gifs: [],
            pagination: null,
            masonry: null,
            giphyService: new GiphyService(),
            teamsService: new TeamsService()
        }
    },
    computed: mapState(['assignedTeamId' ]),
    mounted() {
        this.initInfiniteScroll();
        this.getTeamTheme();
    },
    methods: {
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
            const offset = this.pagination ? this.pagination.offset + this.pagination.count + 1 : 0;
            if(needReset) {
                this.gifs = [];
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
            const time2wait = this.pagination ? 500 : 1500;	
            setTimeout(()=> {
                this.masonry = new Masonry( document.querySelector('.gifs__container__list'), {
                    itemSelector: '.gifs__container__list__item',
                    transitionDuration: '20',
                    percentPosition: true
                });
            }, time2wait);
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

<style lang="scss">
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

                img {
                    width: 100%;
                }
            }
        }
    }

    &__loader {
        height: 100px;
    }
}
</style>
