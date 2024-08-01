let map, popup, Popup;
const citymap = {
  city: {
    center: coordinate,
    population: 2714856,
  },
 
};
async function initMap() {

    let myLatlng; 
    if(typeof(coordinate) == 'undefined')
    {
      myLatlng = {lat:19.0760,lng:72.8777};
    }
    else
    {
      myLatlng= coordinate;
    }
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 6,
      center: myLatlng,
    });
    console.log(list)
    const contentString =  `<h1 id="firstHeading" class="firstHeading">${list}</h1><p>Exact location provided after booking</p>`;
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: "Uluru",
    });

    const marker = new google.maps.Marker({
      position: myLatlng,
      map,
    
      title: "Click to zoom",
    });
   
    map.addListener("center_changed", () => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(() => {
        map.panTo(marker.getPosition());
      }, 3000);
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map,
      });
    });
    
    for (const city in citymap) {
      // Add the circle for this city to the map.
      const cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: citymap[city].center,
        radius: Math.sqrt(citymap[city].population) * 100,
      });
    }
    // Remove the listener.

  }

  window.initMap = initMap;