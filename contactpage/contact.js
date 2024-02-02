const inp = document.querySelectorAll('input')
const placeholder_name = document.getElementById('name')
const placeholder_lastname = document.getElementById('lname')
const placeholder_email = document.getElementById('email')

const listOfElements = [placeholder_name, placeholder_lastname, placeholder_email]

inp.forEach((o, index) => {
    o.addEventListener('focusout', function(){
        if(o.value != ''){
            if(listOfElements[index].style.display == 'unset'){
                listOfElements[index].style.display = 'None'
            }
        } else {
            if(listOfElements[index].style.display == 'none'){
                listOfElements[index].style.display = 'unset'
            }
        }
    })
})


const nameInp = document.getElementById('nameInput')
const lnameInp = document.getElementById('lnameInput')
const emailInp = document.getElementById('emailInput')
const txtInp = document.getElementById('txt')
const submit = document.querySelector('.log-in-btn')

submit.addEventListener('click', () => {
    if(emailInp.value != ''){
        let templateParams = {
            client_email: emailInp.value,
            client_name: nameInp.value,
            client_lastname: lnameInp.value,
            client_text: txtInp.value
        }
        emailjs.send('service_svqzfb1', 'template_exy4fzb', templateParams, 'user_b5zCoR05KiRRYOmYCwcJW')
            .then(() => {
                alert('Email Sent')
                setTimeout(() =>{
                    window.location.reload()
                }, 1000)
            })
            .catch(err => {
                console.log(err)
            })
    }
})