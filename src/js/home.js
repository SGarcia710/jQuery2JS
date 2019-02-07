// console.log('hola mundo!');
// const noCambia = "Leonidas";

// let cambia = "@LeonidasEsteban"

// function cambiarNombre(nuevoNombre) {
//   cambia = nuevoNombre
// }
//Promesa en JS:
//Se manda una funcion y se recibe 
//un mensaje de si fallo o si se ejcuto correctamente.
//Recibe como argumento una fución.
//La funcion enviada como parametro de la promesa, recibe 2 parametros
//los cuales son dos funciones mas. 
// Primero Paramentro: Sirve para resolver la promesa de la manera correcta
// Segundo Parametro: sirve para rechazar la promesa. 
// const getUserAll = new Promise(function (todoBien, todoMal) {
//   //llamar una api
//   setTimeout(function () {
//     //Luego de 5 segundos
//     todoBien('Se acabo el tiempo. :(');
//   }, 5000)
// })
// const getUser = new Promise(function (todoBien, todoMal) {
//   //llamar una api
//   setTimeout(function () {
//     //Luego de 3 segundos
//     todoBien('Se acabo el tiempo. 3');
//   }, 3000)
// })
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
// Promise.race([//se entra al then de la promesa que se realiza primero
//   getUser,
//   getUserAll
// ])
//   .then(function (message) {
//     console.log(message);
//   })
//   .catch(function (message) {
//     console.log(message)
//   });

//API con jQuery
// $.ajax('https://randomuser.me/api/', {
//   method: 'GET',//obtener datos,
//   //post mandar datos
//   success: function (data) {
//     console.log(data)
//   },
//   error: function (error) {
//     console.log(error)
//   }
// });
//la funcion anterior es esto:
//XMLHttpRequest: Que es una cosa que pide datos de un servicio externo

//JavaScript: Funcion Fetch: traer datos. Por defecto hace GET, pero se
//pueden mandar configuraciones.
//Fetch devuelve una promesa, Entonces tiene un metodo Then y catch.
//Manera muchisimo mas corta de sacar el response y con javaScript nuevo.
// fetch('https://randomuser.me/api/?results=10')
//   .then(function (response) {
//     // console.log(response)
//     return response.json()
//   })//en caso de las promesas, ellas no son anidadas sino encadenadas
//   .then(function (user) {
//     // console.log('user', user.results[0].name.first)
//     // const userData = user.results[0];
//     // console.log('user', userData.name.first, userData.name.last, userData.picture.large)
//     console.log('users', user.results)
//   })
//   .catch(function () {
//     console.log('algo fallo')
//   });

