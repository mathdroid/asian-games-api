"use strict";
const request = require("request-promise");
const _ = require("lodash");
const scheduleByCountry = require("./scheduleByCountry.json");
const scheduleBySport = require("./scheduleBySport.json");
const athleteList = require("./athleteList.json");

module.exports = {
  getAllSports: function() {
    const sports = Object.keys(scheduleBySport).map(key => ({
      code: key,
      title: scheduleBySport[key].title
    }));
    return sports;
  },
  getAllSchedule: function(query) {
    let listSchedule = [];
    let schedules = {};
    if (query.sport) {
      schedules = scheduleBySport[query.sport].scheduleByDay;
    } else if (query.country) {
      schedules = scheduleByCountry[query.country].scheduleByDay;
    }
    for (let date in schedules) {
      listSchedule = _.concat(listSchedule, schedules[date]);
    }
    listSchedule.sort(function compare(a, b) {
      var dateA = new Date(a.time);
      var dateB = new Date(b.time);
      return dateA - dateB;
    });
    return listSchedule;
  },
  getCountry: function() {
    let country = {};
    for (let c in scheduleByCountry) {
      country[c] = scheduleByCountry[c].name;
    }
    return country;
  },
  getAllAthlete: function() {
    return athleteList;
  },
  getAllAthleteByCountry: function(country) {
    let listCountryAthlete = athleteList[country].countryAthletes;
    return listCountryAthlete;
  }
};
