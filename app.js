navigator.serviceWorker.register('sw.js');   
 

//MODAL

const mas = document.querySelector('#mas');
const ventanaModal = document.querySelector('.ventana-modal');
const cerrarModal = document.querySelector('.cerrarModal');

  mas.addEventListener('click', ()=>{
    ventanaModal.style.display = "block";
    })
    
    
    cerrarModal.addEventListener('click', ()=>{
        ventanaModal.style.display = "none";
        })
    
//------------------MODAL-FIN----------------


//FECHA Y SALUDO

let saludo = document.querySelector('.saludo');
let fechaSemana = document.querySelector('.fecha');

let fecha = new Date();

let diaSemana = ['Domingo','Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
let mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto', 'Septiembre', 'Octubre','Noviembre','Diciembre'];

console.log(`${diaSemana[fecha.getDay()]}, ${fecha.getDate()} de ${mes[fecha.getMonth()]} de ${fecha.getFullYear()}`)

fechaSemana.textContent = `${diaSemana[fecha.getDay()]}, ${fecha.getDate()} de ${mes[fecha.getMonth()]} de ${fecha.getFullYear()}`;


let horaNota = fecha.getHours(); 
let minutosNota = fecha.getMinutes();
   

//--------------------------FIN--------------------------------



//--------------------------FUNCION SALUDO--------------------------------

let hora = fecha.getHours();

function establecerSaludo() {

if(hora >= 00 && hora < 12 ){
saludo.textContent = `¡Buen día!`;

} else if(hora >= 12 && hora < 21 ){
saludo.textContent = `¡Buenas tardes!`;

} else if(hora >= 21 && hora < 24 )
saludo.textContent = `¡Buenas noches!`;

} 

establecerSaludo();

//------------- FIN --------------------

    // Guardar datos

    let contenedorNotas = document.querySelector('.contenedorNotas');
    let nota = document.querySelector('#nota');
    let categoria = document.querySelector('#categoria');
    let btnGuardar = document.querySelector('.btnGuardar');
    let listaNotas = [];
    let misNotas = [];
    
 
btnGuardar.addEventListener('click', (e)=>{
    e.preventDefault()

    let valorNota = nota.value;
    let valorCategoria = categoria.value;
    let notas = new Nota(valorNota, valorCategoria);
    misNotas.push(notas);
    // traerDatos();
  
    localStorage.setItem("notas", JSON.stringify(misNotas));    
    mostrarNotas();
    console.log(misNotas);
    
})

function leerNotas() {
    let lista = JSON.parse(localStorage.getItem("notas"));
    
    if(lista){
    misNotas = lista;
    } else{
    misNotas = [];
    }

    mostrarNotas();
}

//    MOSTRAR DATOS

function mostrarNotas(){

        contenedorNotas.innerText = "";
    
        misNotas.forEach(nota => {

        console.log(nota)


        let divNota = document.createElement("div");
            divNota.classList = 'contNota';
        
        let contCat = document.createElement("div");
            contCat.classList = 'contCat';

        let contMensaje = document.createElement("div");
            contMensaje.classList = 'contMensaje';

        let contHora = document.createElement("div");
            contHora.classList = 'contHora';

        let conImg = document.createElement('div');
            conImg.classList = 'conImg';
        let img = document.createElement("img");
            img.classList = "imgCategoria" ;

        let contCategoria = document.createElement("div");
            contCategoria.classList = 'contCategoria';
        let categ = document.createElement("h2");
            categ.classList = 'categ';
            categ.textContent = nota.categoria;


        let pNota = document.createElement("p");
            pNota.classList = 'valorNota';
            pNota.textContent = nota.nombre;
        



        let hrCont = document.createElement('div');
        let notaHora = document.createElement("p");
            notaHora.classList = 'notaHora';

          if(hora >= 0 && hora < 12){
        
            notaHora.textContent = `${horaNota}:${minutosNota} AM`;
        } else {
            notaHora.textContent = `${horaNota}:${minutosNota} PM`;
        }

        let elimCont = document.createElement('div');
         let eliminar = document.createElement("img");
            eliminar.classList = "btnEliminar";
            eliminar.setAttribute('src', './recursos/marca-x.png');

            eliminar.addEventListener('click',()=>{

            borrarNotas(nota.categoria);

           })


        
            if(nota.categoria == "Actividades"){
            
                img.setAttribute('src', './recursos/actividad.png')
                divNota.style.backgroundColor = "#0080003d";
               

            } else if(nota.categoria == "Mercado"){
            
                img.setAttribute('src', './recursos/mercado.png')
                divNota.style.backgroundColor = '#80005731';
                 

            } else if(nota.categoria == "Indumentaria"){
            
                img.setAttribute('src', './recursos/indumentaria.png')
                divNota.style.backgroundColor = "#7300803e";
               

            } else if(nota.categoria == "Ocio"){
            
                img.setAttribute('src', './recursos/ocio.png')
                divNota.style.backgroundColor = '#1518ca40';
                 

            } else if(nota.categoria == "Trabajo"){
            
                img.setAttribute('src', './recursos/trabajo.png')
                divNota.style.backgroundColor = '#ca8b1543';
              

            } else if(nota.categoria == "Escuela"){
            
                img.setAttribute('src', './recursos/escuela.png')
                divNota.style.backgroundColor = '   #15c4ca45';
                

            } else {
                img.setAttribute('src', './recursos/otro.png')
                divNota.style.backgroundColor ='#a0ca1543';
              
            }



            conImg.append(img)
            contCategoria.append(categ)
            contCat.append(conImg);
            contCat.append(contCategoria);

            contMensaje.append(pNota);

            hrCont.append(notaHora);
            contHora.append(hrCont);

            elimCont.append(eliminar)
            contHora.append(elimCont);

            divNota.append(contCat);
            divNota.append(contMensaje);
            divNota.append(contHora);

            contenedorNotas.append(divNota);   
        
        });
    }
 
    leerNotas();
    
    //ELIMINAR
    
    function borrarNotas(categoria){

        let categoriaDelete = misNotas.findIndex((nota) =>{
            return nota.categoria == categoria;

        });
        
        misNotas.splice(categoriaDelete, 1);

        localStorage.setItem("notas", JSON.stringify(misNotas));    
    
        mostrarNotas();
    
                
    }
  

