const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('c');

const breadcrumbItem = document.querySelector('.breadcrumb-item.active');
breadcrumbItem.textContent = categoryName;

// Fetch API
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
    .then(response => response.json())
    .then(data => {
        const meals = data.meals;
        const row = document.querySelector('.row.categories');

        // Loop melalui setiap meal dan membuat card
        meals.forEach(meal => {
            const card = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 my-3 d-flex align-items-center justify-content-center">
                    <a href="../meals-detail/meals-detail.html?id=${meal.idMeal}&c=${categoryName}" class="text-decoration-none text-dark">
                        <div class="card mb-4">
                            <img src="${meal.strMealThumb}" class="card-img-top d-flex align-items-center justify-content-center" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            `;

            // Menambahkan card ke row
            row.insertAdjacentHTML('beforeend', card);
        });
    })
    .catch(error => console.error(error));


// Fetch API
fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(response => response.json())
    .then(data => {
        const categories = data.categories;
        const category = categories.find(category => category.strCategory === categoryName);

        // Menemukan elemen h2 dan p dan menambahkan data
        const h2 = document.querySelector('h2');
        const p = document.querySelector('p');

        h2.textContent = category.strCategory + ' Meals';
        p.textContent = category.strCategoryDescription.replace(/\[\d+\]/g, '');
    })
    .catch(error => console.error(error));