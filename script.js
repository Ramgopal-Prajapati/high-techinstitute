// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Initialize Flatpickr for date picker
    if (document.getElementById('demoDate')) {
        flatpickr("#demoDate", {
            minDate: "today",
            dateFormat: "Y-m-d",
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            console.log('Mobile menu button clicked');
            mainNav.classList.toggle('active');
        });
    }
    
    // Schedule Demo Modal
    const scheduleDemoBtn = document.getElementById('scheduleDemoBtn');
    const homeDemoBtn = document.getElementById('homeDemoBtn');
    const homeWatchDemoBtn = document.getElementById('homeWatchDemoBtn');
    const demoModal = document.getElementById('demoModal');
    const modalClose = document.getElementById('modalClose');
    
    function openDemoModal() {
        console.log('Opening demo modal');
        demoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeDemoModal() {
        console.log('Closing demo modal');
        demoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Add event listeners for demo buttons
    if (scheduleDemoBtn) scheduleDemoBtn.addEventListener('click', openDemoModal);
    if (homeDemoBtn) homeDemoBtn.addEventListener('click', openDemoModal);
    if (modalClose) modalClose.addEventListener('click', closeDemoModal);
    
    // Close modal when clicking outside
    if (demoModal) {
        demoModal.addEventListener('click', function(e) {
            if (e.target === demoModal) {
                closeDemoModal();
            }
        });
    }
    
    // Form Submissions
    const demoForm = document.getElementById('demoForm');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const toast = document.getElementById('toast');
    
    function showToast(message, isError = false) {
        toast.textContent = message;
        toast.classList.add('active');
        if (isError) {
            toast.classList.add('error');
        } else {
            toast.classList.remove('error');
        }
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
    
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real application, you would send the form data to a server
            // For this demo, we'll just show a success message
            showToast('Your demo class has been scheduled successfully! We will send you a confirmation email shortly.');
            demoForm.reset();
            closeDemoModal();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Your message has been sent successfully! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
    
    // Animated counters
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = parseInt(counter.innerText);
        const increment = Math.ceil(target / speed);
        
        if (count < target) {
            counter.innerText = count + increment;
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    }
    
    // Intersection Observer for counters
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // Course Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card-detailed');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                courseCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Job Filtering
    const jobFilterBtns = document.querySelectorAll('.job-filter-btn');
    const jobCards = document.querySelectorAll('.job-card');
    
    if (jobFilterBtns.length > 0) {
        jobFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                jobFilterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                jobCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-type') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Reviews Carousel
    const reviewsTrack = document.querySelector('.reviews-track');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentSlide = 0;
    
    if (reviewsTrack && prevBtn && nextBtn) {
        const slides = document.querySelectorAll('.review-card');
        const totalSlides = slides.length;
        
        function updateCarousel() {
            reviewsTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
        
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
        
        // Auto slide
        setInterval(function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }
});

// Content Protection - Disable Right Click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Content Protection - Disable Text Selection
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// Content Protection - Disable Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Disable F12
    if(e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+Shift+I
    if(e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    // Disable Ctrl+U
    if(e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
});