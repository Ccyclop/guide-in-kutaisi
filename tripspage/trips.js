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

var cards;
var cardBtn;

getDocs(colRef)
    .then((snapshot) => {
        snapshot.docs.forEach(doc => {
            trips.push({ ...doc.data(), id: doc.id })
        })
        trips.forEach(trip => {
            toCard(trip)
        })
        cards = document.querySelectorAll('.card')
        fillFromLocalStorage()
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

const cardBox = document.querySelector('.cards-bar')

const toCard = obj => {
    let card = `<div class="card ${obj.type} ${obj.location.split(' ')[0].toLowerCase()}" id="${obj.id}" style="width: 20rem;">
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
            <a href="../bookpage/book.html" class="btn btn-primary card-btn">Book</a>
            <div class="price-box d-flex flex-column align-items-end gap-1">
                <span style='display: ${obj.sale != 0 ? 'block;': 'none;'}' class='no-price'>${obj.price}GEL</span>
                <span class="price">${obj.sale != 0 ? obj.price * ((100 - obj.sale)/100) : obj.price}GEL</span>
            </div>
        </div>
    </div>
</div>`
    
    cardBox.innerHTML = card + cardBox.innerHTML

}

var typeFilteredCards = []

function fillLocationSelect(){
    selectedItem = typeSelect.options[typeSelect.selectedIndex].text
    if(selectedItem == 'Individual Tours'){
        //options
        
        locationSelect.innerHTML = individualOptions
        //filter
        typeFilteredCards = [...document.querySelectorAll('.card')].filter((item) => {
            return item.classList.contains('Individual')
        })
        cards.forEach(o => {
            o.style.display = 'none'
        })
        typeFilteredCards.forEach(element => {
            element.style.display = 'flex'
        });
    } else if(selectedItem == 'Transfers'){
        //options
        locationSelect.innerHTML = transferOptions
        //filter
        typeFilteredCards = [...document.querySelectorAll('.card')].filter(i => i.classList.contains('Transfer'))
        cards.forEach(o => o.style.display = 'none')
        typeFilteredCards.forEach(o => o.style.display = 'flex')
    } else if(selectedItem == 'Select Tour Type...'){
        //filter
        locationSelect.innerHTML = defaultOpts
        cards.forEach(o => o.style.display = 'flex')
    } else {
        //options
        locationSelect.innerHTML = groupTransfer
        //filter
        typeFilteredCards = [...document.querySelectorAll('.card')].filter(i => i.classList.contains('Group'))
        cards.forEach(o => o.style.display = 'none')
        typeFilteredCards.forEach(o => o.style.display = 'flex')
    }
}

// options
const typeSelect = document.getElementById('tourType')
const locationSelect = document.getElementById('tourLocation')
 
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
let defaultOpts = `
    <option value="">Select Tour Location...</option>
    <option value="">Please Select Tour Type First</option>
`

//filter
const tripName = document.getElementById('tourName')


// fill from localstorage
var selectedItem; 
var locationSelectedItem;

function fillFromLocalStorage(){
    if(localStorage['filter']) {
        let obj = JSON.parse(localStorage['filter'])
        if(obj.type.length > 0) {
            [...typeSelect.options].filter(o => o.text == obj.type)[0].selected = 'selected'
            fillLocationSelect()
        }
        if(obj.location.length > 0){
            [...locationSelect.options].filter(o => o.text == obj.location)[0].selected = 'selected'
            filterByLocation()
        }
        if(obj.name.length > 0){
            tripName.value = obj.name
            let filteredCards = [...document.querySelectorAll('.card')].filter(o => o.children[1].children[0].innerText.toLowerCase().includes(obj.name.toLowerCase()))
            cards.forEach(o => o.style.display = 'none')
            filteredCards.forEach(o => o.style.display = 'flex')
        }
    }
}


typeSelect.addEventListener('change', () => {
    fillLocationSelect()
})

function filterByLocation(){
    locationSelectedItem = locationSelect.options[locationSelect.selectedIndex].text
    if(locationSelectedItem.split(' ')[0] != 'Please' && locationSelectedItem.split(' ')[0] != 'Select'){
        if(typeSelect.options[typeSelect.selectedIndex].text != 'Transfers'){
            var locationFilteredCard = typeFilteredCards.filter(o => o.classList.contains(locationSelectedItem.split(' ')[0].toLowerCase()))
            cards.forEach(o => o.style.display = 'none')
            locationFilteredCard.forEach(o => o.style.display = 'flex')
        } else {
            var locationFilteredCard = typeFilteredCards.filter(o => o.children[1].children[0].innerText.toLowerCase().includes(locationSelectedItem.split(' ')[0].toLowerCase()))
            cards.forEach(o => o.style.display = 'none')
            locationFilteredCard.forEach(o => o.style.display = 'flex')
        }
        
    }
}

locationSelect.addEventListener('change', () => {
    //filter
    filterByLocation()
})



tripName.addEventListener('keyup', function(){
    let value = tripName.value
    let showingCards = [...document.querySelectorAll('.card')].filter(o => o.style.display != 'none')
    let filteredCards = showingCards.filter(o => o.children[1].children[0].innerText.toLowerCase().includes(value.toLowerCase()))
    cards.forEach(o => o.style.display = 'none')
    filteredCards.forEach(o => o.style.display = 'flex')
})


