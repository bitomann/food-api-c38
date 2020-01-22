// variable to hold data to be passed to dom
const foodStuffContainer = document.querySelector(".foodList");
// function to create sections inside container that goes to dom
function foodFactory(food) {
    console.log("test test", food);
    return `
    <div>
        <section class="foodTitle">${food.name}</section>
        <section class="foodEthnicity">${food.ethnicity}</section>
        <section class="foodCategory">${food.category}</section>
        <section class="barcode">${food.barcode}</section>
        <section class="ingredients">${food.ingredients}</section>
        <section class="countriesOrigin">${food.countries}</section>
        <section class="fat">${food.fat}</section>
        <section class="sugar">${food.sugar}</section>
        <section class="calories">${food.calories} calories</section>
    </div>
`
}
// function to add containers to dom
function addFoodToDom(stuff) {
    foodStuffContainer.innerHTML += stuff
}
// fetch command to get info from json server and turn into javascript to be usable
fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        // console.table(parsedFoods);
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    console.log("full info", productInfo);
                    if (productInfo.product.countries) {
                        food.countries = productInfo.product.countries
                        console.log("country test", food.countries);
                    } else {
                        food.countries = "no country listed"
                    }
                    if (productInfo.product.nutriments.fat_serving) {
                        food.fat = productInfo.product.nutriments.fat_serving
                    } else {
                        food.fat = "fat per serving not listed"
                    }
                    if (productInfo.product.nutriments.sugars_serving) {
                        food.sugar = productInfo.product.nutriments.sugars_serving
                    } else {
                        food.sugar = "sugar per serving not listed"
                    }
                    // console.log("looking for info", productInfo);
                    if (productInfo.product.ingredients_text) {
                        food.ingredients = productInfo.product.ingredients_text
                    } else {
                        food.ingredients = "no ingredients listed"
                    }
                    if (productInfo.product.nutriments.energy) {
                        food.calories = productInfo.product.nutriments.energy
                    } else {
                        food.calories = "no calories listed"
                    }
                    const foodAsHTML = foodFactory(food);
                    // console.log("my test", foodAsHTML);
                    addFoodToDom(foodAsHTML);
                })
        })
    });