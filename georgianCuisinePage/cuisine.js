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

const colRef = collection(db, 'Cuisine') 

const cuisineCardArea = document.querySelector('.cards-bar')

const toCuisineCard = obj => {
    let card = `<div class="card ${obj.type.toLowerCase()}" id="${obj.id}" style="width: 20rem;">
                    <div class="card-img-top">
                        <img src="${obj.image}" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${obj.name}</h5>
                        <hr>
                        <div class="card-f d-flex justify-content-between align-items-end col-md-12">
                            <a href="" class="btn btn-primary card-btn">Order</a>
                            <div class="price-box d-flex flex-column align-items-end gap-1">
                                <span style='display: ${obj.sale != 0 ? 'block;': 'none;'}' class='no-price'>GEL${obj.price}</span>
                                <span class="price">GEL${obj.sale != 0 ? obj.price * ((100 - obj.sale)/100) : obj.price}</span>
                            </div>
                        </div>  
                    </div>
                </div>`
    cuisineCardArea.innerHTML += card
}

var cards;
let cuisineCards = []
getDocs(colRef)
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            cuisineCards.push({...doc.data(), id: doc.id})
        })
        cuisineCards.forEach(o => {
            toCuisineCard(o)
        })
        cards = document.querySelectorAll('.card')
    })
    .catch(err => console.log(err.message))


const nameFilterInput = document.querySelector('#tourName')
const typeFilterSelect = document.querySelector('#tourType')

typeFilterSelect.addEventListener('change', () => {
    let val = typeFilterSelect.options[typeFilterSelect.selectedIndex].text
    if(val != 'Select Type') {
        let typeFilteredCards = [...cards].filter(card => card.classList.contains(val.split(' ')[1].toLowerCase()))
        cards.forEach(card => card.style.display = 'none')
        typeFilteredCards.forEach(card => card.style.display = 'flex')
    } else {
        cards.forEach(card => card.style.display = 'flex')
    }

})

nameFilterInput.addEventListener('keyup', () => {
    let val = nameFilterInput.value
    let filteredCards = [...cards].filter(o => o.children[1].children[0].innerText.toLowerCase().includes(val))
    cards.forEach(o => o.style.display = 'none')
    filteredCards.forEach(o => o.style.display = 'flex')
})