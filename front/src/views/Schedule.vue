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
                            <v-btn text color="primary" @click="selectDate(date)">OK</v-btn>
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
                    :fixed-header="true"
                    :mobile-breakpoint="300"
                >
                    <template v-slot:item="props">
                        <tr :class="{ highlight: props.item.isHighlight }">
                            <td width="30%">
                                <div>{{ props.item.day }}</div>
                            </td>
                            <td width="35%">
                                <div v-if="!props.item.chooser">❓</div>
                                <v-tooltip left z-index="10" v-if="props.item.chooser">
                                    <template v-slot:activator="{ on }">
                                        <span v-on="on">{{ getInitials(props.item.chooser) }}</span>
                                    </template>
                                    <span>{{ props.item.chooser }}</span>
                                </v-tooltip>
                            </td>
                            <td width="35%">
                                <v-edit-dialog
                                    :return-value.sync="props.item.theme"
                                    large
                                    persistent
                                    @save="save(props.item)"
                                >
                                    <div>{{ props.item.theme || '✏️' }}</div>
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
                                            maxlength="20"
                                        ></v-text-field>
                                    </template>
                                </v-edit-dialog>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

import TeamsService from '@/services/teams.service';
import { mapState } from 'vuex';

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
            teamsService: null,
            headers: [
                {
                    text: 'Day of week',
                    align: 'left',
                    sortable: false,
                    value: 'day',
                },
                { text: 'Chooser', value: 'chooser' },
                { text: 'Gif Theme', value: 'theme' },
            ],
            defaultGifs: [
                {
                    day: 'Monday',
                },
                { 
                    day: 'Tuesday',
                },
                {
                    day: 'Wednesday',
                },
                {
                    day: 'Thursday',
                },
                {
                    day: 'Friday',
                },
                {
                    day: 'Saturday',
                },
                {
                    day: 'Sunday',
                }
            ],
            gifs: [],
        };
    },
    created() {
        this.teamsService = new TeamsService();
        this.loadWeek();
    },
    computed: mapState(['user', 'assignedTeamId']),
    watch: {
        assignedTeamId() {
            this.loadWeek();
        },
        date() {
            this.loadWeek();
        }
    },
    methods: {
        setToday() {
            this.date = new Date().toISOString().substr(0, 10);
            this.$refs.dialog.save(this.date);
        },
        selectDate(date) {
            this.date = new Date(date).toISOString().substr(0, 10);
            this.$refs.dialog.save(this.date);
        },
        getMonday(d) {
            d = new Date(d);
            const day = d.getDay();
            const diff = d.getDate() - day + (day == 0 ? -6 : 1);
            return new Date(d.setDate(diff));
        },
        loadDefaultWeek(startDate) {
            
            this.gifs = [];
            this.defaultGifs.forEach((d, index) => {

                const dayDate = new Date();
                dayDate.setDate(startDate.getDate() + index);

                const dayNumber = (startDate.getDate() + index) % this.numberOfDaysInMonth(startDate)

                this.gifs.push({
                    day: `${d.day} ${ dayNumber !== 0 ? dayNumber : startDate.getDate() + index }`,
                    theme : d.theme,
                    date: dayDate,
                    isHighlight:  new Date(this.date).getDate() === dayDate.getDate(),
                    chooser: d.chooser
                })
            });
        },
        numberOfDaysInMonth(date) {
            return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        },
        loadWeek() {

            const start = this.getMonday(this.date);
            const end = new Date();
            end.setDate(start.getDate() + 6);

            this.loadDefaultWeek(start);
			
            if(this.assignedTeamId) {
                this.teamsService.getThemesBetweenDates(this.assignedTeamId, start, end)
                    .then(snapshots => {
                        snapshots.forEach((doc) => {
                            const item = doc.data();
                            const day = item.date.toDate().getDay();
                            this.gifs[day - 1].id = doc.id;
                            this.gifs[day - 1].theme = item.theme;
                            this.gifs[day - 1].date = item.date;
                            this.gifs[day - 1].chooser = item.chooser;
                        });
                    })
                    .catch(error => {
                        console.error(error);
                    })
            } else {
                console.error('No assignedTeamId for the moment 😢');
            }
        },
        save(event) {
            this.teamsService.saveTheme(event.id, event.theme, this.assignedTeamId, event.date, this.user.displayName)
                .then(() => event.chooser = this.user.displayName);
        },
        getInitials(displayName) {
            const initials = displayName.match(/\b\w/g) || [];
            return ((initials.shift() || '') + '.' + (initials.pop() || '')).toUpperCase();
        }
    }
}
</script>

<style scoped lang="scss">
.schedule {
    width: calc(100% + 24px);
    height: calc(100vh - 96px);
    overflow-y: auto;
    margin-top: -12px;

    .v-card {
        margin-bottom: 12px;
    }

    .highlight {
        background: #1f7087;
    }
}
</style>
