// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function searchMovie(){
	var movieStr = $.searchField.value;

	if(movieStr){
		var xhr = Ti.Network.createHTTPClient();
		xhr.onerror = function(e){
			alert(e);
		}
		xhr.onload = function(){
			var filmes = JSON.parse(this.responseText).results;

		  var rows = [];

		  for (var i = 0; i < filmes.length; i++) {
		    var filme = filmes[i];

		    var row = Ti.UI.createTableViewRow({
        id: filme.id
    		});

		    var view = Ti.UI.createView({
		      width: Ti.UI.FILL,
		      height: Ti.UI.SIZE,
		      layout: 'horizontal'
		    });

		    var image = Ti.UI.createImageView({
		      height: 96,
		      width: 72,
		      left: 5,
		      top: 5,
		      bottom: 5,
		      image: 'https://image.tmdb.org/t/p/w150'+filme.poster_path
		    });


		    view.add(image);

		    var viewDados = Ti.UI.createView({
		      height: Ti.UI.SIZE,
		      width: Ti.UI.SIZE,
		      layout: "vertical"
		    });

		    var tituloLabel = Ti.UI.createLabel({
		      top:5,
		      left:5,
		      text: filme.title
		    });

				var date = filme.release_date.split("-");
		    var anoLabel = Ti.UI.createLabel({
		      top:5,
		      left:5,
		      text: date[0]
		    });

		    viewDados.add(tituloLabel);
		    viewDados.add(anoLabel);
		    view.add(viewDados);
		    row.add(view);

		    rows.push(row);
		  }
			//Adiciona as linhas a tabela de resultado
		  $.myTableView.data = rows;
			//Chama a tela de detalhe do filme
			$.myTableView.addEventListener('click', function(e) {
				var args = {
						 id: e.rowData.id
				};
				var movieId = e.rowData.id;
				var ctrl = Alloy.createController('movieDetail', args);
				ctrl.getView().open();
			});
		}
		xhr.open('GET','https://api.themoviedb.org/3/search/movie?api_key=254b6d39f66ccff22425d480750146eb&language=pt-BR&query='+movieStr);
		//xhr.open('GET','http://www.omdbapi.com/?s='+movieStr+'&y=&plot=short&r=json');
		xhr.send();
	}else{
		alert("Digite um filme!")
	}
}
$.searchViewImage.addEventListener("click",searchMovie);
$.search.open();
