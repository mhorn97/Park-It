var storage;

function init() {
    document.addEventListener("deviceready", onDeviceReady, false);
    storage = window.localStorage;
}

function onDeviceReady() {
    var node = document.createElement('link');
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

    $('head').appendChild(node);s
}

$("#park").click(function () {

    alert("Set parking location");

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