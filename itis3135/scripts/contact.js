const form = document.getElementById('contactForm');
const inputs = form.querySelectorAll('input, textarea');
const message = document.getElementById('submitMessage');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop submission

    let valid = true;

    // Reset borders/message
    inputs.forEach((input) => input.style.border = '');
    message.textContent = '';

    // Select fields
    const nameInput = form.querySelector('input[type="text"]');
    const emailInput = form.querySelector('input[type="email"]');
    const messageInput = form.querySelector('textarea');

    // Validate
    if (nameInput.value.trim() === '') { valid = false; nameInput.style.border = '2px solid red'; }
    const emailValue = emailInput.value.trim();
    if (emailValue === '' || !emailValue.includes('@') || !emailValue.includes('.')) { valid = false; emailInput.style.border = '2px solid red'; }
    if (messageInput.value.trim() === '') { valid = false; messageInput.style.border = '2px solid red'; }

    if (valid) {
        inputs.forEach((input) => input.value = '');

        // Show confirmation message
        message.textContent = 'Thank you! Your message has been received.';
        message.style.color = 'green';
    } else {
        message.textContent = 'Please correct the highlighted fields.';
        message.style.color = 'red';
    }
});

// Remove red border/message when typing
inputs.forEach((input) => {
    input.addEventListener('input', () => {
        input.style.border = '';
        message.textContent = '';
    });
});
