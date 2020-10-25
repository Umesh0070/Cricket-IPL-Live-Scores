console.log('Client side javascript file is loaded!')
const unique_id = '1216544'
const url = 'https://cricapi.com/api/cricketScore?apikey=0AJFDtoMeaWUVHi4LZTsRingmcM2&unique_id='+ unique_id 
const stats = document.querySelector('#stats')
const description = document.querySelector('#description')
const score = document.querySelector('#score')

var current = null
var previous = null 

stats.textContent = 'Loading...'
description.textContent = ''
score.textContent = ''

var timer = setInterval(() => {
    
    fetch(url).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
            }else {
                stats.textContent = data.stat
                // description.textContent = data.description
                score.textContent = data.score
                // let team1 = data["team-1"]
                // let team2 = data["team-2"]
                // let scores = data.score.slice(team1.length,team2.length+1)
                let onlyScore = data.score.match(/[0-9]+/g)
                let team1Runs = onlyScore[0]
                let team1Wickets = onlyScore[1]
                let team2Runs = onlyScore[2]
                let team2Wickets = onlyScore[3]
                console.log(team1Runs,team1Wickets)
                current = team2Runs 
                if(previous && current && previous !== current){
                    console.log('refresh');
                    window.location.reload();
                }
                previous = current;
               
            }
            if (data.stat.includes('won')) {
                clearInterval(timer);
            }
        })
    })
    
}, 1000);
