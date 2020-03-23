<template>
    <v-card class="mx-auto" max-width="75%" outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">Teams</div>
                <v-list-item-title class="headline mb-1">{{team.name}}</v-list-item-title>
                <v-list-item-subtitle>Awesome Subtitle</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                <span class="white--text headline">{{team.avatar}}</span>
            </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
            <v-btn
                class="ma-2"
                outlined
                color="green"
                text
                @click="joinTeam()"
                :disabled="this.assignedTeamId === team.id"
            >Join team</v-btn>
            <v-btn
                class="ma-2"
                outlined
                color="red darken-1"
                text
                @click="leaveTeam()"
                :disabled="this.assignedTeamId !== team.id"
            >Leave team</v-btn>
            <router-link :to="{ name: 'gifs', params: { teamId: team.id}}">
                <v-btn class="ma-2" outlined color="lime">See GIFs</v-btn>
            </router-link>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
    props: ['team'],
    data() {
        return {
            userMetadata: {},
            teamInput: null
        }
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        assignedTeamId() {
            return this.$store.getters.assignedTeamId;
        }
    },
    methods: {
        joinTeam() {
            this.$store.dispatch('assignTeamAction', this.team.id);
        },
        leaveTeam() {
            this.$store.dispatch('assignTeamAction', null);
        }
    },
}
</script>

<style>
a {
    text-decoration: none;
}
</style>
