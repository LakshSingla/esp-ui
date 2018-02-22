// var ip = '192.168.43.155';
var sendReq = document.querySelector('.circle-main');

var tempSpan      = document.querySelector('#temp span'),
    humiditySpan  = document.querySelector('#humidity span'),
    pollutionSpan = document.querySelector('#pollution span'),
    dustSpan      = document.querySelector('#dust span');

var TEMP_UNITS      = "",
    HUMIDITY_UNITS  = "",
    POLLUTION_UNITS = "",
    DUST_UNITS      = "";

var ipInput = document.querySelector("#ip-input");

var parseRequest = function(req){
    var i = 0;
    var data = [];
    currentDataVal = 0;
    initialVal = 0;
    while(req[i]){
        if(currentDataVal == 3) {
            data.push(req.substring(initialVal, req.length - 1));
            break;
        }
        if(req[i] == '$') {
            data.push(req.substring(initialVal, i));
            currentDataVal++;
            initialVal = i + 1;
        }
        i++;
    } 
    return data;
}

sendReq.addEventListener('click', function(){
    $.ajax(ipInput.value + '/getdata' , {
        complete: function(jqXHR, textStatus){
            console.log(jqXHR);
            sensorReadings = parseRequest(jqXHR.responseText);
            
            var temp      = sensorReadings[0],
                humidity  = sensorReadings[1],
                pollution = sensorReadings[2],
                dust      = sensorReadings[3];
            
            tempSpan.textContent      = temp      + TEMP_UNITS;
            humiditySpan.textContent  = humidity  + HUMIDITY_UNITS;
            pollutionSpan.textContent = pollution + POLLUTION_UNITS;
            dustSpan.textContent      = dustSpan  + DUST_UNITS;
        }
    });
});
