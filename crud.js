let productos = []

let tabla = document.getElementById('tabla')  // se pasa como string el nombre del elemento(tabla)// capturar la tabla en JS con document.getElementsById
// se le asigna let, para hacer referencia a todos los cambios con ese nombre"tabla" para no estar escribiendo la linea una y otra vez


function datosTabla() {  // con esta funcion iteramos en los elemennto con (for.each)
    tabla.innerHTML = ''  //insertarlo en html
    let productosLS = localStorage.getItem("savegin") // obtiene kos datos del localstorage con la key(savegin)
        if (productosLS!=null){
        productos=JSON.parse(productosLS)
    }   

    productos.forEach((producto)=>{ // (for.each)actua por cada uno de los elemntos, ejecuta este codigo(abajo<tr>)
        //(+) es para no sobre escribir los datos(base+1...)y se van agregando(nuevo)
        //(muestra el nombre a usar) usar string con variables(signo pesos y llaves) dentro se puede usar cualquir tipo codigo
       //(muestra el tipo  a usar)
      tabla.innerHTML += `
        <tr>
                
            <td>${producto.nombre}</td> 
            <td>${producto.tipo}</td>
            <td>
                <button type="button" class="btn btn-primary" id="${producto.nombre}">
                    Editar
                </button>
            </td>
            <td>
                <button type="button" class="btn btn-danger eliminar" id="${producto.nombre}">
                    Eliminar
                </button>
            </td>
        </tr>`
            
    })

    let deleteButtons = Array.from(document.getElementsByClassName('btn btn-danger eliminar'))
       deleteButtons.forEach((button)=>{
       button.addEventListener('click', (evento)=>elimProduc(evento.target.id))
    })

    

    let editButtons = Array.from(document.getElementsByClassName('btn btn-primary'))
    editButtons.forEach((button)=>{
    button.addEventListener('click', (evento)=>editProduct(evento.target.id))
    })

    actualizar.addEventListener('click', (event)=>updateProduct(event.target.name))

}



datosTabla()

let squareNombre = document.getElementById('nombre') // para obtener el funcionamiento y ttabajar en el DOM  usamos get.elemnteById y repetimos lo mismo que se hizo con (tabla)
let squareTipo = document.getElementById('tipo') // esto obttiene los valores escritos y los agrega a la lista(html)
let squareAgre = document.getElementById('agre') // de igual forma acá


squareAgre.addEventListener('click', agreProd) // boton haga algo al "click" y 2o parametro ejecuta la funcion (agreProduct, ya definida)

function agreProd(){ //para que se agreguen productos a la lista crear una funcion en un solo clik, con los get.elemt de arriba
    let producto = {
        nombre:squareNombre.value,
        tipo: squareTipo.value
    }
    productos.push(producto) // se envia a la array (let=producto)
    localStorage.setItem("savegin",JSON.stringify(productos))    // para llevar inf al localstotage json.strinify(conviete todo a string string)
    datosTabla()
    squareNombre.value= ''
    squareTipo.value= ''
} 



function elimProduc(nombre){    
    
    productos = productos.filter((producto)=>producto.nombre!==nombre)
    localStorage.setItem("savegin",JSON.stringify(productos)) 
    datosTabla()

}


function updateProduct(nombre){
    console.log(nombre)
    productos.forEach(producto=>{
        if(producto.nombre===nombre){
            producto.nombre = squareNombre.value
            producto.tipo = squareTipo.value
       
        }

    })
    localStorage.setItem("savegin",JSON.stringify(productos))

    datosTabla()
    squareNombre.value= ''
    squareTipo.value= ''
    
}
function editProduct(id){
    let productoUnico = productos.find(producto=>id==producto.nombre)
    squareNombre.value=productoUnico.nombre
    squareTipo.value=productoUnico.tipo
    actualizar.name=id


}