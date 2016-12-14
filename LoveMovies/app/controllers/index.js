
function openSearch(){
  var searchController = Alloy.createController('search');
  searchController.getView().open();
}

function openFavorite(){
  var favoritesController = Alloy.createController('favorites');
  favoritesController.getView().open();
}

function openTheaters(e){
  var theatersController = Alloy.createController('theaters');
  theatersController.getView().open();
}

function openShare(e){
}

$.index.open();
