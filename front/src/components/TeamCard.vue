<template>
    <v-card class="mx-auto team" :class="{ 'selected': this.assignedTeamId === team.id }" outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline mb-4">Teams</div>
                <v-list-item-title class="headline mb-1">{{team.name}}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
                <span class="white--text headline">{{team.avatar}}</span>
            </v-list-item-avatar>
        </v-list-item>

        <v-card-actions class="team__actions">
            <v-btn
                v-if="this.assignedTeamId !== team.id"
                class="ma-2"
                outlined
                color="green"
                text
                @click="joinTeam()"
            >Join team</v-btn>
            <v-btn
                v-if="this.assignedTeamId === team.id"
                class="ma-2"
                outlined
                color="red darken-1"
                text
                @click="leaveTeam()"
            >Leave team</v-btn>
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

<style scoped lang="scss">
.team {
    &.selected {
        background-color: rgba(30, 30, 30, 0.12) !important;
        box-shadow: 0 0 30px 5px lime;
    }

    &__actions {
        display: flex;
        justify-content: space-evenly;
    }

    a {
        text-decoration: none;
    }
}
</style>
