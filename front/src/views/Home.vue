<template>
    <div class="home">
        <v-container>
            <v-row dense>
                <v-col cols="12" v-if="user">
                    <v-card color="green darken-3" dark>
                        <v-card-title class="headline">
                            Welcome,
                            {{ user.displayName || user.email }}
                        </v-card-title>

                        <v-card-subtitle v-if="assignedTeam">Random phrase of the day !</v-card-subtitle>
                    </v-card>
                </v-col>

                <v-col cols="12">
                    <v-card color="amber darken-3" dark>
                        <v-card-title class="headline">Your team</v-card-title>

                        <v-card-subtitle v-if="team">Your team is {{ team.name }}</v-card-subtitle>

                        <v-card-subtitle v-if="!assignedTeam">
                            Your are not assigned to a team. Please join
                            one.
                        </v-card-subtitle>

                        <v-card-actions v-if="!assignedTeam">
                            <router-link :to="{ name: 'teams' }">
                                <v-btn text>Join a team!</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="12">
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
            </v-row>
            <div class="gif-frame-container" v-if="gif">
                <img :src="gif.images.downsized.url" :alt="gif.title" />
            </div>
        </v-container>
    </div>
</template>

<script>
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
            assignedTeam2: null
        };
    },
    created() {
        this.teamsService = new TeamsService();
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
    },
    watch: {
        assignedTeam2(id){
            if(id){
                this.getTeamById(id);
                this.getThemeByTeamId(id);
            }
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        assignedTeam() {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.assignedTeam2 = this.$store.getters.assignedTeamId;
            return this.$store.getters.assignedTeamId;
        },
    },
};
</script>

<style>
.home {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.home .container {
    max-width: 600px;
}

.gif-frame-container {
    display: flex;
    justify-content: center;
}

.gif-frame {
    border: none;
}

a {
    text-decoration: none;
}
</style>
