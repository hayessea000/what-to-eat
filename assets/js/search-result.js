// pulls search box values from first page to replicate results on second page
var searchInput = $("#searchinput")
var searchType = $("#searchtype")
var searchButton = $("#submit-btn")
var searchParam
var type
var searchResults = $("#search-cards")
var mealArr
var recipe
var searchCards
var favMeals
var savedRecipe =$("#saved-recipe")

var getParameters = function () {
    searchParam = document.location.search.split('=');

    type = searchParam[0].split('').pop()

    searchParam [0] = type
}

//fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast").then(res => res.json()).then(data => console.log(data))

// copies from first page to make the search box work on the second page
function submitSearch(){

    // grab values of the input form, for both the category and the inputted search
    var searchInputValue = searchInput.val();
    var searchTypeValue = searchType.val();

    // return errors if either category is blank
    if(!searchInputValue){
        alert("Please enter a value to search for.");
        return;
    } else if(!searchTypeValue){
        alert("Please select a search category.");
        return;
    }

    // reload the second wepage, append search criteria
    var URLdirect = "./search-results.html?" + searchTypeValue + "=" + searchInputValue

    // actual search
    location.assign(URLdirect)
}


// add event listener to search on click without reloading
searchButton.on("click", function(e){
    e.preventDefault();
    submitSearch();
})

var getApi = function () { 
    var apiUrl = 'https://www.themealdb.com/api/json/v1/1/' 
    if(type == "s"){
        apiUrl = apiUrl + "search.php?"
    } else {
        apiUrl = apiUrl + "filter.php?"
    }
    apiUrl = apiUrl + type + "=" + searchParam[1] 
    console.log(apiUrl)

    fetch(apiUrl)
        .then (function (response) {
            return response.json();
        })
        .then (function (data){
            mealArr = data.meals
            console.log(mealArr)
            generateCards();
        })
}

var loadFav = function(){
    savedRecipe.html("")
    favMeals = JSON.parse(localStorage.getItem("favMeals"));
    if(favMeals== null){
        favMeals=[];
    }
    for(var i = 0; i< favMeals.length; i++){
        savedRecipe =$("#saved-recipe")
        var favCard= $("<div>");
        var favImage = $("<img>");
        favImage.attr("src", `${favMeals[i].image}`)
        var favName = $("<p>");
        favName.text(`${favMeals[i].name}`)
        favName.addClass("mb-4")
        var favButton = $("<button>")
        favButton.attr("data-value",`${favMeals[i].id}` )
        favButton.addClass("foodCard button is-success mb-4")
        favButton.text("Show Recipe")
        favCard.append(favImage);
        favCard.append(favName);
        favCard.append(favButton);
        favCard.addClass("box")
        savedRecipe.append(favCard);
    }
}

var generateCards = function(){
    for (var i = 0; i < mealArr.length; i++){
        searchCards = $("<div>")
        searchCards.attr("style", "margin: 10px; height: 350px; width: 270px; padding: 10px;")
        searchCards.addClass("notification box")
        var foodImage = $("<img>")
        foodImage.attr("src", `${mealArr[i].strMealThumb}`)
        foodImage.attr("style", "height; 220px; width:220px;")
        var foodName = $("<p>")
        foodName.attr("style", "padding: 10px;")
        foodName.text(`${mealArr[i].strMeal}`)
        var foodButton = $("<button>")
        foodButton.attr("data-value",`${mealArr[i].idMeal}` )
        foodButton.addClass("foodCard button is-success ml-4 mb-4")
        foodButton.text("Show Recipe")
        searchCards.append(foodImage)
        searchCards.append(foodName)
        searchCards.append(foodButton)
        searchResults.append(searchCards)
    }
    var searchResultsCard =$(".foodCard")
    searchResultsCard.on("click", function(event){
            var clickTarget =  event.target
            var seachByName = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${clickTarget.getAttribute("data-value")}`
            fetch(seachByName)
            .then (function (response) {
                return response.json();
            })
            .then (function (data){
                recipe = data.meals
                console.log(recipe);

                searchResults.html("")

                generatefinalCard();
            })
        }
    )
}

var generatefinalCard = function(){

    // image of meal
    var recipeImage = $("<img>")
    recipeImage.addClass("box")
    recipeImage.attr("src", `${recipe[0].strMealThumb}`)

    // name of meal
    var recipeTitle = $("<h3>")
    recipeTitle.text(`${recipe[0].strMeal}`)
    recipeTitle.addClass("title mt-4 mb-5")

    // create list of ingredients, pull from object using the measurement and ingredient name
    var ingredientList = $("<ul>")
    ingredientList.addClass("mb-4")
    
    for (var i = 1; i < 20; i++) {
       var strIngredientVar = recipe[0]['strIngredient' + i]
       var strMeasureVar = recipe[0]['strMeasure' + i]

       if(strIngredientVar !== "" && strMeasureVar !== ""){
       var ingredientItem = $("<li>")
        ingredientItem.text(strMeasureVar + " " + strIngredientVar)
        ingredientList.append(ingredientItem)
       }
    }
    
    // add link to video of recipe
    var videoLink = $("<a>")
    videoLink.attr("href", `${recipe[0].strYoutube}`)
    videoLink.html("Link to Video")

    // add instructions in div
    var instructions = $("<div>")
    instructions.addClass("mt-4")
    instructions.text(`${recipe[0].strInstructions}`)

    // button to return to results page
    var returnButton = $("<button>")
    returnButton.html("Return to Search Results")
    returnButton.addClass("button is-success ml-4 mt-4 mr-4 mb-4")
    returnButton.on("click", function(e){
        searchResults.html("");
        generateCards();
    })

    // saves to favorites sidebar, returns to results page
    var saveFavoritesButton = $("<button>")
    saveFavoritesButton.html("Save to Favorites")
    saveFavoritesButton.attr("id", "save-fav-btn")
    saveFavoritesButton.addClass("button is-success ml-4 mt-4 mr-4 mb-4")

    var finalCard = $("<div>")

    
    finalCard.append(recipeImage, recipeTitle, ingredientList, videoLink,instructions, returnButton, saveFavoritesButton)
    searchResults.append(finalCard)
    var saveFavButton = $("#save-fav-btn");
    saveFavButton.on("click", function(){
        var addFavMeals={name: recipe[0].strMeal, image: recipe[0].strMealThumb, id: recipe[0].idMeal};
        if (favMeals.length<= 4){
            favMeals.unshift(addFavMeals);
        }else{
            var scrap =favMeals.pop();
            console.log(favMeals)
            favMeals.unshift(addFavMeals);
            console.log(favMeals)
        }
        localStorage.setItem("favMeals", JSON.stringify(favMeals));
        loadFav();
    })
}   


getParameters();
loadFav();
getApi();

$(document).on("click", ".foodCard",function(event){
    var clickTarget =  event.target
    var seachByName = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${clickTarget.getAttribute("data-value")}`
    fetch(seachByName)
    .then (function (response) {
        return response.json();
    })
    .then (function (data){
        recipe = data.meals
        console.log(recipe);
        searchResults.html("")
        generatefinalCard();
    })
})