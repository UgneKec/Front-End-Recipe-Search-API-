// PADAROMA PAIESKA SU ENTER
// Get the input field
var input = document.getElementById("inputName");
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("button").click();
    }
  });


// GAUNAME KATEGORIJU NUORODAS ir sukuriam mygtukus
fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
.then(response => response.json())
.then(data => {
    //patikrinti ar mato duomenis
    // console.log(data.meals);
    const myCat = document.getElementById("category-links")
    data.meals.forEach(category=> {        
        let categoryDiv= document.createElement('div');
            const categoryInfo=`
            <button type="button" class="btn">${category.strCategory}</button>
            `
            categoryDiv.innerHTML = categoryInfo;

        
        myCat.appendChild(categoryDiv);      
        //mygtukui priskiriam eventa

        categoryDiv.addEventListener('click', event =>{
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
            .then(response => response.json())
            .then(data => {
                const items = document.getElementById("items");
                items.innerHTML = ""
                document.getElementById("msg").style.display = "none";
                data.meals.forEach(meal => {
                    //patikrinti ar mato duomenis
                    // console.log(meal);
                    let itemDiv= document.createElement('div')
                    // gauname ID ir metam i funkcija
                    itemDiv.setAttribute('onclick', `details(${meal.idMeal})`)
                    itemDiv.className = "card col-sm-6  p-0 shadow mb-5 bg-body-tertiary rounded-4";
                    const itemInfo =`
                    <div class="heart-item">
                        <a href="#">
                            <span class="badge notify-badge"><img src="img/Vector.png"  class="img-fluid" alt="P" ></span>                    
                            <img class ="p-0 rounded-top-4 img-fluid my-card-img" src="${meal.strMealThumb}" class="card-img-top" alt="...">
                        </a>  
                    </div>      
                    <div class="card-body p-1">
                        <div class="row p-0">
                            <div class="col-10 main-card-block">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <div class="card-additional-info d-flex align-items-start">
                                    <div class="recepe-duration">
                                        <p class="card-text">25 min.</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
                                        <circle cx="1.5" cy="1.5" r="1.5" fill="#797979"/>
                                    </svg>           
                                    <div class = "recepe-category">
                                        <p class="card-text">${category.strCategory}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-2 card-food-rating">
                                <img src="img/326703_favorite_rate_star_icon 1.png" alt="*">
                                <p class="card-text text-nowrap"> 4.6</p>
                            </div>
                        </div> 
                    </div>
                    `
                    itemDiv.innerHTML = itemInfo;
                    items.appendChild(itemDiv)
                })

            })
        })
    })
})



// SUKURIAMOS KORTELES PAGAL PAIESKA
document.getElementById("button").addEventListener('click',()=>{
    let inputValue = document.getElementById('inputName').value;
    // patikrinti ar mato input
    // console.log(inputValue);
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then(response => response.json())
    .then(data => {
        const items = document.getElementById("items");
        items.innerHTML = ""
        if(data.meals ==null){
            document.getElementById("msg").style.display = "block";
            console.log("No meals")
        }else{
            document.getElementById("msg").style.display = "none";
            //patikrinti ar mato duomenis
            // console.log(data.meals)
            data.meals.forEach(meal => {
                //patikrinti ar mato duomenis
                // console.log(meal);
                let itemDiv= document.createElement('div')
                //gauname ID ir metam i funkcija
                itemDiv.setAttribute('onclick', `details(${meal.idMeal})`)
                itemDiv.className = "card col-sm-6  p-0 shadow mb-5 bg-body-tertiary rounded-4";
                const itemInfo =`
                <div class="heart-item">
                    <a href="#">
                        <span class="badge notify-badge"><img src="img/Vector.png"  class="img-fluid" alt="P" ></span>                    
                        <img class ="p-0 rounded-top-4 img-fluid my-card-img" src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    </a>  
                </div>      
                <div class="card-body p-1">
                    <div class="row p-0">
                        <div class="col-10 main-card-block">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <div class="card-additional-info d-flex align-items-start">
                                <div class="recepe-duration">
                                    <p class="card-text">25 min.</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="3" viewBox="0 0 3 3" fill="none">
                                    <circle cx="1.5" cy="1.5" r="1.5" fill="#797979"/>
                                </svg>           
                                <div class = "recepe-category">
                                    <p class="card-text">${meal.strCategory}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-2 card-food-rating">
                            <img src="img/326703_favorite_rate_star_icon 1.png" alt="*">
                            <p class="card-text text-nowrap"> 4.6</p>
                        </div>
                    </div> 
                </div>
                `
                itemDiv.innerHTML = itemInfo;
                items.appendChild(itemDiv)  
            })
        }
    })
})


//redirectina index2.html ir pernesa isgauta id
function details(id){
    window.location.href = `./index2.html?id=${id}`;
    // console.log(id)
    // fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    // .then(res=>res.json())
    // .then(detail => console.log(detail))
}