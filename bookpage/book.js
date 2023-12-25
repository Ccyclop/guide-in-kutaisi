// header 
const header = document.querySelector('header')

window.addEventListener('scroll', function(){
    if(window.scrollY > window.screen.height - 200){
        header.style.backgroundColor = 'rgba(237, 150, 71, 0.60)'
    } else {
        header.style.backgroundColor = 'transparent'
    }
})

// date range picker
const bookDate = document.getElementById('bookDate')
const bookBtn = document.getElementById('bookBtn')
const validation = document.querySelector('.red')
const emailInp = document.getElementById('bookEmail')
let startDate = ''
let endDate = ''

bookBtn.addEventListener('click', () => {
    if(!localStorage['startDate'] || !localStorage['endDate']){
        if(validation.classList.contains('d-none')){
            validation.classList.remove('d-none')
            emailInp.classList.add('red-inp')
            bookBtn.classList.add('red-inp')
            bookDate.classList.add('red-inp')
        }
    } else {
        startDate = localStorage['startDate']
        endDate = localStorage['endDate']
        localStorage.clear()
        if(!validation.classList.contains('d-none')){
            validation.classList.add('d-none')
            emailInp.classList.remove('red-inp')
            bookBtn.classList.remove('red-inp')
            bookDate.classList.remove('red-inp')
        }
    }
})
