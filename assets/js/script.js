var searchInput = $("#searchinput")
var searchType = $("#searchtype")
var searchButton = $("#submit-btn")

function submitSearch(){

    var searchInputValue = searchInput.val();
    var searchTypeValue = searchType.val();

    console.log(searchInputValue)
    console.log(searchTypeValue)

    if(!searchInputValue){
        alert("Please enter a value to search for.");
        return;
    } else if(!searchTypeValue){
        alert("Please select a search category.");
        return;
    }
}

searchButton.on("click", function(e){
    e.preventDefault();
    submitSearch();
})