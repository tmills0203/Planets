module.exports = (temp, planet) => {
  //replace product name
  let output = temp.replace(/{%PLANET_NAME%}/g, planet.planetName);
  output = output.replace(/{%IMAGE%}/g, planet.image);
  output = output.replace(/{%MOON%}/g, planet.moon);
  output = output.replace(/{%PLANET_TYPE%}/g, planet.planet_type);
  output = output.replace(/{%RADIUS%}/g, planet.radius);
  output = output.replace(/{%QUANTITY%}/g, planet.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, planet.description);
  output = output.replace(/{%ID%}/g, planet.id);

  return output;
};
