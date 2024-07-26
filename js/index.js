const titleArr = [];
const idArr = [];

function createCard(object) {
  const imgPath = 'https://image.tmdb.org/t/p/w500';

  const card = document.createElement('div');
  card.className = 'card';
  card.id = `${object.id}`;
  card.innerHTML = `
        <div>
          <img src="${imgPath + object.poster_path}">
          <h2>${object.original_title}</h2>
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

function changeDisplay(index, arr1, arr2) {
  let indexFind = String(index.value).toLowerCase();

  let merged = arr1.reduce((obj, title, id) => {
    return {...obj, [title] : arr2[id]};
  }, {});
  // console.log(merged);

  let objectArr = Object.entries(merged);
  // console.log(objectArr);

  objectArr.forEach(data => {
    // console.log(data[0], data[1]);
    let title = String(data[0]).toLowerCase();
    let id = data[1];

    if(title.includes(indexFind)) {
      document.getElementById(`${id}`).style.display = 'flex';
    }
    else {
      document.getElementById(`${id}`).style.display = 'none';
    }
  })
};

window.onload = function () {
  const cardList = document.querySelector('.cardList');
  const inputButton = document.getElementById('inputButton');
  const index = document.getElementById('index');
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjI1Mzc5NDZmOGEwYjIxZjFiMWNjZGQwZjk0MDZkNSIsIm5iZiI6MTcyMTcyNDg4OC40ODcxNzcsInN1YiI6IjY2OWY2ZWZiNGI0OTYxOGI0OTJlN2I4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mYKz6yxy0yiHtcLr1pmMFR7VeNziqwLVgBTLM-SSdNA'
    }
  };

  (function loadCard() {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      .then(response => response.json())
      .then(datas => {
        const dataArr = datas.results;

        dataArr.forEach(data => {
          const card = createCard(data);
          cardList.appendChild(card);

          titleArr.push(data.original_title);
          idArr.push(data.id);
        });
      })
      .catch(err => console.error(err));
  })();

  inputButton.addEventListener("click", (e) => {
    changeDisplay(index, titleArr, idArr);
  });

  index.addEventListener("keypress", (e) => {
    let code = e.code;

    if (code === 'Enter' || code === 'NumpadEnter') {
      changeDisplay(index, titleArr, idArr);
    }
  })
}