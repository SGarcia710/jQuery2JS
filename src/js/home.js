console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}
//Promesa en JS:
//Se manda una funcion y se recibe 
//un mensaje de si fallo o si se ejcuto correctamente.
//Recibe como argumento una fución.
//La funcion enviada como parametro de la promesa, recibe 2 parametros
//los cuales son dos funciones mas. 
// Primero Paramentro: Sirve para resolver la promesa de la manera correcta
// Segundo Parametro: sirve para rechazar la promesa. 
const getUserAll = new Promise(function (todoBien, todoMal) {
  //llamar una api
  setTimeout(function () {
    //Luego de 5 segundos
    todoBien('Se acabo el tiempo. :(');
  }, 5000)
})
const getUser = new Promise(function (todoBien, todoMal) {
  //llamar una api
  setTimeout(function () {
    //Luego de 3 segundos
    todoBien('Se acabo el tiempo. 3');
  }, 3000)
})
// getUser
//   .then(function () { 
//     console.log('Todo esta bien en la vida')
//   })
//   .catch(function(message) {
//     console.log(message)
//   })

// Promise.all([
//   getUser,
//   getUserAll
// ])
// .then(function(message) {
//   console.log(message);
// })
// .catch(function(message){
//   console.log(message)
// })
Promise.race([//se entra al then de la promesa que se realiza primero
  getUser,
  getUserAll
])
  .then(function (message) {
    console.log(message);
  })
  .catch(function (message) {
    console.log(message)
  });

//API con jQuery
$.ajax('https://randomuser.me/api/', {
  method: 'GET',//obtener datos,
  //post mandar datos
  success: function (data) {
    console.log(data)
  },
  error: function (error) {
    console.log(error)
  }
});
//la funcion anterior es esto:
//XMLHttpRequest: Que es una cosa que pide datos de un servicio externo

//JavaScript: Funcion Fetch: traer datos. Por defecto hace GET, pero se
//pueden mandar configuraciones.
//Fetch devuelve una promesa, Entonces tiene un metodo Then y catch.
//Manera muchisimo mas corta de sacar el response y con javaScript nuevo.
fetch('https://randomuser.me/api/')
  .then(function (response) {
    // console.log(response)
    return response.json()
  })//en caso de las promesas, ellas no son anidadas sino encadenadas
  .then(function (user) {
    console.log('user', user.results[0].name.first)
  })
  .catch(function () {
    console.log('algo fallo')
  });

//Funciones Asincronas
(async function load() {
  //Gracias a que la funcion es asincrona, por async, se puede usar
  //await: sirve para esperar las peticiones de nuestra API.
  
  async function getData(url){
    const response = await fetch(url);
    //si yo no hubiera hecho asincrona esta funcion, tendria que usar catch y then.
    //De manera que, gracias a async, si le añado el await a lo que manda peticion al API
    //consigo la opcion de guardar el response de la promesa de fetch, en una constante.
    const data = await response.json()//aqui vuelvo json el response.
    return data;
  }
  // console.log(data);
  const actionList = await getData('https://yts.am/api/v2/list_movies.json?genre=action')
  const dramaList = await getData('https://yts.am/api/v2/list_movies.json?genre=drama')
  const animationList = await getData('https://yts.am/api/v2/list_movies.json?genre=animation')
  console.log(actionList, dramaList, animationList)
  // let terrorList ;
  // .then(function(data){
  //   terrorList = data;
  //   console.log(terrorList);
  // })
  // .catch(function () {
  //   console.log('algo fallo')
  // })

  //De esta manera tenemos codigo asincrono que se lee de una manera
  //sincrona. El console log no se mandara, hasta que ambas promesas terminen.

  //Selectores en jQuery
  // const $home = $('.home .list #item');
  //Selectores en JS
  // const $home = document.getElementById('modal');
  // document.getElementsByClassName('')
  // document.getElementsByTagName('div')
  // document.querySelector('.modal') //me devuelve el primer .modal que encuentre(con esta clase)
  // document.querySelectorAll('.myPlaylist-item') //Me devuelve todos los item que tienen este selector.

  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal');
  //camel case: cuando hay dos palabras, la segunda la inicio con mayuscula

  const $actionContainer = document.querySelector('#action');
  const $dramaContainer = document.querySelector('#drama');
  const $animationContainer = document.getElementById('#animation');

 

  // document.querySelector('#modal img');
  const $modalImage = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');

  const $featuringContainer = document.getElementById('#featuring');
  const $form = document.getElementById('#form');
  const $home = document.getElementById('#home');

  //templates con ECS6 : Literals ` aqui van los literals `
  //${} => Variables dinamicas.
  function videoItemTemplate(movie) {
    return (
      `<div class="primaryPlaylistItem">
      <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
        ${movie.title}
      </h4>
      </div>`
    )
  }
  // console.log(videoItemTemplate('src/images/holamundo.jpg', 'hola mundo'));
//Creacion del DOM
  actionList.data.movies.forEach((movie)=>{
    const HTMLString = videoItemTemplate(movie);//creo el String con el HTML
    const html = document.implementation.createHTMLDocument();//Creo un html
    html.body.innerHTML = HTMLString;//al body de ese html le inserto el STRING con forma de HTML
    $actionContainer.append(html.body.children[0]);//Ya teniendo el string en formato HTML, lo añado a mi container con un selector.
    // console.log(HTMLString);
  })
})()