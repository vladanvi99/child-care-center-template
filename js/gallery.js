//---------------------------------------STICKY HEADER START-----------------------------------
window.addEventListener('scroll', () => stickyHeader());
var header = document.getElementById("header");
var sticky = header.offsetTop;
function stickyHeader() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
console.log(header) 
//---------------------------------------STICKY HEADER END-------------------------------------
//---------------------------------------GALLERY GALLERY START-----------------------------------
let imgGalleryGalleryDivs = [...document.querySelectorAll('.gallery-section-2-gallery .gallery-section-2-gallery-img')];
let imgGalleryGallery = document.querySelector('.gallery-section-gallery-big .gallery-section-gallery-big-img img')
let extBtnGalleryGall = document.querySelector(".gallery-section-gallery-big .exit-btn");
let galleryGalleryWrap = document.querySelector(".gallery-section-gallery-big")
let galleryGalleryArrs = [...document.querySelectorAll('.gallery-section-gallery-big .gallery-section-gallery-big-img i')];
let counterGalleryGall = 1;

//exit from gallery
extBtnGalleryGall.addEventListener('click', () => {
    galleryGalleryWrap.style.display = "none";
})
//open gallery
function openGalleryGall(item){
    item.addEventListener('click', () => {
        counterGalleryGall = item.id;
        galleryGalleryWrap.style.display = "flex";
        fetch("json/gallery-gallery.json")
        .then(resp => resp.json())
        .then(item2 => {
        item2.galleryGallery.forEach((item3) => {
            if(item.id == item3.id){
                imgGalleryGallery.removeAttribute('src')
                imgGalleryGallery.setAttribute('src', item3.link);
            }
        })    
        
    })
    .catch(function(error) {
        console.log(error)
      }); 
    })    
}
imgGalleryGalleryDivs.forEach(item => openGalleryGall(item))
//previous and next img
function preNexGalImg(item){
    item.addEventListener('click', () => {
        fetch("json/gallery-gallery.json")
        .then(resp => resp.json())
        .then(item2 => {
            if(item.className.includes("left")){
                counterGalleryGall--;
                console.log(item2.galleryGallery.length)
                item2.galleryGallery.forEach((item3) => {
                    if(counterGalleryGall == 0){
                        counterGalleryGall = item2.galleryGallery.length
                    }
                    if(item3.id == counterGalleryGall){
                        imgGalleryGallery.removeAttribute('src')
                        imgGalleryGallery.setAttribute('src', item3.link);
                    }           
                })
            } else if(item.className.includes("right")){
                counterGalleryGall++;
                item2.galleryGallery.forEach((item3) => {
                    if(counterGalleryGall == item2.galleryGallery.length + 1){
                        counterGalleryGall = 1
                    }
                    if(item3.id == counterGalleryGall){
                        imgGalleryGallery.removeAttribute('src')
                        imgGalleryGallery.setAttribute('src', item3.link);
                    }           
                })
            }
        })
        .catch(function(error) {
            console.log(error)
        });
    })
}
galleryGalleryArrs.forEach(item => preNexGalImg(item))


//---------------------------------------GALLERY GALLERY END-------------------------------------