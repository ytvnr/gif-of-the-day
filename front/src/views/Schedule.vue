<template>
    <v-row class="schedule" justify="center">
        <v-col cols="12">
            <v-card color="#1F7087">
                <v-card-actions>
                    <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="date"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable first-day-of-week="1">
                            <v-btn text color="primary" @click="setToday()">Today</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                    </v-dialog>
                </v-card-actions>
            </v-card>

            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="gifs"
                    :disable-filtering="true"
                    :disable-pagination="true"
                    :disable-sort="true"
                    :hide-default-footer="true"
                >
                    <template v-slot:item.theme="props">
                        <v-edit-dialog
                            :return-value.sync="props.item.theme"
                            large
                            persistent
                            @save="save(props.item)"
                        >
                            <div>{{ props.item.theme }}</div>
                            <template v-slot:input>
                                <div class="mt-4 title">Update Theme</div>
                            </template>
                            <template v-slot:input>
                                <v-text-field
                                    v-model="props.item.theme"
                                    label="Edit"
                                    single-line
                                    counter
                                    autofocus
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                </v-data-table>
                <v-card-actions></v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

import firebase from 'firebase';

const db = firebase.firestore();

export default {
    name: 'schedule',
    components: {
    },
    data() {
        return {
            disableFiltering: true,
            pagination: {},
            date: new Date().toISOString().substr(0, 10),
            modal: false,
            headers: [
                {
                    text: 'Day of week',
                    align: 'left',
                    sortable: false,
                    value: 'day',
                },
                { text: 'Gif Theme', value: 'theme' },
            ],
            defaultGifs: [
                {
                    day: 'Monday',
                    theme: '---',
                },
                { 
                    day: 'Tuesday',
                    theme: '---',
                },
                {
                    day: 'Wednesday',
                    theme: '---',
                },
                {
                    day: 'Thursday',
                    theme: '---',
                },
                {
                    day: 'Friday',
                    theme: '---',
                },
                {
                    day: 'Saturday',
                    theme: '---',
                },
                {
                    day: 'Sunday',
                    theme: '---',
                }
            ],
            gifs: [],
        };
    },
    created() {
        this.loadWeek();
    },
    watch: {
        date() {
            this.loadWeek();
        }
    },
    methods: {
        setToday() {
            this.date = new Date().toISOString().substr(0, 10);
            this.$refs.dialog.save(this.date);
        },
        getMonday(d) {
            d = new Date(d);
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6 : 1);
            return new Date(d.setDate(diff));
        },
        loadDefaultWeek() {
            this.defaultGifs.forEach(d => {
                this.gifs.push({
                    day: d.day,
                    theme : d.theme
                })
            });
        },
        loadWeek() {
            this.loadDefaultWeek();
			
            const start = this.getMonday(this.date); 
            const end = new Date();
            end.setDate(start.getDate() + 7);
			
            if(this.assignedTeamId) {
                db.collection('themes')
                    .where('team', '==', db.collection('teams').doc(this.assignedTeamId))
                    .where('date', '>=', start)
                    .where('date', '<=', end)
                    .get()
                    .then(snapshots => {
                        snapshots.forEach((doc) => {
                            const item = doc.data();
                            const day = item.date.toDate().getDay();
                            this.gifs[day - 1].theme = item.theme;
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    })
            }
        },
        save(event) {
            console.log('Dialog saved');
            console.log(event);
        },
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        assignedTeamId() {
            return this.$store.getters.assignedTeamId;
        }
    },
}
</script>

<style lang="scss">
.schedule {
    width: calc(100% + 24px);
    height: calc(100vh - 96px);
    overflow-y: auto;
    margin-top: -12px;

    .v-card {
        margin-bottom: 12px;
    }
}
</style>
