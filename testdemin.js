/////////////////////////////// PREPARATION DE LA CARTOGRPAHIE //////////////////////////////////////////////////////////////////////////////////////////////////////////
nombre_de_partie = 0; 
var map = L.map('map',{
  minZoom: 12,
  maxZoom: 14
});
//Initialisation d'un objet map qui sera affiché dans la divave l'id  map
//var osmUrl= 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmUrl= 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
//la variable osmUrl contient l'url qui va nous permettre de récup les images qui constitueront le fond de notre carte

var osmAttrib='Map data c OpenStreetMap contributors';
//la vaiable osmAttrib contient la source de la carte, elle s'affichera en bas à droite de notre carte
var osm = new L.TileLayer(osmUrl, {attribution:osmAttrib}).addTo(map);



/////////////////////////////// PREPARATION DU JEU POUR LANCER UNE PARTIE  //////////////////////////////////////////////////////////////////////////////////////////////////////////

// GESTION DES ICONES 
var iconbomb = L.icon({
  iconUrl: 'images/bombe.png',
  iconSize: [10, 30]
});

// GESTION DES GROUPE
grillebomb = new L.LayerGroup();
map.addLayer(grillebomb);


// GESTION DU NOMBRE DE BOMBE Création de la propriété bombes
console.log(PM10.features)
var comptebomb3 = 10
var comptebomb2 = 4
var comptetot = comptebomb3 + comptebomb2
var nbbombtot = comptetot

var nb_case_ouv = 0

console.log(Object.keys(PM10.features))

// PLACEMENT DES BOMBES
while (comptetot > 0) {
    var keyal = Math.floor(Math.random()* (PM10.features.length - 1) +1);

    //console.log(keyal)
    if ((PM10.features[keyal].properties.Classe == 3 & comptebomb3 > 0) | (PM10.features[keyal].properties.Classe == 2 & comptebomb2 > 0)) {
      if (PM10.features[keyal].properties.Bombnum != 99) {
        PM10.features[keyal].properties.Bombnum = 99
      if (PM10.features[keyal].properties.Classe == 3){
      comptebomb3--
      comptetot--
      }
    else {
      comptebomb2--
      comptetot--
      }
    }
  }
}

// GESTION DES DONNEES
// à modifier faire appelle à un point py pour lancer une requête sur serveur

var def_bomb = L.geoJSON(PM10)

    var test = L.geoJSON(PM10,{
        style : {fillColor : "#FFFFFF",
        weight: 2,
        opacity: 1,
        color: "#CCCCCC",
        fillOpacity: 0.7},
        onEachFeature : actionGeom
      }).addTo(grillebomb)

   

// GESTION DES PANELS bombe
map.createPane('imagebg');
map.getPane('imagebg').style.zIndex = 0.5;
map.fitBounds(test.getBounds());

// DEFINITION DU CHEMIN DES IMAGES
var imageUrl = 'images/bombe.png';
var imageUrl0 = 'images/0.png';
var imageUrl1 = 'images/1.png';
var imageUrl2 = 'images/2.png';
var imageUrl3 = 'images/3.png';
var imageUrl4 = 'images/4.png';
var imageUrl5 = 'images/5.png';
var imageUrl6 = 'images/6.png';
var imageUrl7 = 'images/7.png';
var imageUrl8 = 'images/8.png';
//=================================================================== FONCTIONS =======================================================================================

// ACTION SUR CASE
function actionGeom(feature, layer) {
 // console.log('MES CASES BOMBE A COTEE :' + layer.feature.properties.Bombnum + ' GID : ' + layer.feature.properties.gid);
  num(layer)
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: onclick_case_dem,
      contextmenu : onclick_droit
  });
}

// MISE EN FORME AU SURVOL DE LA SOURIE
function highlightFeature(e) {
  e.target.setStyle({
  weight: 5,
  color: '#666',
  dashArray: '',
  fillOpacity: 0.7
  });
  }
  
  // REMISE EN FORME AU DEPART DE LA SOURIE
  function resetHighlight(e) {
     // e.target.bindPopup('Coucou')
     e.target.setStyle({ 
      weight: 2,
      color: "#CCCCCC"})  
  }

// ACTION LORS D'UN CLIC
function onclick_case_dem(e) {
  decouverte_case(e.target);
  style_analyse(e.target);
  add_image_info(e.target);
  if (e.target.feature.properties.ouvert != true) {
    nb_case_ouv++
  };
  e.target.feature.properties.ouvert = true;
  update_encart(info);
  
  perdu(e.target)
  gagne()
}

// ACTION AU CLICK DROIT
function onclick_droit(e) {
  drapeaux(e.target);
  update_encart(info);
}

