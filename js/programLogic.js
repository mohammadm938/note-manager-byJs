// variabels
let noteList = document.querySelector(".note-holder"); // background
let addBgButton = document.querySelector("#add").parentElement; // button for show form to add new note
let formForAdd = document.querySelector(".section-b"); // form for add new note

// eventlisteners
eventlisteners();
function eventlisteners() {
  // when click on add button to show form for add new note
  document.querySelector("#add").addEventListener("click", showSection);
  // when submit form for adding new note
  document.querySelector("#form").addEventListener("submit", hideSection);
  document.addEventListener("DOMContentLoaded", showNotesOnload);
}

// functions

// show form for add new note
function showSection(e) {
  e.preventDefault();
  noteList.style.opacity = 0.2; // hide background
  addBgButton.style.opacity = 0.2; // hide background
  formForAdd.classList.remove("section-b"); // remove display:none
  formForAdd.classList.add("add-note-form"); // add style for show form
}

// hide form for add new note
function hideSection(e) {
  e.preventDefault();
  const textarea = document.querySelector(".textarea").value; // note
  noteList.style.opacity = 1; // show background
  addBgButton.style.opacity = 1; // show background
  formForAdd.classList.remove("add-note-form"); // remove style for showing form
  formForAdd.classList.add("section-b"); // add display:none
  newNotes(textarea); // add new note(show on a html code and add on a localstorage) function
  this.reset(); // clear textarea
}

// for add new note
function newNotes(note) {
  if (note != "") {
    // code html for show new note
    let noteCode = `
      <div class="note-box">
      <div class="note-place">
        <p class="note">${note}</p>
      </div>
      <div class="footer">
        <a class="remove" href="#">X</a>
      </div>
    </div>`;
    noteList.innerHTML += noteCode; // add new note to html
    addNoteToLS(note); // add note to local storage
    // add evenet listeners for remove button
    let removeButtons = document.querySelectorAll(".remove");
    removeButtons.forEach((element) => {
      element.addEventListener("click", removeNotes);
    });
  }
}

// add note to localstorage
function addNoteToLS(note) {
  let notes = getNotesFromLS();  // return notes from local storage
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// get notes from localstorage
function getNotesFromLS() {
  let notes = localStorage.getItem("notes");  // return notes from local storage
  if (notes === null) {
    return (notes = []);
  } else {
    return JSON.parse(notes);
  }
}

// get notes when page load
function showNotesOnload() {
  const notes = getNotesFromLS();  // return notes from local storage
  if (Array.isArray(notes)) {
    notes.forEach((note) => {
    // code html for show new note
      let noteCode = `
      <div class="note-box">
      <div class="note-place">
        <p class="note">${note}</p>
      </div>
      <div class="footer">
        <a class="remove" href="#">X</a>
      </div>
    </div>`;
      noteList.innerHTML += noteCode; // add new note to html

      // add evenet listeners for remove button
      let removeButtons = document.querySelectorAll(".remove");
      removeButtons.forEach((element) => {
        element.addEventListener("click", removeNotes);
      });
    });
  }
}

// for remove note
function removeNotes(e) {
  e.preventDefault();
  // remove note form html
  e.target.parentElement.parentElement.remove();
  // remove from local storage
  removeNoteFromLs(
    e.target.parentElement.parentElement.firstElementChild.textContent
  );
}

function removeNoteFromLs(noteForDelete) {
  let notes = getNotesFromLS(); // return notes from local storage
  let noteValue = noteForDelete.substring(9, noteForDelete.length - 7); // remove space and '\n' from end and starter of note
  notes.forEach((note, index) => {
    if (note == noteValue) {
      notes.splice(index, 1);
    }
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
