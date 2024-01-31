import { initializeApp }  from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {getFirestore, collection, getDocs, addDoc, deleteDoc, doc , updateDoc} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"

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

const modalBody = document.querySelector('.modal-body')
const tripsBody = document.querySelector('.trips-body')
const cuisineBody = document.querySelector('.cuisine-body')
const booksBody = document.querySelector('.books-body')

var tripsDeleteBtns, booksDeleteBtns, cuisineDeleteBtns;
var tripsUpdateBtns, booksUpdateBtns, cuisineUpdateBtns;

var modalSubmitButton;

let booksUpdateInps = obj => {
    let inps = `
    <div class="d-flex flex-column">
            <label for="bookUpdateDate">Book Date (YYYY-MM-DD)</label>
            <input type="text" name="" id="bookUpdateDate" value="${obj.bookDate}">
          </div>
          <div class="d-flex flex-column">
            <label for="bookUpdateDate">Book Email</label>
            <input type="email" name="" id="bookUpdateEmail" value="${obj.bookEmail}">
          </div>
          <div class="d-flex flex-column">
            <label for="bookUpdateDate">Booked Trip Id</label>
            <input type="text" name="" id="bookUpdateId" value="${obj.tripId}">
          </div>
          <label for="bookUpdateDate">Payment Statys</label>
          <input type="checkbox" name="" id="bookUpdatePayment" ${obj.paymentStatus ? 'checked': ''}>
    `

    return inps
}

let cuisineUpdateInps = obj => {
    let inps = `
    <div class="d-flex flex-column">
    <label for="cuisineUpdateType">Type</label>
    <select name="" id="cuisineUpdateType">
        <option ${obj.type == 'snack'? 'selected':''}>snack</option>
        <option ${obj.type == 'alchohol'? 'selected':''}>alchohol</option>
    </select>
    </div>
    <div class="d-flex flex-column">
    <label for="cuisineUpdateName">Name</label>
    <input type="text" name="" id="cuisineUpdateName" value="${obj.name}">
    </div>
    <div class="d-flex flex-column">
    <label for="cuisineUpdateImage">Image</label>
    <input type="text" name="" id="cuisineUpdateImage" value="${obj.image}">
    </div>
    <div class="d-flex flex-column">
    <label for="cuisineUpdateSale">Sale</label>
    <input type="number" name="" id="cuisineUpdateSale" value="${obj.sale}">
    </div>
    <div class="d-flex flex-column">
    <label for="cuisineUpdatePrice">Price</label>
    <input type="number" name="" id="cuisineUpdatePrice" value="${obj.price}">
    </div>
    `

    return inps
}

