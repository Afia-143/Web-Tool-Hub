const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close-btn");
const navLeft = document.querySelector(".nav.left");
const navRight = document.querySelector(".nav.right");

let currentIndex = 0;

function showLightBox(index){
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightbox.classList.add(`active`);
}

function closeLightBox(){
    lightbox.classList.remove(`active`);
    lightboxImg.src = ""; 
}

galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
        showLightBox(index);
    });
});

function nextImage(){
    currentIndex = (currentIndex + 1) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
}

function prevImage(){
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
}

closeBtn.addEventListener("click", closeLightBox);
navRight.addEventListener("click", nextImage);
navLeft.addEventListener("click", prevImage);

document.addEventListener("keydown", (e) => {
    if(e.key === "Escape") closeLightBox();
    if(e.key === "ArrowRight") nextImage();
    if(e.key === "ArrowLeft") prevImage();
});