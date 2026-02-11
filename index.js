function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    // Random position
    heart.style.left = Math.random() * 100 + "vw";

    // Random animation duration
    const duration = Math.random() * 2 + 3; // Between 3s and 5s
    heart.style.animationDuration = duration + "s";

    document.body.appendChild(heart);

    // Remove heart after animation ends
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Generate a heart every 300ms
setInterval(createHeart, 300);

// Scroll Interaction
window.addEventListener('scroll', () => {
    const title = document.getElementById('main-title');
    const scrollPosition = window.scrollY;

    // Threshold for change (e.g., 100px)
    if (scrollPosition > 100) {
        title.classList.add('scrolled');
        title.textContent = "Happy Valentine's Day!";
    } else {
        title.classList.remove('scrolled');
        title.textContent = "Hello my Bobo!";
    }
});

// Scroll Animation for Photos
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Run animation once
        }
    });
}, observerOptions);

document.querySelectorAll('.photo-item').forEach(item => {
    observer.observe(item);
});

// Force Scroll to Top on Reload
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}
window.onload = function () {
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 10);
};

// Valentine Interaction
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionDiv = document.getElementById('valentine-question');
const successMsg = document.getElementById('success-msg');

// Make the No button run away
noBtn.addEventListener('mouseover', () => {
    const container = document.querySelector('.valentine-section');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate random position within the container
    // Ensure it stays within the section
    const newTop = Math.random() * (containerRect.height - btnRect.height);
    const newLeft = Math.random() * (containerRect.width - btnRect.width);

    noBtn.style.position = 'absolute';
    noBtn.style.top = newTop + 'px';
    noBtn.style.left = newLeft + 'px';
});

// Yes button click
yesBtn.addEventListener('click', () => {
    questionDiv.classList.add('hidden');
    successMsg.classList.remove('hidden');

    // Create a burst of hearts
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 100);
    }
});
