const cardList = document.querySelector('.cardList');
const slider = document.querySelector('.slider');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const length = slider.childElementCount;
let size = 1875;  // 5개 이동 길이 size
let index = 0;  // 처음 5개는 인덱스 0으로 시작
let start = 0;
let end = (850 * length) + (25 * (length - 1));
let move = 0;

cardList.addEventListener("mouseover", () => {
  prev.style.display = "block";
  next.style.display = "block";
});

cardList.addEventListener("mouseout", () => {
  prev.style.display = "none";
  next.style.display = "none";
});


prev.addEventListener("click", () => {
  console.log(index);
  if(true) {
    if(index !== 0) {
      index--;
    }
    move = size * index;
    move = (move < start) ? start : move;
    slider.style.transform = 'translate(-' + move +'px)';
  }
});

next.addEventListener("click", () => {
  if(index >= 0) {
    index++;
    move = size * index;
    // move = (move < end) ? move : end;
    console.log(index, end);
    slider.style.transform = 'translate(-' + move +'px)';
  }
});