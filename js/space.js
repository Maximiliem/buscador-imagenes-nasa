document.addEventListener("DOMContentLoaded", function () {
    const botonBuscar = document.getElementById("btnBuscar");
    const inputBuscar = document.getElementById("inputBuscar");
    const divResultado = document.getElementById("contenedor");
  
    
    botonBuscar.addEventListener("click", function () {
      const palabraBuscada = inputBuscar.value; // se almacena en una constante la palabra buscada
      buscarImagenes(palabraBuscada); // se llama a la función buscar la imagen
    });
  
    function buscarImagenes(palabraBuscada) {
      
      const apiUrl = `https://images-api.nasa.gov/search?q=${palabraBuscada}`;
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          mostrarImagen(data.collection.items);
        })
        .catch((error) => {
          console.error("Error al buscar imágenes:", error);
        });
    }
  
    function mostrarImagen(items) {
      divResultado.innerHTML = "";
  
      items.forEach((item) => {
        
        const imageUrl = item.links[0].href;
        const title = item.data[0].title;
        const description = item.data[0].description;
        const date = item.data[0].date_created;
  
        
        const itemObtenido = document.createElement("div");
        itemObtenido.classList.add("result-item");
        itemObtenido.innerHTML = `
          <img src="${imageUrl}" alt="${title}">
          <h3>${title}</h3>
          <p>${description}</p>
          <p>Fecha: ${date}</p>
        `;
  
        divResultado.appendChild(itemObtenido);
      });
    }
  });