import firebase from './base'

const db = firebase.database()

export const dbSetValue = (ref, value) => db
    .ref(ref)
    .set(value)

export const dbGetValue = ref => db
    .ref(ref)
    .once('value')
    .then(snapshot => snapshot)
    .catch(err => {
        throw err
    })

export default db
