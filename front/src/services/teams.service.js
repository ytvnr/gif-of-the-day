import firebase from 'firebase';

export default class TeamsService {

    db;

    constructor(){
        this.db = firebase.firestore();
    }

    getTeamById(teamId) {
        return this.db.collection('teams').doc(teamId).get();
    }

    getTheme(teamId) {

        let start = new Date();
        start.setUTCHours(0,0,0,0);
        let end = new Date();
        end.setUTCHours(23,59,59,0);

        return this.db.collection('themes')
            .where('team', '==', this.db.collection('teams').doc(teamId))
            .where('date', '>=', start)
            .where('date', '<=', end)
            .get();
    }

    getThemesBetweenDates(teamId, start, end) {
        return this.db.collection('themes')
            .where('team', '==', this.db.collection('teams').doc(teamId))
            .where('date', '>=', start)
            .where('date', '<=', end)
            .get();
    }

    saveTheme(id, theme, teamId, date) {

        if (id) {
            return this.db.collection('themes')
                .doc(id)
                .set({
                    theme,
                }, { merge: true });

        } else {
            return this.db.collection('themes')
                .add({
                    theme,
                    team: this.db.collection('teams').doc(teamId),
                    date
                });
        }
    }
}
