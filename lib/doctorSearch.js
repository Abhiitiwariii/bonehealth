// Location-based search links, built fresh each time from what the person
// enters or their device's location. Nothing is pre-listed here, since no
// fixed list can stay accurate or cover every city. This always points to
// live, current results instead.

export function mapsSearchByCity(city) {
  const q = encodeURIComponent(`orthopedic knee specialist near ${city}`);
  return `https://www.google.com/maps/search/${q}`;
}

export function webSearchByCity(city) {
  const q = encodeURIComponent(
    `best orthopedic knee replacement specialist near ${city}`
  );
  return `https://www.google.com/search?q=${q}`;
}

export function practoSearchByCity(city) {
  const q = encodeURIComponent(city);
  return `https://www.practo.com/search/doctors?results_type=doctor&q=%5B%7B%22word%22%3A%22Orthopedist%22%2C%22autocompleted%22%3Atrue%7D%5D&city=${q}`;
}

export function mapsSearchByCoords(lat, lng) {
  const q = encodeURIComponent("orthopedic knee specialist");
  return `https://www.google.com/maps/search/${q}/@${lat},${lng},13z`;
}
