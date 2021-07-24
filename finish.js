mapboxgl.accessToken = 'pk.eyJ1IjoidGhzZGV2ZGV2IiwiYSI6ImNrcmM3NTlsbDMyenAyd3BkZDB0NHJpb2wifQ.gUwVIDwYtX0gH5sS1zXdEQ';

var map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/dark-v10', // style URL
    zoom: 4.9, // starting zoom
    center: [96.43049562982284, 18.907382727974973] // starting position
});

map.on('load', function () {

    map.loadImage(
        'y90x52.png',
        function (error, image) {
            if (error) throw error;

            map.addImage('yellowflag', image);

            map.addSource('yellowFlag', {
                'type': 'geojson',
                'data': {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "description":
                                    '<p>Address: Test</p><p>Phone 09</p>',
                                
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [99.15063826865082, 16.802814403970956]
                            }
                        },

                        {
                            "type": "Feature",
                            "properties": {
                                "description":
                                    '<p>Address: Test</p><p>Phone 09</p>',
                                
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [99.16063826865082, 16.902814403970956]
                            }
                        }
                    ]
                }
            });

            map.addLayer({
                'id': 'yellowFlag',
                'type': 'symbol',
                'source': 'yellowFlag', // reference the data source
                'layout': {
                    'icon-image': 'yellowflag', // reference the image
                    'icon-size': 0.5,
                    'icon-allow-overlap': true,
                    'visibility': "none"
                }
            });

        });

    map.loadImage(
        'w90x52.png',
        function (error, image) {
            if (error) throw error;

            map.addImage('whiteflag', image);

            map.addSource('whiteFlag', {
                'type': 'geojson',
                'data': {
                    "type": "FeatureCollection",
                    "features": [
                        {
                            "type": "Feature",
                            "properties": {
                                "description":
                                    '<p>Address: Test</p><p>Phone 09</p>',
                                
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [96.15063826865082, 16.802814403970956]
                            }
                        },

                        {
                            "type": "Feature",
                            "properties": {
                                "description":
                                    '<p>Address: Test</p><p>Phone 09</p>',
                                
                            },
                            "geometry": {
                                "type": "Point",
                                "coordinates": [96.16063826865082, 16.902814403970956]
                            }
                        }
                    ]
                }
            });

            map.addLayer({
                'id': 'whiteFlag',
                'type': 'symbol',
                'source': 'whiteFlag', // reference the data source
                'layout': {
                    'icon-image': 'whiteflag', // reference the image
                    'icon-size': 0.5,
                    'icon-allow-overlap': true,
                    'visibility': "visible"
                }
            });

        });

});

function showFlag() {
    if (map.getLayer('yellowFlag') && map.getLayer('whiteFlag')) {
        
        var checkBox = document.getElementById('mapCheck');
        

            if(checkBox.checked == true)
            {
               
                var whiteLayer = "whiteFlag";
                var yellowLayer = "yellowFlag";

                var whiteVisibility = map.getLayoutProperty(
                    whiteLayer,
                    'visibility'
                );

                var yellowVisibility = map.getLayoutProperty(
                    yellowLayer,
                    'visibility'
                )

                if (whiteVisibility === 'visible' && yellowVisibility === 'none') {
                    map.setLayoutProperty(
                        whiteLayer,
                        'visibility',
                        'none'
                    );
                    map.setLayoutProperty(
                        yellowLayer,
                        'visibility',
                        'visible'
                    );

                } else {
                    map.setLayoutProperty(
                        whiteLayer,
                        'visibility',
                        'none'
                    );

                    map.setLayoutProperty(
                        yellowLayer,
                        'visibility',
                        'visible'
                    );
                }
            }
            else
            {
           
                var whiteLayer = "whiteFlag";
                var yellowLayer = "yellowFlag";

                var whiteVisibility = map.getLayoutProperty(
                    whiteLayer,
                    'visibility'
                );

                var yellowVisibility = map.getLayoutProperty(
                    yellowLayer,
                    'visibility'
                )

                if (whiteVisibility === 'none' && yellowVisibility === 'visible') {
                    map.setLayoutProperty(
                        whiteLayer,
                        'visibility',
                        'visible'
                    );
                    map.setLayoutProperty(
                        yellowLayer,
                        'visibility',
                        'none'
                    );

                } else {
                    map.setLayoutProperty(
                        whiteLayer,
                        'visibility',
                        'visible'
                    );

                    map.setLayoutProperty(
                        yellowLayer,
                        'visibility',
                        'none'
                    );
                }

            }
        }
    
    }

    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker style
      });
      
      // Add the geocoder to the map
      map.addControl(geocoder);
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());

    map.on('click', 'yellowFlag', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('click', 'whiteFlag', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

