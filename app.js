/* ---------- GALLERY ---------- */
let images = JSON.parse(localStorage.getItem("images") || "[]");

function saveImages() {
  localStorage.setItem("images", JSON.stringify(images));
}

function loadImages() {
  const g = document.getElementById("gallery");
  if (!g) return;
  g.innerHTML = "";

  images.forEach((img, i) => {
    const d = document.createElement("div");
    const im = document.createElement("img");
    im.src = img;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete";
    del.onclick = () => {
      images.splice(i, 1);
      saveImages();
      loadImages();
    };

    d.append(im, del);
    g.appendChild(d);
  });
}

function addImage(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    images.push(reader.result);
    saveImages();
    loadImages();
  };
  reader.readAsDataURL(file);
}

/* ---------- NOTES ---------- */
let notes = JSON.parse(localStorage.getItem("notes") || "[]");

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function loadNotes() {
  const n = document.getElementById("notes");
  if (!n) return;
  n.innerHTML = "";

  notes.forEach((note, i) => {
    const d = document.createElement("div");
    d.className = "note";
    d.innerHTML = note;

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete";
    del.onclick = () => {
      notes.splice(i, 1);
      saveNotes();
      loadNotes();
    };

    d.appendChild(del);
    n.appendChild(d);
  });
}

function addNote() {
  const t = document.getElementById("noteText");
  if (!t.value) return;
  notes.push(t.value);
  t.value = "";
  saveNotes();
  loadNotes();
}

document.addEventListener("DOMContentLoaded", () => {
  loadImages();
  loadNotes();
});
