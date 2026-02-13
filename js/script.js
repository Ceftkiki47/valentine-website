document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const btnEnter = document.getElementById('btn-enter');
    const inputName = document.getElementById('visitor-name');
    const errorMsg = document.getElementById('error-msg');
    const bgMusic = document.getElementById('bg-music');

    // --- State ---
    let visitorName = '';

    // --- Audio Control ---
    function playMusic() {
        if (bgMusic.paused) {
            bgMusic.play().catch(error => {
                console.log("Audio play blocked by browser policy. Interaction needed.");
            });
            bgMusic.volume = 0.5; // Soft volume
        }
    }

    const audioToggle = document.getElementById('audio-toggle');
    if (audioToggle && bgMusic) {
        audioToggle.addEventListener('click', () => {
            bgMusic.muted = !bgMusic.muted;
            const icon = audioToggle.querySelector('.icon');
            if (bgMusic.muted) {
                icon.textContent = '🔇';
                audioToggle.classList.add('muted');
            } else {
                icon.textContent = '🔊';
                audioToggle.classList.remove('muted');
            }
        });
    }

    // --- Validation (Emotional) ---
    function validateName(name) {
        if (!name || name.trim() === '') {
            return "Please tell me who you are...";
        }
        if (name.length < 2) {
            return "Is that really your name?";
        }
        // Add more specific/fun validation if known name
        return null; // Valid
    }

    // --- Navigation Flow ---

    // 1. Entry Page Logic
    btnEnter.addEventListener('click', () => {
        const name = inputName.value;
        const error = validateName(name);

        if (error) {
            errorMsg.textContent = error;
            // Shake effect
            inputName.classList.add('shake');
            setTimeout(() => inputName.classList.remove('shake'), 500);
            return;
        }

        // Validity Success
        visitorName = name;
        localStorage.setItem('ourStory_visitorName', visitorName);

        // Update Name Displays
        document.querySelectorAll('.visitor-name-display').forEach(el => {
            el.textContent = `Hello, ${visitorName}`;
        });
        document.querySelectorAll('.visitor-name-span').forEach(el => {
            el.textContent = visitorName;
        });

        // Start Music
        playMusic();

        // Transition to next page
        goToPage('page-beginning');
    });

    // Allow Enter key
    inputName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            btnEnter.click();
        }
    });

    // 2. Generic Navigation
    const nextButtons = document.querySelectorAll('.btn-next');
    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const nextPageId = btn.getAttribute('data-next');
            goToPage(nextPageId);
        });
    });

    // 3. Replay
    const btnReplay = document.getElementById('btn-replay');
    if (btnReplay) {
        // Change text to reflect the new functionality
        btnReplay.textContent = "Close the Story";

        btnReplay.addEventListener('click', () => {
            // Cinematic Closing Reveal
            document.body.classList.add('closing-active');

            const finalClosing = document.getElementById('final-closing');
            if (finalClosing) {
                finalClosing.style.display = 'flex';
                // Trigger reflow for transition
                finalClosing.offsetHeight;
                finalClosing.classList.add('active');
            }
        });
    }

    // 4. Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    document.querySelectorAll('.photo-frame img').forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent trigger on parent
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            const caption = img.parentElement.querySelector('.caption');
            lightboxCaption.textContent = caption ? caption.textContent : '';
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        // Clicking anywhere on the lightbox overlay closes it
        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Prevent closing when clicking the image or caption itself
        lightboxImg.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        lightboxCaption.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // 5. Typewriter Effect
    function typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Looping logic: Wait for 3 seconds then restart
                setTimeout(() => {
                    typeWriter(element, text, speed);
                }, 3000);
            }
        }
        type();
    }

    // 6. Stay With Me - WhatsApp Logic
    const btnSendAnswer = document.getElementById('btn-send-answer');
    const txtMessage = document.getElementById('stay-message');
    const successMsg = document.getElementById('success-msg');

    if (btnSendAnswer) {
        btnSendAnswer.addEventListener('click', () => {
            const message = txtMessage.value;
            if (!message || message.trim() === '') {
                // Subtle shake or prompt
                txtMessage.style.borderColor = '#D32F2F';
                setTimeout(() => txtMessage.style.borderColor = '', 500);
                return;
            }

            // --- CHANGE WHATSAPP NUMBER HERE ---
            const myPhoneNumber = "6285794774532"; // WhatsApp number in international format (e.g., 62 for Indonesia)
            const messageText = `A Message from ${visitorName || 'Someone Special'}:\n\n${message}`;

            // Open WhatsApp
            const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(messageText)}`;
            window.open(whatsappUrl, '_blank');

            // Emotional Feedback
            txtMessage.value = '';
            successMsg.textContent = "Your answer has been sent to WhatsApp.";

            // Disable button temporarily to prevent spam clicks
            btnSendAnswer.disabled = true;
            btnSendAnswer.textContent = "Sent ❤️";
        });
    }


    // --- Helper Functions ---
    function goToPage(pageId) {
        // Find current active page
        const currentPage = document.querySelector('.page.active');
        const nextPage = document.getElementById(pageId);

        if (currentPage && nextPage) {
            // Fade out current
            currentPage.style.opacity = '0';

            setTimeout(() => {
                currentPage.classList.remove('active');
                currentPage.style.visibility = 'hidden'; // Ensure hidden

                // Prepare next page
                nextPage.classList.add('active');

                // Trigger typewriter on all romantic-text in the next page
                nextPage.querySelectorAll('.romantic-text').forEach(el => {
                    const originalText = el.getAttribute('data-original-text') || el.textContent;
                    if (!el.hasAttribute('data-original-text')) {
                        el.setAttribute('data-original-text', originalText);
                    }
                    typeWriter(el, originalText);
                });

                // Optional: Scroll to top if mobile
                window.scrollTo(0, 0);

            }, 1000); // Wait for transition-speed (1s)
        }
    }

    // --- Auto Load Name (Optional) ---
    // If we want to remember them on refresh:
    /*
    const savedName = localStorage.getItem('ourStory_visitorName');
    if (savedName) {
        visitorName = savedName;
        inputName.value = visitorName;
    }
    */
});
