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