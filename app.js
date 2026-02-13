document.addEventListener("DOMContentLoaded",()=>{
  loadProfile();
  renderGallery();
  loadNotes();
});

/* PROFILE */
function saveProfile(){
  localStorage.setItem("profile",JSON.stringify({
    name:name.value,
    role:role.value,
    bio:bio.value
  }));
}
function loadProfile(){
  if(!name) return;
  let p=JSON.parse(localStorage.getItem("profile")||"{}");
  name.value=p.name||"";
  role.value=p.role||"";
  bio.value=p.bio||"";
}

/* GALLERY */
let galleryData=JSON.parse(localStorage.getItem("gallery")||"[]");

function addImages(e){
  [...e.target.files].forEach(f=>{
    const r=new FileReader();
    r.onload=()=>{
      galleryData.push({
        img:r.result,
        title:imgTitle.value,
        desc:imgDesc.value
      });
      renderGallery();
    };
    r.readAsDataURL(f);
  });
}

function saveGallery(){
  localStorage.setItem("gallery",JSON.stringify(galleryData));
}

function renderGallery(){
  if(!gallery) return;
  gallery.innerHTML="";
  galleryData.forEach((g,i)=>{
    gallery.innerHTML+=`
    <div class="card" onclick="openViewer('${g.img}')">
      <img src="${g.img}">
      <div style="padding:10px">
        <b>${g.title}</b>
        <p>${g.desc}</p>
      </div>
    </div>`;
  });
}

function openViewer(src){
  viewer.style.display="block";
  viewerImg.src=src;
}
function closeViewer(){
  viewer.style.display="none";
}

/* NOTES */
let notesData=JSON.parse(localStorage.getItem("notes")||"[]");

function saveNote(){
  notesData.push(noteText.value);
  localStorage.setItem("notes",JSON.stringify(notesData));
  noteText.value="";
  loadNotes();
}
function loadNotes(){
  if(!notes) return;
  notes.innerHTML="";
  notesData.forEach(n=>{
    notes.innerHTML+=`<div class="card" style="padding:12px">${n}</div>`;
  });
}
