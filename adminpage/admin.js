import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyAV4hu9LixLMqppId6X2vnq_f9ua0cfvJ4",
    authDomain: "guide-in-kutaisi.firebaseapp.com",
    projectId: "guide-in-kutaisi",
    storageBucket: "guide-in-kutaisi.appspot.com",
    messagingSenderId: "782883009727",
    appId: "1:782883009727:web:7a6edb3b633215cab5020a",
    measurementId: "G-J65TJMC0TG"
};

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'Admins')

let adminUsers = []

getDocs(colRef)
    .then(snap => {
        snap.docs.forEach(doc => {
            adminUsers.push({...doc.data(), id: doc.id})
        })
    })
    .catch(err => {
        console.log(err.message)
    })

const usernameinp = document.querySelector('#username')
const passinp = document.querySelector('#pass')
const btn = document.querySelector('.btn')

btn.addEventListener('click', function(){
    let username = usernameinp.value
    let pass = passinp.value
    adminUsers.forEach(admin => {
        if(username == admin.Username && pass == admin.Password){
            pass
            // render main admin page
        }
    })
})