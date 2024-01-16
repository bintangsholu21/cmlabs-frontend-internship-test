// Mendapatkan nama kategori dari URL
const urlParams = new URLSearchParams(window.location.search);
const categoryName = urlParams.get('c');

fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    .then(response => response.json())
    .then(data => {
        const categories = data.categories;
        const category = categories.find(category => category.strCategory === categoryName);

        const breadcrumbItemMeals = document.querySelector('.breadcrumb-item.meals a');
        breadcrumbItemMeals.textContent = category.strCategory;
        breadcrumbItemMeals.href = `../category-detail/category-detail.html?c=${categoryName}`;
    })
    .catch(error => console.error(error));



const mealId = urlParams.get('id');

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        const breadcrumbItemActive = document.querySelector('.breadcrumb-item.active');
        breadcrumbItemActive.textContent = meal.strMeal;
    })
    .catch(error => console.error(error));

    
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];

        document.getElementById('meal-name').textContent = meal.strMeal;
        document.getElementById('category').textContent = meal.strCategory;
        document.getElementById('area').textContent = meal.strArea;
        document.getElementById('instructions').textContent = meal.strInstructions;
        document.getElementById('meal-thumb').src = meal.strMealThumb;
        document.getElementById('meal-thumb').alt = meal.strMeal;
        document.getElementById('youtube').innerHTML = `<iframe width="359" height="197" src="${meal.strYoutube.replace('watch?v=', 'embed/')}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        document.getElementById('source').href = meal.strSource;

        const ingredientsList = document.getElementById('ingredients');
        const measurementsList = document.getElementById('measurements');
        for (let i = 1; i <= 50; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measurement = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = ingredient;
                ingredientsList.appendChild(li);
            }
            if (measurement && measurement.trim() !== '') {
                const li = document.createElement('li');
                li.textContent = measurement;
                measurementsList.appendChild(li);
            }
        }
    })
    .catch(error => console.error(error));