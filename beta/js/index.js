// arrow.js에 사용할 div 개수
let length = 0;

// 창이 실행될 때 실행되는 함수
window.onload = function () {
  // 위치 정보 및 세팅값
  const slider = document.querySelector('.slider');
  const inputButton = document.getElementById('inputButton');
  const index = document.getElementById('index');
  let indexFind = "";
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjI1Mzc5NDZmOGEwYjIxZjFiMWNjZGQwZjk0MDZkNSIsIm5iZiI6MTcyMTcyNDg4OC40ODcxNzcsInN1YiI6IjY2OWY2ZWZiNGI0OTYxOGI0OTJlN2I4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mYKz6yxy0yiHtcLr1pmMFR7VeNziqwLVgBTLM-SSdNA'
    }
  };

  removeCards(slider);
  loadCards(slider, options, indexFind);

  inputButton.addEventListener("click", (e) => {
    indexFind = String(index.value).toLowerCase();
    removeCards(slider);
    loadCards(slider, options, indexFind);
  });

  index.addEventListener("keypress", (e) => {
    let code = e.code;

    if (code === 'Enter' || code === 'NumpadEnter') {
      indexFind = String(index.value).toLowerCase();
      removeCards(slider);
      loadCards(slider, options, indexFind);
    }
  });
}

// TMDB에서 Top Rated에서 검색어에 따라 data를 들고오는 function
function loadCards(location, options, string) {
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(datas => {
      const dataArr = datas.results;
      let newArr = [];
      
      dataArr.forEach((data) => {
        if(String(data.title).toLowerCase().includes(string) || data.title === "") {
          newArr.push(data);
        }
      });

      length = newArr.length;

      newArr.forEach((data, index) => {
        if(length <= 5) {
          const card = createCard(data);
          location.appendChild(card);
          location.style.justifyContent = 'space-evenly';
          document.querySelector('.prev').style.display = 'none';
          document.querySelector('.next').style.display = 'none';
        } else {
          document.querySelector('.prev').style.display = 'block';
          document.querySelector('.next').style.display = 'block';
          if(index === length - 1) {
            const card = createCard(data);
            location.appendChild(card);
          } else {
            const card = createCard(data);
            location.appendChild(card); 
            card.style.marginRight = '25px';
          }
          
        }
      })
    })
    .catch(err => console.error(err));
};

// card를 하나 만드는 function
function createCard(object) {
  const imgPath = 'https://image.tmdb.org/t/p/w500';

  const card = document.createElement('div');
  card.className = 'card';
  card.id = `${object.id}`;
  card.innerHTML = `
        <div>
          <img src="${imgPath + object.poster_path}">
          <h2>${object.title}</h2>
        </div>
        <p class="overview">
          ${object.overview}
        </p>
        <p class="rating">rating : ${object.vote_average}</p>
      `;

  card.addEventListener("click", () => {
    alert(`영화 id : ${object.id}`);
  });

  return card;
};

// slider 안의 div를 없애는 function
function removeCards(location) {
  while(location.firstChild) {
    location.removeChild(location.firstChild);
  }
}