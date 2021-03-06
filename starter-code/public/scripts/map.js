function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13
  });

  var input = document.getElementById('searchField');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    var place = autocomplete.getPlace();
    $('#flags').show();
    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location
    });

    marker.setVisible(true);

    $(".flag").click(function(e){
      e.preventDefault();
      var flagName = $(this).attr("name");
      var newBeach = {
        name: name,
        flag: flag
      };

      $.ajax({
        url: "/beach",
        method: "POST",
        data: {beachName: name.name, flag: flag}
      });

    document.getElementById('place-name').textContent = place.name;
    document.getElementById('place-id').textContent = place.place_id;
    document.getElementById('place-address').textContent =
        place.formatted_address;
    infowindow.setContent(document.getElementById('infowindow-content'));
    infowindow.open(map, marker);
  });
}

