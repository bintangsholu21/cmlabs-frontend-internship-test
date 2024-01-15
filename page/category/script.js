// JavaScript
async function fetchData() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();

    const container = document.querySelector('.container');
    data.categories.forEach(category => {
        const card = `
                <div class="col-md-3 my-3">
                    <a href="www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}" class="text-decoration-none text-dark">
                        <div class="card mb-4">
                            <img src="${category.strCategoryThumb}" class="card-img-top" alt="${category.strCategory}">
                            <div class="card-body">
                                <h5 class="card-title">${category.strCategory}</h5>
                                <p class="card-text">${category.strCategoryDescription}</p>
                            </div>
                        </div>
                    </a>
                </div>
    
        `;
        const row = document.querySelector('.row.categories');
        row.insertAdjacentHTML('beforeend', card);
    });
}

fetchData();