/* PROFILE */
function saveProfile(){
  localStorage.setItem("profile", JSON.stringify({
    name: name.value,
    role: role.value,
    bio: bio.value
  }));
}

const p = JSON.parse(localStorage.getItem("profile")||"{}");
if (name) {
  name.value = p.name || "";
  role.value = p.role || "";
  bio.value = p.bio || "";
}

/* GALLERY */
let galleryData = JSON.parse(localStorage.getItem("gallery")||"[]");

function addImage(e){
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    galleryData.push({
      img: reader.result,
      title: imgTitle.value,
      desc: imgDesc.value
    });
    localStorage.setItem("gallery", JSON.stringify(galleryData));
    renderGallery();
  };
  reader.readAsDataURL(file);
}

function renderGallery(){
  if(!gallery) return;
  gallery.innerHTML="";
  galleryData.forEach((g,i)=>{
    gallery.innerHTML+=`
      <div class="card">
        <img src="${g.img}">
        <div class="info">
          <b>${g.title}</b>
          <p>${g.desc}</p>
          <button onclick="delImg(${i})">Delete</button>
        </div>
      </div>`;
  });
}
function delImg(i){
  galleryData.splice(i,1);
  localStorage.setItem("gallery",JSON.stringify(galleryData));
  renderGallery();
}
renderGallery();

/* NOTES */
let notes = JSON.parse(localStorage.getItem("notes")||"[]");
function addNote(){
  notes.push(noteText.value);
  localStorage.setItem("notes",JSON.stringify(notes));
  noteText.value="";
  loadNotes();
}
function loadNotes(){
  if(!notesDiv) return;
  notesDiv.innerHTML="";
  notes.forEach((n,i)=>{
    notesDiv.innerHTML+=`<div class="card">${n}</div>`;
  });
}
