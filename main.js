import { initializeApp }  from '/node_modules/firebase/app';
import { getFirestore, collection, getDocs } from "/node_modules/firebase/firestore"

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

const colRef = collection(db, 'Trips') 

getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs)
    })

const header = document.querySelector('header')

window.addEventListener('scroll', function () {
    if (window.scrollY > window.screen.height - 200) {
        header.style.backgroundColor = 'rgba(237, 150, 71, 0.60)'
    } else {
        header.style.backgroundColor = 'transparent'
    }
})

