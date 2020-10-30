<template>
    <v-navigation-drawer
        :clipped="true"
        :floating="false"
        :mini-variant="isDrawerMini"
        :permanent="true"
        app
        overflow
    >
        <v-list-item class="px-2" v-if="user">
            <v-list-item-avatar>
                <v-img :src="userPicture"></v-img>
            </v-list-item-avatar>

            <v-list-item-title>{{user.displayName || user.email}}</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>
        <v-list dense nav>
            <template v-for="item in items">
                <v-list-item :key="item.title" v-if="canDisplay(item)" link :to="item.href">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>

        <template v-slot:append>
            <v-list-item link to="/admin" v-if="user">
                <v-list-item-icon>
                    <v-icon color="warning">mdi-application-cog</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Administration</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item link to="/logout" v-if="user">
                <v-list-item-icon>
                    <v-icon color="error">mdi-logout</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: [
        'isDrawerMini'
    ],
    data () {
        return {
            items: [
                { title: 'Dashboard', icon: 'mdi-view-dashboard', href: '/', needAuth: false, needTeam: false },
                { title: 'Gifs', icon: 'mdi-gif', href: '/gifs', needAuth: true, needTeam: false },
                { title: 'Schedule', icon: 'mdi-calendar', href: '/schedule', needAuth: true, needTeam: true },
                { title: 'Teams', icon: 'mdi-account-group', href: '/teams', needAuth: true, needTeam: false },
                { title: 'Faq', icon: 'mdi-help-box', href: '/faq', needAuth: false, needTeam: false }
            ],
        }
    },
    computed: {
        ...mapState([ 'organizationId', 'assignedTeamId' ]),
        user() {
            return this.$store.getters.user;
        },
        userPicture() {
            return this.user.photoURL || `https://eu.ui-avatars.com/api/?name=${this.user.email}`
        }
    },
    methods: {
        canDisplay(item) {
            return !item.needAuth // Display if no need to be authenticated
                || this.user && this.organizationId && (!item.needTeam || item.needTeam && this.assignedTeamId) // Display if authenticated, belonging to an organization and belonging to a team if needTeam
        }
    }
}
</script>

<style>
</style>
