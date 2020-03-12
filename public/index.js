let mymap = L.map('mapid').setView([51.505, -0.09], 13);
let layerGroup = L.layerGroup().addTo(mymap)

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'sk.eyJ1Ijoic3ZhcnR2YWxwIiwiYSI6ImNrNzBxaDJqOTAxNzkzbXJ5bHZ4ODU1a3AifQ.0hZPzEfBzUq3mmLElVhHIg'
}).addTo(mymap);

const getData = async () => {
    let data = await (await fetch('https://opensky-network.org/api/states/all?time=0', {method : 'GET'})).json()
console.log(data)
grid = new cheetahGrid.ListGrid({
    parentElement: document.querySelector('.grid-sample'),
    header: [
      {field: 'icao', caption: 'icao', width: 150},
      {field: 'name', caption: 'name', width: 150},
      {field: 'longitude', caption: 'longitude', width: 200},
      {field: 'latitude', caption: 'latitude', width: 200},
      {field: 'country', caption: 'country', width: 170},
      {field : 'button', caption : 'Show', width : 100, columnType: 'button',
      action: new cheetahGrid.columns.action.ButtonAction({
        action(rec) {
            layerGroup.clearLayers()
            let marker = L.marker([rec.latitude, rec.longitude]).addTo(layerGroup);
            mymap.setView([rec.latitude, rec.longitude], 13)
        },
      }),
    }
    ],
  }); 
  let records = []
  data.states.forEach(elem => {
    if(elem[5] && elem[6])
    records.push({icao : elem[0], name : elem[1], longitude : elem[5], latitude : elem[6], country : elem[2], button : "Show"} )
  });
   grid.records = records
}
getData()