////////////////////////////////////////////////// AUTRES FONCTION REALISANT DES ACTIONS LORS D'UN CLIC //////////////////////////////////////////////////////////////////
// Affichage de l'analyse sur une case 
function style_analyse(e) {
  remove_drapeau(e);
  if (e.feature.properties.Classe == 0) {
    e.setStyle({fillColor : "#C6DA4B"})
  } else if (e.feature.properties.Classe == 1) {
    e.setStyle({fillColor : "#FEAB01"})      
  } else if (e.feature.properties.Classe == 2) {
    e.setStyle({fillColor : "#CA1312"})  
  } else if (e.feature.properties.Classe == 3) {
    e.setStyle({fillColor : "#7A318C"})  
  } 
}

// Affichage du numéro/bomb démineur sur une case 
coucheImage = new L.LayerGroup();
grillebomb.addLayer(coucheImage);

function add_image_info (e) {
  if (e.feature.properties.Bombnum == 99) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(coucheImage);
  } else 
  /*if (e.feature.properties.Bombnum == 0) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl0, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(grillebomb);
  }else */
  if (e.feature.properties.Bombnum == 1) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl1, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(coucheImage);
  }else 
  if (e.feature.properties.Bombnum == 2) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl2, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (e.feature.properties.Bombnum == 3) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl3, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (e.feature.properties.Bombnum == 4) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl4, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (e.feature.properties.Bombnum == 5) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl5, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(coucheImage);
  } else
  if (e.feature.properties.Bombnum == 6) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl6, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (e.feature.properties.Bombnum == 7) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl7, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (e.feature.properties.Bombnum == 8) {
    imageBounds = [e.getBounds()];
    L.imageOverlay(imageUrl8, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(coucheImage);
  }else {} 
}

