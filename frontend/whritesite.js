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
    textarea.id = "textarea";
    textarea.className = "textarea";
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

function saveNote () {

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
}


