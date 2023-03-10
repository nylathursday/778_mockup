/* GOALS
      understand code DONE YAY
      move health outcomes variable outside of this js DONE YAY
      simplify/re-write js where applicable
      Create year selection?  <-- YOU ARE HERE
      create one for each factor
      Create buttons or tabs to change factors?*/

      //create slider thorugh years first, THEN xxxxx


//would it be better to do all the maps in one js?
//don't understand where healthOutcomes is being called in...
//having trouble understanding the (e) and (feature) use
//add buttons or tabs for different topics
//add drop down for years

//create maps and set zoom
var map = L.map('map').setView([44.7, -90], 6.5);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var layerControl = L.control.layers().addTo(map);  use this is want to make check box

//creating the function
//color scale for health outcomes
function getOutcomeColor(d) {
  return d > 54   ? '#3C6754' :
         d > 36   ? '#72AC93' :
         d > 18   ? '#B2D2C4' :
                    '#F2F7F5';
};


//
//style for health outcomes
function styleOutcome(feature) { //is feature referring to "feature" in healthOutcomes variable? //feature is placeholder
  return {
      //fill color calls the getOutcomeColor function by the properties of the HO.RANK22
      fillColor: getOutcomeColor(feature.properties.HO_RANK_22),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '5',
      fillOpacity: 0.8
  };
};

//highlight feature
function highlightFeatureHO(e) {
  var layerHO = e.target;  //e.target = event object p. 106

  layerHO.setStyle({ //style of the highlight color
      weight: 3,
      color: '#F29727',
      dashArray: '',
      fillOpacity: 0.7
  });

  // puts the highlight on top
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layerHO.bringToFront();

  infoHO.update(layerHO.feature.properties);
  }
};



//removes highlight 
function resetHighlightHO(e) {
  geojsonHO.resetStyle(e.target);
  infoHO.update();
};

//click listener zooms to state
function zoomToFeatureHO(e) {
  map.fitBounds(e.target.getBounds());
}

//this makes the above functions happen
//mouseover highlights feature, mouseout resests from highight, click zooms to feature
function onEachFeatureHO(feature, layerHO) {
  layerHO.on({
      mouseover: highlightFeatureHO,
      mouseout: resetHighlightHO,
      click: zoomToFeatureHO
  });
};



var geojsonH0;

$.getJSON("data/health_outcomes.geojson", function(data) {
  geojsonHO = L.geoJSON(data, {
    style: styleOutcome, //telling it to use styleOutcome function for style
    onEachFeature: onEachFeatureHO //telling it to use the oneEachFeatureHO function to update
  }).addTo(map);}); // add to map here

// var geojsonHO = L.geoJson(healthOutcomes, {
//   style: styleOutcome, //telling it to use styleOutcome function for style
//   onEachFeature: onEachFeatureHO //telling it to use the oneEachFeatureHO function to update
// }).addTo(map); // add to map here


//add info block
var infoHO = L.control();

//not sure what's happening here.....
infoHO.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'infoHO'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
infoHO.update = function (props) {
  
  this._div.innerHTML = '<h4>Health Outcome Rank</h4>' +  (props ?
        '<b>' + props.COUNTY_NAM + ' County'+ '</b><br />' + props.HO_RANK_22
        : 'Hover over a county');

     /* if (props){
        var content = '<b>' + props.COUNTY_NAM + ' County'+ '</b><br />' + props.HO_RANK22
      }
      else{
        'Hover over a county'
      }*/
};

infoHO.addTo(map); //adding pop up to map


// //create time slider, BUT need to change based on inputs....
// //Can I make it to change both maps in question?
// var timeSelection = L.control.timelineSlider({
//   timelineItems: ["2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014"]
//   //call updatePropSymbols every time slider moves
//   // changeMap: updatePropSymbols
// })
// .addTo(map);


// //edit to be button and filter
// //create control - this 
// function createFilter(map, healthOutcomes) {
//   //remove existing control
//   $(".year-control-container").remove();
//   //extend controls to a button
//   var yearSelection = L.Control.extend({
//     options: {
//       position: "bottomleft",
//     },
//     onAdd: function(map) {
//       //create the control container with class name from above
//       var container = L.DomUtil.create("div", "year-control-container");

//       $(container).append("Choose Year");

//       return container
//     },
//   });
//   map.addControl(new yearSelection());

//   };

// createFilter(map, healthOutcomes);




// testing to add to map
// function createDropdownHO(feature){
//   healthOutcomes.features.forEach(function(feature){
    
//   })
// }


//testing to add
// var dropDownHO = L.control({position:'topleft'});

// dropDownHO.onAdd = function(map) {
//   var div = L.DomUtil.create('div', 'dropDownHO');
// }



//or some sort of filter for each year?


//create slider in each map
//make slider go through columns
//drop down




//create search to search for specific counties

//add title and heading info
//video and turn in