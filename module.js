// Module 8 Certificate Script - Save this as module8-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize certificate functionality
    initCertificate();
    
    // Initialize other module functionality
    initModuleFeatures();
});

function initCertificate() {
    const nameInput = document.getElementById('studentName');
    const generateBtn = document.getElementById('generateCertificate');
    const certificateNavBtn = document.getElementById('certificateNavBtn');
    const printBtn = document.getElementById('printCertificate');
    const downloadBtn = document.getElementById('downloadCertificate');
    const shareBtn = document.getElementById('shareCertificate');
    
    if (!nameInput || !generateBtn) return;
    
    // Name input validation
    nameInput.addEventListener('input', function() {
        const name = this.value.trim();
        const isValid = name.length >= 2 && name.length <= 50;
        
        generateBtn.disabled = !isValid;
        generateBtn.style.opacity = isValid ? '1' : '0.6';
        generateBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
    });
    
    // Generate certificate
    generateBtn.addEventListener('click', generateCertificate);
    
    // Navigation button to certificate section
    if (certificateNavBtn) {
        certificateNavBtn.addEventListener('click', function() {
            document.querySelector('.certificate-section').scrollIntoView({ 
                behavior: 'smooth' 
            });
            nameInput.focus();
        });
    }
    
    // Certificate actions
    if (printBtn) printBtn.addEventListener('click', printCertificate);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadCertificate);
    if (shareBtn) shareBtn.addEventListener('click', shareCertificate);
    
    // Load saved name if exists
    const savedName = localStorage.getItem('certificateName');
    if (savedName) {
        nameInput.value = savedName;
        nameInput.dispatchEvent(new Event('input'));
        
        // Auto-generate certificate if name exists
        setTimeout(() => {
            if (!document.getElementById('certificatePreview').classList.contains('show')) {
                generateCertificate();
            }
        }, 500);
    }
}

function initModuleFeatures() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('span');
        
        // Check saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
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
    
    // Progress bar
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = '100%';
    }
    
    // Quiz functionality
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
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.querySelector('.module-nav');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-show');
        });
    }
    
    // Back to top
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Module completion
    const completeBtn = document.querySelector('.complete-btn');
    if (completeBtn) {
        completeBtn.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module');
            localStorage.setItem(`module-${moduleId}-completed`, 'true');
            this.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
            this.classList.add('completed');
            this.disabled = true;
            updateOverallProgress();
        });
    }
    
    // Initialize progress
    updateOverallProgress();
}

function updateOverallProgress() {
    let completedCount = 0;
    for (let i = 1; i <= 8; i++) {
        if (localStorage.getItem(`module-${i}-completed`) === 'true') {
            completedCount++;
        }
    }
    
    const progressText = document.querySelector('.progress-text');
    if (progressText) {
        const progressPercentage = (completedCount / 8) * 100;
        progressText.textContent = `${completedCount}/8 modules completed (${Math.round(progressPercentage)}%)`;
    }
}

// Certificate Functions
function generateCertificate() {
    const studentName = document.getElementById('studentName').value.trim();
    if (!studentName || studentName.length < 2) {
        alert('Please enter a valid name (2-50 characters)');
        return;
    }
    
    // Generate certificate ID
    const certificateId = 'MCC-' + Date.now().toString().slice(-8);
    const issueDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update preview
    document.getElementById('previewName').textContent = studentName;
    document.getElementById('issueDate').textContent = issueDate;
    document.getElementById('certificateId').textContent = certificateId;
    document.getElementById('verificationId').textContent = certificateId;
    
    // Show preview
    const preview = document.getElementById('certificatePreview');
    preview.classList.add('show');
    
    // Scroll to preview
    preview.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Save to localStorage
    localStorage.setItem('certificateName', studentName);
    localStorage.setItem('certificateId', certificateId);
    localStorage.setItem('certificateDate', issueDate);
    
    // Mark module as complete
    localStorage.setItem('module-8-completed', 'true');
    const completeBtn = document.querySelector('.complete-btn');
    if (completeBtn && !completeBtn.classList.contains('completed')) {
        completeBtn.click();
    }
}

