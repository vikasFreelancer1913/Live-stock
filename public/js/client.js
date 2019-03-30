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
    $('#dataLog').empty();
    $('.js-loading').hide();
    var dataTime = new Date(new Date().getTime() + 4*60*60*1000).toLocaleTimeString();
    JSON.parse(data).forEach(([name, price]) => {
      var minMaxValue = compareValue(name, price);
      var tr = document.createElement('tr');
      var tdName = document.createElement('td');
      var tdPrice = document.createElement('td');
      var tdTime = document.createElement('td');
      tdName.innerHTML = name;
      tdPrice.innerHTML = Math.round(price * 100) / 100;
      tdTime.innerHTML = dataTime;
      tdName.classList.add(minMaxValue);
      tdPrice.classList.add(minMaxValue);
      tdTime.classList.add(minMaxValue);
      tr.appendChild(tdName);
      tr.appendChild(tdPrice);
      tr.appendChild(tdTime);
      $('#dataLog').append(tr);
    });
  }

  var compareValue = function(name, price) {
    var classValue = undefined;
    $('#dataLog').find('tr').each((index, item) => {
      if($(item).find('td:first-child').text() == name) {
        if((Math.round(price * 100) / 100) > parseFloat($(item).find('td:nth-child(2)').text())) {
          classValue = 'green';
        }else {
          classValue = 'red';
        }
      }
    });

    return classValue;
  }

  window.addEventListener('beforeunload', function() {
    socket.close();
  });
}