const localLibraryKey = "localLibrary";
const defaultLibraryKey = "defaultLibrary";
const configStorage = "config";
let defaultLibrary = [];
sortBar = document.querySelector(".sort");
addDiv = document.querySelector(".add-book");
if (localStorage.getItem("config") === null) {
  myLibrary = [];
  initConfig();
  initDefaultLibrary();
  myLibrary = JSON.parse(localStorage.getItem(defaultLibraryKey));
  initmyLibrary();
  updateBookList(myLibrary);
} else {
  myLibrary = JSON.parse(localStorage.getItem(localLibraryKey));
  config = JSON.parse(localStorage.getItem(configStorage));
  sortBar.id = config.sortBarConf;
  updateBookList(myLibrary);
}

function initConfig() {
  config = {
    firstRun: false,
    sortBarConf: "on",
  };
  json = JSON.stringify(config);
  localStorage.setItem(`config`, json);
}
function initDefaultLibrary() {
  let harryPotter = new Book(
    "Harry Potter",
    "J.K. Rowling",
    3,
    400,
    "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg"
  );
  defaultLibrary.push(harryPotter);
  let theHobbit = new Book(
    "The Hobbit",
    "Peter Jackson",
    1400,
    1400,
    "https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg"
  );
  defaultLibrary.push(theHobbit);
  saveArrayToLocalStorage(defaultLibrary, defaultLibraryKey);
}
function initmyLibrary() {
  saveArrayToLocalStorage(myLibrary, localLibraryKey);
}
searchBar = document.querySelector(".searchInput");
bookList = document.querySelector(".booklist");
addBookTile = document.querySelector(".add-book .tile");
addDiv = document.querySelector(".add-book");
addBookModal = document.querySelector(".add-book-modal");
editBookModal = document.querySelector(".edit-book-modal");
moreModal = document.querySelector(".more-modal");
modalSave = document.querySelector(".modal-save");
modalCancel = document.querySelector(".modal-cancel");
modalEditSave = document.querySelector(".modal-save-edit");
modalEditCancel = document.querySelector(".modal-cancel-edit");
modalEditDelete = document.querySelector(".modal-delete");
moreModalDelete = document.querySelector("#more-modal-delete");
menu = document.querySelector("#navbar-menu");
menu.addEventListener("click", function () {
  if (sortBar.id == "off") {
    sortBar.style.top = "60px";
    sortBar.id = "sort-active";
    config.sortBarConf = "on";
  } else {
    sortBar.style.top = "0px";
    sortBar.id = "off";
    config.sortBarConf = "off";
  }
  json = JSON.stringify(config);
  localStorage.setItem(configStorage, json);
});
searchBar.addEventListener("keyup", (e) => {
  console.log(searchBar.value);
  const searchString = searchBar.value.toLowerCase();
  const filteredBooks = myLibrary.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchString) ||
      book.author.toLowerCase().includes(searchString)
    );
  });
  updateBookList(filteredBooks);
  console.log(filteredBooks);
});
newBookForm = document.querySelector(".new-book-form");
editBookForm = document.querySelector(".edit-book-form");

addBookTile.addEventListener("click", function (e) {
  addBookModal.className += " addBookModal-vis ";
});
function getEditAction() {
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      bookIndex = parseInt(
        e.target.closest(".book").classList[2].split("_")[1]
      );
      editBookModal.className += " editBookModal-vis";
      editBookModal.id = `${bookIndex}`;
      editBookForm.elements[0].value = myLibrary[`${bookIndex}`].title;
      editBookForm.elements[1].value = myLibrary[`${bookIndex}`].author;
      editBookForm.elements[2].value = myLibrary[`${bookIndex}`].pagesRead;
      editBookForm.elements[3].value = myLibrary[`${bookIndex}`].pages;
      editBookForm.elements[4].value = myLibrary[`${bookIndex}`].url;
    });
  });
}

function getMoreAction() {
  moreButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      bookIndex = parseInt(
        e.target.closest(".book").classList[2].split("_")[1]
      );
      moreModal.style.left = e.clientX - 5 + "px";
      moreModal.style.top = e.clientY + 5 + "px";
      moreModal.className += " moreModal-vis";
      moreModal.id = `${bookIndex}`;
    });
  });
}
window.addEventListener("click", function (e) {
  if (
    e.target.id !== "more" &&
    e.target.id !== "more-modal" &&
    e.target.id !== "more-modal-delete"
  ) {
    moreModal.className = "more-modal";
  }
});
modalSave.addEventListener("click", function () {
  addBookModal.className = "add-book-modal";
  createNewBook();
  newBookForm.reset();
  //   userAdded = document.querySelectorAll(".added").forEach((e) => e.remove());
  updateBookList(myLibrary);
});