let tipUpdateInps = obj => {
    let inps = `
    <div class="d-flex flex-column">
        <label for="tripUpdateType">Type</label>
        <select id="updateType">
            <option ${obj.type == 'Individual'? 'selected' : ''}>Individual</option>
            <option ${obj.type == 'Transfer'? 'selected' : ''}>Transfer</option>
            <option ${obj.type == 'Group'? 'selected' : ''}>Group</option>
        </select>
    </div>
    <div class="d-flex flex-column">
    <label for="tripUpdateName">Name</label>
    <input type="text" name="" id="tripUpdateName" value="${obj.name}">
    </div>
    <div class="d-flex flex-column">
    <label for="tripUpdateDescription">Description</label>
    <input type="text" name="" id="tripUpdateDescription" value="${obj.description}">
    </div>
    <div class="d-flex flex-column">
    <label for="tripUpdateLocation">Location</label>
    <input type="text" name="" id="tripUpdateLocation" value="${obj.location}">
    </div>
    <div class="d-flex flex-column">
    <label for="tripUpdateMainImage">Main Image</label>
    <input type="text" name="" id="tripUpdateMainImage" value="${obj.image}">
    </div>
    <div class="d-flex flex-column">
    </div>
    <div class="d-flex flex-column">
    <label for="tripUpdateDuration">Duration</label>
    <input type="number" id="tripUpdateDuration" value="${obj.duration}">
    </div>
    <div class="d-flex flex-column">
    <label for="tripUpdateMaxPeople">Max People</label>
    <input type="number" name="" id="tripUpdateMaxPeople" value="${obj.max_people}">
    </div>
    <div class="d-flex flex-column">
    <label for="updateSale">Sale</label>
    <input type="number" name="" id="updateSale" value="${obj.sale}">
    </div>
    <div class="d-flex flex-column">
    <label for="updatePrice">Price</label>
    <input type="number" name="" id="updatePrice" value="${obj.price}">
    </div>
    <label for="additionalImages">Additional Images</label>
    `

    return inps
}



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
        tripsUpdateBtns = document.querySelectorAll('.tru')
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
        tripsUpdateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modalBody.innerHTML = tipUpdateInps(trips.filter(trip => trip.id == btn.parentElement.id)[0])
                modalBody.id = btn.parentElement.id
                let addImageInps = document.createElement('div')
                addImageInps.classList.add('add-image-inps')
                modalBody.appendChild(addImageInps)
                let trip = trips.filter(el => el.id == btn.parentElement.id)
                trip[0].additional_images.forEach(image => {
                    let inputToAdd = document.createElement('input')
                    inputToAdd.type = 'text'
                    inputToAdd.classList.add('additional-image')
                    inputToAdd.value = image
                    addImageInps.appendChild(inputToAdd)
                })
                modalSubmitButton = document.querySelector('.mdlbtn')
                modalSubmitButton.addEventListener('click', () => {
                    let docRef = doc(db, 'Trips', modalBody.id)
                    let inputs = modalBody.querySelectorAll('input')
                    let select = modalBody.querySelector('#updateType')
                    let additionalImagesUpdateInps = addImageInps.querySelectorAll('input')
                    let additionalImagesUpdateValues = []
                    additionalImagesUpdateInps.forEach(inp => {
                        additionalImagesUpdateValues.push(inp.value)
                    })
                    let document = {
                        name: [...inputs].filter(inp => inp.id == 'tripUpdateName')[0].value,
                        type: select.options[select.selectedIndex].text,
                        location: [...inputs].filter(inp => inp.id == 'tripUpdateLocation')[0].value,
                        image: [...inputs].filter(inp => inp.id == 'tripUpdateMainImage')[0].value,
                        additional_images: additionalImagesUpdateValues,
                        duration: [...inputs].filter(inp => inp.id == 'tripUpdateDuration')[0].value,
                        max_people: [...inputs].filter(inp => inp.id == 'tripUpdateMaxPeople')[0].value,
                        sale: [...inputs].filter(inp => inp.id == 'updateSale')[0].value,
                        price: [...inputs].filter(inp => inp.id == 'updatePrice')[0].value,
                        description: [...inputs].filter(inp => inp.id == 'tripUpdateDescription')[0].value
                    }
                    updateDoc(docRef, document)
                        .then(() => alert('updated'))
                        .catch(err => alert(err.message))
                })
                
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
        cuisineUpdateBtns = document.querySelectorAll('.cuu')
        cuisineUpdateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modalBody.innerHTML = cuisineUpdateInps(cuisine.filter(o => o.id == btn.parentElement.id)[0])
                modalBody.id = btn.parentElement.id
                let modalSubmitButton = document.querySelector('.mdlbtn')
                modalSubmitButton.addEventListener('click', () => {
                    let docRef = doc(db, 'Cuisine', modalBody.id)
                    let inputs = modalBody.querySelectorAll('input')
                    let select = modalBody.querySelector('#cuisineUpdateType')
                    let document = {
                        type: select.options[select.selectedIndex].text,
                        name: [...inputs].filter(inp => inp.id == 'cuisineUpdateName')[0].value,
                        image: [...inputs].filter(inp => inp.id == 'cuisineUpdateImage')[0].value,
                        sale: [...inputs].filter(inp => inp.id == 'cuisineUpdateSale')[0].value,
                        price: [...inputs].filter(inp => inp.id == 'cuisineUpdatePrice')[0].value,
                    }
                    updateDoc(docRef, document)
                        .then(() => alert('Updated'))
                        .catch(err => alert(err.message))
                })
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
        booksUpdateBtns = document.querySelectorAll('.bku')
        booksUpdateBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modalBody.innerHTML = booksUpdateInps(books.filter(o => o.id == btn.parentElement.id)[0])
                modalBody.id = btn.parentElement.id
                let modalSubmitButton = document.querySelector('.mdlbtn')
                modalSubmitButton.addEventListener('click', () => {
                    let docRef = doc(db, 'Books', modalBody.id)
                    let inputs = modalBody.querySelectorAll('input')
                    let document = {
                        bookDate: [...inputs].filter(inp => inp.id == 'bookUpdateDate')[0].value,
                        bookEmail: [...inputs].filter(inp => inp.id == 'bookUpdateEmail')[0].value,
                        tripId: [...inputs].filter(inp => inp.id == 'bookUpdateId')[0].value,
                        paymentStatus: [...inputs].filter(inp => inp.id == 'bookUpdatePayment')[0].checked,
                    }
                    updateDoc(docRef, document)
                        .then(() => alert('updated'))
                        .catch(err => alert(err.message))
                })
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
                        <td id="${obj.id}"><span class='red bk'>Delete</span> <span class='green bku' data-bs-toggle="modal" data-bs-target="#exampleModal">Update</span></td>
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
    <td id="${obj.id}"><span class='red cu'>Delete</span> <span class='green cuu' data-bs-toggle="modal" data-bs-target="#exampleModal">Update</span></td>   
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
                        <td id="${obj.id}"><span class='red tr'>Delete</span> <span class='green tru' data-bs-toggle="modal" data-bs-target="#exampleModal">Update</span></td>
                        
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
  <input type="number" placeholder="ramdeni foto ginda" class="fotoCount">
  <button id='addInps'> ADD </button>  
  
</div>
<input type="number" name="" placeholder="sale %-shi (tu ar ari 0 chawere)" id="sale">
<input type="number" name="" placeholder="fasi" id="price">
<input type="number" name="" placeholder="xalxis max raodenoba" id="maxPeople">
<input type="number" name="" placeholder="xangrdzlivoba wutebshi" id="duration">
<input type="text" name="" placeholder="agwera" id="description">
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
    const addImageCount = document.querySelector('.fotoCount')
    const additionalImageAdd = document.querySelector('#addInps')
    const area = document.querySelector('.add-image-area')
    additionalImageAdd.addEventListener('click',() => {
        area.innerHTML = ''
        for(var i = 0; i < addImageCount.value; i++){
            area.innerHTML += '<input type="text" placeholder="damatebiti foto linki" class="addImage">'
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
            description: document.getElementById('description').value,
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
const btn = document.querySelector('.loginBtn')
const loginarea = document.getElementById('login')
const adminPanel = document.getElementById('adminPanel')

btn.addEventListener('click', function(){
    let username = usernameinp.value
    let pass = passinp.value
    adminUsers.forEach(admin => {
        if(username == admin.Username && pass == admin.Password){
            loginarea.style.display = 'none'
            adminPanel.style.display = 'flex'
        } else {
            alert('wrong credentials')
        }
    })
})