var Markers = {

    drawMarkers: function(callback) {

    	var request = $.ajax({
            url: "./leaflet/Json/countrytowers.json",
            method: "GET",
            contentType: "application/json",
            dataType: "json"
        });

        request.done(function(data) {
            var geoPositions = [];
            $.each(data, function(index, place) {
                var marker = {
                    "type": 'Feature',
                    "geometry": {
                        "type": 'Point',
                        "coordinates": [place.lat, place.lang]
                    },
                    "properties": {
                        "title": place.title,
                        "description": place.description,
                        'marker-color': '#660000',
                        'marker-size': 'large',
                        'marker-symbol': ''
                    },
                    "icon": {
                        "className": place.radius
                    }
                };
                geoPositions.push(marker);
            });
            callback(geoPositions);
        });

        request.fail(function(jqXHR, textStatus) {
        	var geoPositions = [];
            callback(geoPositions);
        });
    },

    drawMarkersByLocations: function(longitude, latitude, callback) {

        var request = $.ajax({
            url: "./leaflet/Json/placetowers.json",
            method: "GET",
            contentType: "application/json",
            dataType: "json"
        });

        request.done(function(data) {
            var geoPositions = [];
            $.each(data, function(index, place) {
                var marker = {
                    "type": 'Feature',
                    "geometry": {
                        "type": 'Point',
                        "coordinates": [place.lat, place.lang]
                    },
                    "properties": {
                        "title": place.title,
                        "description": place.description,
                        'marker-color': '#fa0',
                        'marker-size': 'large',
                        'marker-symbol': ''
                    },
                    "icon": {
                        "className": place.radius
                    }
                };
                geoPositions.push(marker);
            });
            callback(geoPositions);
        });

        request.fail(function(jqXHR, textStatus) {
            var geoPositions = [];
            callback(geoPositions);
        });
    },

    getLatLang: function(LatLangs, callback) {
        console.log("LatLangs",LatLangs);
        var Positions = [];
        $.each(LatLangs[0], function(index, place) {
            var jsonObj = {
                "lat": place.lat,
                "lng": place.lng
            };
            Positions.push(jsonObj);
        });
        callback(Positions);
    },

    postData:function(json, callback) {
        var request = $.ajax({
            url: "http://localhost/LeafletMap(LeonardoVargas)/",
            method: "POST",
            data:json
        });

        request.done(function(res) {
            callback(null,res);
        });

        request.fail(function(jqXHR, textStatus) {
            console.log("error",textStatus);
            callback(textStatus,null);
        });
    }

};