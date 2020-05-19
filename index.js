showNotes();
document.getElementById("addTextButton").addEventListener("click",function(){
    let noteToSave = document.getElementById("addTxtBox");
    let noteTitle = document.getElementById('titleNoteBox');
    let importance = 0;
    var obj = [noteTitle.value,noteToSave.value,importance]
    if (noteToSave.value=="") {
        alert("Enter some content")
    }
    else{
        var notSection = localStorage.getItem("savedNotesSection");
        if (notSection==null) {
            notesArray = [];
        }
        else{
            notesArray = JSON.parse(notSection);
        }
        notesArray.push(obj);
        localStorage.setItem("savedNotesSection",JSON.stringify(notesArray));
        noteToSave.value = "";
        noteTitle.value="";
        showNotes();
    }

});

function showNotes(params) {
    var notSection = localStorage.getItem("savedNotesSection");
    if (notSection==null) {
        notesArray = [];
    }
    else{
        notesArray = JSON.parse(notSection);
    }
    var html="";
    notesArray.forEach(function(element,index) {
        if (element[2]==0) {
            html+=
            `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body" style="background-color: #B2BABB ;">
              <button onclick="markImportant(${index})" class="btn btn-primary" style="float: right;background-color: #E74C3C; border-color :#E74C3C;" title="Mark Important"><i class="fas fa-exclamation"></i></button>
              <h5 class="card-title">${element[0]}</h5>
              <hr>
              <p class="card-text">${element[1]}</p>
              <button id="${index}" onclick="deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
            </div>
          </div>`;
        } else {
            html+=
            `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body" style="background-color: #EC7063 ;">
              <button onclick="markImportant(${index})" class="btn btn-primary" style="float: right;background-color: #E74C3C; border-color :#E74C3C;" title="Mark Important"><i class="fas fa-exclamation"></i></button>
              <h5 class="card-title">${element[0]}</h5>
              <hr>
              <p class="card-text">${element[1]}</p>
              <button id="${index}" onclick="deleteNote(this.id)"  class="btn btn-primary">Delete Note</button>
            </div>
          </div>`;
        }

    }); 
    var noteshtml = document.getElementById("savedNotesSection");
    if (notesArray.length!=0) {
        noteshtml.innerHTML = html;
    }   
    else{
        noteshtml.innerHTML="<h5>No saved notes</h5>"
    }
}

function deleteNote(index){
    var notes = localStorage.getItem("savedNotesSection");
    if (notes==null) {
        noteArray=[];
    }
    else{
        noteArray=JSON.parse(notes);
    }
    if (confirm("Sure you want to delete the note : "+ noteArray[index][0])) {
        noteArray.splice(index,1);
        localStorage.setItem("savedNotesSection",JSON.stringify(noteArray));
    }
    showNotes();
}
document.getElementById("deleteAllNotes").addEventListener("click",function(){
    if (confirm("This action will delete all the notes? Still wish to continue?")) {
        localStorage.clear();
    }
    showNotes();
});

let searchTextBox = document.getElementById('searchTxtBox');
searchTextBox.addEventListener("input",function(){
    var addTextCardArea = document.getElementById('addTextCardArea');
    var searchResultArea = document.getElementById('searchResultArea');
    var searchValue = searchTextBox.value;
    if (searchValue.length>0) {
        addTextCardArea.style.display = "none";
        searchResultArea.style.display = "none";
    } else {
        addTextCardArea.style.display = "block";
        searchResultArea.style.display = "flex";
       
    }
    var cards = document.getElementsByClassName('noteCard');
    Array.from(cards).forEach(function(element){
        var titleContent = element.getElementsByTagName("h5")[0].innerText;
        var textContent = element.getElementsByTagName("p")[0].innerText;
        if (textContent.toLowerCase().includes(searchValue.toLowerCase())      ||   titleContent.toLowerCase().includes(searchValue.toLowerCase())) {
            element.style.display ="block";            
        }
        else{
            element.style.display ="none";  
        }
    })
});

function markImportant(index) {
    var notes = localStorage.getItem("savedNotesSection");
    if (notes==null) {
        noteArray=[];
    }
    else{
        noteArray=JSON.parse(notes);
    }
    // if (noteArray[index][2]!=""&&noteArray[index][2]!=null) {

    // }
    if (noteArray[index][2]==1) {
        noteArray[index][2]= 0;
    } else {
        noteArray[index][2]= 1;
    }
    localStorage.setItem("savedNotesSection",JSON.stringify(noteArray));
    showNotes();
}