modalCancel.addEventListener("click", function () {
  addBookModal.className = "add-book-modal";
  newBookForm.reset();
});

modalEditSave.addEventListener("click", function (e) {
  index = parseInt(document.querySelector(".edit-book-modal").id);

  bookObj = myLibrary[`${index}`];
  myLibrary[`${index}`].title = editBookForm.elements[0].value;
  myLibrary[`${index}`].author = editBookForm.elements[1].value;
  myLibrary[`${index}`].pagesRead = editBookForm.elements[2].value;
  myLibrary[`${index}`].pages = editBookForm.elements[3].value;
  myLibrary[`${index}`].url = editBookForm.elements[4].value;
  editBookModal.className = "edit-book-modal";
  editBookForm.reset();
  //   userAdded = document.querySelectorAll(".added").forEach((e) => e.remove());
  updateBookList(myLibrary);
});

modalEditCancel.addEventListener("click", function () {
  editBookModal.className = "edit-book-modal";
  editBookModal.id = "";
  editBookForm.reset();
});
modalEditDelete.addEventListener("click", function () {
  index = parseInt(document.querySelector(".edit-book-modal").id);
  deleteBook(index);
  editBookModal.className = "edit-book-modal";
  editBookModal.id = "";
  editBookForm.reset();
});
moreModalDelete.addEventListener("click", function () {
  index = parseInt(document.querySelector(".edit-book-modal").id);
  deleteBook(index);
  editBookModal.className = "edit-book-modal";
  editBookModal.id = "";
  editBookForm.reset();
  moreModal.classList = "more-modal";
});
function Book(title, author, pagesRead, pages, url) {
  this.title = title;
  this.author = author;
  this.pagesRead = pagesRead;
  this.pages = pages;
  this.url = url;
}

function createNewBook() {
  let objTitle = newBookForm.elements[0].value;
  let objAuthor = newBookForm.elements[1].value;
  let objPagesRead = newBookForm.elements[2].value;
  let objPages = newBookForm.elements[3].value;
  let objUrl = newBookForm.elements[4].value;
  newest = new Book(objTitle, objAuthor, objPagesRead, objPages, objUrl);
  myLibrary.push(newest);
  saveArrayToLocalStorage(myLibrary, localLibraryKey);
}

function createBookTile(title, author, pagesRead, totalPages, coverUrl, index) {
  let pages = `${pagesRead}/${totalPages}`;
  let card = document.createElement("div");
  let cardInfo = document.createElement("div");
  card.className += `book added bookNum_${index}`;
  cardInfo.className += "info";
  card.innerHTML =
    '<div class="tile"> <div class="read-indicator"></div> <div class="overlay"> <div class="select"> <button tabindex="-1" type="button" role="button" class="SelectButton" > <div class="SelectButton-unselectedCircle-39XTGh"></div> </button> </div> <div class="edit"> <svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" stroke-miterlimit="1.414" stroke-linejoin="round" id="plex-icon-edit-560" > <path d="m0 560l40-120 80 80-120 40m480-560l-400 400 80 80 400-400-80-80" ></path> </svg> </div> <div class="more"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 560" id="more" > <path d="M350 280c0 38.634-31.366 70-70 70s-70-31.366-70-70 31.366-70 70-70 70 31.366 70 70m0-210c0 38.634-31.366 70-70 70s-70-31.366-70-70 31.366-70 70-70 70 31.366 70 70m0 420c0 38.634-31.366 70-70 70s-70-31.366-70-70 31.366-70 70-70 70 31.366 70 70" ></path> </svg> </div> </div> </div>';
  card.firstChild.style.backgroundImage = `url(${coverUrl})`;
  addDiv.before(card);
  cardInfo.innerHTML = ` <div class="title"> <h3>${title}</h3> </div> <div class="author"> <p>${author}</p> </div> <div class="book-progress"> <p>${pages}</p> </div>`;
  card.appendChild(cardInfo);
}

function updateBookList(bookArray) {
  userAdded = document.querySelectorAll(".added").forEach((e) => e.remove());
  index = 0;
  bookArray.forEach((book) => {
    createBookTile(
      book.title,
      book.author,
      book.pagesRead,
      book.pages,
      book.url,
      index
    );
    index++;
  });
  editButtons = document.querySelectorAll(".edit");
  moreButtons = document.querySelectorAll(".more");
  getEditAction();
  getMoreAction();
  saveArrayToLocalStorage(myLibrary, localLibraryKey);
}

function saveArrayToLocalStorage(array, key) {
  json = JSON.stringify(array);
  localStorage.setItem(`${key}`, json);
}

function pullLibraryToArray(key, array) {
  array = JSON.parse(localStorage.getItem(`'${key}'`));
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  updateBookList(myLibrary);
}
moreButtons = document.querySelectorAll(".more");
