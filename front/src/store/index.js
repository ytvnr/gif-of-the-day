import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ],
    state: {
        user: null,
        status: null,
        error: null,
        assignedTeamId: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },

        removeUser(state) {
            state.user = null;
        },

        setStatus(state, payload) {
            state.status = payload;
        },

        setError(state, payload) {
            state.error = payload;
        },

        setAssignedTeamId(state, payload) {
            state.assignedTeamId = payload;
        }
    },
    actions: {
        getAssignedTeamId({ commit }, userId) {
            firebase
                .firestore()
                .collection('usersMetadata')
                .doc(userId)
                .get()
                .then(snapshot => {
                    this.userMetadata = snapshot.data();
                    commit(
                        'setAssignedTeamId',
                        this.userMetadata?.assignedTeamId
                    );
                });
        },

        assignTeamAction({ commit, state }, teamId) {
            if (teamId) {
                firebase
                    .firestore()
                    .collection('usersMetadata')
                    .doc(state.user.uid)
                    .set(
                        {
                            assignedTeamId: teamId
                        },
                        { merge: true }
                    );
            } else {
                firebase
                    .firestore()
                    .collection('usersMetadata')
                    .doc(state.user.uid)
                    .update({
                        assignedTeamId: firebase.firestore.FieldValue.delete()
                    });
            }

            commit('setAssignedTeamId', teamId);
        },

        autoLoginAction({ commit, dispatch }, user) {
            commit('setUser', user);
            commit('setStatus', 'success');
            dispatch('getAssignedTeamId', user.uid);
        },

        updateUserAction({ commit }, user) {
            commit('setStatus', 'loading');

            firebase
                .auth()
                .currentUser.updateProfile(user)
                .then(() => {
                    commit('setUser', user);
                    commit('setStatus', 'success');
                    commit('setError', null);
                    commit('setAssignedTeamId', user.assignedTeamId);
                })
                .catch(error => {
                    commit('setStatus', 'failure');
                    commit('setError', error.message);
                });
        },

        createUserWithEmailAndPassword({ commit }, user) {
            commit('setStatus', 'loading');

            firebase
                .firestore()
                .collection('authorizedDomains')
                .get()
                .then(querySnapshot => {
                    let isDomainAuthorized =
                        querySnapshot.docs.filter(domain =>
                            user.email.includes(domain.data().domain)
                        ).length > 0;

                    if (isDomainAuthorized) {
                        firebase
                            .auth()
                            .createUserWithEmailAndPassword(
                                user.email,
                                user.password
                            )
                            .then(() => {
                                commit('setStatus', 'success');
                                commit('setError', null);
                            })
                            .catch(function(error) {
                                commit('setStatus', 'failure');
                                commit('setError', error.message);
                            });
                    } else {
                        commit('setStatus', 'failure');
                        commit(
                            'setError',
                            'Your mail domain is not authorized'
                        );
                    }
                });
        },

        signInWithEmailAndPassword({ commit, dispatch }, user) {
            commit('setStatus', 'loading');

            firebase
                .auth()
                .signInWithEmailAndPassword(user.email, user.password)
                .then(response => {
                    commit('setUser', response.user);
                    commit('setStatus', 'success');
                    commit('setError', null);
                    dispatch('getAssignedTeamId', response.user.uid);
                })
                .catch(function(error) {
                    commit('setStatus', 'failure');
                    commit('setError', error.message);
                    console.error(error);
                });
        },

        signInWithGoogleAction({ commit, dispatch }) {
            commit('setStatus', 'loading');
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase
                .auth()
                .signInWithRedirect(provider)
                .then(response => {
                    commit('setUser', response.user);
                    commit('setStatus', 'success');
                    commit('setError', null);
                    dispatch('getAssignedTeamId', response.user.uid);
                })
                .catch(error => {
                    commit('setStatus', 'failure');
                    commit('setError', error.message);
                });
        },

        signOutAction({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setStatus', 'success');
                    commit('setError', null);
                    commit('setAssignedTeamId', null);

                    sessionStorage.clear();
                })
                .catch(error => {
                    commit('setStatus', 'failure');
                    commit('setError', error.message);
                });
        }
    },

    getters: {
        status(state) {
            return state.status;
        },

        user(state) {
            return state.user;
        },

        error(state) {
            return state.error;
        },

        assignedTeamId(state) {
            return state.assignedTeamId;
        }
    }
});
