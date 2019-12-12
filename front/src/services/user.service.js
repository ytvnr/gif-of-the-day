import firebase from 'firebase';

class UserService {

  user = null;

  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      this.user = user;
      console.log(user);
    });
  }

  signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      this.user = result.user;
    }).catch(console.error)
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.user = null;
    }).catch(console.error);
  }

  getCurrentUser() {
    return this.user;
  }

  // FIXME manage promise ?
  updateUser(user) {
    firebase.auth().updateCurrentUser(user);
  }
}

export default UserService;
