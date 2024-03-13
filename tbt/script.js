const cardContainer = document.querySelector('#cardContainer');
const nopeBtn = document.querySelector('#nopeBtn');
const likeBtn = document.querySelector('#likeBtn');
const yesCounter = document.querySelector('#yesCounter');
const noCounter = document.querySelector('#noCounter');

let startMouseX = 0;
let isDragging = false;
let startX = 0;
let currentCardIndex = 0;
let yesCount = 0;
let noCount = 0;

init();

function init() {
    showCard(currentCardIndex);
    setupSwipe();
}

function showCard(index) {
    const backgroundImageUrl = `https://thispersondoesnotexist.com/?${new Date().getTime()}`; // Add random string
    cardContainer.innerHTML = `<div class="card" style="background-image: url('${backgroundImageUrl}')"></div>`;
}

function setupSwipe() {
    cardContainer.addEventListener('mousedown', startSwipe);
    document.addEventListener('mousemove', moveSwipe);
    document.addEventListener('mouseup', endSwipe);
}

function startSwipe(event) {
    isDragging = true;
    startMouseX = event.clientX;
    startX = cardContainer.getBoundingClientRect().left;
}

function moveSwipe(event) {
    if (!isDragging) return;
    const offsetX = event.clientX - startMouseX;
    cardContainer.style.transform = `translateX(${offsetX}px)`;
}

function endSwipe(event) {
    if (!isDragging) return;
    isDragging = false;
    const offsetX = event.clientX - startMouseX;
    const threshold = cardContainer.clientWidth * 0.25;
    if (offsetX > threshold) handleSwipe(true); // Swipe right
    else if (offsetX < -threshold) handleSwipe(false); // Swipe left
    else cardContainer.style.transform = ''; // Reset position
}

function handleSwipe(like) {
    if (like) {
        yesCount++;
        yesCounter.textContent = yesCount;
    } else {
        noCount++;
        noCounter.textContent = noCount;
    }
    
    currentCardIndex++;
    showCard(currentCardIndex);
    cardContainer.style.transform = ''; // Reset position
}

nopeBtn.addEventListener('click', () => handleSwipe(false));
likeBtn.addEventListener('click', () => handleSwipe(true));
