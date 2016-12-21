import firebase from './base'

const auth = firebase.auth()

auth.onAuthStateChange = (user, error) => {
    console.warn(error)

    if (user === null) {
        console.log('logged off')
        return
    }

    console.log(user)
}

export default auth
