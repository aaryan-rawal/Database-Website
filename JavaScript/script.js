document.addEventListener('DOMContentLoaded', () => {
    console.log("DataHub Website Loaded");

    // --- Active Navigation Link ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Get current page filename
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        // Handle cases where href might be empty or just '/'
        let linkPage = '';
        const href = link.getAttribute('href');
        if (href) {
            const parts = href.split('/');
            linkPage = parts[parts.length - 1] || 'index.html'; // Get last part or default to index.html
        }

        // More robust check for homepage (index.html or just '/')
        const isHomepage = currentPage === 'index.html' || currentPage === '';
        const linkIsHomepage = linkPage === 'index.html' || linkPage === '';

        if (isHomepage && linkIsHomepage) {
             link.classList.add('active');
        } else if (linkPage === currentPage && !isHomepage) {
            link.classList.add('active');
        }
         else {
            link.classList.remove('active'); // Ensure others are not active
        }
    });


    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // When element comes into view
                if (entry.isIntersecting) {
                    entry.target.style.animation = `slideInUp 0.7s ease-out forwards`;
                    // Optional: Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        // Observe each animated element
        animatedElements.forEach(el => {
            observer.observe(el);
        });

    } else {
        // Fallback for older browsers: just show the elements
        console.log("Intersection Observer not supported, showing elements directly.");
        animatedElements.forEach(el => {
            el.style.opacity = 1; // Make them visible
        });
    }


    // --- Smooth Scroll (if using internal # links - less common in multi-page) ---
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Check if it's just '#' or '#something' and not just '#' alone
            if (targetId && targetId.length > 1) {
                 e.preventDefault(); // Only prevent default if it's an actual anchor link
                try {
                    const targetElement = document.querySelector(targetId);
                    if(targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                } catch (error) {
                    console.error("Error finding or scrolling to element:", error);
                }
            }
        });
    });

});