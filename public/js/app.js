console.log("Client side javascript file is loaded!");
var uniqueId = "1216499";
// 1216499
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
const updatedAt = document.querySelector("#updated");
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
        clearInterval(timer);
      } else if (data.matchStarted) {
        status.textContent = "Live Matches";
        stats.textContent = data.stat;
        // description.textContent = data.description
        team1.textContent = data["team-1"] + ":";
        team2.textContent = "  " + data["team-2"] + ":";
        data["team-1"].includes("Hyderabad") || data["team-2"].includes("Hyderabad") ? document.getElementById("team1-logo").src = "assets/images/srh_logo.png":"false"
        data["team-1"].includes("Delhi") || data["team-2"].includes("Delhi")? document.getElementById("team2-logo").src = "assets/images/dc_logo.png":"false"
        data["team-1"].includes("Mumbai") || data["team-2"].includes("Mumbai") ? document.getElementById("team1-logo").src = "assets/images/mi_logo-.png":"false"
        data["team-1"].includes("Bangalore") || data["team-2"].includes("Bangalore") ? document.getElementById("team2-logo").src = "assets/images/rcb_logo-.png":"false"
        data["team-1"].includes("Chennai") || data["team-2"].includes("Chennai") ? document.getElementById("team1-logo").src = "assets/images/csk_logo-.png":"false"
        data["team-1"].includes("Kolkata") || data["team-2"].includes("Kolkata") ? document.getElementById("team2-logo").src = "assets/images/kkr_logo-.png":"false"
        data["team-1"].includes("Punjab") || data["team-2"].includes("Punjab") ? document.getElementById("team1-logo").src = "assets/images/kxip_logo-.png":"false"
        data["team-1"].includes("Rajasthan") || data["team-2"].includes("Rajasthan") ? document.getElementById("team2-logo").src = "assets/images/rr_logo-.png":"false"

        let onlyScore = data.score.match(/[0-9]+/g);
        if (onlyScore[0]) {
          team1Runs.textContent = onlyScore[0];
        }else{
            team1Runs.textContent = "Loading.."
        }
        if (onlyScore[1]) {
          team1Wick.textContent = "/" + onlyScore[1];
        }else {
            team1Wick.textContent = "/0";
        }
        if (onlyScore[2]) {
          team2Runs.textContent = onlyScore[2];
        }
        if (onlyScore[3]) {
          team2Wick.textContent = "/" + onlyScore[3];
        }else {
            team2Wick.textContent = "/0";
        }
        if (!onlyScore[2]  ){
            team2Runs.textContent = "Yet to Bat"
        }else if (onlyScore[2] == null || onlyScore[2] == ""){
            team2Runs.textContent = "Refreshing..."
            console.log(previous)
        }

        if (previous && current && previous !== current) {
          console.log("refresh");
          window.location.reload();
        }
        previous = current;
      } else if (!data.matchStarted) {
        status.textContent = "Upcoming";
        team1.textContent = data["team-1"] + " Vs" +"  " + data["team-2"]
        updateDate = new Date(data.provider["pubDate"]);
        updatedAt.textContent = "Last Updated at " +  updateDate.getHours() +":" +updateDate.getMinutes()+" Hrs" 
        // team2.textContent = "  " + data["team-2"] + ":";
        // description.textContent = data.description;
        data["team-1"].includes("Hyderabad") || data["team-2"].includes("Hyderabad") ? document.getElementById("team1-logo").src = "assets/images/srh_logo.png":"false"
        data["team-1"].includes("Delhi") || data["team-2"].includes("Delhi")? document.getElementById("team2-logo").src = "assets/images/dc_logo.png":"false"
        data["team-1"].includes("Mumbai") || data["team-2"].includes("Mumbai") ? document.getElementById("team1-logo").src = "assets/images/mi_logo-.png":"false"
        data["team-1"].includes("Bangalore") || data["team-2"].includes("Bangalore") ? document.getElementById("team2-logo").src = "assets/images/rcb_logo-.png":"false"
        data["team-1"].includes("Chennai") || data["team-2"].includes("Chennai") ? document.getElementById("team1-logo").src = "assets/images/csk_logo-.png":"false"
        data["team-1"].includes("Kolkata") || data["team-2"].includes("Kolkata") ? document.getElementById("team2-logo").src = "assets/images/kkr_logo-.png":"false"
        data["team-1"].includes("Punjab") || data["team-2"].includes("Punjab") ? document.getElementById("team1-logo").src = "assets/images/kxip_logo-.png":"false"
        data["team-1"].includes("Rajasthan") || data["team-2"].includes("Rajasthan") ? document.getElementById("team2-logo").src = "assets/images/rr_logo-.png":"false"

        fetch(matchUrl).then((response) => {
          response.json().then((data) => {
            let allMatches = data["matches"];
            let reqMatch = allMatches.find((x) => x.unique_id === parseInt(uniqueId));
            date = new Date(reqMatch.dateTimeGMT);
            stats.textContent =
              "Match starts at " + date.getHours() + ":" + date.getMinutes() + " IST Stay Tuned for Live Scores !";
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
