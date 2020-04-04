const mockInitializeApp = jest.fn();
const mockCert = jest.fn();

const firebaseStub = (overrides) => {
    const { FakeFirestore, FakeAuth } = require('firestore-jest-mock');
    return {
        initializeApp: mockInitializeApp,

        credential: {
            cert: mockCert,
        },

        auth() {
            return new FakeAuth(overrides.currentUser);
        },

        firestore() {
            return new FakeFirestore(overrides.database);
        },
    };
};

const mockFirebase = (overrides = {}) => {
    jest.mock('firebase', () => firebaseStub(overrides)) &&
        jest.mock('firebase-admin', () => firebaseStub(overrides));
};

module.exports = {
    firebaseStub,
    mockFirebase,
    mockInitializeApp,
    mockCert,
};

// import * as firebase from 'firebase';

// const onAuthStateChanged = jest.fn();

// const getRedirectResult = jest.fn(() => {
//     return Promise.resolve({
//         user: {
//             displayName: 'redirectResultTestDisplayName',
//             email: 'redirectTest@test.com',
//             emailVerified: true,
//         },
//     });
// });

// const sendEmailVerification = jest.fn(() => {
//     return Promise.resolve('result of sendEmailVerification');
// });

// const sendPasswordResetEmail = jest.fn(() => Promise.resolve());

// const createUserWithEmailAndPassword = jest.fn(() => {
//     return Promise.resolve('result of createUserWithEmailAndPassword');
// });

// const signInWithEmailAndPassword = jest.fn(() => {
//     return Promise.resolve('result of signInWithEmailAndPassword');
// });

// const signInWithRedirect = jest.fn(() => {
//     return Promise.resolve('result of signInWithRedirect');
// });

// jest.spyOn(firebase, 'initializeApp').mockImplementation(() => {
//     return {
//         auth: () => {
//             return {
//                 createUserWithEmailAndPassword,
//                 signInWithEmailAndPassword,
//                 currentUser: {
//                     sendEmailVerification,
//                 },
//                 signInWithRedirect,
//             };
//         },
//     };
// });

// jest.spyOn(firebase, 'auth').mockImplementation(() => {
//     return {
//         onAuthStateChanged,
//         currentUser: {
//             displayName: 'testDisplayName',
//             email: 'test@test.com',
//             emailVerified: true,
//         },
//         getRedirectResult,
//         sendPasswordResetEmail,
//     };
// });

// firebase.auth.FacebookAuthProvider = jest.fn(() => {});
// firebase.auth.GoogleAuthProvider = jest.fn(() => {});