// Affichage de toute les bombes du démineurs
function add_all_img_resultat (feature, layer) {
  if (feature.properties.Bombnum == 99) {
    var imageUrl = 'images/bombe.png',
    imageBounds = [layer.getBounds()];
    var bomb = L.imageOverlay(imageUrl, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(grillebomb);
  }else
  if (feature.properties.Bombnum == 1) {
    imageBounds = [layer.getBounds()];
    L.imageOverlay(imageUrl1, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(coucheImage);
  }else 
  if (feature.properties.Bombnum == 2) {
    imageBounds = [layer.getBounds()];
    L.imageOverlay(imageUrl2, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (feature.properties.Bombnum == 3) {
    imageBounds = [layer.getBounds()];
    L.imageOverlay(imageUrl3, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (feature.properties.Bombnum == 4) {
    imageBounds = [layer.getBounds()];
    L.imageOverlay(imageUrl4, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (feature.properties.Bombnum == 5) {
    imageBounds = [layer.getBounds()];
    L.imageOverlay(imageUrl5, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(coucheImage);
  } else
  if (feature.properties.Bombnum == 6) {
    imageBounds = [layer.getBounds()];
    L.imageOverlay(imageUrl6, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (feature.properties.Bombnum == 7) {
    imageBounds = [layer.getBounds()];
    L.imageOverlay(imageUrl7, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(coucheImage);
  }else
  if (feature.properties.Bombnum == 8) {
    imageBounds = [layer.getBounds()];
    L.imageOverlay(imageUrl8, imageBounds, {opacity : 0.5, pane : 'imagebg'}).addTo(coucheImage);
  }else {}
} 

// Affichage de toute l'analyse de la thématique
function visualisation(Donnees_JSON){

  var Anal=L.choropleth(Donnees_JSON, {
    valueProperty: 'Classe',
    scale: ["#C6DA4B","#FEAB01","#CA1312","#7A318C"],
    steps: 4, // Nombre de classes
    mode: 'q',
    style: {
      weight: 2,
      fillOpacity: 0.8,
      opacity: 1,
      color: "#CCCCCC"
  }
}).addTo(grillebomb).bindPopup(function(layer){
    console.log('numero Bombnum' + layer.feature.properties.Bombnum)
    return('<b> Classe N° ' + layer.feature.properties.Classe + '<br> <b> Moyenne de pollution : '+ Math.round(layer.feature.properties.moy) +' µg/m')});
}

// PLACEMENT DES NUMEROS PROXIMITE BOMBES
function num(bloc){
  //console.log('CLICK SUR :' + bloc.feature.properties.gid);
  if (bloc.feature.properties.Bombnum != 99){
    //console.log('MA CASE :' + bloc.feature.properties.Bombnum + ' GID : ' + bloc.feature.properties.gid);
    var lim = bloc.getBounds();
    var buffer = lim.pad(0.1);
    var nb_bomb = 0;
    def_bomb.eachLayer(function(layer2){
      if (buffer.intersects(layer2._latlngs) == true){

        if (layer2.feature.properties.Bombnum == 99){
          nb_bomb++;
        //  console.log('MES CASES BOMBE A COTEE :' + layer2.feature.properties.Bombnum + ' GID : ' + layer2.feature.properties.gid);
        } 
        bloc.feature.properties.Bombnum = nb_bomb; 
      }
    })
    //console.log('nbre :' + bloc.feature.properties.Bombnum);
  } else {}
}

function decouverte_case(bloc){
  //console.log('CLICK SUR :' + bloc.feature.properties.gid);
  if (bloc.feature.properties.Bombnum == 0){
    console.log('MA CASE SUR CLIC :' + bloc.feature.properties.Bombnum + ' GID : ' + bloc.feature.properties.gid);
    var lim = bloc.getBounds();
    var buffer = lim.pad(0.1);

    test.eachLayer(function(layer2){
      if (buffer.intersects(layer2._latlngs) == true){
        if (layer2.feature.properties.Bombnum != 99 ){
          style_analyse(layer2);
          add_image_info(layer2);
          if (layer2.feature.properties.ouvert != true) {
            nb_case_ouv++
          };
          layer2.feature.properties.ouvert = true;
          update_encart(info);
        }
      }
    })
    //console.log('nbre :' + bloc.feature.properties.Bombnum);
  } else {}
}

// ajout popup pour chaque case
function add_message(e) {
  if (e.target.feature.properties.Bombnum == 99) {
    test.bindPopup('PERDU');
  } else {
    test.bindPopup(function(layer){
      return('<b> Classe N° ' + layer.feature.properties.Classe + '<br> <b> Moyenne de pollution : ' + Math.round(layer.feature.properties.moy) +' mg')});
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ========================================== INTERFACE UTILISATEUR ===============================
// poser des drapeaux
var nbdrap = 0;
var imageUrldrap = 'images/drapeau.png'

function drapeaux(e) {
  if (e.feature.properties.ouvert != true && e.feature.properties.drapeau != true) {
     e.feature.properties.drapeau = true;
     imageBounds = [e.getBounds()];
     e.feature.properties.drap = L.imageOverlay(imageUrldrap, imageBounds, {opacity : 1, pane : 'imagebg'}).addTo(grillebomb);
     nbdrap++
  } else {
    remove_drapeau(e)
  }
}

function remove_drapeau(e){
    if (e.feature.properties.drapeau == true){
    e.feature.properties.drapeau = false
    e.feature.properties.drap.remove(map);
    nbdrap--
  }
}


// control pour montrer le nombre de bombes
  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    update_encart(info);
    return this._div;
  };

update_encart = function (encart) {
    encart._div.innerHTML = '<h2>Nombre de bombes : </h2>' +
      '<b>' + nbdrap + ' / ' + '</b><b>' + nbbombtot + ' bombes supposées </b>' +
      '<br /> <b>' + nb_case_ouv + ' / ' + '</b><b>' + (100 - nbbombtot) + ' cases ouvertes </b>';
  };

  info.addTo(map);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ========================================= PARTIE GAGNEE / PERDUE ======================================

// PARTIE GAGNEE
gagne = function() {
   
    if (nb_case_ouv >= (100-nbbombtot)){
      // enlever la grille du jeu
          alert('ENORME !!!! \nTu as gagné');
          coucheImage.removeFrom(grillebomb);
          coucheImage = new L.LayerGroup();
          grillebomb.addLayer(coucheImage);
            // Affichage grille bombes
            var resultat_bomb = L.geoJSON(PM10,{
              style : {fillColor : "#FFFFFF",
              weight: 2,
              opacity: 1,
              color: "#CCCCCC",
              fillOpacity: 0.1},
              onEachFeature : endgame
          }).addTo(map);  
            // ajouter la couche d'analyse 
          visualisation(PM10)
          test.removeFrom(grillebomb)
      }
}

// PARTIE PERDUE
perdu = function(e) {
  if (e.feature.properties.Bombnum == 99) {    
      // enlever la grille du jeu
      alert('Perdu, retente ta chance !');
      coucheImage.removeFrom(grillebomb);
      coucheImage = new L.LayerGroup();
      grillebomb.addLayer(coucheImage);
        // Affichage grille bombes
        var resultat_bomb = L.geoJSON(PM10,{
          style : {fillColor : "#FFFFFF",
          weight: 2,
          opacity: 1,
          color: "#CCCCCC",
          fillOpacity: 0.1},
          onEachFeature : endgame
      }).addTo(map);
      // ajouter la couche d'analyse 
      visualisation(PM10)
     
      test.removeFrom(grillebomb)      
     }
}

// Fonction pour refaire les numeros puis mettre les images
endgame = function(feature,layer){
  num(layer)
  add_all_img_resultat(feature,layer)
}

x = document.getElementById("myDIV")
x.style.display = "none"

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
