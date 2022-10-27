//const {validationsResult} = require('express-validator')


const btn = document.querySelector('#btn')

btn.addEventListener('click', evento => {
    evento.preventDefault()

    Swal.fire({
        title: "Hola"
    })
})