const sortBtn = document.getElementById('sortPriceBtn');
const servicesList = document.getElementById('servicesList');

sortBtn.addEventListener('click', () => {
    //Converting the list to array
    const services = Array.from(servicesList.children);

    services.sort((a, b) => {
        const priceA = extractPrice(a);
        const priceB = extractPrice(b);
        return priceA - priceB;
    });

    //Reappend sorted list and keep nested list structure
    services.forEach(li => servicesList.appendChild(li));
});

//Get the first price in the list 
function extractPrice(li) {
    //Get the text of the list/ignore nested list
    const topText = Array.from(li.childNodes)
                         .filter(node => node.nodeType === Node.TEXT_NODE)
                         .map(node => node.textContent)
                         .join(' ');
    const match = topText.match(/\$\d+/);
    return match ? parseInt(match[0].replace('$', '')) : Infinity;
}
