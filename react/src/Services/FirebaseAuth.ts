import * as firebase from 'firebase'

export function googleAuth (): Promise<any> {
  const google = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(google)
}
