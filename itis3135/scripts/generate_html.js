document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('introForm');
    const generateBtn = document.getElementById('generateHTML');

    generateBtn.addEventListener('click', () => {
        if (!form) return;

        // Dynamic image URL
        const imageSrc = form.picture.files[0] 
            ? URL.createObjectURL(form.picture.files[0]) 
            : "images/me_career_fair.png";

        // Collect form values
        const firstName = form.firstName.value;
        const middleInitial = form.middleName.value;
        const preferredName = form.nickname.value;
        const lastName = form.lastName.value;
        const mascotAdj = form.mascotAdj.value;
        const mascotAnimal = form.mascot.value;
        const divider = form.divider.value;
        const picCaption = form.pictureCaption.value;
        const personalBackground = form.bullet1.value;
        const professionalBackground = form.bullet2.value;
        const academicBackground = form.bullet3.value;
        const primaryComputer = form.bullet4.value;
        const ackStatement = form.acknowledge.value;
        const ackDate = form.ackDate.value;
        const quote = form.quote.value;
        const quoteAuthor = form.quoteAuthor.value;
        const funny = form.funny.value;
        const share = form.share.value;

        const courses = Array.from(document.querySelectorAll('#courseContainer .course')).map(course => ({
            dept: course.querySelector('input[name="dept[]"]').value,
            num: course.querySelector('input[name="num[]"]').value,
            name: course.querySelector('input[name="courseName[]"]').value,
            reason: course.querySelector('input[name="reason[]"]').value
        }));

        const links = [
            form.link1.value, form.link2.value, form.link3.value,
            form.link4.value, form.link5.value
        ].filter(l => l.trim() !== "");

        // Build courses HTML
        const coursesHTML = courses.map(c =>
`        <li><strong>${c.dept} ${c.num} - ${c.name}:</strong> ${c.reason}</li>`).join('\n');

        // Build links HTML
        const linksHTML = links.length > 0 ? 
`<p>Links:</p>
<ul>
${links.map(l => `    <li><a href="${l}" target="_blank">${l}</a></li>`).join('\n')}
</ul>` : '';

        // Construct the HTML code string
        const htmlCode = 
`<h2>Introduction HTML</h2>
<h3>${firstName} ${middleInitial} "${preferredName}" ${lastName} ${mascotAdj} ${mascotAnimal}</h3>
<figure>
    <img src="${imageSrc}" alt="Headshot of ${firstName} ${lastName}" />
    <figcaption>${picCaption}</figcaption>
</figure>
<ul>
    <li><strong>Personal Background:</strong> ${personalBackground}</li>
    <li><strong>Professional Background:</strong> ${professionalBackground}</li>
    <li><strong>Academic Background:</strong> ${academicBackground}</li>
    <li><strong>Primary Computer:</strong> ${primaryComputer}</li>
    ${ackStatement ? `<li><strong>Acknowledgment Statement:</strong> ${ackStatement}</li>` : ''}
    ${ackDate ? `<li><strong>Acknowledgment Date:</strong> ${ackDate}</li>` : ''}
    <li><strong>Courses:</strong>
        <ul>
${coursesHTML}
        </ul>
    </li>
    ${quote ? `<li><strong>Quote:</strong> "${quote}"</li>` : ''}
    ${quoteAuthor ? `<li><strong>Quote Author:</strong> ${quoteAuthor}</li>` : ''}
    ${funny ? `<li><strong>Funny Thing:</strong> ${funny}</li>` : ''}
    ${share ? `<li><strong>Something to Share:</strong> ${share}</li>` : ''}
</ul>
${linksHTML}`;

        // Replace the form with a <pre><code> block containing the HTML code
        form.outerHTML = `
<main>
    <section>
        <pre><code class="html">${htmlCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
    </section>
</main>`;

        // Apply Highlight.js
        if (window.hljs) hljs.highlightAll();
    });
});