// var dropDown = document.querySelector('');
// var searchFormEl = document.querySelector('');
// var resultContentEl = document.querySelector('');
// var resultTextEl = document.querySelector('');



// var apiUrl = '';

var searchParam
var type
var searchResults = $("#search-cards")
var mealArr
var recipe
var searchCards

// I = ingredient
// C = category
// A = are
// S = name 


var getParameters = function () {
    searchParam = document.location.search.split('=');

    type = searchParam[0].split('').pop()

    searchParam [0] = type
}

//fetch("https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast").then(res => res.json()).then(data => console.log(data))



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

var generateCards = function(){
    for (var i = 0; i < mealArr.length; i++){
        searchCards = $("<section>")
        searchCards.attr("style", "margin: 10px;")
        var foodImage = $("<img>")
        foodImage.attr("src", `${mealArr[i].strMealThumb}`)
        var foodName = $("<p>")
        foodName.text(`${mealArr[i].strMeal}`)
        var foodButton = $("<button>")
        foodButton.attr("data-value",`${mealArr[i].idMeal}` )
        foodButton.addClass("foodCard")
        foodButton.text("Show the Recipe")
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
    var recipeImage = $("<img>")
    recipeImage.attr("src", `${recipe[0].strMealThumb}`)

    var recipeTitle = $("<h3>")
    recipeTitle.text(`${recipe[0].strMeal}`)

    var ingredientList = $("<ul>")
    
    for (var i = 1; i < 20; i++) {
       var strIngredientVar = recipe[0]['strIngredient' + i]
       var strMeasureVar = recipe[0]['strMeasure' + i]

       if(strIngredientVar !== "" && strMeasureVar !== ""){
       var ingredientItem = $("<li>")
        ingredientItem.text(strMeasureVar + " " + strIngredientVar)
        ingredientList.append(ingredientItem)
       }
    }

    var instructions = $("<div>")
    instructions.text(`${recipe[0].strInstructions}`)

    var returnButton = $("<button>")
    returnButton.html("Return to Search Results")
    returnButton.on("click", function(e){
        searchResults.html("");
        generateCards();
    })

    var saveFavoritesButton = $("<button>")
    saveFavoritesButton.html("Save to Favorites")
    saveFavoritesButton.attr("id", "save-fav-btn")
    saveFavoritesButton.on("click", function(e){
        e.preventDefault();
        console.log("click")
    })

    searchResults.append(recipeImage, recipeTitle, ingredientList, instructions, returnButton, saveFavoritesButton)
}   


getParameters();
getApi();