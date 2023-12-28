import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

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


const tripsBody = document.querySelector('.trips-body')
const cuisineBody = document.querySelector('.cuisine-body')
const booksBody = document.querySelector('.books-body')

var tripsDeleteBtns, booksDeleteBtns, cuisineDeleteBtns;

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
        trips.forEach(trip => {
            tripsBody.innerHTML += toTripsBody(trip)
        })
        tripsDeleteBtns = document.querySelectorAll('.tr')
        tripsDeleteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let id = btn.parentElement.id
                let docRef = doc(db, 'Trips', id)
                deleteDoc(docRef)
                    .then(() => window.location.reload())
                    .catch((err) => alert(`ver waishala - ${err.message}`))
            })
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
        cuisine.forEach(card => {
            cuisineBody.innerHTML += toCuisineBody(card)
        })
        cuisineDeleteBtns = document.querySelectorAll('.cu')
        cuisineDeleteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let id = btn.parentElement.id
                let docRef = doc(db, 'Cuisine', id)
                deleteDoc(docRef)
                    .then(() => window.location.reload())
                    .catch(err => alert(`ver waishala - ${err.message}`))
            })
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
        books.forEach(book => {
            booksBody.innerHTML += toBooksBody(book)
        })
        booksDeleteBtns = document.querySelectorAll('.bk')
        booksDeleteBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                let id = btn.parentElement.id
                let docRef = doc(db, 'Books', id)
                deleteDoc(docRef)
                    .then(() => window.location.reload())
                    .catch(err => alert(`ver waishala - ${err.message}`))
            })
        })
    })
    .catch(err => {
        console.log(err.message)
    })

// get data in accordion

const toBooksBody = obj => {
    let tableRow = `<tr>
                        <td>${obj.bookDate}</td>
                        <td>${obj.bookEmail}</td>
                        <td>${obj.tripId}</td>
                        <td>${obj.paymentStatus ? '<span class="green"> Payed </span>' : '<span class="red"> Not Payed </span>'}</td>
                        <td id="${obj.id}"><span class='red bk'>Delete</span> <span class='green'>Update</span></td>
                    </tr>`
    return tableRow
}

const toCuisineBody = obj => {
    let tableRow = `<tr>
    <td>${obj.type}</td>
    <td>${obj.name}</td>
    <td>${obj.image}</td>
    <td>${obj.price}</td>
    <td>${obj.sale}</td>
    <td id="${obj.id}"><span class='red cu'>Delete</span> <span class='green'>Update</span></td>   
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
                        <td id="${obj.id}"><span class='red tr'>Delete</span> <span class='green'>Update</span></td>
                        
                    </tr>`
    return tableRow
}

const cuisineAddBtn = document.querySelector('.cuisineAddBtn')
const tripAddBtn = document.querySelector('.tripAddBtn')
const offcanvas = document.querySelector('.body-e')
var offcanvasAddBtn;

let tripAddInps = `<input type="text" name="" placeholder="saxeli" id="tripName">
<input type="text" name="" placeholder="lokacia - tu groupia dawere (ricxvi) mxolod ramden dgiania" id="tripLocation">
<input type="text" name="" placeholder="mtavari foto linki" id="tripImage">
<select id="tripType">
    <option value='' selected >turis tipi</option>
    <option value=''>Transfer</option>
    <option value=''>Individual</option>
    <option value=''>Group</option>
</select>
<div class="add-image-area">
  <input type="text" placeholder="damatebiti foto linki" class="addImage">
  <input type="text" placeholder="damatebiti foto linki" class="addImage">
  <button class="add-additional">Add</button>
</div>
<input type="number" name="" placeholder="sale %-shi (tu ar ari 0 chawere)" id="sale">
<input type="number" name="" placeholder="fasi" id="price">
<input type="number" name="" placeholder="xalxis max raodenoba" id="maxPeople">
<input type="number" name="" placeholder="xangrdzlivoba wutebshi" id="duration">
<button class="btn btn-primary tripSubmitBtn">Submit</button>`

let cuisineAddInps = `<select name="" id="typeSelect">
<option selected value="">Select type</option>
<option value="">snack</option>
<option value="">alchohol</option>
</select>
<input type="text" name="" id="cuisineName" placeholder="dasaxeleba">
<input type="text" name="" id="cuisineImage" placeholder="fotos linki">
<input type="number" name="" id="sale" placeholder="fasdakleba %-shi (tu ar aris 0 dawere)">
<input type="number" name="" id="price" placeholder="fasi">
<button class="btn btn-primary" id="finalConfirmBtn">Submit</button>`

const closeBtn = document.querySelector('.btn-close')

tripAddBtn.addEventListener('click', () => {
    offcanvas.innerHTML = tripAddInps
    offcanvasAddBtn = document.querySelector('.tripSubmitBtn')
    const additionalImageAdd = document.querySelector('.add-additional')
    const area = document.querySelector('.add-image-area')
    additionalImageAdd.addEventListener('click',() => {
        if(area.children.length != 5) {
            area.innerHTML += `<input type="text" placeholder="damatebiti foto linki" class="addImage">`
        } else {
            console.log('meti agar')
        }
    })
    offcanvasAddBtn.addEventListener('click', ()=> {
        let additionalImagesValues = []
        const additionalImages = document.querySelectorAll('.addImage')
        additionalImages.forEach(image => additionalImagesValues.push(image.value))
        let tripType = document.getElementById('tripType')
        addDoc(tripsColRef, {
            type: tripType.options[tripType.selectedIndex].text,
            sale: document.getElementById('sale').value,
            price: document.getElementById('price').value,
            name: document.getElementById('tripName').value,
            max_people: document.getElementById('maxPeople').value,
            location: document.getElementById('tripLocation').value,
            image: document.getElementById('tripImage').value,
            duration: document.getElementById('duration').value,
            additional_images: additionalImagesValues
        })
        .then(() => {
            closeBtn.click()
        })
        .catch(err => {
            console.log(err.message)
        })
    })
})

cuisineAddBtn.addEventListener('click', () => {
    offcanvas.innerHTML = cuisineAddInps
    offcanvasAddBtn = document.querySelector('#finalConfirmBtn')
    offcanvasAddBtn.addEventListener('click', () => {
        let cuisineType = document.querySelector('#typeSelect')
        addDoc(cuisineColRef, {
            type: cuisineType.options[cuisineType.selectedIndex].text,
            sale: document.getElementById('sale').value,
            price: document.getElementById('price').value,
            name: document.getElementById('cuisineName').value,
            image: document.getElementById('cuisineImage').value
        })
        .then(() => {
            closeBtn.click()
        })
        .catch(err => alert(`ver daemata - ${err.message}`))
    })
})

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