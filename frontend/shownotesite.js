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
            
        })

        .catch((error) => {
            console.error("Error:", error);
        });

    };


