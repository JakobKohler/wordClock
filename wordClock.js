let divArray = document.getElementsByClassName('wordDiv');
let dotArray = document.getElementsByClassName('dot');
let ampmArray = document.getElementsByClassName('en');
let alwaysOn = document.getElementsByClassName('alwaysOn');
for (let i = 0; i < divArray.length ; i++) {
    let divCnt = divArray[i].textContent;
    let letterArray = divCnt.split("");
    divArray[i].textContent ="";
    for (let j = 0; j < letterArray.length; j++) {
        divArray[i].innerHTML += "<div class='letter'><p>"+ letterArray[j] +"</p></div>"
    }
}
clock();
setInterval(clock,10);
function clock() {
    for (let i = 0; i < divArray.length ; i++) {
        divArray[i].classList.remove('on');
    }
    for (let i = 0; i < dotArray.length ; i++) {
        dotArray[i].classList.remove('active');
    }
    for (let i = 0; i < ampmArray.length ; i++) {
        ampmArray[i].classList.remove('currentlyOn');
    }
    for (let j = 0; j < alwaysOn.length; j++) {
        alwaysOn[j].classList.add('on');
    }
    let dateInfo = new Date();
    let currentHours = dateInfo.getHours();
    let currentMinutes = dateInfo.getMinutes();
    let minutesRounded = Math.floor(currentMinutes / 5) * 5;
    let englishFormat;
    let displayedHour;

    switch(true){
        case minutesRounded > 30: englishFormat = currentHours +1;
            break;
        case minutesRounded <= 30: englishFormat = currentHours;
    }
    switch (true) {
        case englishFormat > 12: displayedHour = englishFormat -12;
            break;
        case englishFormat <= 12: displayedHour = englishFormat;
    }

    minuteCount(currentMinutes);
    switch (true) {
        case minutesRounded > 30: to(displayedHour, minutesRounded);
            break;
        case minutesRounded <= 30 && minutesRounded > 0: past(displayedHour,minutesRounded);
            break;
        case minutesRounded === 0: oclock(displayedHour);
    }

    function to(hr,min) {
        let hrId = hr.toString();
        let minTo = 60 - min;
        document.getElementById(hrId).classList.add('on');
        document.getElementById('to').classList.add('on');
        let minId = minTo.toString() + "min";
        if (minTo === 25){
            document.getElementById('20min').classList.add('on');
            document.getElementById('5min').classList.add('on');
        }else{
            document.getElementById(minId).classList.add('on');
        }
    }

    function past(hr,min) {
        let hrId = hr.toString();
        let minPast = min;
        document.getElementById('past').classList.add('on');
        document.getElementById(hrId).classList.add('on');
        let minId = minPast.toString() + "min";
        if (minPast === 25){
            document.getElementById('20min').classList.add('on');
            document.getElementById('5min').classList.add('on');
        }else{
            document.getElementById(minId).classList.add('on');

        }
    }

    function oclock(hr) {
        let hrId = hr.toString();
        document.getElementById('oclock').classList.add('on');
        document.getElementById(hrId).classList.add('on');
    }
    function minuteCount(min) {
        let minOver = min % 5;
        let dotArray = document.getElementsByClassName('dot');
        for (let i = 0; i < minOver; i++) {
            dotArray[i].classList.add('active');
        }
    }
    seconds(dateInfo.getSeconds());
    function seconds(sec) {
        let displayedSec;
        if (sec < 10){
            displayedSec = '0' + sec.toString();
        }else{
            displayedSec = sec.toString();
        }
        document.getElementById('secDisplay').innerText = displayedSec;
    }
    ampm(currentHours);
    function ampm(hr) {
        if (hr > 12){
            document.getElementsByClassName('pm')[0].classList.add('currentlyOn');
        }else {
            document.getElementsByClassName('am')[0].classList.add('currentlyOn');
        }
    }
}

