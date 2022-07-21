showNotes();
//user adding a note, adding it to the local storage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById("addText");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    let title = localStorage.getItem("title");

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addText.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = "";
    addTitle.value ="";
    showNotes();
});
//func to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard mx-2 my-2 card" style="width: 18rem;">
                    <!-- <img src="..." class="card-img-top" alt="..."> -->
                    <div class="card-body">
                      <h5 class="card-title">${index + 1}. ${element.title}</h5>
                      <p class="card-text"> ${element.text}</p>
                      <button id="${index}"  onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                  </div> `

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show..!! Use "Add a Note" section above to add notes`
    }
}

//func to delete a ndoe
function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();

}
search = document.getElementById('searchText');
search.addEventListener("input", function () {
    let inputValue = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (elements) {
        let cardText = elements.getElementsByTagName("p")[0].innerText;
        if ((cardText.toLowerCase()).includes(inputValue)) {
            elements.style.display = "block";
        }
        else {
            elements.style.display = "none";

        }

    });

});