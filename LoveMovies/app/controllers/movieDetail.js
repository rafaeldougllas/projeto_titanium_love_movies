// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = arguments[0] || {};

var movieId    = args.id;
var linkDetail = "https://api.themoviedb.org/3/movie/"+movieId+"?api_key=254b6d39f66ccff22425d480750146eb&language=pt-BR&append_to_response=videos";

var xhr = Ti.Network.createHTTPClient();
xhr.onerror = function(e){
  alert(e);
}
xhr.onload = function(){
  var filme = JSON.parse(this.responseText);
  $.backgroundImage.image = "https://image.tmdb.org/t/p/w300"+filme.backdrop_path;
  $.imageNormal.image     = 'https://image.tmdb.org/t/p/w150'+filme.poster_path;
  $.title.text = filme.original_title;
  var date = filme.release_date.split("-");
  $.year.text  = date[0];
  $.description.text = filme.overview;



  //ajeitar posição dos itens e colocar o trailer na pagina
  //colocar os detalhes do filme na tela
}
xhr.open('GET',linkDetail);
xhr.send();

function salvar(){
    var movieNameBack = $.title.text;
    movieNameBack = movieNameBack.replace(" ","");
    var backImage = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, movieNameBack+'backgroundImage.png');
    backImage.write($.backgroundImage.image); // write to the file

    var movieNameNormal = $.title.text;
    movieNameNormal = movieNameNormal.replace(" ","");
    var imageNormal = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, movieNameNormal+'imageNormal.png');
    imageNormal.write($.imageNormal.image); // write to the file


    var pathBackgroundImage = backImage.nativePath;
    var pathOfImageNormal   = imageNormal.nativePath;

    var movie = Alloy.createModel('movie', {
    	title:"",
      description:"",
      year:"",
      image:"",
      imageBack:""
    });

    movie.set('title', $.title.text);
    movie.set('description', $.description.text);
    movie.set('year', $.year.text);
    movie.set('image', pathOfImageNormal);
    movie.set('imageBack', pathBackgroundImage);
    movie.save();
    Alloy.Collections.movies.fetch();
    alert("Filme salvo com sucesso!");

    Ti.API.info(pathOfImageNormal);
    setTimeout(function(){ $.movieDetail.close(); }, 2000);

}
