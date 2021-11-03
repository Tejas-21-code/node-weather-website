const request = require("postman-request");
const forcast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c2b672b470ddbeafe0364d60ef0978dc&query=${lat},${long}`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to Connect to the Internet");
    } else if (response.body.error) {
      callback(response.body.error.info);
    } else {
      const data = response.body.current;
      const msg = `The current temperature is ${data.temperature} and their is a ${data.precip}% chance of rain
      The Humidity is ${data.humidity}, But it feels like ${data.feelslike}.

      `;
      callback(undefined, msg);
    }
  });
};
module.exports = forcast;