function printCertificate() {
    const studentName = document.getElementById('previewName').textContent;
    const certificateId = document.getElementById('certificateId').textContent;
    const issueDate = document.getElementById('issueDate').textContent;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Certificate - Mandera Crypto Center</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
                
                body {
                    font-family: 'Poppins', sans-serif;
                    margin: 0;
                    padding: 40px;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                }
                
                .certificate {
                    background: white;
                    padding: 60px;
                    border-radius: 30px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
                    text-align: center;
                    max-width: 1000px;
                    border: 20px solid;
                    border-image: linear-gradient(45deg, #3498db, #9b59b6) 1;
                    position: relative;
                }
                
                .certificate::before {
                    content: "";
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    border: 2px solid rgba(52, 152, 219, 0.1);
                    border-radius: 15px;
                    pointer-events: none;
                }
                
                .logo {
                    font-size: 4rem;
                    color: #3498db;
                    margin-bottom: 30px;
                }
                
                h1 {
                    color: #2c3e50;
                    font-size: 3.5rem;
                    margin-bottom: 10px;
                    background: linear-gradient(45deg, #3498db, #9b59b6);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                
                h2 {
                    color: #7f8c8d;
                    font-weight: 400;
                    margin-bottom: 40px;
                }
                
                .student-name {
                    font-size: 3rem;
                    color: #2c3e50;
                    margin: 30px 0;
                    padding: 20px;
                    background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(155, 89, 182, 0.1));
                    border-radius: 15px;
                    display: inline-block;
                }
                
                .course-title {
                    font-size: 1.8rem;
                    color: #3498db;
                    margin: 30px 0;
                }
                
                .details {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 30px;
                    margin: 40px 0;
                    text-align: left;
                }
                
                .detail-box {
                    padding: 20px;
                    background: #f8f9fa;
                    border-radius: 10px;
                    border-left: 5px solid #3498db;
                }
                
                .modules {
                    margin: 40px 0;
                    padding: 30px;
                    background: linear-gradient(135deg, rgba(52, 152, 219, 0.05), rgba(155, 89, 182, 0.05));
                    border-radius: 15px;
                }
                
                .module-list {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 15px;
                    margin-top: 20px;
                }
                
                .footer {
                    margin-top: 50px;
                    color: #7f8c8d;
                    border-top: 2px solid #eee;
                    padding-top: 30px;
                }
                
                .signatures {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 40px;
                    padding-top: 30px;
                    border-top: 1px solid #eee;
                }
                
                .signature {
                    text-align: center;
                }
                
                .signature-line {
                    width: 200px;
                    height: 2px;
                    background: #2c3e50;
                    margin: 20px auto;
                }
                
                @media print {
                    body {
                        background: white !important;
                        padding: 0 !important;
                    }
                    
                    .certificate {
                        box-shadow: none !important;
                        border: 15px solid #3498db !important;
                        margin: 0 !important;
                        width: 100% !important;
                        height: 100% !important;
                    }
                    
                    .no-print {
                        display: none !important;
                    }
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="logo">🏆</div>
                <h1>CERTIFICATE OF COMPLETION</h1>
                <h2>Mandera Crypto Center</h2>
                
                <p>This certifies that</p>
                <div class="student-name">${studentName}</div>
                <p>has successfully completed the</p>
                
                <div class="course-title">
                    Complete Cryptocurrency & Blockchain Mastery Course
                </div>
                
                <div class="details">
                    <div class="detail-box">
                        <strong>Date Issued:</strong><br>
                        ${issueDate}
                    </div>
                    <div class="detail-box">
                        <strong>Certificate ID:</strong><br>
                        ${certificateId}
                    </div>
                    <div class="detail-box">
                        <strong>Course Duration:</strong><br>
                        8 Modules • 32 Topics • 40+ Hours
                    </div>
                    <div class="detail-box">
                        <strong>Issued By:</strong><br>
                        Mandera Crypto Center
                    </div>
                </div>
                
                <div class="modules">
                    <h3>Course Modules Completed:</h3>
                    <div class="module-list">
                        <div>✓ Module 1: The Money Revolution</div>
                        <div>✓ Module 2: Blockchain Magic</div>
                        <div>✓ Module 3: Your Crypto Fortress</div>
                        <div>✓ Module 4: Crypto Giants</div>
                        <div>✓ Module 5: Hands-On Crypto</div>
                        <div>✓ Module 6: DeFi Universe</div>
                        <div>✓ Module 7: NFTs & Web3 World</div>
                        <div>✓ Module 8: Future & Strategy</div>
                    </div>
                </div>
                
                <div class="signatures">
                    <div class="signature">
                        <div class="signature-line"></div>
                        <strong>Mandera Crypto Center</strong><br>
                        Director of Education
                    </div>
                    <div class="signature">
                        <div class="signature-line"></div>
                        <strong>Blockchain Verification</strong><br>
                        ${certificateId}
                    </div>
                </div>
                
                <div class="footer">
                    <p>This certificate verifies successful completion of all course requirements<br>
                    and demonstrates comprehensive understanding of cryptocurrency fundamentals.</p>
                    <p style="font-size: 0.9rem; margin-top: 20px;">
                        Verify at: mandera-crypto-center.com/certificate-verify<br>
                        © ${new Date().getFullYear()} Mandera Crypto Center. All rights reserved.
                    </p>
                </div>
                
                <div class="no-print" style="margin-top: 40px; text-align: center;">
                    <button onclick="window.print()" style="
                        background: linear-gradient(135deg, #3498db, #9b59b6);
                        color: white;
                        border: none;
                        padding: 15px 40px;
                        border-radius: 50px;
                        font-size: 1.1rem;
                        cursor: pointer;
                        font-weight: bold;
                        margin: 20px;
                    ">
                        <i class="fas fa-print"></i> Print Certificate
                    </button>
                    <p style="margin-top: 15px; color: #7f8c8d; font-size: 0.9rem;">
                        <i class="fas fa-info-circle"></i> For best results, use color printing on quality paper
                    </p>
                </div>
            </div>
            
            <script>
                setTimeout(() => { window.print(); }, 1000);
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function downloadCertificate() {
    alert('PDF download feature would be implemented with a backend service. For now, please use the print feature and save as PDF from your printer dialog.');
    printCertificate();
}

function shareCertificate() {
    const studentName = document.getElementById('previewName').textContent;
    const certificateId = document.getElementById('certificateId').textContent;
    
    const shareText = `I just completed the Complete Cryptocurrency & Blockchain Mastery Course from Mandera Crypto Center! 🎓

Certificate ID: ${certificateId}
Student: ${studentName}

Check out the course at: mandera-crypto-center.com`;

    if (navigator.share) {
        navigator.share({
            title: 'My Crypto Course Certificate',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Certificate details copied to clipboard! You can now share it anywhere.');
        }).catch(console.error);
    } else {
        prompt('Copy this text to share:', shareText);
    }
}