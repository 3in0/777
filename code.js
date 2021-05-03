
let placeData = {

	"place-sydney": [ 30, 17, [ -33.852009320212574, 151.2106275558472 ] ],
	"place-ny":[ -60, 17, [ 40.645822005980314, -73.76385927200319 ] ],
	"place-tokyo": [ -120, 18, [ 35.54487645833408, 139.7745090723038] ],

}

function gotoplace(e) {

	let aKey = e.srcElement.id;
	let someData = placeData[ aKey ];

	if ( window.noscale )
		truescale();

	window.rot = someData[ 0 ];
	window.map.panTo( someData[ 2 ] );
	window.map.setZoom( someData[ 1 ] );

	scaleimg();

}

function rotr() {

	window.rot += 15;

	scaleimg();

}

function rotl() {

	window.rot -= 15;

	scaleimg();

}

function truescale() {

	window.noscale = !window.noscale;

	scaleimg();

	if ( window.noscale )
		document.getElementById( "true-scale" ).innerHTML = "True Scale";
	else 
		document.getElementById( "true-scale" ).innerHTML = "Enlarged Scale";

}

function mppx() {
	let metersPerPx =
		(156543.03392 * Math.cos((map.getCenter().lat * Math.PI) / 180)) /
		Math.pow(2, map.getZoom());

	return metersPerPx;

}

function scaleimg() {

	let aMppx = mppx();

	let scale = 0.1 / aMppx;

	if ( window.noscale )
		scale = 0.5;

	let rotation = window.rot || 0;

	plane.style.transform = `translate(-50%,-50%) rotate(${rotation}deg) scale(${scale})`;

}


document.addEventListener("DOMContentLoaded", function (event) {

	let map = L.map("map", {
		center: [42.36, -71.041],
		zoom: 15
	});

	L.tileLayer(
		"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
		{
			maxZoom: 19,
			attribution:
				"Source: Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
		}
	).addTo(map);

	window.map = map;
	window.noscale = true;
	window.rot = 0;

	document.getElementById( "rotate-right" ).onclick = rotr;
	document.getElementById( "rotate-left" ).onclick = rotl;
	document.getElementById( "true-scale" ).onclick = truescale;

	document.getElementById( "place-ny" ).onclick = gotoplace;
	document.getElementById( "place-sydney" ).onclick = gotoplace;
	document.getElementById( "place-tokyo" ).onclick = gotoplace;

	map.on('zoomend', function() {
		scaleimg();
	});

});