var ip = '192.168.43.155';
var sendReq = document.querySelector('.circle-main');

sendReq.addEventListener('click', function(){
    $.ajax(ip + '/getdata' , {
        complete: function(jqXHR, textStatus){
            console.log(jqXHR);
        }
    });
});