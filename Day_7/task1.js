$(document).ready(function() {
  var user = [];
  $("#getbtn").click(function() {
    $.getJSON(
      "https://spritle-fresher-training.herokuapp.com/users.json",
      function(data, status) {
        var table_data = "";
        $.each(data, function(key, value) {
          table_data += "<tr>";
          table_data += "<td>" + value.name + "</td>";
          table_data += "<td>" + value.age + "</td>";
          table_data += "<td>" + value.email + "</td>";
          table_data += "</tr>";
        });
        $("#tab-data").append(table_data);
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
