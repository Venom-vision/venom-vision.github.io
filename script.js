const CORRECT_PASSWORD = localStorage.getItem('sitePassword') || "1234";
const SECRET_PASSWORD = "1111"

function checkPassword() {
    const input = document.getElementById("password-input").value;
    if (input === CORRECT_PASSWORD) {
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("main-content").classList.remove("hidden");
    } else if (input === SECRET_PASSWORD) {
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("secret-content").classList.remove("hidden");
    } else {
        alert("Incorrect password!");
    }
}

let links = [];

document.getElementById("add-link-btn").addEventListener("click", () => {
    const url = prompt("Enter the URL:");
    const name = prompt("Enter a name for this link:");
    
    if (url && name) {
        const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
        links.push({ url: formattedUrl, name });
        updateLinksDisplay();
        saveToLocalStorage();
    }
});
function updateLinksDisplay() {
    const container = document.getElementById("links-container");
    container.innerHTML = '';
    
    links.forEach((link, index) => {
        const card = document.createElement('div');
        card.className = 'link-card';
        
        const title = document.createElement('h3');
        title.textContent = link.name;
        
        const btnContainer = document.createElement('div');
        btnContainer.className = 'button-container';
        
        const visitBtn = document.createElement('button');
        visitBtn.className = 'visit-btn';
        visitBtn.textContent = 'Visit';
        visitBtn.addEventListener('click', () => {
            window.open(link.url, '_blank');
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            links = links.filter((_, i) => i !== index);
            updateLinksDisplay();
            saveToLocalStorage();
        });
        
        btnContainer.appendChild(visitBtn);
        btnContainer.appendChild(deleteBtn);
        card.appendChild(title);
        card.appendChild(btnContainer);
        container.appendChild(card);
    });
}

