//const { default: tinymce } = require("tinymce");

export default function whritesite () {

    let root = document.getElementById("root")
    root.innerHTML = "";

    const whriteH2 = document.createElement("h2");
    whriteH2.id = "whriteH2";
    whriteH2.className = "whriteH2";
    root.appendChild(whriteH2);
    whriteH2.innerHTML = "Skapa nytt dokument";
    
    let textarea = document.createElement("TEXTAREA");
    textarea.id = "textarea";
    textarea.className = "textarea";
    root.appendChild(textarea);

    const seeNotesInDOMBtn = document.createElement("button");
    seeNotesInDOMBtn.id = "seeNoteInDOMBtn";
    seeNotesInDOMBtn.className = "seeNoteInDOMBtn";
    seeNotesInDOMBtn.innerHTML = "Se resultatet";
    root.appendChild(seeNotesInDOMBtn);
    
    let seeNotesInDOM = document.createElement("div");
    seeNotesInDOM.id  = "textResult";
    seeNotesInDOM.className = "textResult";
    root.appendChild(seeNotesInDOM);




    tinymce.init({
        selector: "textarea",

        

        setup: function(editor) {
            editor.on("change", function(){
                editor.save();
            })
        }
    })

    seeNotesInDOMBtn.addEventListener("click", function() {

        document.getElementById("textResult").innerHTML = document.getElementById("textarea").value;
    })


}