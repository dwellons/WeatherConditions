/**
 * This class will perform the work to get the location for the zip code, as well as
 * the current conditions for that location. It will then output the results to the user.
 * @author Darin Wellons
 * @version 1.0
 * @since 1.0
 */

/**
 * Constant for username.
 * @type {string} Username.
 */
const username = "dwellons";

/**
 * Constant for the country.
 * @type {string}
 */
const country = "US";

/**
 * Constant for REGEX zip code pattern.
 * @type {RegExp}
 */
const regexZipCode = /^\d{5}$/;

/**
 * Fetches the zip code from the form.
 * @param inlineEvent
 */
const fetchZipCode = inlineEvent => {

    // Gets the input zip code from the form.
    let inputZipCode = document.getElementById("getWeather").value;

    // Compare the input zip code to the Regex pattern.
    if (!regexZipCode.test(inputZipCode)) {
        alert("Please enter a 5 digit zip code. Example: 53534")
        return;
    }

    // Sends zip code to getLocation method.
    getLocation(inputZipCode);
}

/**
 * Gets the location for the entered zip code. (latitude and longitude)
 * @param inputZipCode The entered zip code.
 */
const getLocation = inputZipCode => {

    let url = "http://api.geonames.org/postalCodeSearchJSON?username=" +
            username + "&postalcode=" + inputZipCode + "&country=" + country;
    let xhr = new XMLHttpRequest();

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4) {

            let data = JSON.parse(xhr.responseText);
            let lat = data.postalCodes[0].lat;
            let lng = data.postalCodes[0].lng;

            // Calls the get weather method, passes latitude and longitude.
            getWeather(lat,lng);
        }
    }
    xhr.send(null);
}

/**
 * Gets the weather for the found location.
 * Outputs those results to a table
 * @param lat The latitude of the location.
 * @param lng The longitude of the location.
 */
const getWeather = (lat, lng) => {

    let url = "http://api.geonames.org/findNearByWeatherJSON?username=" +
            username + "&lat=" + lat + "&lng=" + lng;
    let xhr = new XMLHttpRequest();

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {

            // Define weather variables.
            let weatherData = JSON.parse(xhr.responseText);
            let location = weatherData.weatherObservation.stationName;
            let temp = weatherData.weatherObservation.temperature;
            let wind = weatherData.weatherObservation.windSpeed;
            let windDirection = weatherData.weatherObservation.windDirection;

            // Get the Heading ( N, NE, E, SE, S, SW, W, NW )
            let heading = calculateHeading(windDirection);

            // Convert Temp from Celsius to Fahrenheit
            let tempFar = 0.00;
            tempFar = (9/5 * temp) + 32;

            // Call the formatTotal method on the Fahrenheit temperature.
            tempFar = formatTotal(tempFar);

            // Displays the results in the DIV labeled results.
            document.getElementById("results").innerHTML =

                "<table id='resultsTable'>" +

                "<tr><th>Location</th>" +
                "<td>" + location + "</td></tr>" +

                "<tr><th>Temperature</th>" +
                "<td id= 'tempOut'>" + tempFar + "* F</td></tr>" +

                "<tr><th>Wind Speed / Direction</th>" +
                "<td id='windOut'>" + wind + " mph, " + heading + "</td></tr>" +

                "</table>";

            // If temperature is above 83 degrees Fahrenheit, display sun icon.
            if (tempFar >= 83) {
                document.getElementById("tempOut").innerHTML =
                    "<tr><td id= 'tempOut'>" + tempFar + "* F" + "</td>" +
                    "<td><img src='./resources/images/sun.png' id='sunImage'/></td></tr>";
            }

            // If wind is above 15mph, display a wind icon.
            if (wind >= 15) {
                document.getElementById("windOut").innerHTML =
                    "<td>" + wind + " mph, " + heading + "</td>" +
                    "<td><img src='./resources/images/wind.png' id='windImage'/></td></tr>";
            }
        }
    }
    xhr.send(null);
}

/**
 * Format the temperature to two decimal places at the end.
 * @param amount The amount to format.
 * @returns {string} The formatted amount.
 */
const formatTotal = amount => {

    // Limit to two decimal places at the end.
    amount = Number(amount.toFixed(2));

    return amount.toString();
}

/**
 * Determines the Heading of the wind. ( N, NE, E, SE, S, SW, W, NW )
 * @param windDirection
 * @returns {string|*}
 */
const calculateHeading = windDirection => {

    if (windDirection >= 0 && windDirection <= 22.4) {
        heading = "North"
    } else if (windDirection >= 22.5 && windDirection <= 67.4) {
        heading = "North East"
    } else if (windDirection >= 67.5 && windDirection <= 112.4) {
        heading = "East"
    } else if (windDirection >= 112.5 && windDirection <= 157.4) {
        heading = "South East"
    } else if (windDirection >= 157.5 && windDirection <= 202.4) {
        heading = "South"
    } else if (windDirection >= 202.5 && windDirection <= 247.4) {
        heading = "South West"
    } else if (windDirection >= 247.5 && windDirection <= 292.4) {
        heading = "West"
    } else if (windDirection >= 292.5 && windDirection <= 337.4) {
        heading = "North West"
    }
    return heading;
}