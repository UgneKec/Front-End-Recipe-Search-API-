function getRecipeIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
function fetchAndDisplayRecipeDetails() {
    const id = getRecipeIdFromUrl();
    if (id) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(detail => {
            // Extract recipe details
            let meal = detail.meals[0];
            console.log(meal);

            document.getElementById('the-video-picture').src = meal.strMealThumb;
            document.getElementById('recipe-title').innerText = meal.strMeal;
            document.getElementById('recipe-video-yt').href = meal.strYoutube;

            document.getElementById('button-details').addEventListener('click', () => {
                document.getElementById("how-many-items").style.display = "none";
                let details = document.getElementById("details")
                details.innerHTML = "";// isvalyti turini
                let detailsDiv = document.createElement("div");
                detailsDiv.className ='how-to-do';
                const instructions = document.createElement('p');
                instructions.textContent = meal.strInstructions;
                detailsDiv.appendChild(instructions)
                details.appendChild(detailsDiv)
            })


            // // Ingredients Button
            // document.getElementById('button-ingredients').addEventListener('click', () => {
            //     document.getElementById("how-many-items").style.display = "block";
            //     const ingredientsList = document.getElementById('details');
            //     ingredientsList.innerHTML = ''; // isvalyti turini
            //     for (let i = 1; i <= 20; i++) {
            //         const ingredient = meal[`strIngredient${i}`];
            //         const measure = meal[`strMeasure${i}`];
            //         if (ingredient && ingredient !== "" && measure && measure !== "") {
            //             const listItem = document.createElement('li');
            //             listItem.textContent = `${ingredient} - ${measure}`;
            //             ingredientsList.appendChild(listItem);
            //         }
            //     }
            // })
            // Ingredients Button
document.getElementById('button-ingredients').addEventListener('click', () => {
    document.getElementById("how-many-items").style.display = "block";
    const ingredientsList = document.getElementById('details');
    ingredientsList.innerHTML = ''; // Clear existing content

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient !== "" && measure && measure !== "") {
            const listItem = document.createElement('li');

            // Create an image element
            const imgElement = document.createElement('img');
            imgElement.src = 'img/star-small-svgrepo-com.png'; // Path to your star image
            imgElement.alt = 'star icon'; // Alt text for the image
            imgElement.className = 'ingredient-icon p-2'; // Optional: add a class for styling

            // Append the image and text to the list item
            listItem.appendChild(imgElement);
            listItem.appendChild(document.createTextNode(` ${ingredient} - ${measure}`));

            ingredientsList.appendChild(listItem);
        }
    }
});





        })  
    }
}



// Call the function to fetch and display recipe details
fetchAndDisplayRecipeDetails();
