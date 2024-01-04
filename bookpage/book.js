import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, addDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
 
const firebaseConfig = {
    apiKey: "AIzaSyAV4hu9LixLMqppId6X2vnq_f9ua0cfvJ4",
    authDomain: "guide-in-kutaisi.firebaseapp.com",
    projectId: "guide-in-kutaisi",
    storageBucket: "guide-in-kutaisi.appspot.com",
    messagingSenderId: "782883009727",
    appId: "1:782883009727:web:7a6edb3b633215cab5020a",
    measurementId: "G-J65TJMC0TG"
};
const serviceId = 'service_svqzfb1'
const templateId = 'template_qgio31r'

const publicKey = 'user_b5zCoR05KiRRYOmYCwcJW'


initializeApp(firebaseConfig)

const db = getFirestore()

const booksColRef = collection(db, 'Books')

let books = []
var trip = JSON.parse(localStorage['trip'])
getDocs(booksColRef)
    .then((snapshot) => {
        snapshot.docs.forEach(doc => {
            books.push({...doc.data(), id: doc.id})
        })
        books = books.filter(book => book.tripId == trip.id)
    })
    .catch(err => {
        console.log(err)
    }) 

const tripName = document.querySelector('.tripName')
const durationPlace = document.querySelector('.time')
const locationPlace = document.querySelector('.location')
const peoplePlace = document.querySelector('.people')
const pricePlace = document.querySelector('.price')
const imgArea = document.querySelector('.img').children[0]
const carouselArea = document.querySelector('.carousel-inner')

let toCarouselImg = (src, index) => {
    carouselArea.innerHTML += `<div class="carousel-item ${index == 0? 'active': ''}">
                <img src="${src}" class="d-block w-100" alt="...">
            </div>`
}

var templateParams = {
    to_email: 'guideinkutaisiofficial@gmail.com',
    from_email: 'guideinkutaisiofficial@gmail.com',
    trip_name: trip.name,
    trip_location: trip.location,
    trip_price: trip.sale != 0 ? 'GEL ' + trip.price * ((100 - trip.sale)/100) + '.00' : 'GEL ' + trip.price + '.00',
    book_date: '',
    client_email: ''
}

tripName.innerHTML = trip.name
durationPlace.innerHTML = trip.duration % 60 != 0 && trip.duration > 60 ? Math.trunc(trip.duration / 60 ) + ' Hour(s) ' + trip.duration % 60 + ' Minute(s)': '0 Hour(s) ' + trip.duration + ' Minute(s)'
locationPlace.innerHTML = trip.location
peoplePlace.innerHTML = trip.max_people + ' People'
pricePlace.innerHTML = trip.sale != 0 ? 'GEL ' + trip.price * ((100 - trip.sale)/100) + '.00' : 'GEL ' + trip.price + '.00'
imgArea.src = trip.image
trip.additional_images.forEach((img,ind) => {
    toCarouselImg(img,ind)
})

// header 
const header = document.querySelector('header')

window.addEventListener('scroll', function(){
    if(window.scrollY > window.screen.height - 200){
        header.style.backgroundColor = 'rgba(237, 150, 71, 0.60)'
    } else {
        header.style.backgroundColor = 'transparent'
    }
})

var today = new Date().toISOString().split('T')[0];
// date range picker
const bookDate = document.getElementById('bookDate')
bookDate.setAttribute('min', today);
const bookBtn = document.getElementById('bookBtn')
const validation = document.querySelector('.red')
const emailInp = document.getElementById('bookEmail')

const modalBody = document.querySelector('.modal-body')
let forModalBody =(date, email) => `<p>${date}</p>
                    <p class="email">${email}</p>`;

const confirmBtn = document.querySelector('.confirm')
bookBtn.addEventListener('click', () => {
    if(bookDate.value == '' || emailInp.value == ''){
        if(validation.classList.contains('d-none')){
            validation.classList.remove('d-none')
            emailInp.classList.add('red-inp')
            bookBtn.classList.add('red-inp')
            bookDate.classList.add('red-inp')
        }
        modalBody.innerHTML = '<p class="red">Please Fill In Correct Information</p>'
    } else {
        if(!validation.classList.contains('d-none')){
            validation.classList.add('d-none')
            emailInp.classList.remove('red-inp')
            bookBtn.classList.remove('red-inp')
            bookDate.classList.remove('red-inp')
        }
        if(books.length > 0){
            books.forEach(book => {
                if(book.bookDate == bookDate.value){
                    modalBody.innerHTML = '<p class="red">This Date Is Already Booked</p>'
                    confirmBtn.style.display = 'none'
                } else {
                    confirmBtn.style.display = 'block'
                    modalBody.innerHTML = forModalBody(bookDate.value, emailInp.value)
                }
            })
        } else {
            confirmBtn.style.display = 'block'
            modalBody.innerHTML = forModalBody(bookDate.value, emailInp.value)
        }
        
    }
})

confirmBtn.addEventListener('click', () => {
    addDoc(booksColRef, {
        bookDate: bookDate.value,
        bookEmail: emailInp.value,
        paymentStatus: false,
        tripId: trip.id
    })
    .then(() => {
        modalBody.innerHTML = '<p class="green">Your Trip Is Booked Please Check Your Email</p>'
        confirmBtn.style.display = 'none'
        templateParams.book_date = bookDate.value
        templateParams.client_email = emailInp.value
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then(() => {
                templateParams.to_email = emailInp.value
                emailjs.send(serviceId, templateId, templateParams, publicKey)
                    .then(()=> {
                        window.location.reload()
                    })
                    .catch(err => {
                        console.log(err.message, 'To Client')
                    })
            })
            .catch(err => {
                console.log(err.message, 'To Me')
            })
    })
    .catch(err => {
        console.log(err.message)
    })
})