function openPopup() {
    document.getElementById("popup").style.display = "block";
}

// Popup schließen
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Schließen des Popups, wenn auf den Schließen-Button geklickt wird
document.getElementsByClassName("close")[0].addEventListener("click", closePopup);