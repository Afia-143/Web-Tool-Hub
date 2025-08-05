function updateClock(){
    let now = new Date();
    let day = now.getDay(),
        mon = now.getMonth(),
        date = now.getDate(),
        year = now.getFullYear(),
        hr = now.getHours(),
        min = now.getMinutes(),
        sec = now.getSeconds(),
        per = "AM";

    if(hr === 0){
        hr = 12; //midnight 
    }
    if(hr > 12){
        hr = hr - 12;
        per = "PM"; //afternoon
    }
    // 2-digit formatting 
    Number.prototype.pad = function(digits){
        let n = this.toString();
        while(n.length < digits){
            n = "0" + n;
        }
        return n;
    }

    let week = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June",
        "July","August","September","October","November","December"];
    let ids = ["day","month","date","year","hour","mins","sec","period"];
    let values = [week[day],months[mon],date.pad(2),year,hr.pad(2),min.pad(2),sec.pad(2),per];

    for(let i = 0; i < ids.length; i++){
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];
    }
}

function initClock(){
    updateClock();
    window.setInterval(updateClock, 1000);
}

window.onload = initClock;