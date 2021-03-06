const express = require("express");
const asyncHandler = require("express-async-handler");
const bodyParser = require("body-parser");

const api = require("./utils/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (_, res) => res.send("Hello World!"));

app.get("/sports", (_, res) =>
  res.send({ status: "ok", data: api.getAllSports() })
);

app.get("/schedules", (req, res) => {
  if (!req.query.sport && !req.query.country) {
    console.error("No Country or Sport code");
    res.status(400);
    return res.send({
      status: "Bad Request",
      error: {
        message: "Must provide `sport` or `country` parameter."
      }
    });
  }
  const schedules = api.getAllSchedule(req.query);
  res.send({
    status: "ok",
    data: schedules
  });
});

app.get("/countries", (req, res, next) => {
  const countries = api.getCountry();
  res.send({
    status: "ok",
    data: countries
  });
});

app.get("/athlete", (req, res) => {
  const country = req.query.country;
  if (country) {
    const athletesByCountry = api.getAllAthleteByCountry(country);
    res.send({
      status: "ok",
      data: athletesByCountry
    });
  } else {
    const athletes = api.getAllAthlete();
    res.send({
      status: "ok",
      data: athletes
    });
  }
});

app.listen(PORT, () =>
  console.log(`asian-games-api listening on port ${PORT}!`)
);
