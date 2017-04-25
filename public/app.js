function loadIndex() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', '/projects/');
  xhr.send(null);

  xhr.onreadystatechange = function() {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        console.log(xhr.responseText); // 'This is the returned text.'
        var projects = JSON.parse(xhr.responseText);
        $('#catalogItems').empty();
        $('#catalogItems').html(list(projects));

      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  }
}

function showLarge(project) {
  console.log(project.filename);
  var url = '/images/' + project.filename;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send(null);

  $('#largeImg').attr('src', url);
  $('#itemName').html(project.name);
  $('#itemArtist').html(project.artist);
  $('#itemGenre').html(project.genre);
  $('#selectedItemPanel').css('visibility', 'visible');
}

function list(projects){
  var table = $('<table>').addClass('table');
  var head = $('<tr>').append('<th>Albums</th>').appendTo(table);
  projects.forEach(function(project) {
    var row = $('<tr>')
    .append($('<td>').text(project.name))
    .click(function(event) {
      event.preventDefault();
      console.log(project.name + " clicked");
      showLarge(project);
      //$('#largeImg').src = "/images/" + this.id;
      unselectAll();
    }).appendTo(table);
  });
  return table;
}

function unselectAll() {
    if(document.selection) document.selection.empty();
    if(window.getSelection) window.getSelection().removeAllRanges();
}
function hideMe(obj) {
    obj.style.visibility = 'hidden';
}

var displayMessage = function(message, type){
  var html = '<div id="javascriptMessage" class="alert fade show alert-dismissable alert-'
           + type + '"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="h4">'
           + message + ' </span></div>';
  $('#message').append(html);
  setTimeout(function() {
  	$("#javascriptMessage").alert('close');
  }, 3000);
};

$('#addItem').on('click', function() {
  var form = $('#editForm');
  if (form.css('visibility') == 'visible') {
    form.css('visibility', 'hidden');
  }
  else {
    form.css('visibility', 'visible');
  }
});

loadIndex();