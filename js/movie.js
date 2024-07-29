// TMDB에서 Top Rated 20개 들고오는 function
export function loadCards(location, options, arr1, arr2) {
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(datas => {
      const dataArr = datas.results;

      dataArr.forEach(data => {
        const card = createCard(data);
        location.appendChild(card);

        // 검색용 array에 값 주입
        arr1.push(data.title);
        arr2.push(data.id);
      });
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