import firebase from 'firebase'

class Firebase {
    static config = {
        apiKey: "AIzaSyAbpYBdGNN0uE85pKLwrFmF47nWrd4Hv_0",
        authDomain: "budgetapp-451f8.firebaseapp.com",
        databaseURL: "https://budgetapp-451f8.firebaseio.com",
        messagingSenderId: "1013402237939",
        storageBucket: "budgetapp-451f8.appspot.com",
    }

    constructor() {
        this._firebase = firebase.initializeApp(Firebase.config)
        this._auth = this._firebase.auth()
        this._database = this._firebase.database()
    }

    get auth() {
        return this._auth
    }

    ref(ref) {
        return this._database.ref(ref)
    }

    set(ref, value) {
        return this._database
            .ref(ref)
            .set(value)
    }

    get(ref) {
        return this._database
            .ref(ref)
            .once('value')
            .then(snapshot => snapshot.val())
            .catch(err => {
                throw err
            })
    }
}

export default new Firebase()
