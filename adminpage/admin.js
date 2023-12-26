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
const tripsColRef = collection(db, 'Trips')
const cuisineColRef = collection(db, 'Cuisine')
const bookColRef = collection(db, 'Books')

let adminUsers = []
let trips = []
let cuisine = []
let books = []

getDocs(colRef)
    .then(snap => {
        snap.docs.forEach(doc => {
            adminUsers.push({...doc.data(), id: doc.id})
        })
    })
    .catch(err => {
        console.log(err.message)
    })

getDocs(tripsColRef)
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            trips.push({...doc.data(), id: doc.id})
        })
    })
    .catch(err => {
        console.log(err.message)
    })

getDocs(cuisineColRef)
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            cuisine.push({...doc.data(), id: doc.id})
        })
    })
    .catch(err => {
        console.log(err.message)
    })

getDocs(bookColRef)
    .then(snapshot => {
        snapshot.docs.forEach(doc => {
            books.push({...doc.data(), id: doc.id})
        })
    })
    .catch(err => {
        console.log(err.message)
    })

// get data in accordion
const tripsBody = document.querySelector('.trips-body')
const cuisineBody = document.querySelector('.cuisine-body')
const booksBody = document.querySelector('.books-body')

const toBooksBody = obj => {
    let tableRow = `<tr>
                        <td>${obj.bookDate}</td>
                        <td>${obj.bookEmail}</td>
                        <td>${obj.tripId}</td>
                        <td>${obj.paymentStatus ? '<span class="green"> Payed </span>' : '<span class="red"> Not Payed </span>'}</td>
                        <td id="${obj.id}"><span class='red'>Delete</span> <span class='green'>Update</span></td>
                    </tr>`
    return tableRow
}

const toTripsBody = obj => {
    let tableRow = `<tr>
                        <td>${obj.type}</td>
                        <td>${obj.name}</td>
                        <td>${obj.location}</td>
                        <td>${obj.duration}</td>
                        <td>${obj.max_people}</td>
                        <td>${obj.price}</td>
                        <td>${obj.sale}</td>
                        <td>${obj.image}</td>
                        <td>${obj.additional_images}</td>
                        <td id="${obj.id}"><span class='red'>Delete</span> <span class='green'>Update</span></td>
                        
                    </tr>`
    return tableRow
}
setTimeout(() => {
    trips.forEach(trip => {
        tripsBody.innerHTML += toTripsBody(trip)
    })
    books.forEach(book => {
        booksBody.innerHTML += toBooksBody(book)
    })
}, 1000)

const usernameinp = document.querySelector('#username')
const passinp = document.querySelector('#pass')
const btn = document.querySelector('.btn')

// btn.addEventListener('click', function(){
//     let username = usernameinp.value
//     let pass = passinp.value
//     adminUsers.forEach(admin => {
//         if(username == admin.Username && pass == admin.Password){
//             pass
//             // render main admin page
//         }
//     })
// })