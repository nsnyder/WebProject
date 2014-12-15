window.onload=function(){
  var bar = document.getElementById("buddySearchBar");
  bar.addEventListener("input",findUsers);
}

function findUsers() {
  if($("#buddySearchBar").val()=="") {
    $('#searchResults').removeClass('visible');
    return;
  }
  $('#searchResults').addClass('visible');
  $.ajax({
    type: "GET",
    url: "search.php",
    data: { searchString:$("#buddySearchBar").val() }
  })
  .done(function(data) {
    $('#resultsPane').html(data);
  })
  .fail(function() {
    // Error loading search results
  });
}
