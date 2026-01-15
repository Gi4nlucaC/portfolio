document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.project-carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        if (images.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            return;
        }
        
        let currentIndex = 0;
        
        // Create dots
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        function goToSlide(index) {
            images[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            images[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }
        
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % images.length;
            goToSlide(nextIndex);
        }
        
        function prevSlide() {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            goToSlide(prevIndex);
        }
        
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
        });
        
        // Auto-advance (optional, commented out)
        // setInterval(nextSlide, 5000);
    });
});

    // Gallery Carousel
    const galleryCarousels = document.querySelectorAll('.gallery-carousel-container');
    
    galleryCarousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.gallery-carousel-image');
        const prevBtn = carousel.querySelector('.gallery-carousel-prev');
        const nextBtn = carousel.querySelector('.gallery-carousel-next');
        const dotsContainer = carousel.querySelector('.gallery-carousel-dots');
        
        if (images.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            return;
        }
        
        let currentIndex = 0;
        
        // Create dots
        images.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('gallery-carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = carousel.querySelectorAll('.gallery-carousel-dot');
        
        function goToSlide(index) {
            images[currentIndex].style.opacity = '0';
            dots[currentIndex].classList.remove('active');
            
            currentIndex = index;
            
            images[currentIndex].style.opacity = '1';
            dots[currentIndex].classList.add('active');
        }
        
        function nextSlide() {
            const nextIndex = (currentIndex + 1) % images.length;
            goToSlide(nextIndex);
        }
        
        function prevSlide() {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            goToSlide(prevIndex);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    });
