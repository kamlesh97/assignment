let Data = [];
let DataPages = [];
let selectedPage;
let selectedIndex;
let startIndex;
let endIndex;
let pagingList;
document.getElementById("loading").style.display = "block";
fetch("./data.json")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    Data = json;
    //paging
    let pagesNumber = Data.length / 3;
    const pagesNumberRemainder = pagesNumber % 1;
    const pagesNumberWithoutRemainder = Math.floor(pagesNumber);
    if (pagesNumberRemainder > 0)
      pagesNumber = Number(pagesNumberWithoutRemainder) + 1;
    DataPages = Array(pagesNumber)
      .fill(1)
      .map((x, i) => i + 1);
    startIndex = 0;
    endIndex = 3;
    selectedPage = 1;
    //fill the paging list

    injectPagination();
    //start mapping the list
    injectPage();
  });
document.getElementById("loading").style.display = "none";
injectPagination = () => {
  pagingList = `
          <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goPrevious()">Previous</a></li>
          <li class="page-item"><span class="page-link" id="spanSelectedPage">${selectedPage} | ${DataPages.length}</span></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)" onclick="goNext()">Next</a></li>
          `;
  document.getElementById("paging").innerHTML = pagingList;
};

injectPage = () => {
  const list = Data
    ? Data.slice(startIndex, endIndex)
        .map(
          (todo, index) =>
            `
                 <li class="row" key=${index} >
                 <div class='index'>${index + 1}</div>
                 <div class='row3'>
                 <div class='content'>
                 <div class='label'  > ${todo.name}</div>
                 <hr  >
                 <div class='title'  > ${todo.location}</div>
               </div>
             </div>
            
            
                </div>
                 </li>
                    
                        `
        )
        .join("")
    : "";
  document.getElementById("list").innerHTML = list;
};

goPrevious = () => {
  document.getElementById("loading").style.display = "block";
  if (selectedPage != 1) {
    startIndex -= 3;
    endIndex -= 3;
    selectedPage--;
    injectPage();
    injectPagination();
  }
  document.getElementById("loading").style.display = "none";
};

goNext = () => {
  document.getElementById("loading").style.display = "block";
  if (selectedPage < DataPages.length) {
    startIndex += 3;
    endIndex += 3;
    selectedPage++;
    injectPage();
    injectPagination();
  }
  document.getElementById("loading").style.display = "none";
};
