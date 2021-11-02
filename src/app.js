const geocode = require("../src/utils/geocode");
const forcast = require("./utils/forcast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);
app.use(express.static(publicPath));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Created By Me in Weather App Section",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Section",
    name: "Created by Me in About Section",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is the Help Section",
    title: "Help Page",
    name: "Created by Me in Help Section",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address not found",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forcast(latitude, longitude, (error, data) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          location,
          forcast: data,
        });
      });
    }
  );
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "help not found",
    title: "help missing ",
    name: "created by me in help missing",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found",
    title: "page missing",
    name: "created by Me in missing page",
  });
});
app.listen(port, () => {
  console.log("Running on port " + port);
});
