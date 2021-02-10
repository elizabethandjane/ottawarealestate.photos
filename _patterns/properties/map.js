(function () {
  "use strict";
  const mapElem = document.getElementById("map");

  if (!mapElem) {
    return;
  }

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode(
    {
      address: PROPERTY_ADDRESS,
    },
    function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        const map = new google.maps.Map(mapElem, {
          zoom: 17,
          center: results[0].geometry.location,
          mapId: "7f238eb041e7e77c",
        });
        new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
        });
      }
    },
  );
})();
