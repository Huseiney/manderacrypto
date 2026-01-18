// Mandera Crypto Center - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        // Check for saved theme or prefer-color-scheme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        }
        
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('light-theme')) {
                body.classList.remove('light-theme');
                body.classList.add('dark-theme');
                icon.className = 'fas fa-sun';
                text.textContent = 'Light Mode';
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-theme');
                body.classList.add('light-theme');
                icon.className = 'fas fa-moon';
                text.textContent = 'Dark Mode';
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300);
    });
    
    // Set active module button
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const moduleBtns = document.querySelectorAll('.module-btn');
    
    moduleBtns.forEach(btn => {
        if (btn.getAttribute('href') === currentPage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Module progress calculation
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar && currentPage.includes('module')) {
        const moduleNum = parseInt(currentPage.replace('module', '').replace('.html', ''));
        if (!isNaN(moduleNum)) {
            const progressPercentage = (moduleNum / 8) * 100;
            progressBar.style.width = `${progressPercentage}%`;
        }
    }
    
    // Topic card animations
    const topicCards = document.querySelectorAll('.topic-card');
    topicCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Interactive quiz functionality
    const quizButtons = document.querySelectorAll('.quiz-btn');
    quizButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                this.innerHTML = '<i class="fas fa-eye"></i> Show Answer';
            } else {
                answer.style.display = 'block';
                this.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Answer';
            }
        });
    });
    
    // Certificate generation
    const certificateBtn = document.getElementById('generateCertificate');
    if (certificateBtn) {
        certificateBtn.addEventListener('click', function() {
            const name = prompt('Enter your name for the certificate:');
            if (name) {
                alert(`Congratulations ${name}! You've completed the Mandera Crypto Center course.\n\nYour certificate will be emailed to you.`);
                this.innerHTML = '<i class="fas fa-check-circle"></i> Certificate Requested';
                this.disabled = true;
            }
        });
    }
    
    // Search functionality for modules
    const searchInput = document.getElementById('moduleSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const modules = document.querySelectorAll('.module-card');
            
            modules.forEach(module => {
                const title = module.querySelector('h3').textContent.toLowerCase();
                const description = module.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    module.style.display = 'block';
                } else {
                    module.style.display = 'none';
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Module completion tracking
    const completeButtons = document.querySelectorAll('.complete-btn');
    completeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            localStorage.setItem(`module-${moduleId}-completed`, 'true');
            this.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
            this.classList.add('completed');
            this.disabled = true;
            
            // Update overall progress
            updateOverallProgress();
        });
    });
    
    // Initialize completion status
    function updateOverallProgress() {
        let completedCount = 0;
        for (let i = 1; i <= 8; i++) {
            if (localStorage.getItem(`module-${i}-completed`) === 'true') {
                completedCount++;
            }
        }
        
        const progressPercentage = (completedCount / 8) * 100;
        const overallProgress = document.querySelector('.overall-progress');
        if (overallProgress) {
            overallProgress.style.width = `${progressPercentage}%`;
        }
        
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${completedCount}/8 modules completed (${Math.round(progressPercentage)}%)`;
        }
    }
    
    // Call on page load
    updateOverallProgress();
    
    // Print certificate function
    window.printCertificate = function() {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Crypto Course Certificate</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                        .certificate { border: 20px solid gold; padding: 50px; max-width: 800px; margin: 0 auto; }
                        h1 { color: #2c3e50; }
                        .logo { font-size: 48px; color: #3498db; margin: 20px 0; }
                    </style>
                </head>
                <body>
                    <div class="certificate">
                        <div class="logo">🏆</div>
                        <h1>Certificate of Completion</h1>
                        <h2>Mandera Crypto Center</h2>
                        <p>This certifies that</p>
                        <h3>${localStorage.getItem('studentName') || 'Student Name'}</h3>
                        <p>has successfully completed the</p>
                        <h3>Complete Cryptocurrency & Blockchain Course</h3>
                        <p>Date: ${new Date().toLocaleDateString()}</p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.module-nav');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-show');
        });
    }
});