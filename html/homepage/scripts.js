// 슬라이드쇼 자동 전환 (5초마다)
let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slide').length;
const dotsContainer = document.getElementById('dots-container');

// 슬라이드 업데이트 함수
function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;

    // 이미지 버튼 활성화
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// 좌우 버튼 클릭 이벤트
document.getElementById('prev-btn').addEventListener('click', () => {
    currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
    updateSlider();
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
    updateSlider();
});

// 이미지 버튼 클릭 이벤트
function createDotButtons() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }
}

createDotButtons();
updateSlider();

// 슬라이드 자동 전환
setInterval(() => {
    currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
    updateSlider();
}, 5000);
