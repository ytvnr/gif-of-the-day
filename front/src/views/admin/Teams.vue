<template>
    <v-data-table
        :headers="headers"
        :items="teams"
        sort-by="organization"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Add new team
                        </v-btn>
                    </template>
                    <v-card>
                        <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field
                                            v-model="editedItem.avatar"
                                            label="Avatar"
                                            :rules="[rules.required]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field
                                            v-model="editedItem.name"
                                            label="Name"
                                            :rules="[rules.required]"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-select
                                            :items="organizations"
                                            v-model="editedItem.organization"
                                            item-text="name"
                                            item-value="id"
                                            :rules="[rules.required]"
                                            label="Select an organization"
                                        />
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">
                                Cancel
                            </v-btn>
                            <v-btn
                                color="blue darken-1"
                                :disabled="!isIemValid"
                                text
                                @click="save"
                            >
                                Save
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
        </template>
        <template v-slot:no-data>
            No team 😭
        </template>
    </v-data-table>
</template>

<script>

import firebase from 'firebase';

export default {
    name: "teams",
    data() {
        return {
            teams: [],
            organizations: [],
            dialog: false,
            rules: {
                required: value => !!value || 'Required.',
            },
            headers: [
                {
                    text: 'Avatar',
                    value: 'avatar',
                },
                { text: 'Name', value: 'name' },
                { text: 'Organization', value: 'organization.name' },
                { text: 'Actions', value: 'actions', sortable: false },
            ],
            editedId: null,
            editedItem: {
                name: '',
                avatar: '',
                organization: null
            },
            defaultItem: {
                name: '',
                avatar: '',
                organization: null
            },
        };
    },
    computed: {
        isIemValid () {
            return this.editedItem.avatar && this.editedItem.name && this.editedItem.organization; 
        },
        formTitle () {
            return this.editedId === null ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog (val) {
            val || this.close()
        }
    },

    async created() {
        await this.getOrganizations();
        await this.getTeams();
    },

    methods: {

        async getTeams() {
            const teams = await this.concatDocument(firebase.firestore().collection('teams').get());
            teams.forEach(team => {
                const org = this.organizations.find(org => org.id === team.organization.id);
                team.organization.name = org.name;
            });
            this.teams = teams;
        },      
        async getOrganizations() {
            this.organizations = await this.concatDocument(firebase.firestore().collection('organizations').get());
        },
        async concatDocument(elem) {
            return elem.then(querySnapshot => {
                const documents = querySnapshot.docs.map(doc => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    }
                })
                return documents;
            });
        },

        editItem (item) {
            this.editedId = item.id;
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedId = null;
            })
        },

        save () {
            const orgaId = this.editedItem.organization.id || this.editedItem.organization;
            if (this.editedId) {
                delete this.editedItem.id;
                firebase.firestore().collection('teams')
                    .doc(this.editedId)
                    .update({
                        ...this.editedItem,
                        organization: firebase.firestore().collection('organizations').doc(orgaId)
                    })
                    .then(() => {
                        this.getTeams();
                    })
            } else {
                firebase.firestore().collection('teams').add({
                    ...this.editedItem,
                    organization: firebase.firestore().collection('organizations').doc(orgaId)
                }).then(() => {
                    this.getTeams();
                })
            }
            this.close();
        },
    },
}
</script>

<style scoped lang="scss">
</style>
