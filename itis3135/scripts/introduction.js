const formElement = document.getElementById("introForm");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
});

document.getElementById("clearBtn").addEventListener("click", () => {
    document.querySelectorAll("form input, form textarea").forEach(el => el.value = "");
});

document.getElementById("addCourse").addEventListener("click", () => {
    const container = document.getElementById("courseContainer");
    const div = document.createElement("div");
    div.classList.add("course");
    div.innerHTML = `
        <input type="text" name="dept[]" placeholder="Department">
        <input type="text" name="num[]" placeholder="Number">
        <input type="text" name="courseName[]" placeholder="Course Name">
        <input type="text" name="reason[]" placeholder="Reason">
        <button type="button" class="deleteCourse">X</button>
    `;
    container.appendChild(div);
    div.querySelector(".deleteCourse").addEventListener("click", () => div.remove());
});

function submitForm() {
    const h2 = document.querySelector("h2");
    if (h2) h2.remove();
    const h3 = document.querySelector("h3");
    if (h3) h3.remove();

    const bullets = [];
    for (let i = 1; i <= 4; i++) {
        const el = document.querySelector(`[name='bullet${i}']`);
        bullets.push(el ? el.value : "");
    }

    const courses = Array.from(document.querySelectorAll(".course")).map(courseDiv => ({
        dept: courseDiv.querySelector("[name='dept[]']").value,
        num: courseDiv.querySelector("[name='num[]']").value,
        name: courseDiv.querySelector("[name='courseName[]']").value,
        reason: courseDiv.querySelector("[name='reason[]']").value
    }));

    const firstName = document.querySelector("[name='firstName']").value;
    const middleName = document.querySelector("[name='middleName']").value;
    const lastName = document.querySelector("[name='lastName']").value;
    const picInput = document.querySelector("[name='picture']");
    const picCaption = document.querySelector("[name='pictureCaption']").value;
    const quote = document.querySelector("[name='quote']").value;
    const quoteAuthor = document.querySelector("[name='quoteAuthor']").value;
    const funny = document.querySelector("[name='funny']").value;
    const share = document.querySelector("[name='share']").value;
    const links = [
        document.querySelector("[name='link1']").value,
        document.querySelector("[name='link2']").value,
        document.querySelector("[name='link3']").value,
        document.querySelector("[name='link4']").value,
        document.querySelector("[name='link5']").value
    ].filter(link => link.trim() !== "");

    let coursesHTML = "";
    courses.forEach(c => {
        coursesHTML += `<li><strong>${c.dept} ${c.num} - ${c.name}:</strong> ${c.reason}</li>`;
    });

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = picInput.files[0] ? e.target.result : "images/me_career_fair.png";

        formElement.innerHTML = `
            <h2>${firstName} ${middleName} ${lastName}: Introduction Form</h2>
            <figure>
                <img src="${imgSrc}" alt="${picCaption}">
                <figcaption><em>${picCaption}</em></figcaption>
            </figure>
            <ul>
                <li><strong>Personal Background:</strong> ${bullets[0]}</li>
                <li><strong>Professional Background:</strong> ${bullets[1]}</li>
                <li><strong>Academic Background:</strong> ${bullets[2]}</li>
                <li><strong>Primary Computer:</strong> ${bullets[3]}</li>
                <li><strong>Course I'm Taking & Why:</strong>
                    <ul>${coursesHTML}</ul>
                </li>
                ${quote ? `<li><strong>Quote:</strong> "${quote}"</li>` : ''}
                ${quoteAuthor ? `<li><strong>Quote Author:</strong> ${quoteAuthor}</li>` : ''}
                ${funny ? `<li><strong>Funny Thing:</strong> ${funny}</li>` : ''}
                ${share ? `<li><strong>Something to Share:</strong> ${share}</li>` : ''}
            </ul>
            ${links.length > 0 ? `<p>Links:</p><ul>${links.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join('')}</ul>` : ''}
            <button id="resetResult">Reset Form</button>
        `;

        document.getElementById("resetResult").addEventListener("click", () => location.reload());
    };

    if (picInput.files[0]) {
        reader.readAsDataURL(picInput.files[0]);
    } else {
        reader.onload();
    }
}