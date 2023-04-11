
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

    const noteNameToChange = data[0].noteName;
    const noteBlobToChange = data[0].noteBlob;
    console.log(noteNameToChange);

    let root = document.getElementById("root")
    //root.innerHTML = "";

    const whriteH2 = document.createElement("h2");
    whriteH2.id = "whriteH2";
    whriteH2.className = "whriteH2";
    root.appendChild(whriteH2);
    whriteH2.innerHTML = "Ändra dokument";

    const noteNameInfo = document.createElement("span");
    noteNameInfo.classList = "noteNameInfo";
    noteNameInfo.id = "noteNameInfo";
    root.appendChild(noteNameInfo);
    noteNameInfo.innerHTML = "Dokumentnamn"

    let noteNameInput = document.createElement("INPUT");
    noteNameInput.setAttribute("type", "text")
    noteNameInput.id = "noteNameInput";
    noteNameInput.className = "noteNameInput";
    noteNameInput.value = noteNameToChange;
    root.appendChild(noteNameInput);
    
    let textarea = document.createElement("TEXTAREA");
    textarea.id = "textarea";
    textarea.className = "textarea";
    textarea.innerHTML = noteBlobToChange;
    root.appendChild(textarea);

    const seeNotesInDOMBtn = document.createElement("button");
    seeNotesInDOMBtn.id = "seeNoteInDOMBtn";
    seeNotesInDOMBtn.className = "seeNoteInDOMBtn";
    seeNotesInDOMBtn.innerHTML = "Spara";
    root.appendChild(seeNotesInDOMBtn);
    
    let seeNotesInDOM = document.createElement("div");
    seeNotesInDOM.id  = "textResult";
    seeNotesInDOM.className = "textResult";
    root.appendChild(seeNotesInDOM);


    tinymce.init({
        selector: "textarea",
        plugin: "connected",
        toolbar: "undo redo | forecolor backcolor | styleselect bold italic | alignleft alignright | H1 H3 code",  
        setup: function(editor) {
            editor.on("change", function(){
                editor.save();
            })
        }
    })

    seeNotesInDOMBtn.addEventListener("click", function() {

        document.getElementById("textResult").innerHTML = document.getElementById("textarea").value;
        saveNote();

    })

}

/*
function saveChangedNote () {

    const noteNameInput = document.getElementById("noteNameInput").value;
    const userInfo = JSON.parse(localStorage.getItem("userIdLocalStorage")) || []
    const userIdToSave = userInfo.id;
    const userToken = userInfo.token;
    let noteToSave = document.getElementById("textarea").value;



    fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({noteName:noteNameInput, noteBlob:noteToSave, userId:userIdToSave, token:userToken})
    })
    .then(res => res.json())
    .then(data => {
        //console.log("skapa item", data);
        //printTodos();
        
    })
} */
