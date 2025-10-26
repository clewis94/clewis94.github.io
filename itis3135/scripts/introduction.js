const formElement = document.getElementById("introForm");

// Prevent default submit
formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    submitForm();
});

// Clear button
document.getElementById("clearBtn").addEventListener("click", () => {
    document.querySelectorAll("form input, form textarea").forEach(input => input.value = "");
});

// Add new course button
document.getElementById("addCourse").addEventListener("click", () => {
    const container = document.getElementById("courseContainer");
    const div = document.createElement("div");
    div.classList.add("course");
    div.innerHTML = `
        <input type="text" placeholder="Department" name="dept[]">
        <input type="text" placeholder="Number" name="num[]">
        <input type="text" placeholder="Name" name="courseName[]">
        <input type="text" placeholder="Reason" name="reason[]">
        <button type="button" class="deleteCourse">X</button>
    `;
    container.appendChild(div);
    div.querySelector(".deleteCourse").addEventListener("click", () => div.remove());
});

function submitForm() {
    const data = new FormData(formElement);

    const bullets = [];
    for (let i = 1; i <= 4; i++) bullets.push(data.get("bullet" + i) || "");

    const depts = data.getAll("dept[]");
    const nums = data.getAll("num[]");
    const names = data.getAll("courseName[]");
    const reasons = data.getAll("reason[]");

    let coursesHTML = "";
    for (let i = 0; i < depts.length; i++) {
        if (depts[i] || nums[i] || names[i] || reasons[i]) {
            coursesHTML += `<li><strong>${depts[i]}${nums[i]} - ${names[i]}:</strong> ${reasons[i]}</li>`;
        }
    }

   document.querySelector("main").innerHTML = `
    <h2>Introduction Form</h2>
    <figure>
        <img src="images/me_career_fair.png" alt="${data.get("pictureCaption") || ''}">
        <figcaption><em>${data.get("pictureCaption") || ''}</em></figcaption>
    </figure>
    <ul>
        <li><strong>Personal Background:</strong> ${bullets[0]}</li>
        <li><strong>Professional Background:</strong> ${bullets[1]}</li>
        <li><strong>Academic Background:</strong> ${bullets[2]}</li>
        <li><strong>Primary Computer:</strong> ${bullets[3]}</li>
        <li><strong>Course I'm Taking & Why:</strong>
            <ul>${coursesHTML}</ul>
        </li>
    </ul>

    <a href="intro_form.html" style="display:block; margin-top:20px; font-weight:bold;">Reset Form</a>
`;
}