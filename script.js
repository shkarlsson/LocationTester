

var baseMaps = {
	"Ljus": L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVycmthcmxzb24iLCJhIjoiY2p1MW9td3ZpMDNrazQ0cGVmMDltc3EwaSJ9.0h6iBb8t7laIu-xP7YE4CQ', {
		tileSize: 512,
		zoomOffset: -1,
	}),
	"Normal": L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVycmthcmxzb24iLCJhIjoiY2p1MW9td3ZpMDNrazQ0cGVmMDltc3EwaSJ9.0h6iBb8t7laIu-xP7YE4CQ', {
		tileSize: 512,
		zoomOffset: -1,
	}),
	"Satellit": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}),
	"Mörk": L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVycmthcmxzb24iLCJhIjoiY2p1MW9td3ZpMDNrazQ0cGVmMDltc3EwaSJ9.0h6iBb8t7laIu-xP7YE4CQ'),
	"StamenToner": L.tileLayer('http://a.tile.stamen.com/toner/${z}/${x}/${y}.png')
}

var map = L.map('themap', {
	//center: [59.3274541, 18.0543566],
	//zoom: 13,
	layers: [baseMaps['Satellit']],
	zoomControl: false,
}).setView([18.505, 50.09], 13);

L.control.layers(null, baseMaps, {
	position: 'topleft'
}).addTo(map)


function usePosition(e) {
	//L.marker(e.latlng).addTo(map)
	//	.bindPopup("You are within " + radius + " meters from this point").openPopup();
	e.latlng = [e.coords.latitude, e.coords.longitude];

	if (currentLocation.dot) {
		map.removeLayer(currentLocation.dot)
		map.removeLayer(currentLocation.circle)
	}
	currentLocation.dot = L.circle(e.latlng, {
		radius: e.coords.accuracy / 2,
		fillColor: colors.blue100,
		color: colors.blue100,
		weight: .5,
		opacity: 1,
		fillOpacity: 0.05
	}).addTo(map);

	currentLocation.circle = L.circle(e.latlng, {
		radius: 1,
		fillColor: colors.blue100,
		color: colors.blue100,
		weight: 4,
		opacity: 1,
		fillOpacity: 0.8
	}).addTo(map);

}

if (navigator.geolocation) {
	navigator.geolocation.watchPosition(usePosition)
}