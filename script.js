document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Before & After Slider
    const baContainer = document.querySelector('.ba-slider');
    const handle = document.querySelector('.handle');
    const resizeImg = document.querySelector('.resize-img');

    if (baContainer) {
        baContainer.addEventListener('mousemove', (e) => {
            const containerOffset = baContainer.offsetLeft;
            const containerWidth = baContainer.offsetWidth;
            const mouseX = e.pageX - containerOffset;

            if (mouseX >= 0 && mouseX <= containerWidth) {
                const percent = (mouseX / containerWidth) * 100;
                handle.style.left = percent + '%';
                resizeImg.style.width = percent + '%';
            }
        });

        // Touch support for mobile
        baContainer.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const containerOffset = baContainer.offsetLeft;
            const containerWidth = baContainer.offsetWidth;
            const touchX = touch.pageX - containerOffset;

            if (touchX >= 0 && touchX <= containerWidth) {
                const percent = (touchX / containerWidth) * 100;
                handle.style.left = percent + '%';
                resizeImg.style.width = percent + '%';
            }
        });
    }

    // Swiper Testimonial Slider
    const testimonialSwiper = new Swiper('.testimonial-slider', {
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 1,
            },
        }
    });

    // Form Submission (Mockup)
    const bookingForm = document.getElementById('contactForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.disabled = true;
            btn.textContent = 'Sending...';

            setTimeout(() => {
                alert('Thank you! Your booking request has been sent. Siri will contact you shortly.');
                bookingForm.reset();
                btn.disabled = false;
                btn.textContent = originalText;
            }, 2000);
        });
    }

    // Floating Buttons Mutual Exclusivity
    const floatingBtns = document.querySelectorAll('.floating-btn');
    
    floatingBtns.forEach(btn => {
        const toggleBtn = (expand) => {
            if (expand) {
                floatingBtns.forEach(b => b.classList.remove('expanded'));
                btn.classList.add('expanded');
            } else {
                btn.classList.remove('expanded');
            }
        };

        // Desktop Hover
        btn.addEventListener('mouseenter', () => toggleBtn(true));
        btn.addEventListener('mouseleave', () => toggleBtn(false));

        // Mobile/Tablet Touch/Click
        btn.addEventListener('touchstart', (e) => {
            if (!btn.classList.contains('expanded')) {
                e.preventDefault();
                toggleBtn(true);
            }
        });
    });

    // Close buttons if clicking elsewhere
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.floating-controls')) {
            floatingBtns.forEach(b => b.classList.remove('expanded'));
        }
    });

    // Smooth Scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

});
