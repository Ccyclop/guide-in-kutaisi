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

//filter
const tripName = document.getElementById('tourName')
const cards = document.querySelectorAll('.card')
var typeFilteredCards = []

typeSelect.addEventListener('change', () => {
    var selectedItem = typeSelect.options[typeSelect.selectedIndex].text
    if(selectedItem == 'Individual Tours'){
        //options
        
        locationSelect.innerHTML = individualOptions
        //filter
        typeFilteredCards = [...cards].filter((item) => {
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
        typeFilteredCards = [...cards].filter(i => i.classList.contains('Transfers'))
        cards.forEach(o => o.style.display = 'none')
        typeFilteredCards.forEach(o => o.style.display = 'flex')
    } else if(selectedItem == 'Select Tour Type...'){
        //filter
        cards.forEach(o => o.style.display = 'flex')
    } else {
        //options
        locationSelect.innerHTML = groupTransfer
    }
    
})

locationSelect.addEventListener('change', () => {
    //filter
    var selectedItem = locationSelect.options[locationSelect.selectedIndex].text
    var locationFilteredCard = typeFilteredCards.filter(o => o.classList.contains(selectedItem.split(' ')[0]))
    cards.forEach(o => o.style.display = 'none')
    locationFilteredCard.forEach(o => o.style.display = 'flex')
})

tripName.addEventListener('keyup', function(){
    let value = tripName.value
    let filteredCards = [...cards].filter(o => o.children[1].children[0].innerText.toLowerCase().includes(value))
    cards.forEach(o => o.style.display = 'none')
    filteredCards.forEach(o => o.style.display = 'flex')
})






