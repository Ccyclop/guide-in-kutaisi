import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
 
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
        let trips = []
        snapshot.docs.forEach(doc => {
            trips.push({ ...doc.data(), id: doc.id })
        })
        trips.forEach(trip => {
            toCard(trip)
        })
    })
    .catch(err => {
        console.log(err.message)
    })

const cardBox = document.querySelector('.card-area')

const toCard = obj => {
    let card = `<div class="card ${obj.type} ${obj.location}" id="${obj.id}" style="width: 20rem;">
    <div class="card-img-top">
        <img src="${obj.image}" alt="...">
    </div>
    <div class="card-body">
        <h5 class="card-title">${obj.name}</h5>
        <hr>
        <div class="card-text d-flex flex-column gap-2">
            <div class="duration">
                <i class="fa-regular fa-clock orange"></i>
                <p class="poppins">${obj.duration % 60 != 0 && obj.duration > 60 ? Math.trunc(obj.duration / 60) + ' Hour(s)' + ' ' + obj.duration % 60 + ' Minute(s)': obj.duration + ' Minute(s)'}</p>
            </div>
            <div class="location">
                <i class="fa-solid fa-location-dot orange"></i>
                <p class="poppins">${obj.location}</p>
            </div>
            <div class="max-people">
                <i class="fa-solid fa-people-group orange"></i>
                <p class="poppins">${obj.max_people} Pax</p>
            </div>
        </div>
        <div class="card-f d-flex justify-content-between align-items-end col-md-12">
            <a href="#" class="btn btn-primary card-btn">Book</a>
            <div class="price-box d-flex flex-column align-items-end gap-1">
                <span style='display: ${obj.sale != 0 ? 'block;': 'none;'}' class='no-price'>GEL${obj.price}</span>
                <span class="price">GEL${obj.sale != 0 ? obj.price * ((100 - obj.sale)/100) : obj.price}</span>
            </div>
        </div>
    </div>
</div>`
    
    cardBox.innerHTML += card

}

const header = document.querySelector('header')

window.addEventListener('scroll', function () {
    if (window.scrollY > window.screen.height - 200) {
        header.style.backgroundColor = 'rgba(237, 150, 71, 0.60)'
    } else {
        header.style.backgroundColor = 'transparent'
    }
})

