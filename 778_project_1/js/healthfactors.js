
  
  //create map2 and set zoom
  var map2 = L.map('map2').setView([44.7, -90], 6.5);
  
  var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map2);
  
  
  //color scale for health factors
  function getFactorColor(d) {
    return d > 54   ? '#375881' :
           d > 36   ? '#7095C2' :
           d > 18   ? '#A9BFDA' :
                      '#E2EAF3';
  };
  
  //style for health factors
  function styleFactor(feature) { 
    return {
        fillColor: getFactorColor(feature.properties.HF_RANK_22),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
  };
  
  
//highlight feature
function highlightFeatureHF(e) {
  var layerHF = e.target;

  layerHF.setStyle({
      weight: 3,
      color: '#F29727',
      dashArray: '',
      fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layerHF.bringToFront();

  infoHF.update(layerHF.feature.properties); 
  }
}


//removes highlight
function resetHighlightHF(e) {
  geojsonHF.resetStyle(e.target);
  infoHF.update();
}

//click listener zooms to state
function zoomToFeatureHF(e) {
  map2.fitBounds(e.target.getBounds());
}

//on each feature to enable mouseover, mouseout, and click
function onEachFeatureHF(feature, layerHF) { 
  layerHF.on({
      mouseover: highlightFeatureHF,
      mouseout: resetHighlightHF,
      click: zoomToFeatureHF
  });
}

var geojsonHF;

$.getJSON("data/health_factors.geojson", function(data) {
  geojsonHF = L.geoJSON(data, {
    style: styleFactor,
    onEachFeature: onEachFeatureHF
  }).addTo(map2);});


//add info box
var infoHF = L.control();

infoHF.onAdd = function (map2) {
    this._div = L.DomUtil.create('div', 'infoHF'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoHF.update = function (props) {
    this._div.innerHTML = '<h4>Health Factors Rank</h4>' +  (props ?
        '<b>' + props.COUNTY_NAM + ' County'+ '</b><br />' + props.HF_RANK_22
        : 'Hover over a county');
};

infoHF.addTo(map2);