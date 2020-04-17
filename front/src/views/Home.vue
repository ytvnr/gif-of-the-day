<template>
    <div class="home">
        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-card color="green darken-3" dark>
                        <v-card-title class="headline">
                            Welcome,
                            {{ user.displayName || user.email }}!
                        </v-card-title>
                    </v-card>
                </v-col>

                <v-col cols="12" v-if="team">
                    <v-card color="blue lighten-1" dark>
                        <v-card-title class="headline">The Gif of the Day</v-card-title>

                        <v-card-subtitle v-if="theme">
                            The theme for today is:
                            <strong>{{theme}}</strong>
                        </v-card-subtitle>
                        <v-card-actions v-if="!theme">
                            <router-link :to="{ name: 'schedule' }">
                                <v-btn text>Choose a theme!</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="12" v-if="gif && team && theme">
                    <v-card class="gif-frame-container" color="indigo" dark>
                        <img class="gif" :src="gif.images.downsized.url" :alt="gif.title" />
                    </v-card>
                </v-col>

                <v-col cols="12">
                    <v-card color="deep-purple darken-4" dark>
                        <v-card-title class="headline">Your team</v-card-title>

                        <v-card-subtitle v-if="team">Your team is <strong>{{ team.name }}</strong></v-card-subtitle>

                        <v-card-subtitle v-if="!assignedTeamId">
                            Your are not assigned to a team. Please join
                            one.
                        </v-card-subtitle>

                        <v-card-actions v-if="!assignedTeamId">
                            <router-link :to="{ name: 'teams' }">
                                <v-btn text>Join a team!</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="12">
                    <v-card color="blue-grey darken-1" dark>
                        <v-card-title class="headline">Some questions ?</v-card-title>

                        <v-card-actions>
                            <router-link :to="{ name: 'faq' }">
                                <v-btn text>Go to our FAQ!</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import GiphyService from '@/services/giphy.service';
import TeamsService from '@/services/teams.service';

export default {
    name: 'home',
    data() {
        return {
            team: null,
            theme: null,
            gif: null,
            giphyService: new GiphyService(),
            teamsService: null,
        };
    },
    created() {
        this.teamsService = new TeamsService();
    },
    mounted() {  
        if(this.assignedTeamId) {
            this.getTeamById(this.assignedTeamId);
            this.getThemeByTeamId(this.assignedTeamId);
        }
    },
    computed: mapState(['user', 'assignedTeamId' ]),
    watch: {
        assignedTeamId(id){
            if(id){
                this.getTeamById(id);
                this.getThemeByTeamId(id);
            }
        }
    },
    methods: {
        getTeamById(teamId) {
            this.teamsService.getTeamById(teamId)
                .then((snapshot) => {
                    this.team = snapshot.data();
                });
        },
        getThemeByTeamId(teamId) {
			
            let start = new Date()
            start.setUTCHours(0,0,0,0);
            let end = new Date()
            end.setUTCHours(23,59,59,0);
			
            this.teamsService.getThemesBetweenDates(teamId, start, end)
                .then(snapshots => {
                    if(snapshots.size === 0) {
                        console.info('No theme set today :/');
                    } else if (snapshots.size !== 1) {
                        throw new Error('Cannot have multiple result');
                    }
					
                    snapshots.forEach((doc) => {
                        const item = doc.data();
                        this.theme = item.theme;
                        this.giphyService.randomByTag(this.theme)
                            .then(resp => JSON.parse(JSON.stringify(resp.data)))
                            .then(result => {
                                this.gif = result.data;
                            });
                    });
                });
        }
    }
};
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.home .container {
    max-width: 600px;
}

.gif-frame-container {
    display: flex !important;
    justify-content: center;
}

.gif {
    max-width: 100%;
    padding: 12px;
}

a {
    text-decoration: none;
}
</style>
