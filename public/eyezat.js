var map;
var geocoder;

function initMain() {
	// Check if geolocation available, else redirect
	if ( !( 'geolocation' in navigator ) ) {
		window.location = '/alt';
		return null;
	}

	// Write coordinates
	navigator.geolocation.getCurrentPosition( function( position ) {
		var latitude = position.coords.latitude.toFixed( 5 );
		var longitude = position.coords.longitude.toFixed( 5 );
		document.getElementById( 'coords' ).innerHTML =
			latitude + ' lat, ' + longitude + 'long';
		writeLink( latitude, longitude );
		drawMap( latitude, longitude, 16 );
	} )
}


function initAlt() {
	// Draw anonymous map
	drawMap( '63.0695', '-151.0074', 8 )
}


function initLink() {
	// Draw map
	var fLat = document.getElementById( 'latitude' ).innerHTML;
	var fLng = document.getElementById( 'longitude' ).innerHTML;
	drawMap( fLat, fLng, 13 );
}


function writeLink( lat, lng ) {
	var link = geoJamCompress( parseFloat( lat ), parseFloat( lng ) );
	document.getElementById( 'link' ).innerHTML =
		'<a href="/' + link + '">eyez.at/' + link + '</a>';
}


function geoJamCompress( fLat, fLong ) {
	return toBase62( fLat ) + toBase62( fLong );
}


function toBase62( cord ) {
	var base62set = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
		result = [];

	// ensure positive and 5 base62 characters for consistancy
	//   The lowest value -180.0 must be add shifted over 147.8 to get
	//   5 base62 numbers instead of just 4.  The add shift must be at
	//   least 180 + 147.7.  Simplify with a 360.0 add shift.  This will
	//   not cause the max value +180.0 to need more than 5 base62 characters.
	cord = cord + 360.0;

	// convert to decimal-less units
	cord = parseInt( cord * 100000 );

	// convert each base10 to base62 with fixed characters
	while ( cord >= 62 ) {
		remainder = cord % 62;
		cord = parseInt( cord / 62 );
		// cord, remainder = cord.divmod( 62 )
		result.push( base62set[ remainder ] );
	}
	result.push( base62set[ cord ] );

	// return reverse string result
	return result.reverse().join('');
}


function drawMap( lat, lng, zoom ) {
	var fLat = parseFloat( lat ),
	    fLng = parseFloat( lng );

	var mapLatLng = new google.maps.LatLng( fLat, fLng );

	var elMap = document.getElementById( 'map_canvas' );

  var mapOptions = {
    center: mapLatLng,
    zoom: zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(
		document.getElementById( 'map_canvas' ),
		mapOptions
	);

	var marker = new google.maps.Marker( {
		position: mapLatLng,
		map: map,
		title: 'eyez.at this location'
	} );
}


function showAddress( address ) {
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': address }, function( results, status ) {
		if ( status == google.maps.GeocoderStatus.OK ) {
			map.setCenter( results[ 0 ].geometry.location );
			map.setZoom( 12 );
			var marker = new google.maps.Marker( {
				map: map,
				position: results[ 0 ].geometry.location
			} );
			var lat = results[ 0 ].geometry.location.Xa.toFixed( 5 );
			var lng = results[ 0 ].geometry.location.Ya.toFixed( 5 );
			document.getElementById( 'coords' ).innerHTML =
				lat + ' lat, ' + lng + ' long';
			writeLink( lat, lng );
		} else {
			alert( "Search was unsuccessful: " + status );
		}
	} );
}