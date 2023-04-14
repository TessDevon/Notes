//const { default: tinymce } = require("tinymce");

export default function whritesite () {

    let root = document.getElementById("root")
    root.innerHTML = "";

    const whriteH2 = document.createElement("h2");
    whriteH2.id = "whriteH2";
    whriteH2.className = "whriteH2";
    root.appendChild(whriteH2);
    whriteH2.innerHTML = "Skapa nytt dokument";

    const noteNameInfo = document.createElement("span");
    noteNameInfo.classList = "noteNameInfo";
    noteNameInfo.id = "noteNameInfo";
    root.appendChild(noteNameInfo);
    noteNameInfo.innerHTML = "Dokumentnamn"

    let noteNameInput = document.createElement("INPUT");
    noteNameInput.setAttribute("type", "text")
    noteNameInput.id = "noteNameInput";
    noteNameInput.className = "noteNameInput";
    root.appendChild(noteNameInput);
    
    let textarea = document.createElement("TEXTAREA");
    textarea.id = "textarean";
    textarea.className = "textarean";
    root.appendChild(textarea);

    const seeNotesInDOMBtn = document.createElement("button");
    seeNotesInDOMBtn.id = "seeNoteInDOMBtn";
    seeNotesInDOMBtn.className = "seeNoteInDOMBtn";
    seeNotesInDOMBtn.innerHTML = "Visa dokumentet";
    root.appendChild(seeNotesInDOMBtn);
    
    let seeNotesInDOM = document.createElement("div");
    seeNotesInDOM.id  = "textResult";
    seeNotesInDOM.className = "textResult";
    root.appendChild(seeNotesInDOM);

    tinymce.remove();

    tinymce.init({
        selector: "#textarean",
        plugin: "connected",
        toolbar: "undo redo | forecolor backcolor | styleselect bold italic | alignleft alignright | H1 H3 code",  
        setup: function(editor) {
            editor.on("change", function(){
                editor.save();
            })
        }
    })

    const saveContainer = document.createElement("div");
        root.appendChild(saveContainer);

    seeNotesInDOMBtn.addEventListener("click", function() {

        document.getElementById("textResult").innerHTML = document.getElementById("textarean").value;

        saveContainer.innerHTML = "";

        const saveNoteBtn = document.createElement("button");
        saveNoteBtn.id = "saveNoteBtn";
        saveNoteBtn.className = "saveNoteBtn";
        saveNoteBtn.innerHTML = "Spara dokumentet";
        saveContainer.appendChild(saveNoteBtn);
        const saveMessageP = document.createElement("p");
        saveMessageP.id = "saveMessageP";
        saveMessageP.className = "saveMessageP";
        saveContainer.appendChild(saveMessageP);

            saveNoteBtn.addEventListener("click", function() {
                saveNote();
            })
    })
}

function saveNote () {
    const noteNameInput = document.getElementById("noteNameInput").value;
    const userInfo = JSON.parse(localStorage.getItem("userIdLocalStorage")) || []
    const userIdToSave = userInfo.id;
    const userToken = userInfo.token;
    let noteToSave = document.getElementById("textarean").value;
    const saveMessageP = document.getElementById("saveMessageP");
    saveMessageP.innerHTML = ""

    fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({noteName:noteNameInput, noteBlob:noteToSave, userId:userIdToSave, token:userToken})
    })
    .then(res => res.json())
    .then(data => {
        const noteNameInput = document.getElementById("noteNameInput")
        noteNameInput.value = ""
        tinymce.activeEditor.setContent("");
        const saveMessageP = document.getElementById("saveMessageP");
        saveMessageP.innerHTML = ""
        const textResult = document.getElementById("textResult")
        textResult.innerHTML = ""

        
    })
    .catch ((err) => {
        
        saveMessageP.style.color = "red";
        saveMessageP.innerHTML = "Error! Namnet finns redan. Välj en anna rubrik.";
    });
}