//Funciones Asincronas
(async function load() {
  //Gracias a que la funcion es asincrona, por async, se puede usar
  //await: sirve para esperar las peticiones de nuestra API.

  async function getUsers(number) {
    const response = await fetch(`https://randomuser.me/api/?results=${number}`);
    const data = await response.json();
    return data.results;
  }

  function userListTemplate(user) {
    return (
      `<li class="playlistFriends-item">
        <a href="#">
          <img src="${user.picture.large}" alt="${user.name.first}" />
          <span>
           ${user.name.first} ${user.name.last}
          </span>
        </a>
      </li>`
    )
  }

  function renderUsersList(usersList, $container) {
    $container.children[0].remove(); 
    usersList.forEach((user) => {
      const HTMLString = userListTemplate(user);
      const userElement = createTemplate(HTMLString); 
      $container.append(userElement);
    })
  }

  async function getData(url) {
    const response = await fetch(url);
    //si yo no hubiera hecho asincrona esta funcion, tendria que usar catch y then.
    //De manera que, gracias a async, si le añado el await a lo que manda peticion al API
    //consigo la opcion de guardar el response de la promesa de fetch, en una constante.
    const data = await response.json()//aqui vuelvo json el response.
    if (data.data.movie_count > 0) {
      return data;
    }
    throw new Error('No se encontró ningun resultado');
  }
  const $featuringContainer = document.getElementById('featuring');
  //eventos
  const $home = document.getElementById('home');
  const $form = document.getElementById('form');

  //Creacion de elementos y atributos
  // $loader.setAttribute('nombreAtributo','valor de atributo');
  function setAttrs($element, attrs) {
    for (const attr in attrs) {
      $element.setAttribute(attr, attrs[attr]);
    }
  }

  const BASE_API = 'https://yts.am/api/v2/';

  function featuringTemplate(mv) {
    return (
      ` <div class="featuring">
      <div class="featuring-image">
        <img src="${mv.medium_cover_image}" width="70" height="100" alt="">
      </div>
      <div class="featuring-content">
        <p class="featuring-title">Pelicula encontrada</p>
        <p class="featuring-album">${mv.title}</p>
      </div>
    </div>`
    )
  }

  $form.addEventListener('submit', async (event) => {
    event.preventDefault(); //asi evito la recarga, debido a que si recargo la pagina toca esperar de nuevo las solicitudes de informacion.
    $home.classList.add('search-active');
    const $loader = document.createElement('img');//esto crea especificamente un elemento solito.
    setAttrs($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50
    });
    $featuringContainer.append($loader); //a mi container de featuring le añado el elemento HTML loader ya creado y con contenido.

    const data = new FormData($form);
    try {
      const {//Desestructuracion de objetos
        data: {
          movies: mvs
        }
      } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`);
      const HTMLString = featuringTemplate(mvs[0]);
      $featuringContainer.innerHTML = HTMLString;
    } catch (error) {
      alert(error.message);
      $loader.remove();
      $home.classList.remove('search-active');
    }

  })

  // console.log(actionList, dramaList, animationList)
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

  //templates con ECS6 : Literals ` aqui van los literals `
  //${} => Variables dinamicas.
  function videoItemTemplate(movie, category) {
    return (
      /*html*/`<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
      <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
        ${movie.title}
      </h4>
      </div>`
    )
  }

  function createTemplate(HTMLString) {
    const html = document.implementation.createHTMLDocument();//Creo un html
    html.body.innerHTML = HTMLString;//al body de ese html le inserto el STRING con forma de HTML
    return html.body.children[0];
  }

  //Eventos
  function addEventClick($element) {
    $element.addEventListener('click', () => {
      // alert('click');
      showModal($element);
    })
  }

  //Creacion del DOM
  function renderMovieList(list, $container, category) {
    $container.children[0].remove(); //elimino el primer elemento html del container.
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category);//creo el String con el HTML
      const movieElement = createTemplate(HTMLString); //Lo convierto a formato HTML.
      $container.append(movieElement);//Ya teniendo el string en formato HTML, lo añado a mi container con un selector.
      const image = movieElement.querySelector('img');
      image.addEventListener('load', (event) => {
        event.srcElement.classList.add('fadeIn');//event.srcElement seria exactamente lo mismo que ponerle image, hace referencia a quien lanzo el evento.
      })
      addEventClick(movieElement);
    })
  }

  const users = await getUsers(10);
  const $usersContainer = document.querySelector('#users');
  renderUsersList(users, $usersContainer);

  const { data: { movies: actionList } } = await getData(`${BASE_API}list_movies.json?genre=action`)
  const $actionContainer = document.querySelector('#action');//Los query selector buscan exactamente lo que se les mande
  renderMovieList(actionList, $actionContainer, 'action');

  const { data: { movies: dramaList } } = await getData(`${BASE_API}list_movies.json?genre=drama`)
  const $dramaContainer = document.querySelector('#drama');//en estos dos casos, se buscan ids, por eso el #
  renderMovieList(dramaList, $dramaContainer, 'drama');

  const { data: { movies: animationList } } = await getData(`${BASE_API}list_movies.json?genre=animation`)
  const $animationContainer = document.getElementById('animation');// Pero el getElementById es preciso, de manera que no se necesita el #
  renderMovieList(animationList, $animationContainer, 'animation');

  // document.querySelector('#modal img');

  const $modalImage = $modal.querySelector('img');
  const $modalTitle = $modal.querySelector('h1');
  const $modalDescription = $modal.querySelector('p');

  function findById(list, id) {
    return list.find(movie => movie.id === parseInt(id, 10))
  }

  function findMovie(id, category) {
    switch (category) {
      case 'action':
        return findById(actionList, id)
      case 'drama':
        return findById(dramaList, id)
      default:
        return findById(animationList, id)
    }
  }

  function showModal($element) {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards'
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    const mvData = findMovie(id, category);

    $modalTitle.textContent = mvData.title;
    $modalImage.setAttribute('src', mvData.medium_cover_image);
    $modalDescription.textContent = mvData.description_full
  }
  //Eventos
  $hideModal.addEventListener('click', hideModal);
  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards'
  }

})()