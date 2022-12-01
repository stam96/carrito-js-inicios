// Variables
const carrito = document.querySelector("#carrito");
const carritoContenedor = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const borrar = document.querySelector("borrar-curso")
//console.log(carritoContenedor)
let carritoDecompra = [];

//Funciones listener
let cargarListener = () => {
    //Listar Elementos
  listaCursos.addEventListener("click", agregarCurso);
    //Eliminar
  carrito.addEventListener("click", buscarIdcarrito);

  vaciarCarrito.addEventListener("click", vaciarCarro)
};

cargarListener();
//Funciones
//AgregarCurso
function agregarCurso(e) {
  e.preventDefault();
  //console.log(e.target.classList.contains("agregar-carrito"))
  if (e.target.classList.contains("agregar-carrito")) {
    //console.log(e.target.parentElement.parentElement)
    //Acceder a las propiedades
    let cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatos(cursoSeleccionado);
  }

}

function leerDatos(curso) {
  //console.log(curso)
  //Crear un objecto
  let infoCarrito = {
    img: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisar si elemento si existe
  const existeEncarro = carritoDecompra.some(producto => producto.id ===infoCarrito.id)
  //console.log(existeEncarro)
  if(!existeEncarro){
    //Añadir al array el objeto
    carritoDecompra = [...carritoDecompra, infoCarrito];
  }else{
    const curso = carritoDecompra.map(producto =>{
        if(producto.id === infoCarrito.id){
            producto.cantidad++;
            return producto
        }else{
            return producto
        }
    })
    
    carritoDecompra = [...curso]
  }
  //console.log(carritoDecompra)
  carritoPage(carritoDecompra);
}

function carritoPage() {
  //console.log(datoCarro);
  limpiarCarro();   
  carritoDecompra.forEach((curso) => {
    console.log(curso);
    const { img, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
            <img src="${img}" width="100">
            </td>
            <td>
            ${titulo}
            </td>
            <td>
            ${precio}
            </td>
            <td>
            ${cantidad}
            </td>
            <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
            `;
    //console.log(row);
    carritoContenedor.appendChild(row);
  });
}

function limpiarCarro() {
  //carritoContenedor.innerHTML = " "
  while (carritoContenedor.firstChild) {
    carritoContenedor.removeChild(carritoContenedor.firstChild);
  }
}


function buscarIdcarrito(e) {
    //console.log(e.target.classList.contains("borrar-curso"))
    //console.log(e.target.getAttribute("data-id"))
    if(e.target.classList.contains("borrar-curso")){
        let id = e.target.getAttribute("data-id");
        eliminarCarrito(id)
    }

}

function eliminarCarrito(id) {
    carritoDecompra = carritoDecompra.filter(producto => producto.id !==id)
    carritoPage()
}


function vaciarCarro(e) {
  carritoDecompra = []
  carritoPage()
}