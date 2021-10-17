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
//---------------------------------------STICKY HEADER END-------------------------------------
//---------------------------------------SEARCH BOX START--------------------------------------
let searchBtn = document.querySelector('.searchbox i');
let searchInput = document.querySelector('.searchbox input');
searchBtn.addEventListener('click', () => {
    searchInput.classList.toggle('searchbox_input_block')
})
//---------------------------------------SEARCH BOX  END--------------------------------------

//---------------------------------------HOME GALLERY START-----------------------------------
let imgHomeGalleryDivs = [...document.querySelectorAll('.home-section-5-gallery .home-section-5-gallery-img')];
let imgHomeGallery = document.querySelector('.home-section-gallery-big .home-section-gallery-big-img img')
let extBtnHomeGall = document.querySelector(".home-section-gallery-big .exit-btn");
let homeGalleryWrap = document.querySelector(".home-section-gallery-big")
let homeGalleryArrs = [...document.querySelectorAll('.home-section-gallery-big .home-section-gallery-big-img i')];
let counterHomeGall = 1;

//exit from gallery
extBtnHomeGall.addEventListener('click', () => {
    homeGalleryWrap.style.display = "none";
})
//open gallery
function openHomeGall(item){
    item.addEventListener('click', () => {
        counterHomeGall = item.id;
        homeGalleryWrap.style.display = "flex";
        fetch("json/home-gallery.json")
        .then(resp => resp.json())
        .then(item2 => {
        item2.homeGallery.forEach((item3) => {
            if(item.id == item3.id){
                imgHomeGallery.removeAttribute('src')
                imgHomeGallery.setAttribute('src', item3.link);
            }
        })    
        
    })
    .catch(function(error) {
        console.log(error)
      }); 
    })    
}
imgHomeGalleryDivs.forEach(item => openHomeGall(item))
//previous and next img
function preNexImg(item){
    item.addEventListener('click', () => {
        fetch("json/home-gallery.json")
        .then(resp => resp.json())
        .then(item2 => {
            if(item.className.includes("left")){
                counterHomeGall--;
                item2.homeGallery.forEach((item3) => {
                    if(counterHomeGall == 0){
                        counterHomeGall = item2.homeGallery.length
                    }
                    if(item3.id == counterHomeGall){
                        imgHomeGallery.removeAttribute('src')
                        imgHomeGallery.setAttribute('src', item3.link);
                    }           
                })
            } else if(item.className.includes("right")){
                counterHomeGall++;
                item2.homeGallery.forEach((item3) => {
                    if(counterHomeGall == item2.homeGallery.length + 1){
                        counterHomeGall = 1
                    }
                    if(item3.id == counterHomeGall){
                        imgHomeGallery.removeAttribute('src')
                        imgHomeGallery.setAttribute('src', item3.link);
                    }           
                })
            }
        })
        .catch(function(error) {
            console.log(error)
        });
    })
}
homeGalleryArrs.forEach(item => preNexImg(item))


//---------------------------------------HOME GALLERY END-------------------------------------

//---------------------------------------HOME SLIDER START------------------------------------
const homeCarouselSlide = document.querySelector('.home-section-6-carousel-track');
const homeCarouselItems = [...document.querySelectorAll('.home-section-6-carousel-slide-img')]
let homeCarouselDots = [...document.querySelectorAll('.dot')]
let homeCarouselTexts = [...document.querySelectorAll('.home-section-6-carousel-slide-text')]
let homeCounterCarousel = 1;
let homeMarginItem = parseInt(window.getComputedStyle(homeCarouselItems[0].parentNode).marginLeft);
const homeSizeCarouselItem = homeCarouselItems[0].clientWidth;
homeCarouselSlide.style.transform = 'translateX(' +(-homeSizeCarouselItem * homeCounterCarousel - 3 * homeMarginItem) + 'px)';

//dots addFunction
function homeCarouselFunction(item){
    item.addEventListener('click', () => {
        if(!item.className.includes('active-slide')){
            //active-slide for dots
            homeCarouselDots.forEach(dot => dot.classList.remove('active-slide'))
            item.classList.add('active-slide')
            //actice-slide for slide
            homeCarouselItems.forEach(slide => {
                slide.classList.remove('active-slide');
                if(item.id == slide.id){
                    homeCounterCarousel = homeCarouselDots.indexOf(item)
                    slide.classList.add('active-slide');
                    homeCarouselSlide.style.transform = 'translateX(' +(-homeSizeCarouselItem * homeCounterCarousel - homeMarginItem * (homeCounterCarousel + 1 + homeCounterCarousel)) + 'px)';

                }
            })
            //active-slide for text
            homeCarouselTexts.forEach(text => {
                text.classList.remove('active-slide');
                if(item.id == text.id){
                    text.classList.add('active-slide');
                }
            })
        }
    })
}
homeCarouselDots.forEach(item => homeCarouselFunction(item))
//---------------------------------------HOME SLIDER END--------------------------------------

