document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('introForm');
    const generateBtn = document.getElementById('generateJSON');

    generateBtn.addEventListener('click', () => {
        if (!form) return;

        // Remove existing headings
        const h2 = document.querySelector('h2');
        const h3 = document.querySelector('h3');
        if (h2) h2.remove();
        if (h3) h3.remove();

        // Dynamic image URL if selected
        const imageSrc = form.picture.files[0] ? URL.createObjectURL(form.picture.files[0]) : "images/headshot.jpeg";

        // Build JSON object with exact TA keys
        const data = {
            firstName: form.firstName.value,
            preferredName: form.nickname.value,
            middleInitial: form.middleName.value,
            lastName: form.lastName.value,
            divider: form.divider.value,
            mascotAdjective: form.mascotAdj.value,
            mascotAnimal: form.mascot.value,
            image: imageSrc,
            imageCaption: form.pictureCaption.value,
            personalStatement: form.acknowledge.value,
            personalBackground: form.bullet1.value,
            professionalBackground: form.bullet2.value,
            academicBackground: form.bullet3.value,
            subjectBackground: "",
            primaryComputer: form.bullet4.value,
            courses: Array.from(document.querySelectorAll('#courseContainer .course')).map(course => ({
                department: course.querySelector('input[name="dept[]"]').value,
                number: course.querySelector('input[name="num[]"]').value,
                name: course.querySelector('input[name="courseName[]"]').value,
                reason: course.querySelector('input[name="reason[]"]').value
            })),
            links: [
                { name: "Link1", href: form.link1.value },
                { name: "Link2", href: form.link2.value },
                { name: "Link3", href: form.link3.value },
                { name: "Link4", href: form.link4.value },
                { name: "Link5", href: form.link5.value },
            ]
        };

        // Convert JSON to nicely formatted string
        const jsonText = JSON.stringify(data, null, 2);

        // Replace the entire form with JSON display and new heading
        form.outerHTML = `
            <main>
                <h2>Introduction HTML</h2>
                <section>
                    <pre><code class="json">${jsonText}</code></pre>
                </section>
            </main>
        `;

        // Highlight.js colors the JSON if loaded
        if (window.hljs) hljs.highlightAll();
    });
});