const APIKEY = 'd714fa24a5030cb0925ff0ca14d0f814';

const loadWeatherData = async () => {
    const searchField = document.getElementById( 'input-field' );
    const searchText = searchField.value;

    if ( searchText.length == 0 ) {
        alert( 'NO EMPTY SEARCH!!!' )
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ searchText }&units=metric&appid=`;
    const fullUrl = url + APIKEY;

    const res = await fetch( fullUrl );
    const data = await res.json();

    if ( data.cod == 404 ) {
        alert( 'CITY NOT FOUND!!!' );
        return;
    }
    else {
        displayWeatherData( data );
    }
}

document.getElementById( 'search-button' ).addEventListener( 'click', () => {
    loadWeatherData();
} );

const displayWeatherData = city => {
    console.log( city );
    const infoContainer = document.getElementById( 'info-container' );
    infoContainer.textContent = '';
    infoContainer.innerHTML = `
        <img src="https://openweathermap.org/img/wn/02d@2x.png" alt="">
        <h1>${ city.name }</h1>
        <h3><span>${ city.main.temp }</span>&deg;C</h3>
        <h3><span>${ city.weather[ 0 ].main }</span>&deg;C</h3>
        <h1 class="lead">Clouds</h1>
    `;
}