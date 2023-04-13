// var dropDown = document.querySelector('');
// var searchFormEl = document.querySelector('');
// var resultContentEl = document.querySelector('');
// var resultTextEl = document.querySelector('');



// var apiUrl = '';

var searchParam
var type
var searchResults = $("#search-cards")
var mealArr

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
        var searchCards = $("<section>")
        searchCards.text("lorem ipsum")
        searchCards.attr("style", "background-color: black; margin: 10px; color: white")
        searchResults.append(searchCards)
}}

getParameters();
getApi();