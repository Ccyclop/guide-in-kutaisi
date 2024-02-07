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

let trips = []
var cardBtn;
getDocs(colRef)
    .then((snapshot) => {
        snapshot.docs.forEach(doc => {
            trips.push({ ...doc.data(), id: doc.id })
        })
        let firstThree = [...trips]
        firstThree.splice(0,3).forEach(trip => {
            toCard(trip)
        })
        //to book page
        cardBtn = document.querySelectorAll('.card-btn')
        cardBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                let tripId = btn.parentElement.parentElement.parentElement.id
                localStorage['trip'] = JSON.stringify(trips.filter(trip => trip.id == tripId)[0])
            })
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
                <p class="poppins">${obj.duration % 60 != 0 || obj.duration > 60 ? Math.trunc(obj.duration / 60) + ' Hour(s)' + ' ' + obj.duration % 60 + ' Minute(s)': '0 Hour(s) ' + obj.duration + ' Minute(s)'}</p>
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
            <a href="./bookpage/book.html" class="btn btn-primary card-btn">Book</a>
            <div class="price-box d-flex flex-column align-items-end gap-1">
                <span style='display: ${obj.sale != 0 ? 'block;': 'none;'}' class='no-price'>GEL${obj.price}</span>
                <span class="price">GEL${obj.sale != 0 ? obj.price * ((100 - obj.sale)/100) : obj.price}</span>
            </div>
        </div>
    </div>
</div>`
    
    cardBox.innerHTML += card

}


const responsivenavbar = document.querySelector('.container-fluid')
const navLinks = document.querySelectorAll('.nav-link')
const img = document.querySelector('.logo').querySelector('img')

window.addEventListener('scroll', function () {
    if (window.scrollY > window.screen.height - 200) {
        responsivenavbar.style.backgroundColor = 'rgba(83, 83, 83, 0.1)'
        navLinks.forEach(elem => elem.style.color = 'black')
        img.src = './Images/main_logo.png'
    } else {
        responsivenavbar.style.backgroundColor = 'transparent'
        navLinks.forEach(elem => elem.style.color = 'white')
        img.src = './Images/main_logo.png'
    }
})

let individualOptions = `
    <option selected value="">Select Tour Location...</option>
    <option value="">Martvili Canyon</option>
    <option value="">Okatse Canyon</option>
    <option value="">Okatse Waterfall</option>
    <option value="">Prometheus Cave</option>
    <option value="">Sataflia</option>
    <option value="">Tetra Cave</option>
`
let transferOptions = `
    <option selected value="">Select Tour Location...</option>
    <option value="">Batumi</option>
    <option value="">Kobuleti</option>
    <option value="">Ureki</option>
    <option value="">Kutaisi</option>
    <option value="">Borjomi</option>
    <option value="">Bakuriani</option>
    <option value="">Gudauri</option>
    <option value="">Mestia</option>
    <option value="">Tbilisi</option>
`

let groupTransfer = `
    <option selected value="">Select Tour Location...</option>
    <option value="">3 Days In Kutaisi</option>
    <option value="">5 Days In Georgia</option>
    <option value="">10 Days In Georgia</option>
`


const typeSelect = document.getElementById('tourType')
const locationSelect = document.getElementById('tourLocation')

typeSelect.addEventListener('change', () => {
    let selectedItem = typeSelect.options[typeSelect.selectedIndex].text
    if(selectedItem == 'Individual Tours'){
        //options
        locationSelect.innerHTML = individualOptions
    } else if(selectedItem == 'Transfers'){
        //options
        locationSelect.innerHTML = transferOptions
    } else {
        //options
        locationSelect.innerHTML = groupTransfer
    }
})

const nameSearch = document.querySelector('#tourName')
const filterBtn = document.querySelector('.filterBtn')

filterBtn.addEventListener('click', () => {
    localStorage['filter'] = JSON.stringify({
        'name': nameSearch.value,
        'type': typeSelect.options[typeSelect.selectedIndex].text,
        'location': locationSelect.options[locationSelect.selectedIndex].text
    })
})