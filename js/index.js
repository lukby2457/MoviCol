import { loadCards } from "./movie.js";
import { changeDisplay } from "./search.js";

// 검색용 빈 array
const titleArr = [];
const idArr = [];

// 위치 정보 및 세팅값
const cardList = document.querySelector('.cardList');
const inputForm = document.querySelector('.inputForm');
const input = document.querySelector('#input');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjI1Mzc5NDZmOGEwYjIxZjFiMWNjZGQwZjk0MDZkNSIsIm5iZiI6MTcyMTcyNDg4OC40ODcxNzcsInN1YiI6IjY2OWY2ZWZiNGI0OTYxOGI0OTJlN2I4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mYKz6yxy0yiHtcLr1pmMFR7VeNziqwLVgBTLM-SSdNA'
  }
};

// 화면이 준비되면 card 20개 로드
loadCards(cardList, options, titleArr, idArr);

// 새로 고침 시 input에 cursor가 들어가게 세팅
input.focus();

// 검색어 처리 event
inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  changeDisplay(input, titleArr, idArr);
})