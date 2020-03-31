<template>
    <v-row class="about">
        <v-col cols="12" md="6">
            <v-card>
                <v-card-subtitle>
                    <h3>Contributors</h3>
                </v-card-subtitle>
                <v-list>
                    <v-list-item v-for="item in contributors" :key="item.id">
                        <v-list-item-icon>
                            <v-icon v-if="1" color="red">mdi-star</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.login"></v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-avatar>
                            <v-img :src="item.avatar_url"></v-img>
                        </v-list-item-avatar>
                    </v-list-item>
                </v-list>
            </v-card>
        </v-col>
        <v-col cols="12" md="6">
            <v-card>
                <v-card-subtitle>
                    <h3>Informations</h3>
                </v-card-subtitle>
                <v-list-item>
                    <v-list-item-content>version: {{ mode }}.{{ version }}</v-list-item-content>
                </v-list-item>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import GithubService from '@/services/github.service';

export default {
    name: 'about',
    data() {return {
        version:  process.env.PACKAGE_VERSION,
        mode:  process.env.VUE_APP_MODE,
        githubService: null,
        contributors: []
    }},
    components: {
    },
    created(){
        this.githubService = new GithubService();

        this.githubService.getContributors()
            .then(resp => JSON.parse(JSON.stringify(resp.data)))
            .then(result => {
                console.log(result);
                this.contributors = result;
            });
    }
}
</script>
