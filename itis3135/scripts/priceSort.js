// Function declaration (hoisted)
function extractPrice(li) {
    const topText = Array.from(li.childNodes)
                         .filter((node) => node.nodeType === Node.TEXT_NODE)
                         .map((node) => node.textContent)
                         .join(' ');
    const match = topText.match(/\$\d+/);
    return match ? parseInt(match[0].replace('$', '')) : Infinity;
}

const sortBtn = document.getElementById('sortPriceBtn');
const servicesList = document.getElementById('servicesList');

sortBtn.addEventListener('click', () => {
    const services = Array.from(servicesList.children);

    services.sort((a, b) => {
        const priceA = extractPrice(a);
        const priceB = extractPrice(b);
        return priceA - priceB;
    });

    services.forEach((li) => servicesList.appendChild(li));
});
