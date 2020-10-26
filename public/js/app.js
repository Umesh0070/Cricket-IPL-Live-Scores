console.log("Client side javascript file is loaded!");
var uniqueId = "1216520";
var uid = 1216520;
const url =
  "https://cricapi.com/api/cricketScore?apikey=0AJFDtoMeaWUVHi4LZTsRingmcM2&unique_id=" +
  uniqueId;
const matchUrl =
  "https://cricapi.com/api/matches?apikey=0AJFDtoMeaWUVHi4LZTsRingmcM2";
const status = document.querySelector("#status");
const stats = document.querySelector("#stats");
const description = document.querySelector("#description");
// const score = document.querySelector('#score')
const team1 = document.querySelector("#team1");
const team1Runs = document.querySelector("#team1-runs");
const team1Wick = document.querySelector("#team1-wik");
const team2 = document.querySelector("#team2");
const team2Runs = document.querySelector("#team2-runs");
const team2Wick = document.querySelector("#team2-wik");

var current = null;
var previous = null;

stats.textContent = "...";
description.textContent = "";
// score.textContent = ''
status.textContent = "";

var timer = setInterval(() => {
  fetch(url).then((response) => {
    response.json().then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
      } else if (data.matchStarted) {
        status.textContent = "Live Matches";
        status.className += "blink";
        stats.textContent = data.stat;
        // description.textContent = data.description
        team1.textContent = data["team-1"] + ":";
        team2.textContent = "  " + data["team-2"] + ":";
        let onlyScore = data.score.match(/[0-9]+/g);
        if (onlyScore[0]) {
          team1Runs.textContent = onlyScore[0];
        }
        if (onlyScore[1]) {
          team1Wick.textContent = "/" + onlyScore[1];
        }
        if (onlyScore[2]) {
          team2Runs.textContent = onlyScore[2];
        }
        if (onlyScore[3]) {
          team2Wick.textContent = "/" + onlyScore[3];
        }

        // score.textContent = data.score
        // console.log(team1Runs,team1Wickets)
        // current = team1Runs
        if (previous && current && previous !== current) {
          console.log("refresh");
          window.location.reload();
        }
        previous = current;
      } else if (!data.matchStarted) {
        status.textContent = "Upcoming Matches";
        description.textContent = data.description;

        fetch(matchUrl).then((response) => {
          response.json().then((data) => {
            let allMatches = data["matches"];
            let reqMatch = allMatches.find((x) => x.unique_id === uid);
            date = new Date(reqMatch.dateTimeGMT);
            stats.textContent =
              "Match starts at " + date.getHours() + ":" + 30 + " Hrs";

            // console.log(date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + '-'+date.getHours()+":"+30)
          });
        });
        if (data.stat.includes("chose")) {
          stats.textContent = data.stat;
        }
      }
      if (data.stat.includes("won")) {
        status.textContent = "Recent Matches";
        clearInterval(timer);
      }
      // else {
      //     clearInterval(timer);
      // }
    });
  });
}, 1000);
