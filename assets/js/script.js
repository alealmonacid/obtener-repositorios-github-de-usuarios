const baseUrl = 'https://api.github.com/users';
//funcion request
const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
    }

//funcion getUser
const getUser = async (id) => {
    const url = `${baseUrl}/${id}`;
    return request(url);
    }

//funcion getRepo
const getRepo = async (id) => {
    const url = `${baseUrl}/${id}/repos`;
    return request(url);
    }

//ejecutar busqueda

const div = document.createElement('ul');
div.style.float = "rigth"

const result = document.getElementById('resultados')
result.style.float = "left"
let formulario = document.querySelector('form');
let evaluacion = (event) =>{
    event.preventDefault();

// variables
const nombre = document.getElementById('nombre').value;
const pagina = parseInt(document.getElementById('pagina').value);
let repositorios = parseInt(document.getElementById('repoPagina').value);
let repositorio = repositorios

//guardar datos
    Promise.all([getUser(nombre), getRepo(nombre)])
    .then(resp => {
        var text1 = "";
        var text = "";
    console.log(resp)
    console.log(`<img src="${resp[0].avatar_url}">, Nombre de usuario: ${resp[0].name}, Nombre de login: ${resp[0].login}, Cantidad de Repositorios: ${resp[0].public_repos}, Localidad: ${resp[0].location}, Tipo: ${resp[0].type}`)
    text1 += `<ul><li><img src="${resp[0].avatar_url}"></li><li>Nombre de usuario: ${resp[0].name}</li><li>Nombre de login: ${resp[0].login}</li><li>Cantidad de Repositorios: ${resp[0].public_repos}</li><li>Localidad: ${resp[0].location}</li><li>Tipo: ${resp[0].type}</li></ul>`
    // for (let i = 0; i < resp[1].length; i++) { //repositorio total
    //     console.log(`repos: ${resp[1][i].name}`)
    //     }
    result.innerHTML = text1;

var i;
var j;
for (let j = 0; j < pagina; j++) { //repositorio por pagina
if (j == 0){
        for (let i = 0; i < repositorios; i++) { //repositorio pagina
        console.log(`repos: ${resp[1][i].name}`)
        text += `<li>${resp[1][i].name}</li>`
        // if (repositorios == resp[1].length - 1){  //excepcion despues de no encontrar mas
        //     j = pagina
        // }
    }
div.innerHTML = text;
}
else{
    for (let i = 0 ; i < repositorios; i++) { //repositorio pagina
        console.log(`repos: ${resp[1][repositorio + i].name}`)
        text += `<li>${resp[1][repositorio + i].name}</li>`
        // if (repositorios == resp[1].length - 1){
        //     j = pagina
        // }
    }
div.innerHTML = text;
}
result.appendChild(div)
}
})
.catch(err => console.log('err', err))

}
formulario.addEventListener('submit',evaluacion);
