"use strict";

let latsList = [];
let lngsList = [];

let parksData = {
  "parks": [
    {
      "fullName": "Boston African American National Historic Site",
      "description": "Centered on the north slope of Beacon Hill, the African American community of 19th century Boston led the city and the nation in the fight against slavery and injustice. These remarkable men and women, together with their allies, were leaders in the Abolition Movement, the Underground Railroad, the Civil War, and the early struggle for equal rights and education.",
      "latitude": "42.35908295",
      "longitude": "-71.06764181"
    },
    {
      "fullName": "Blackstone River Valley National Historical Park",
      "description": "The Blackstone River powered America's entry into the Age of Industry. The success of Samuel Slater's cotton spinning mill in Pawtucket, RI touched off a chain reaction that changed how people worked and where they lived, and continues to reverberate across the nation to this day. Come visit and see how this revolution transformed the landscape of the Blackstone Valley and then the United States.",
      "latitude": "41.8775792791768",
      "longitude": "-71.3824339450125"
    },
    {
      "fullName": "Lowell National Historical Park",
      "description": "Discover the Continuing Revolution. Lowell’s water-powered textile mills catapulted the nation – including immigrant families and early female factory workers – into an uncertain new industrial era. Nearly 200 years later, the changes that began here still reverberate in our shifting global economy. Explore Lowell, a living monument to the dynamic human story of the Industrial Revolution.",
      "latitude": "42.6455371",
      "longitude": "-71.31588673"
    }
  ]
};

window.addEventListener("DOMContentLoaded", function () {
  let popupTemplate = document.querySelector("#template-infowindow").innerHTML;
  let compiledPopUpTemplate = Handlebars.compile(popupTemplate);
  let map = L.map("map_container");
  map.setView([0, 0], 2);

  var attributionHtml =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  let tileLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
    attribution: attributionHtml,
  });

  tileLayer.addTo(map);
  let markersLayer = new L.LayerGroup();

  for (let place of parksData.parks) {
    console.log(place);
    latsList.push(place.latitude);
    lngsList.push(place.longitude);
    let latlng = [place.latitude, place.longitude];
    let popupHTML = compiledPopUpTemplate(place);
    let marker = L.marker(latlng);
    marker.bindPopup(popupHTML);
    markersLayer.addLayer(marker);
  }
  markersLayer.addTo(map);
  let padding = 0.5;
  map.fitBounds([
    [Math.min(...latsList) - padding, Math.min(...lngsList) - padding],
    [Math.max(...latsList) + padding, Math.max(...lngsList) + padding],
  ]);
});
