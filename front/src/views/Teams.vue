<template>
    <section class="teams">
        <div class="container">
            <h1 class="title">Teams</h1>
            <h2 class="subtitle" v-if="organization">
                This is the list of
                <strong class="organization">{{organization.name}}</strong>'s teams
            </h2>
            <div class="list" v-if="!user">
                <h2 class="subtitle has-text-danger">You do not have access to this page !</h2>
            </div>
            <div class="list" v-if="user && teams.length > 0">
                <god-cardteam
                    class="item"
                    v-for="(team, index) in teams"
                    :key="`team-${index}`"
                    :team="team"
                ></god-cardteam>
            </div>
            <div v-if="user && teams.length === 0">
                <p>⚠️ There is no team for this organization 😭</p>
            </div>
        </div>
    </section>
</template>

<script>

import TeamCard from '@/components/TeamCard';
import { mapState } from 'vuex';
import TeamsService from '@/services/teams.service';
import OrganizationsService from '../services/organizations.service';

export default {
    name: "teams",
    components: {
        'god-cardteam': TeamCard,
    },
    data() {
        return {
            teams:[],
            organization: null
        };
    },
    beforeCreate() {
        this.teamsService = new TeamsService();
        this.organizationsService = new OrganizationsService();
    },
    computed: mapState(['user', 'organizationId' ]),
    watch: {
        organizationId: {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.getOrganization(newVal);
                    this.getTeams(newVal);
                }
            },
        }
    },
    methods: {
        getOrganization(organizationId) {
            if (organizationId) {
                this.organizationsService.getOrganizationById(organizationId)
                    .then(snapshot => {
                        this.organization = snapshot.data();
                    });
            }
        },

        getTeams(organizationId) {
            if (organizationId) {
                this.teamsService.getTeamsByOrganizationId(organizationId)
                    .then(snapshots => {
                        snapshots.forEach(team => {
                            this.teams.push({...team.data(), id: team.id})
                        });
                    });
            }
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    padding-top: 20px;
}
.list {
    padding: 20px 0px;

    .item {
        margin-bottom: 20px;
    }
}
.organization {
    text-transform: uppercase;
}
</style>
