import * as firebase from 'firebase'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

firebase.initializeApp({
  apiKey: 'AIzaSyCuJPzcuE4FQX3SU6Hq5oDQYlqvALcI3yo',
  authDomain: 'newagent-xvwbxh.firebaseapp.com',
  databaseURL: 'https://newagent-xvwbxh.firebaseio.com',
  messagingSenderId: '304289394715',
  projectId: 'newagent-xvwbxh',
  storageBucket: 'newagent-xvwbxh.appspot.com',
})

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement,
)
registerServiceWorker()
