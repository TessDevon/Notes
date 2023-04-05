export default function shownotesite () {

    let root = document.getElementById("root")
    root.innerHTML = "";

    const ShowNotesH2 = document.createElement("h2");
    ShowNotesH2.id = "ShowNotesH2";
    ShowNotesH2.className = "ShowNotesH2";
    root.appendChild(ShowNotesH2);
    ShowNotesH2.innerHTML = "Mina dokument";

}