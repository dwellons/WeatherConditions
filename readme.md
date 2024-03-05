## Project 2 - JS API's and Data - Darin Wellons

### Project Images
![Start Page](resources/images/WeatherConditionsStart.png)
![Results Example](resources/images/WeatherConditionsResults.png)

#### Objectives:
* Event Handling
* JSON Data
* API Consumption
* XMLHttpRequest (xhr)
* Asynchronous event handling

#### Project Details:
* Create a page that allows a user to enter a zip code. Based on the zip code, the application will
render weather data from http://www.geonames.org/.

* Create a free account on http://www.geonames.org/ that allows for api access

* Change your http://www.geonames.org/ account to allow for free service requests

* Create page that has an input field for a zip code along with a "Get Weather" button

* The "Get Weather" button will search http://www.geonames.org/ based on the user-
entered zip code. 

* The goal of the zip code based search is to determine the latitude and
longitude (use http://api.geonames.org/postalCodeSearchJSON) of the selected zip code
as well as grab the city name. 

* This request will require you to pass your the following
parameters via the querystring:
postalcode - the value will match the user-entered value
username - your geonames api account username
countryCode - US

* Once you have retrieved the latitude and longitude coordinates, you can then make an
additional request to http://www.geonames.org/. 

* The follow-up request (use http://api.geonames.org/findNearByWeatherJSON) will gather a weather observation that
includes temperature and wind information. 

* This request will require you to pass your the
following parameters via the querystring:
lat - the value will retrieved from your first request to the geonames api
lng - the value will retrieved from your first request to the geonames api
username - your geonames api account username

* The temperature reading is in Celsius. You should convert the temperature to Farenheit. 

* If the Farenheit temperature is 34° or colder, you should add a cold icon to the ouput (next to the temperature). 

* If the Farenheit temperature is 83° or warmer, you should add a hot icon
to the output (next to the temperature).

* If wind conditions are greater than 15 mph., you should a wind icon next to the wind
conditions.

### How the application works
* The user will input a zip code. Clicking "View Current Conditions" will call the method to fetch zip code
(fetchZipCode).
* This method (fetchZipCode) will verify that the user has entered a 5 digit zip code. If there is a letter, an alert
  will pop up, that includes an example of a zip code. It then passes the zip code (inputZipCode) to the method that determines the location of that zip code (getLocation).
* This method (getLocation) will send the input zip code to the URL that will return the location of that zip code in a latitudinal and longitudinal value. The method well take those values and send them to the method that gets the weather for that location (getWeather).
* The method that gets the weather conditions (getWeather) receives the latitude and longitude values, and sends them to the URL that will return the weather data. 
* The method takes those results stores them into variables. For the temperature, we have to call the method that will convert the temperature from a Celsius value into a Fahrenheit value (formatTotal). 
* For the wind direction, we have to call the method that will calculate a Heading (calculateHeading) ( N, NE, E, SE, S, SW, W, NW ) based on the degree value the wind direction is returned in. (0-360 degrees).
* The results are then displayed in a table to the user.

### How I calculated the Heading
* The heading value is returned as a degree value, with the possibility of 0-360 degrees. I know that 0 degrees is North, 90 degrees is east, 180 degrees is south and 270 degrees is west. I found the value for the remaining main headings (NE, SE, SW, NW). Knowing these values, I can determine a degree range each value has, and divide them evenly throughout the 0-360 degree range. 

### What did I Learn?
* Javascript Event Handling
* Performing API Requests
* Working with JSON Data
* Working with Asynchronous Requests

### Resources Used
* CC0 Public Domain Background image source:
https://pxhere.com/en/photo/564739

* REGEX 5 digit zip code
https://regexlib.com/UserPatterns.aspx?authorId=26c277f9-61b2-4bf5-bb70-106880138842&AspxAutoDetectCookieSupport=1

* Celsius to Fahrenheit Conversion Formula
  https://gmatclub.com/forum/the-formula-f-9-5-c-32-gives-the-relationship-between-the-temperatu-257565.html

* Knots to MPH
  https://www.cruisecritic.com/articles/knots-to-mph-how-fast-is-a-knot-and-more-questions

* Weather Icons Attribute:
Copy this link and paste it wherever it’s visible, close to where you’re using the image. If that’s not possible, place it at the footer of your website, blog or newsletter, or in the credits section.

<a href="https://www.flaticon.com/free-icons/wind" title="wind icons">Wind icons created by Freepik - Flaticon</a>

* Weather Icons Attribute:
  Copy this link and paste it wherever it’s visible, close to where you’re using the image. If that’s not possible, place it at the footer of your website, blog or newsletter, or in the credits section.

<a href="https://www.flaticon.com/free-icons/sun" title="sun icons">Sun icons created by Good Ware - Flaticon</a>

* Weather Icons Attribute:
  Copy this link and paste it wherever it’s visible, close to where you’re using the image. If that’s not possible, place it at the footer of your website, blog or newsletter, or in the credits section.

<a href="https://www.flaticon.com/free-icons/cold" title="cold icons">Cold icons created by kmg design - Flaticon</a>



