// Wait for EmailJS to be loaded (gracefully no-op if SDK never arrives)
function waitForEmailJS(callback, attempts = 0) {
    if (window.emailjs) {
        callback(window.emailjs);
    } else if (attempts < 50) { // ~5s max wait
        setTimeout(() => waitForEmailJS(callback, attempts + 1), 100);
    } else {
        console.warn("EmailJS SDK not loaded; contact form is disabled.");
    }
}

// Initialize EmailJS with public key
waitForEmailJS((sdk) => {
    sdk.init("a9Ie9KfolOvtl08s8");
});

// Handle contact form submission
function initializeContactForm() {
    // Contact trigger buttons (Collaboration & Nav Contact)
    const contactBtns = [
        document.getElementById('collaborateBtn'),
        document.getElementById('navContactBtn')
    ];
    const contactModal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('closeContactModal');
    const contactForm = document.getElementById('contactForm');

    if (contactBtns.every(btn => !btn)) return; // Exit if no contact buttons found

    // Open modal for each trigger button
    contactBtns.forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            contactModal.classList.remove('hidden');
            contactModal.classList.add('flex');
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        contactModal.classList.add('hidden');
        contactModal.classList.remove('flex');
    });

    // Close on backdrop click
    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            contactModal.classList.add('hidden');
            contactModal.classList.remove('flex');
        }
    });

    // Submit form
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!window.emailjs) {
            alert("Email service is unavailable right now. Please try again later.");
            return;
        }

        try {
            const response = await emailjs.send(
                "service_qdc37xp",
                "template_j8hdvco",
                {
                    to_email: "edwin@architect.io",
                    from_name: name,
                    from_email: email,
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    user_name: "Full Stack Developer"
                }
            );

            if (response.status === 200) {
                alert("Message sent successfully! I'll get back to you soon.");
                contactForm.reset();
                contactModal.classList.add('hidden');
                contactModal.classList.remove('flex');
            }
        } catch (error) {
            alert("Failed to send message. Please try again.");
            console.error("EmailJS error:", error);
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeContactForm);
