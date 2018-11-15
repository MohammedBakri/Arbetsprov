
function getCountriesNamesList() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var response = JSON.parse(xhr.responseText);
            var countriesList = response.map(function (response) {
                return response.name
            })
            var options = '';

            for (var i = 0; i < countriesList.length; i++)
                options += '<option value="' + countriesList[i] + '" />';

            document.getElementById('countriesDataList').innerHTML = options;
        }
    }
    xhr.open('GET', 'https://restcountries.eu/rest/v2/all?fields=name', true);
    xhr.send(null);
}

getCountriesNamesList();

var searchHistoryList = [];

function HandleEnterEvent(e) {
    if (!e || e.keyCode == 13) {
        searchHistoryList.push({
            searchText:  document.getElementById("searchInput").value,
            date: new Date().toDateString(),
            time: new Date().toTimeString().split(' ')[0]
        })
        createHistoryListGrid();
    }
}

function removeElement(index) {
    searchHistoryList.splice(index, 1);
    if (searchHistoryList.length > 0) {
        createHistoryListGrid();
    } else {
        var historyGrid = document.getElementById("historyResultsGrid");
        historyGrid.innerHTML = '<!-- Grid -->';
        historyGrid.className = '';
    }
}

function createHistoryListGrid() {
    var historyGrid = document.getElementById("historyResultsGrid");
    var htmlstring='<!--History Record-->';
    searchHistoryList.forEach(function (element, index) {
        htmlstring +="<ul> <li><i class='fas fa-check-circle'></i></li> "
        +"<li aria-haspopup='false' aria-checked='false' class='search-text'>"+element.searchText+"</li>"
        +"<li aria-haspopup='false' aria-checked='false'></li>"
        +"<li aria-haspopup='false' aria-checked='false'>"+element.date+"</li>"
        +"<li aria-haspopup='false' aria-checked='false'>"+element.time+"</li>"
        +"<li aria-haspopup='false' aria-checked='false' class='dismiss-button' title='remove' onclick='removeElement(" + index + ")' ><button aria-label='Remove'><i class='dismiss-icon fas fa-times-circle'></i></button></li>"
        +"</ul>"
    });
    historyGrid.innerHTML = htmlstring;
    historyGrid.className = 'history-grid';
}