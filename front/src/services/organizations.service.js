import firebase from 'firebase';

export default class OrganizationsService {

    db;

    constructor(){
        this.db = firebase.firestore();
    }

    getOrganizationById(organizationId) {
        return this.db.collection('organizations')
            .doc(organizationId)
            .get();
    }
}