function saveToLocalStorage() {
    localStorage.setItem('smartlinks', JSON.stringify(links));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('smartlinks');
    if (saved) {
        links = JSON.parse(saved);
        updateLinksDisplay();
    }
}

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.style.getPropertyValue('--bg-color');
    
    if (currentTheme === '#000' || currentTheme === '') {
        root.style.setProperty('--bg-color', '#000428');
        root.style.setProperty('--card-bg', '#001f3f');
        root.style.setProperty('--primary-color', '#00ff9d');
        root.style.setProperty('--secondary-color', '#0ff');
    } else {
        root.style.setProperty('--bg-color', '#000');
        root.style.setProperty('--card-bg', '#0a0a15');
        root.style.setProperty('--primary-color', '#0ff');
        root.style.setProperty('--secondary-color', '#f0f');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `cyber-notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
}

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        
        
        document.querySelector('.page.active').classList.add('page-exit');
        
        setTimeout(() => {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active', 'page-exit');
            });
            
            const newPage = document.getElementById(targetId);
            newPage.classList.add('active', 'page-enter');
            
            setTimeout(() => {
                newPage.classList.remove('page-enter');
            }, 500);
        }, 500);
        
        document.querySelectorAll("nav a").forEach(navLink => {
            navLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

function changePassword() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const passwordChangePage = document.createElement('div');
    passwordChangePage.className = 'page active';
    passwordChangePage.innerHTML = `
        <div class="password-change-container">
            <h2>Change Password</h2>
            <input type="password" id="old-password" placeholder="Current Password">
            <input type="password" id="new-password" placeholder="New Password">
            <input type="password" id="confirm-password" placeholder="Confirm New Password">
            <div class="button-group">
                <button onclick="submitPasswordChange()">Update Password</button>
                <button onclick="cancelPasswordChange()">Cancel</button>
            </div>
        </div>
    `;
    document.querySelector('#main-content').appendChild(passwordChangePage);
}

function submitPasswordChange() {
    const oldPass = document.getElementById('old-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (oldPass !== CORRECT_PASSWORD) {
        showNotification('Current password is incorrect!', 'error');
        return;
    }

    if (newPass !== confirmPass) {
        showNotification('New passwords do not match!', 'error');
        return;
    }

    if (newPass.length < 4) {
        showNotification('Password must be at least 4 characters long!', 'error');
        return;
    }

    localStorage.setItem('sitePassword', newPass);
    location.reload();
    showNotification('Password updated successfully!', 'success');
    cancelPasswordChange();
}

function cancelPasswordChange() {
    document.querySelector('.password-change-container').parentElement.remove();
    document.getElementById('home').classList.add('active');
}

function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = 5 + Math.random() * 10 + 's';
        particlesContainer.appendChild(particle);
    }
}

document.addEventListener('DOMContentLoaded', createParticles);

document.addEventListener('keydown', function(event) {
    if (event.key === 'g' || event.key === 'G') {
        document.getElementById('secret-page').style.display = 'block';
        document.getElementById('main-content').style.display = 'none';
    }
});

function backToMain() {
    document.getElementById('secret-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', initAudio);

const backgrounds = {
    cyber1: 'linear-gradient(135deg, #000428 0%, #004e92 100%)',
    cyber2: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
    neon: 'linear-gradient(135deg, #000000 0%, #1f0040 100%)',
    matrix: 'linear-gradient(135deg, #001000 0%, #003000 100%)',
    synthwave: 'linear-gradient(135deg, #09203f 0%, #537895 100%)'
};

const animations = {
    matrix: 'matrix-rain',
    neonGrid: 'neon-grid',
    dataStream: 'data-stream',
    cyberPulse: 'cyber-pulse',
    digitalWave: 'digital-wave'
};

function initializeBackgroundControls() {
    const settingsContainer = document.querySelector('.settings-container');
    
    const bgSection = document.createElement('div');
    bgSection.innerHTML = `
        <div class="settings-section">
            <h3>Background Theme</h3>
            <div class="bg-options">
                ${Object.keys(backgrounds).map(bg => `
                    <div class="bg-option" data-bg="${bg}" 
                         style="background: ${backgrounds[bg]}"></div>
                `).join('')}
            </div>
            <div class="custom-bg">
                <input type="file" id="customBg" accept="image/*">
                <label for="customBg">Upload Custom Background</label>
            </div>
        </div>
        <div class="settings-section">
            <h3>Background Animation</h3>
            <div class="animation-options">
                ${Object.keys(animations).map(anim => `
                    <button class="anim-option" data-anim="${anim}">
                        ${anim.replace(/([A-Z])/g, ' $1').trim()}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    settingsContainer.appendChild(bgSection);

    document.querySelectorAll('.bg-option').forEach(option => {
        option.addEventListener('click', () => {
            setBackground(backgrounds[option.dataset.bg]);
            saveSettings('background', option.dataset.bg);
        });
    });

    document.querySelectorAll('.anim-option').forEach(option => {
        option.addEventListener('click', () => {
            setAnimation(animations[option.dataset.anim]);
            saveSettings('animation', option.dataset.anim);
        });
    });

    document.getElementById('customBg').addEventListener('change', handleCustomBg);
}

function openBackgroundMenu() {
    const backgroundModal = document.createElement('div');
    backgroundModal.className = 'cyber-modal';
    backgroundModal.innerHTML = `
        <div class="modal-content">
            <h2>Select Background</h2>
            <div class="background-grid">
                <div class="bg-option" onclick="setBackground('cyber')" style="background: linear-gradient(45deg, #000428 0%, #004e92 100%)">
                    <span>Cyber Night</span>
                </div>
                <div class="bg-option" onclick="setBackground('neon')" style="background: linear-gradient(45deg, #000000 0%, #1f0040 100%)">
                    <span>Neon City</span>
                </div>
                <div class="bg-option" onclick="setBackground('matrix')" style="background: linear-gradient(45deg, #001000 0%, #003000 100%)">
                    <span>Matrix</span>
                </div>
                <div class="bg-option" onclick="setBackground('synthwave')" style="background: linear-gradient(45deg, #09203f 0%, #537895 100%)">
                    <span>Synthwave</span>
                </div>
            </div>
            <input type="file" id="customBg" accept="image/*">
            <label for="customBg" class="cyber-btn">Upload Custom</label>
            <button onclick="closeModal()" class="close-btn">Close</button>
        </div>
    `;
    document.body.appendChild(backgroundModal);
}

function openAnimationMenu() {
    const animationModal = document.createElement('div');
    animationModal.className = 'cyber-modal';
    animationModal.innerHTML = `
        <div class="modal-content">
            <h2>Select Animation</h2>
            <div class="animation-grid">
                <button onclick="setAnimation('dataRain')" class="anim-option">Data Rain</button>
                <button onclick="setAnimation('neonGrid')" class="anim-option">Neon Grid</button>
                <button onclick="setAnimation('pulseWave')" class="anim-option">Pulse Wave</button>
                <button onclick="setAnimation('cyberFlow')" class="anim-option">Cyber Flow</button>
                <button onclick="setAnimation('none')" class="anim-option">None</button>
            </div>
            <button onclick="closeModal()" class="close-btn">Close</button>
        </div>
    `;
    document.body.appendChild(animationModal);
}

function closeModal() {
    document.querySelector('.cyber-modal').remove();
}

function setBackground(theme) {
    const themes = {
        cyber: 'linear-gradient(45deg, #000428 0%, #004e92 100%)',
        neon: 'linear-gradient(45deg, #000000 0%, #1f0040 100%)',
        matrix: 'linear-gradient(45deg, #001000 0%, #003000 100%)',
        synthwave: 'linear-gradient(45deg, #09203f 0%, #537895 100%)'
    };
    document.body.style.background = themes[theme];
    localStorage.setItem('selectedTheme', theme);
    closeModal();
}

function setAnimation(type) {
    document.body.classList.remove('dataRain', 'neonGrid', 'pulseWave', 'cyberFlow');
  
    if (type !== 'none') {
        document.body.classList.add(type);
    }
  
    localStorage.setItem('selectedAnimation', type);
    closeModal();
}

const animationStyles = `
.dataRain {
    background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,32,64,0.9) 100%);
    animation: dataRainAnim 20s linear infinite;
}

.neonGrid {
    animation: gridPulse 2s ease-in-out infinite;
}

.pulseWave {
    animation: pulseWaveAnim 4s ease-in-out infinite;
}

.cyberFlow {
    animation: cyberFlowAnim 3s linear infinite;
}

@keyframes dataRainAnim {
    0% { background-position: 0 0; }
    100% { background-position: 0 1000px; }
}

@keyframes gridPulse {
    0% { opacity: 0.3; }
    50% { opacity: 0.7; }
    100% { opacity: 0.3; }
}

@keyframes pulseWaveAnim {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}

@keyframes cyberFlowAnim {
    0% { background-position: 0 0; }
    100% { background-position: 200% 0; }
}`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

document.getElementById('bgUpload').addEventListener('change', function(event) {
})