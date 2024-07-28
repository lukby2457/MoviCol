const slider = document.querySelector('.slider');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let size = 1875;  // 5개 이동 길이 size
let index = 0;  // 처음 5개는 인덱스 0으로 시작
let start = 0;
let end = (850 * length) + (25 * (length - 1));
let move = 0;


prev.addEventListener("click", () => {
  console.log(index);
  if(true) {
    if(index !== 0) {
      index--;
    }
    slider.style.transform = 'translate(-' + size * index +'px)';
    console.log(size*index);
  }
});

next.addEventListener("click", () => {
  if(index >= 0) {
    index++;
    move = size * index;
    move = (move < end) ? move : end;
    console.log(index, end);
    slider.style.transform = 'translate(-' + size * index +'px)';
  }
});