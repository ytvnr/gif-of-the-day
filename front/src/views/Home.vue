<template>
    <div class="home">
        <v-container>
            <v-row dense>
                <v-col cols="12">
                    <v-card color="green darken-3" dark>
                        <v-card-title class="headline"
                            >Welcome,
                            {{ user.displayName || user.email }}</v-card-title
                        >

                        <v-card-subtitle v-if="assignedTeam"
                            >Random phrase of the day !</v-card-subtitle
                        >
                    </v-card>
                </v-col>

                <v-col cols="12">
                    <v-card color="amber darken-3" dark>
                        <v-card-title class="headline">Your team</v-card-title>

                        <v-card-subtitle v-if="team"
                            >Your team is {{ team.name }}</v-card-subtitle
                        >

                        <v-card-subtitle v-if="!assignedTeam"
                            >Your are not assigned to a team. Please join
                            one.</v-card-subtitle
                        >

                        <v-card-actions v-if="!assignedTeam">
                            <router-link :to="{ name: 'teams' }">
                                <v-btn text>Join a team!</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>

                <v-col cols="12">
                    <v-card color="blue lighten-1" dark>
                        <v-card-title class="headline"
                            >The Gif of the Day</v-card-title
                        >

                        <v-card-subtitle v-if="todayTheme && theme"
                            >The theme for today is:
                            <strong>{{theme}}</strong></v-card-subtitle
                        >
                        <v-card-actions v-if="!(todayTheme && theme)">
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
import firebase from 'firebase';
import GiphyService from '@/services/giphy.service';

//TODO: ideally, we should use the TeamsService here, but firebase.initializeApp is not finished then we have no access to db

export default {
    name: 'home',
    data() {
        return {
            team: null,
            theme: null,
            gif: null,
            giphyService: new GiphyService()
        };
    },
    methods: {
        getTeamById(id) {
            const db = firebase.firestore();
            db.collection('teams')
                .doc(id)
                .get()
                .then((snapshot) => {
                    this.team = snapshot.data();
                });
        },
        getTheme(teamId) {

            const db = firebase.firestore();
            let start = new Date();
            start.setUTCHours(0,0,0,0);
            let end = new Date();
            end.setUTCHours(23,59,59,0);

            db.collection('themes')
                .where('team', '==', db.collection('teams').doc(teamId))
                .where('date', '>=', start)
                .where('date', '<=', end)
                .get()
                .then(snapshots => {
                    if (snapshots.size !== 1) {
                        throw new Error('Cannot have 0 or multiple result');
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
    computed: {
        user() {
            return this.$store.getters.user;
        },
        assignedTeam() {
            const id = this.$store.getters.assignedTeamId;
            if (id) {
                this.getTeamById(id);
            }
            return id;
        },
        todayTheme() {
            const id = this.$store.getters.assignedTeamId;
            if(id) {
                this.getTheme(id);
            }
            return id;
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
