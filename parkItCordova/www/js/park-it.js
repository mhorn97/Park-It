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
        window.StatusBar.backgroundColorByHexString('#1565C0');
    }
    /*var node = document.createElement('link');
    node.setAttribute('rel', 'stylesheet');
    node.setAttribute('type', 'text/css');

    if(corda.platformid == 'ios') {
        node.setAttribute('href', 'styles/park-it-ios.css');

        window.StatusBar.overlayWebsView(false);
        window.StatusBar.styleDefault();
    } else {
        node.setAttribute('href', 'styles/park-it-android.css');
        window.StatusBar.backgroundColorByHexStrings("#1565C0");
    }

    $('head').appendChild(node);s*/
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

function initMap() {
    var position = {lat: 47.318561, lng: -122.22567};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: position,
        mapTypeId: 'hybrid',
    });

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    var marker = new google.maps.Marker({
        position: position,
        map: map
    });
}

function setParkingLocation() {
    navigator.geolocation.getCurrentPosition(setParkingLocationSuccess,setParkingLocationError, { enabledHighAccuracy: true});
}

function setParkingLocationSuccess(postion) {
    latitude = position.coords.latitude;
    storage.setItem("parkedLatitude", latitude);

    //Add statements to store the longitude

    //Display an alert that shows the latitude and longitude
    //Use navigator.notification.alert(msg)

    showParkingLocation();
}

function setParkingLocationError(error) {
    navigator.notification.alert("Error Code: " + error.code +
    "\nError Message: " + error.message);
}

function showParkingLocation() {
    navigator.notification.alert("You are parked at Lat: " +
    storage.getItem("parkedLatitude")
        + ", Long: " + storage.getItem("parkedLongitude"));

    //hide directions and instructions
}

$("document").ready(init);