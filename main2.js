// var ip = '192.168.43.155';
var sendReq = document.querySelector('#send-req');

var tempSpan      = document.querySelector('#temp span:nth-of-type(2)'),
    humiditySpan  = document.querySelector('#humidity span:nth-of-type(2)'),
    pollutionSpan = document.querySelector('#pollution span:nth-of-type(2)'),
    dustSpan      = document.querySelector('#dust span:nth-of-type(2)');

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
    $.ajax('http://' + ipInput.value + '/getdata' , {
        headers : {
            'Access-Control-Allow-Origin' : '*'
        },
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
            dustSpan.textContent      = dust      + DUST_UNITS;
        }
    });
});
