//API Key and other element variables
const APIKEY = '64b399b8d76f2da3d0b926b7a709bb45';
const infoContainer = document.getElementById( 'info-container' );
const searchField = document.getElementById( 'input-field' );
const errorContainer = document.getElementById( 'error-container' );

//By default the error message display is none.
errorContainer.style.display = 'none';

//Load the weather data from the server through API Call.
const loadWeatherData = async () => {

    const searchText = searchField.value;

    //Display the error message if the search input field is empty.
    if ( searchText.length === 0 ) {
        displayError( 'PLEASE NO EMPTY SEARCH!!!' );
        return;
    }

    //Bind the API urs and the custom API KEY.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ searchText }&units=metric&appid=`;
    const fullUrl = url + APIKEY;

    //Fetch the data from the server through API call.
    const res = await fetch( fullUrl );
    const data = await res.json();

    //Error handling for error in user input (City Name).
    if ( data.cod === "404" ) {
        displayError( 'CITY NOT FOUND!!!' );
    }
    else {
        displayWeatherData( data );
    }
}

//Display the error message
const displayError = ( message ) => {
    infoContainer.textContent = '';
    errorContainer.style.display = 'block';
    errorContainer.innerText = message;
    return;
}

//Display the weather data when the city name found.
const displayWeatherData = city => {
    errorContainer.style.display = 'none';
    infoContainer.textContent = '';
    infoContainer.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${ city.weather[ 0 ].icon }@2x.png" alt="">
        <h1>${ city.name }</h1>
        <h3><span><b>Temperature: </b>${ city.main.temp }</span>&deg;C</h3>
        <h3><span><b>Feels Like: </b>${ city.main.feels_like }</span>&deg;C</h3>
        <h3><span>${ city.weather[ 0 ].main }</span></h3>
    `;
}

//Event listener for button click.
document.getElementById( 'search-button' ).addEventListener( 'click', () => {
    loadWeatherData();
} );