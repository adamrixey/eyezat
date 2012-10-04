function initialize() {
	if ( 'geolocation' in navigator) {
	} else {
	  alert( "I'm sorry, but geolocation services are not supported by your browser." );
		return null;
	}

	var elLat = document.getElementById( 'latitude' );
	var elLong = document.getElementById( 'longitude' );

	// if latitude not provided, then get latitude and longitude from browser
	if ( elLat.innerHTML == '' ) {
		navigator.geolocation.getCurrentPosition( function( pos ) {
			elLat.innerHTML = pos.coords.latitude.toFixed( 5 );
			elLong.innerHTML = pos.coords.longitude.toFixed( 5 );
			genLink();
			drawMap();
		} );
	} else {
		drawMap();
	}

}

function genLink() {
	var fLat = parseFloat( document.getElementById( 'latitude' ).innerHTML );
	var fLong = parseFloat( document.getElementById( 'longitude' ).innerHTML );
	var link = geoJamCompress( fLat, fLong );
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

function drawMap() {
	var elLat = document.getElementById( 'latitude' );
	var elLong = document.getElementById( 'longitude' );

	var fLat = parseFloat( elLat.innerHTML );
	var fLong = parseFloat( elLong.innerHTML );

	var mapLatLng = new google.maps.LatLng( fLat, fLong );

	var elMap = document.getElementById( 'map_canvas' );

  var mapOptions = {
    center: mapLatLng,
    zoom: parseInt( elMap.getAttribute( 'data-zoom' ) ),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map( elMap, mapOptions );

	var marker = new google.maps.Marker( {
		position: mapLatLng,
		map: map,
		title: 'eyez.at this location'
	} );
}