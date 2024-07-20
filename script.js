const notesAdd = document.querySelector(".notes__add");
const notesList = document.querySelector(".notes__list");
const notesListItem = document.querySelector(".notes__list-item");
const notesSmallTitle = document.querySelector(".notes__small-title");
const notesSmallBody = document.querySelector(".notes__small-body");
const notesTitle = document.querySelector(".notes__title");
const notesBody = document.querySelector(".notes__body");

let noteDate = "";

notesAdd.addEventListener("click", () => {
  console.log(notesTitle.value);
  console.log(notesBody.value);

  getDate ();
  let div = document.createElement("div");
  div.className = "notes__list-item notes__list-item--selected";
  div.innerHTML = `
        <div class="notes__small-title">${notesTitle.value}</div>
        <div class="notes__small-body">${notesBody.value}</div>
        <div class="notes__small-updated">${noteDate}</div>
  `;

  notesList.insertBefore(div, notesList.children[0]);
});

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
