
export default function shownotesite () {

    let root = document.getElementById("root")
    root.innerHTML = "";

    const ShowNotesH2 = document.createElement("h2");
    ShowNotesH2.id = "ShowNotesH2";
    ShowNotesH2.className = "ShowNotesH2";
    root.appendChild(ShowNotesH2);
    ShowNotesH2.innerHTML = "Mina dokument";

    const ShowNotesH3 = document.createElement("h3");
    ShowNotesH3.id = "ShowNotesH3";
    ShowNotesH3.className = "ShowNotesH3";
    root.appendChild(ShowNotesH3);
    ShowNotesH3.innerHTML = "Tryck på ett dokument nedan för att redigera.";

    findAndWhriteUserNotes();
};



function findAndWhriteUserNotes () {

    const userInfo = JSON.parse(localStorage.getItem("userIdLocalStorage")) || []
    const userIdToSave = userInfo.id;
    const userToken = userInfo.token;
    console.log(userIdToSave);
    console.log(userToken);
    userToken
    
        fetch("http://localhost:3000/notes/user/" + userIdToSave, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Network response was not OK")
            }
                return res.json()
            })
        .then(data => {

        
            data.map(note => {

                const showNotesDiv = document.createElement("article");
                showNotesDiv.classList = "showNotesDiv";
                showNotesDiv.id = "showNotesDiv";
                root.appendChild(showNotesDiv)

                const noteName = document.createElement("p");
                noteName.classList = "noteName";
                noteName.id = note.noteId;
                noteName.innerHTML = note.noteName;
                showNotesDiv.appendChild(noteName);   
                noteName.addEventListener("click", (e) => {
                    ChangeSavedNote(e.target.id);    
                })  
            })
        })
        .catch((error) => {
            console.error("Error:", error);
    }); 
}



function ChangeSavedNote (noteId) {

    let root = document.getElementById("root")


    console.log(noteId);

    fetch("http://localhost:3000/notes/" + noteId, {
            method:"GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            if(!res.ok) {
                throw new Error("Network response was not OK")
            }
                return res.json()
            })

        .then(data => {


            changeNote(data);

        })

        .catch((error) => {
            console.error("Error:", error);
        });
};

function changeNote (data) {
        
    console.log(data);

    let root = document.getElementById("root")

    let editingContainer = document.getElementById("editingContainer");
        if (editingContainer) {
            editingContainer.innerHTML = "";
        } else {
            editingContainer = document.createElement("div");
            editingContainer.id = "editingContainer";
            editingContainer.classList = "editingContainer";
            root.appendChild(editingContainer);    
        }

    const noteNameToChange = data[0].noteName;
    const noteBlobToChange = data[0].noteBlob;
    console.log(noteNameToChange);


    const whriteH2 = document.createElement("h2");
    whriteH2.id = "whriteH2";
    whriteH2.className = "whriteH2";
    editingContainer.appendChild(whriteH2);
    whriteH2.innerHTML = "Redigera  " + noteNameToChange;
    
    let textarea = document.createElement("TEXTAREA");
    textarea.id = "redTextarea";
    textarea.className = "redTextarea";
    textarea.innerHTML = noteBlobToChange;
    editingContainer.appendChild(textarea);

    const seeNotesInDOMBtn = document.createElement("button");
    seeNotesInDOMBtn.id = "seeNoteInDOMBtn";
    let noteId = data[0].noteId;
    seeNotesInDOMBtn.noteId = noteId
    seeNotesInDOMBtn.className = "seeNoteInDOMBtn";
    seeNotesInDOMBtn.innerHTML = "Visa";
    editingContainer.appendChild(seeNotesInDOMBtn);


    let seeNotesInDOM = document.createElement("div");
    seeNotesInDOM.id  = "textResult";
    seeNotesInDOM.className = "textResult";
    
    editingContainer.appendChild(seeNotesInDOM);

    tinymce.remove();

    tinymce.init({
        selector: "#redTextarea",
        plugin: "connected",
        toolbar: "undo redo | forecolor backcolor | styleselect bold italic | alignleft alignright | H1 H3 code",  
        setup: function(editor) {
            editor.on("change", function(){
                editor.save();
            })
        }
    })    
    
const changeContainer = document.createElement("div");
        editingContainer.appendChild(changeContainer);

    seeNotesInDOMBtn.addEventListener("click", function(event) {

        document.getElementById("textResult").innerHTML = document.getElementById("redTextarea").value;

        changeContainer.innerHTML = "";

        const saveNoteBtn = document.createElement("button");
        saveNoteBtn.id = "saveNoteBtn";
        saveNoteBtn.className = "saveNoteBtn";
        let noteId = event.target.noteId;
        saveNoteBtn.noteId = noteId
        saveNoteBtn.innerHTML = "Spara över dokumentet";
        changeContainer.appendChild(saveNoteBtn);

        const deleteNoteBtn = document.createElement("button");
        deleteNoteBtn.id = "deleteNoteBtn";
        deleteNoteBtn.className = "deleteNoteBtn";
        deleteNoteBtn.noteId = noteId
        deleteNoteBtn.innerHTML = "Radera dokumentet";
        changeContainer.appendChild(deleteNoteBtn);

        const saveMessageP = document.createElement("p");
        saveMessageP.id = "saveMessageP";
        saveMessageP.className = "saveMessageP";
        changeContainer.appendChild(saveMessageP);

            saveNoteBtn.addEventListener("click", function(event) {
                saveChangedNote(event.target.noteId);
            })

            deleteNoteBtn.addEventListener("click", function(event) {
                deleteNote(event.target.noteId);
            })

    })

}


function saveChangedNote (noteId) {

    const userInfo = JSON.parse(localStorage.getItem("userIdLocalStorage")) || []
    const userIdToSave = userInfo.id;
    const noteIdTosave = noteId;
    const userToken = userInfo.token;
    let noteToSave = document.getElementById("redTextarea").value;



    fetch("http://localhost:3000/notes/changeNote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId:noteIdTosave, noteBlob:noteToSave, userId:userIdToSave, token:userToken})
    })
    .then(res => res.json())
    .then(data => {
        location.reload()
    })
} 

function deleteNote (noteId) {
    const userInfo = JSON.parse(localStorage.getItem("userIdLocalStorage")) || []
    const userIdToSave = userInfo.id;
    const noteIdTosave = noteId;
    const userToken = userInfo.token;

    fetch("http://localhost:3000/notes/deleteNote", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId:noteIdTosave, userId:userIdToSave, token:userToken})
    })
    .then(res => res.json())
    .then(data => {
        location.reload()
    })
} 