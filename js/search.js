// 검색어에 따라 card를 표시하는 function
export function changeDisplay(index, arr1, arr2) {
  let indexFind = String(index.value).toLowerCase();

  let merged = arr1.reduce((obj, title, id) => {
    return {...obj, [title] : arr2[id]};
  }, new Object);

  let objectArr = Object.entries(merged);

  let lowerArr = objectArr.map(str => str[0].toLowerCase());

  if(lowerArr.some(title => title.includes(indexFind))) {
    objectArr.forEach(data => {
      let title = String(data[0]).toLowerCase();
      let id = data[1];
  
      if(title.includes(indexFind)) {
        document.getElementById(`${id}`).style.display = 'flex';
      }
      else {
        document.getElementById(`${id}`).style.display = 'none';
      }
    })
  } else {
    alert("검색 결과가 없습니다.")
  }
};