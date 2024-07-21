const notesAdd = document.querySelector(".notes__add");
const notesList = document.querySelector(".notes__list");
const notesListItem = document.querySelector(".notes__list-item");
const notesSmallTitle = document.querySelector(".notes__small-title");
const notesSmallBody = document.querySelector(".notes__small-body");
const notesTitle = document.querySelector(".notes__title");
const notesBody = document.querySelector(".notes__body");

let Data = [];

window.addEventListener("load", () => {
  if (JSON.parse(localStorage.getItem("dataNoteApp"))) {
    showNote();
  }
});

let noteDate = "";

notesAdd.addEventListener("click", () => {
  getDate();

  // ----------------------------------------------- add to LS
  const dataObj = {
    title: notesTitle.value.trim(),
    body: notesBody.value.trim(),
    data: noteDate,
  };
  Data.push(dataObj);
  localStorage.setItem("dataNoteApp", JSON.stringify(Data));

  showNote();
});

// --------------------------------------------------------- Date
function getDate() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let year = date.getFullYear();
  let month = date.getMonth();
  console.log(month);

  let day = date.getDate();
  let week = date.getDay();
  switch (month) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    default:
      month = "December";
  }

  switch (week) {
    case 1:
      week = "Sunday";
      break;
    case 2:
      week = "Monday";
      break;
    case 3:
      week = "Tuesday";
      break;
    case 4:
      week = "Wednesday";
      break;
    case 5:
      week = "Thursday";
      break;
    case 6:
      week = "Friday";
      break;
    default:
      week = "Saturday";
  }

  noteDate = `${week} , ${date.getDate()} ${month} ${year} at ${hours} : ${minutes} `;
}

// ---------------------------------------------------------- show note

function showNote() {
  Data = JSON.parse(localStorage.getItem("dataNoteApp"));
  notesList.innerHTML = `
          <div class="notes__list-item notes__list-item--selected f-item">
            <div class="circle">+</div>
          </div>
  `;
  Data.forEach((item) => {
    let div = document.createElement("div");
    div.className = "notes__list-item";
    div.innerHTML = `
          <div class="notes__small-title">
            <div class="">${item.title}</div>
            <div class="remove icon"></div>
          </div>
          <div class="notes__small-body">${item.body}</div>
          <div class="notes__small-updated">${item.data}</div>
    `;

    notesList.insertBefore(div, notesList.children[0]);
  });
}

//--------------------------------------------------------------- show clicked item

notesList.addEventListener("click", (e) => {

  if (
    e.target.classList.contains("circle") ||
    e.target.classList.contains("f-item")
  ) {
    notesTitle.value = "";
    notesBody.value = "";

    notesAdd.textContent = "Add Note"
  }else if(e.target.classList.contains("remove")){
    console.log(e.target.parentElement.textContent)
  }else {
    notesTitle.value = e.target.parentElement.children[0].textContent;
    notesBody.value = e.target.parentElement.children[1].textContent;

    notesAdd.textContent = "Update Note"
  }
});

