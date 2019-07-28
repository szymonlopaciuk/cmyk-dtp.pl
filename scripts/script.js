mapboxgl.accessToken = 'pk.eyJ1Ijoic3p5bWNpb2xvcCIsImEiOiJKVzMzZnVBIn0.uRSxrsS64Zu8_tx1rUKX4A';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/szymciolop/ciknzzw3u00glaxkit1wuidso',
  center: [20.890756, 52.0784959],
  zoom: 16
});

function _scrollTo(el)
{
  $('html,body').animate(
  {
    scrollTop: $(el).offset().top
  }, 1000);
}

map.on('style.load', function ()
{
  map.addSource("markers",
  {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": [
      {
        "type": "Feature",
        "geometry":
        {
          "type": "Point",
          "coordinates": [20.890756, 52.0784959]
        },
        "properties":
        {
          "title": "CMYK-DTP",
          "marker-symbol": "default_marker"
        }
      }]
    }
  });

  map.addLayer({
    "id": "markers",
    "source": "markers",
    "type": "circle",
    "interactive": true,
    "paint": {
      "circle-radius": 11,
      "circle-color": "#dd0090"
    }
  });
});

map.addControl(new mapboxgl.Navigation());
map.scrollZoom.disable();

map.on('click', function (e) {
    // Use featuresAt to get features within a given radius of the click event
    // Use layer option to avoid getting results from other layers
    map.featuresAt(e.point, {layer: 'markers', radius: 10, includeGeometry: true}, function (err, features) {
        if (err) throw err;
        // if there are features within the given radius of the click event,
        // fly to the location of the click event
        if (features.length) {
            // Get coordinates from the symbol and center the map on those coordinates
          map.flyTo({center: features[0].geometry.coordinates, zoom: 16});
          tooltip.addTo(map);
        }
    });
});


// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function (e) {
    map.featuresAt(e.point, {layer: 'markers', radius: 10}, function (err, features) {
        if (err) throw err;
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    });
});
