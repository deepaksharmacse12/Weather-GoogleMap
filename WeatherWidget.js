var BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
var UrlParams = "&units=imperial&type=accurate&mode=json";
var IMG_URL = "http://openweathermap.org/img/w/";
var latitude;
var longitude;
/*
	Getting weather data from openweathermap
*/

function getCurrentWeatherData() {
   var WeatherNowAPIurl = BASE_URL + "lat=" + latitude + "&lon=" + longitude + UrlParams;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var JSONobj = JSON.parse(xmlhttp.responseText);
			Parse(JSONobj);
		}
	};
	xmlhttp.open("GET", WeatherNowAPIurl, true);
	xmlhttp.send();
}
function Parse(obj) {
	// current Location
	document.getElementById("location").innerHTML = "Country :"
			+ obj.sys.country + "<br>" + "City :" + obj.name + "<br>"
			+ "Latitude:" + obj.coord.lat + "<br>" + "Longitude:"
			+ obj.coord.lon + "<br>";

	// current weather
	document.getElementById("weatherNow").innerHTML = "<img src='" + IMG_URL
			+ obj.weather[0].icon + ".png'> " + "<br> Condition:"
			+ obj.weather[0].description + "<br>" + "Temp:" + obj.main.temp
			+ " F<br>" + "Humidity:" + obj.main.humidity + " hPa <br>"
			+ "Cloudiness:" + obj.clouds.all + "% <br>" + "Wind:"
			+ obj.wind.speed + " mps <br>";

}
/*
	USING GOOGLE API
*/
var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      var x = results[0].geometry.location;
	  latitude = x.lat();
	  longitude = x.lng();
	  getCurrentWeatherData();     	
	} else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}