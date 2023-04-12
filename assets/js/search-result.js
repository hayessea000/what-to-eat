// var dropDown = document.querySelector('');
// var searchFormEl = document.querySelector('');
// var resultContentEl = document.querySelector('');
// var resultTextEl = document.querySelector('');



// var apiUrl = '';



// I = ingredient
// C = category
// A = are
// S = name 


var getParameters = function () {
    var searchParam = document.location.search.split('=');

    var type = searchParam[0].split('').pop()

    searchParam [0] = type

}



var getApi = function () { 
    var apiUrl = 'http://www.themealdb.com/api/json/v1/1/' 
}
