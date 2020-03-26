import firebase from 'firebase';

const db = firebase.firestore();

export default class TeamsService {

    getTheme(teamId, date) {

        let start = new Date();
        start.setDate(date);
        start.setUTCHours(0,0,0,0);
        let end = new Date();
        end.setDate(date);
        end.setUTCHours(23,59,59,0);

        return db.collection('themes')
            .where('team', '==', db.collection('teams').doc(teamId))
            .where('date', '>=', start)
            .where('date', '<=', end)
            .get();
    }

    getThemesBetweenDates(teamId, start, end) {
        return db.collection('themes')
            .where('team', '==', db.collection('teams').doc(teamId))
            .where('date', '>=', start)
            .where('date', '<=', end)
            .get();
    }

    saveTheme(id, theme, teamId, date) {

        if (id) {
            return db.collection('themes')
                .doc(id)
                .set({
                    theme,
                }, { merge: true });

        } else {
            return db.collection('themes')
                .add({
                    theme,
                    team: db.collection('teams').doc(teamId),
                    date
                });
        }
    }
}
