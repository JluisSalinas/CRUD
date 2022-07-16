//Inputs
let nombre = document.getElementById('nombre')
let apellido = document.getElementById('apellido')
let correo = document.getElementById('correo')
// boton
let enviar = document.getElementById('enviar')
let actualizar = document.getElementById('actualizar')
//tabla
let tabla = document.getElementById('tabla')

let personas = []

enviar.addEventListener('click', agregar)

function agregar(){
    let persona = {
        nombre: nombre.value,
        apellido: apellido.value,
        correo: correo.value
    }
    personas.push(persona)
    mostrarDatos()
    nombre.value=''
    apellido.value=''
    correo.value=''
}

function mostrarDatos(){
    tabla.innerHTML = ''
    personas.forEach(persona=>{
        tabla.innerHTML +=`
        <tr>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.correo}</td>
            <td><button id="${persona.correo}" class="editar">Editar</button></td>
        </tr>
        ` 
    })
    let botones = Array.from(document.getElementsByClassName('editar'))
    botones.forEach(boton=>boton.addEventListener('click', (event)=>rellenarInputs(event.target.id)))

    actualizar.addEventListener('click', (event)=>editar(event.target.getAttribute('elemento')))
}

function rellenarInputs(id){
    actualizar.setAttribute('elemento', id)
    let personaEncontrada = personas.find((persona)=>persona.correo === id)
    nombre.value = personaEncontrada.nombre
    apellido.value = personaEncontrada.apellido
    correo.value = personaEncontrada.correo
}

mostrarDatos()

function editar(id){
    personas.forEach(persona=>{
        if(persona.correo===id){
            persona.nombre = nombre.value
            persona.apellido = apellido.value
            persona.correo = correo.value
        }
    })
    mostrarDatos()
    nombre.value= ''
    apellido.value= ''
    correo.value= ''
}