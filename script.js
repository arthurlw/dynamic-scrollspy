// Select all the scrollspy bars and sections
const spyBars = document.querySelectorAll('.spy-bar');
const sections = document.querySelectorAll('section');

// Function to update active scrollspy bar
function updateActiveBar(index) {
    spyBars.forEach((bar, i) => {
        if (i - 2 === index) { // (2) Number of unused scrollbars above of the used bars
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
}

function clickUpdateActiveBar(index){
    spyBars.forEach((bar, i) => {
        if (i === index) {
            bar.classList.add('active');
        } else {
            bar.classList.remove('active');
        }
    });
 }

 spyBars.forEach((bar, index) => {
    bar.addEventListener('click', () => {
        const targetSection = sections[index - 2]; // (2) Number of unused scrollbars above of the used bars
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest', // Aligns properly within the viewport
                inline: 'nearest'
            });
        }
        clickUpdateActiveBar(index);
    });
});


// Intersection Observer to track sections on scroll
const observerOptions = {
    root: null, // Observe within the viewport
    threshold: 0.8, // 80% of the section must be visible to activate
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Find the index of the current section
            const index = Array.from(sections).indexOf(entry.target);
            updateActiveBar(index);
            // Add animation class to boxes in the section when it becomes visible
            const boxes = entry.target.querySelectorAll('.box');
            boxes.forEach(box => box.classList.add('animate'));
        }
    });
}, observerOptions);

// Attach observer to each section
sections.forEach((section) => {
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const spyBars = document.querySelectorAll('.spy-bar[data-target]');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('hidden');
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    // Initialize sections as hidden and observe them
    sections.forEach((section) => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    // Scroll event listener for the content
    document.querySelector('.content').addEventListener('scroll', () => {
        let currentSection = null;

        // Find the currently visible section
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                currentSection = section.id;
            }
        });

        // Highlight the active spy-bar
        spyBars.forEach((spyBar) => {
            if (spyBar.dataset.target === currentSection) {
                spyBar.classList.add('active');
                scrollSpyToCenter(spyBar);
            } else {
                spyBar.classList.remove('active');
            }
        });
    });

    // Click listener for spy-bars
    spyBars.forEach((spyBar) => {
        spyBar.addEventListener('click', () => {
            const targetId = spyBar.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Function to scroll the scrollspy element
    function scrollSpyToCenter(activeElement) {
        const scrollSpyContainer = document.querySelector('.scrollspy');
        const containerHeight = scrollSpyContainer.offsetHeight;
        const elementTop = activeElement.offsetTop;
        const elementHeight = activeElement.offsetHeight;

        // Scroll so the active element is centered
        scrollSpyContainer.scrollTo({
            top: elementTop - containerHeight / 2 + elementHeight / 2,
            behavior: 'smooth',
        });
    }
});
