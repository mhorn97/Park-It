var storage;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
    storage = window.localStorage;
}

function onDeviceReady() {

    //Load the correct stylesheet
    if(cordova.platformid == 'ios'){

        $('head').append('<link rel="stylesheet" href="css/park-it-ios.css" type="text/css" />');

        //prevents status bar from overlaying web view
        window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    } else{
        $('head').append('<link rel="stylesheet" href="css/park-it-android.css" type="text/css" />');
        window.StatusBar.backgroundColorByHexString("#1565C0");
    }
}

$("#park").click(function () {

    alert("Set parking location");
    setParkingLocation();

});

$("#retrieve").click(function () {

    alert("Get parking location");

});

$("#gotIt").click(function () {

    $("#instructions").hide("fast", function () {

    });

});

$("#find").click(function () {
    getParkingLocation();
})



function initMap() {
    var position = {lat: 47.318561, lng: -122.22567};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: position,
        mapTypeId: 'hybrid',
    });

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    /*var marker = new google.maps.Marker({
        position: position,
        map: map
    });*/
}

function setParkingLocation() {
    navigator.geolocation.getCurrentPosition(setParkingLocationSuccess,setParkingLocationError, { enabledHighAccuracy: true});
}

function setParkingLocationSuccess(position) {
    latitude = position.coords.latitude;
    storage.setItem("parkedLatitude", latitude);

    //Add statements to store the longitude
    longitude = position.coords.longitude;
    storage.setItem("parkedLongitude", longitude);

    //Display an alert that shows the latitude and longitude
    //Use navigator.notification.alert(msg)

    showParkingLocation();
}

function setParkingLocationError(error) {
    navigator.notification.alert("Error Code: " + error.code +
    "\nError Message: " + error.message);
}

function showParkingLocation() {
    /*navigator.notification.alert("You are parked at Lat: " +
    storage.getItem("parkedLatitude")
        + ", Long: " + storage.getItem("parkedLongitude"));*/

    //hide directions and instructions
    $("#instructions").hide();
    $("#directions").hide();

    var latLong = new google.maps.LatLng(latitude.longitude);
    var map = new google.maps.Map(document.getElementById('map'));

    map.setZoom(16);
    map.setCenter(latLong);
    var marker = new google.maps.Marker({
        position:latLong,
        map:map
    });
}

function getParkingLocation()
{
    navigator.geolocation.getCurrentPosition(getParkingLocationSuccess,
        getParkingLocationError, {enableHighAccuracy:true});
}

function getParkingLocationSuccess(position)
{
    currentLatitude = position.coords.latitude;
    currentLongitude = position.coords.longitude;
    parkedLatitude = storage.getItem("parkedLatitude");
    parkedLongitude = storage.getItem("parkedLongitude");

    showDirections();
}

function showDirections()
{
    var dRenderer = new google.maps.DirectionsRenderer;
    var dService = new google.maps.DirectionsService;
    var curLatLong = new google.maps.LatLng(currentLatitude,
        currentLongitude);
    var parkedLatLong = new google.maps.LatLng(parkedLatitude,
        parkedLongitude);
    var map = new google.maps.Map(document.getElementById("map"));
    map.setZoom(16);
    map.setCenter(curLatLong);
    dRenderer.setMap(map);
    dService.route({
        origin: curLatLong,
        destination: parkedLatLong,
        travelMode: 'DRIVING',
    }, function(response, status){
        if(status == 'OK'){
            dRenderer.setDirections(response);
            $('#directions').html('');
            dRenderer.setPanel(document.getElementById('directions'));
        } else{
            navigator.notification.alert("Directions failed: " + status);
        }
    });
    $('#map').show();
    $('#directions').show();
    $('#instructions').hide();
}

function getParkingLocationError(error)
{
    navigator.notification.alert("Error Code: " + error.code
    + "\nError Message: " + error.message);
}

$("document").ready(init);