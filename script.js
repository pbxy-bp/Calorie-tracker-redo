
async function searchFood() {
    const query = document.getElementById('foodInput').value;
    const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`);
    const data = await response.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (data.products && data.products.length > 0) {
        const product = data.products[0];
        resultsDiv.innerHTML = `
            <h2>${product.product_name || 'No Name Found'}</h2>
            <p><strong>Calories:</strong> ${product.nutriments['energy-kcal_100g'] || 'N/A'} kcal/100g</p>
            <p><strong>Protein:</strong> ${product.nutriments.proteins_100g || 'N/A'} g</p>
            <p><strong>Carbs:</strong> ${product.nutriments.carbohydrates_100g || 'N/A'} g</p>
            <p><strong>Fat:</strong> ${product.nutriments.fat_100g || 'N/A'} g</p>
        `;
    } else {
        resultsDiv.textContent = 'No results found.';
    }
}
