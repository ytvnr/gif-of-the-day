<template>
    <div class="home">
        <div v-if="assignedTeam" class="content">
            <h1>
                ⭐️ Welcome
                <b class="todo">{{user.displayName || user.email}}</b> ! 💪
            </h1>
        </div>
        <div v-if="assignedTeam" class="content">
            <h1>
                The gif of the day is
                <br />
                <strong class="todo">to be defined</strong>
                <br />for team
            </h1>
            <h2>
                ✨✨
                <strong v-if="team" class="team">{{team.name}}</strong> ✨✨
            </h2>
        </div>

        <div v-if="!assignedTeam && user" class="content">
            <h1>You are not assigned to a team. Please join one:</h1>

            <router-link :to="{ name: 'teams'}">
                <v-btn class="ma-2" outlined color="lime">Join a team!</v-btn>
            </router-link>
        </div>

		<div v-if="!user" class="content">
            <h1>You are not logged in !</h1>

            <router-link :to="{ name: 'login'}">
                <v-btn class="ma-2" color="lime">Login</v-btn>
            </router-link>
        </div>
    </div>
</template>

<script>

import firebase from 'firebase';

export default {
    name: 'home',
    data() {
        return {
            team: null,
        }
    },
    methods: {
        getTeamById(id){
            const db = firebase.firestore();
            db.collection('teams')
                .doc(id)
                .get()
                .then(snapshot => {
                    this.team =  snapshot.data();
                });
        },
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        assignedTeam() {
            const id = this.$store.getters.assignedTeamId;
            if(id) {
                this.getTeamById(id)
            }
            return id;
        }
    }
}
</script>

<style>
.home {
    width: calc(100%);
    height: calc(100vh - 96px);
    overflow-y: auto;
    margin-top: -12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.content {
    text-align: center;
}

a {
    text-decoration: none;
}

.todo {
    color: orange;
    text-transform: uppercase;
}

.team {
    color: lime;
}
</style>
