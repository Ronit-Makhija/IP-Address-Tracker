import {apiKey , accessToken} from '.config.js';

var api_key = apiKey;
var access_Token = accessToken;
var latitude;
var longitude;
var map;
var marker;
var tilelayer;

function searchIpDetails(ip){

  $(function () {
   $.ajax({
       url: "https://geo.ipify.org/api/v1",
       data: {apiKey: api_key, ipAddress: ip},
       success: function(data) {
         console.log(data);
           document.getElementById("ip-address").innerText = data.ip;
           document.getElementById("location").innerText = data.location.city + ", " + data.location.region + ", " + data.location.country;
           document.getElementById("time-zone").innerText = data.location.timezone;
           document.getElementById("isp").innerText = data.isp;
           latitude = data.location.lat;
           longitude = data.location.lng;
           map = L.map('map').setView([latitude, longitude], 13);
           marker = L.marker([latitude, longitude]).addTo(map);
           tilelayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + access_Token, {
               attribution: '',
               maxZoom: 18,
               id: 'mapbox/streets-v11',
               tileSize: 512,
               zoomOffset: -1,
               accessToken: access_Token
           });
           tilelayer.addTo(map);
       },
       error: function(){
         console.log("error");
         document.getElementById("ipInput").placeholder = "Invalid IP Address";
         document.getElementById("ipInput").value = "";
         document.getElementById("ip-address").innerText = "";
         document.getElementById("location").innerText = "";
         document.getElementById("time-zone").innerText = "";
         document.getElementById("isp").innerText = "";
         map = L.map('map').setView([latitude, longitude], 13);
         marker = L.marker([latitude, longitude]).addTo(map);
         tilelayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + accessToken, {
             attribution: '',
             maxZoom: 18,
             id: 'mapbox/streets-v11',
             tileSize: 512,
             zoomOffset: -1,
             accessToken: accessToken
         });
         tilelayer.addTo(map);
       }
   });
});
};

function userIpDetails(){

  $.getJSON("https://api.ipify.org/?format=json" , function(data){
    var userIp = data.ip;
    document.getElementById("ipInput").placeholder = userIp;
    searchIpDetails(userIp);
  })

};

window.onload = (event) => {
  userIpDetails();
};

document.getElementById("ipSearch").addEventListener("click" , function(){

  map.off();
  map.remove();
  document.getElementById("ipInput").placeholder = "";
  var ip = document.getElementById("ipInput").value;
  searchIpDetails(ip);
});
