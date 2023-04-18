var searchInput = $("#searchinput")
var searchType = $("#searchtype")
var searchButton = $("#submit-btn")
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
    // redirect to second wepage, append ?category = search, for example ?i=chicken
    var URLdirect = "./search-results.html?" + searchTypeValue + "=" + searchInputValue
    // actual redirect
    location.assign(URLdirect)
}
// add event listener to redirect on click without reloading
searchButton.on("click", function(e){
    e.preventDefault();
    submitSearch();
})