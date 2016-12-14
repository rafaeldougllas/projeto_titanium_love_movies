// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var Map = require('ti.map');

var latitudeAtual  = null;
var longitudeAtual = null;
Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_HIGH;
Ti.Geolocation.getCurrentPosition(function(e){

   if (e.error)
   {
      alert("Erro ao encontrar sua posição");
   }
   else
   {
     latitudeAtual  = e.coords.latitude;
     longitudeAtual = e.coords.longitude;
   }

});


var cinesArr = [];

var xhr = Ti.Network.createHTTPClient();
xhr.onerror = function(e){
  alert(e);
}
xhr.onload = function(){
  var cinemas = JSON.parse(this.responseText).results;

  for (var i = 0; i < cinemas.length; i++) {
    var cinema = cinemas[i];
    Ti.API.info(cinema.geometry.location.lng);
    Ti.API.info(cinema.name);

    var annotation = Map.createAnnotation({
    	latitude:cinema.geometry.location.lat,
    	longitude:cinema.geometry.location.lng,
    	title: cinema.name,
    	pincolor:Map.ANNOTATION_RED
    });

    cinesArr.push(annotation);
  }
  Ti.API.info("Tamanho: "+cinesArr.length);
  showMap();
}


if(latitudeAtual != null && longitudeAtual != null){
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+latitudeAtual+","+longitudeAtual+"&radius=10000&types=movie_theater&key=AIzaSyDJkB1dNDg9AkEU6yyRhUJJVgRIE86KVMM";
  xhr.open('GET',url);
  //xhr.open('GET','http://www.omdbapi.com/?s='+movieStr+'&y=&plot=short&r=json');
  xhr.send();
}

function showMap(){
  var map = Map.createView({
   mapType:Map.NORMAL_TYPE,
   region:{
     latitude:latitudeAtual,
     longitude:longitudeAtual,
     latitudeDelta:0.1,
     longitudeDelta:0.1,
   },
   animate:true,
   annotations:cinesArr
  });

  $.theaters.add(map);
}
