$(document).ready(function() {
  setTimeout(function() {
    $('.js-preloader').addClass('hide-loader');
    establishSocket(); 
  }, 1000);
});

function establishSocket() {
  var socket = new WebSocket('ws://stocks.mnet.website');
  socket.onopen = function(event) {
    var json = JSON.stringify({ message: 'Hello' });
    socket.send(json);
    console.log(json);
  }

  socket.onerror = function(event) {
    console.log('Error: ' + JSON.stringify(event));
  }

  socket.onmessage = function (event) {
    handleUpdateMessage(event.data);
  }

  socket.onclose = function(event) {
    console.log('Closed connection');
  }

  var handleUpdateMessage = function(data) {
    // console.log(data);
    $('#dataLog').empty();
    var dataTime = new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString();
    JSON.parse(data).forEach(([name, price]) => {
      var tr = document.createElement('tr');
      var tdName = document.createElement('td');
      var tdPrice = document.createElement('td');
      var tdTime = document.createElement('td');
      tdName.innerHTML = name;
      tdPrice.innerHTML = Math.round(price * 100) / 100;
      tdTime.innerHTML = dataTime;
      tr.appendChild(tdName);
      tr.appendChild(tdPrice);
      tr.appendChild(tdTime);
      $('#dataLog').append(tr);
    });
  }

  window.addEventListener('beforeunload', function() {
    socket.close();
  });
}