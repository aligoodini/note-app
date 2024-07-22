const notesAdd = document.querySelector(".notes__add");
const notesList = document.querySelector(".notes__list");
const notesListItem = document.querySelector(".notes__list-item");
const notesSmallTitle = document.querySelector(".notes__small-title");
const notesSmallBody = document.querySelector(".notes__small-body");
const notesTitle = document.querySelector(".notes__title");
const notesBody = document.querySelector(".notes__body");

let Data = [];
let id = 0;
let currentID;

window.addEventListener("load", () => {
  if (JSON.parse(localStorage.getItem("dataNoteApp"))) {
    showNote();
    id = Data[Data.length - 1].id;
  }
});

let noteDate = "";

notesAdd.addEventListener("click", () => {
  // ----------------------------------------------- add new note to LS
  if (notesAdd.textContent == "Add Note") {
    getDate();

    id += 1;
    const dataObj = {
      id,
      title: notesTitle.value.trim(),
      body: notesBody.value.trim(),
      data: noteDate,
    };
    Data.push(dataObj);
    localStorage.setItem("dataNoteApp", JSON.stringify(Data));

    resetInput();

    showNote();
  }
  // ----------------------------------------------- update note to LS
  else {
    let selectedItem = Data.find((item) => item.id == currentID);
    if (
      notesTitle.value != selectedItem.title ||
      notesBody.value != selectedItem.body
    ) {
      let filterdArray = Data.filter((item) => item.id != currentID);
      getDate();
      const dataObject = {
        id: Number(currentID) + 1,
        title: notesTitle.value.trim(),
        body: notesBody.value.trim(),
        data: noteDate,
      };
      filterdArray.push(dataObject);
      console.log(filterdArray);
      localStorage.setItem("dataNoteApp", JSON.stringify(filterdArray));
      showNote();
    }
  }
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
    div.setAttribute("data-id", item.id);
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
    resetInput();
  } else if (e.target.classList.contains("remove")) {
    removeItem(e);
  } else {
    // --------------------------------------------------------------------------show title and body of clicked item
    notesTitle.value = e.target.parentElement.children[0].textContent.trim();
    notesBody.value = e.target.parentElement.children[1].textContent.trim();

    // --------------------------------------------------------------------------get id of clicked item
    if (e.target.parentElement.classList.contains("notes__small-title")) {
      currentID = e.target.parentElement.parentElement.getAttribute("data-id");
    } else if (e.target.parentElement.classList.contains("notes__list-item")) {
      currentID = e.target.parentElement.getAttribute("data-id");
    }
    notesAdd.textContent = "Update Note";
  }
});

// ---------------------------------------------------------- remove item

function removeItem(e) {
  let elemId = e.target.parentElement.parentElement.getAttribute("data-id");
  let filterdArr = Data.filter((item) => item.id != elemId);
  localStorage.setItem("dataNoteApp", JSON.stringify(filterdArr));
  e.target.parentElement.parentElement.remove();
  resetInput();
}

function resetInput() {
  notesTitle.value = "";
  notesBody.value = "";
  notesAdd.textContent = "Add Note";
}
