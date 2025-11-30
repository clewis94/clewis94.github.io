const galleries = document.querySelectorAll('.gallery');
let images = [];
galleries.forEach(g => images.push(...g.querySelectorAll('img')));

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

//opening lightbox
images.forEach((img, i) => {
    img.addEventListener('click', () => {
        currentIndex = i;
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

//close lightbox
closeBtn.addEventListener('click', () => lightbox.style.display = 'none');
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = 'none';
});

//Previous/Next buttons
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex].src;
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex].src;
});
