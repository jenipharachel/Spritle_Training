$(document).ready(function() {
  var user = [];
  $("#getbtn").click(function() {
    $.getJSON(
      "https://spritle-fresher-training.herokuapp.com/users.json",
      function(data, status) {
        console.log(data);
      }
    );
  });
  $("#postbtn").click(function() {
    $.ajax({
      url: "https://spritle-fresher-training.herokuapp.com/users",
      data: $("#inputform").serializeArray(),
      type: "POST",
      dataType: "json",
      sucess: function(response) {
        console.log("sucess", response);
      }
    });
  });
  $("#showbtn").click(function() {
    $.getJSON(
      "https://spritle-fresher-training.herokuapp.com/users/12",
      function(data, status) {
        console.log(data);
      }
    );
  });
});
