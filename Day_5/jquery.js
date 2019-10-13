$(document).ready(function() {
  $("#submit").on("click", function() {
    var time = $("#value")
      .val()
      .split(":")[0];
    if (time >= 00 && time < 08) $("p").text("Good Day Jenipha");
    if (time >= 08 && time < 12) $("p").text("Good Morning Jenipha");
    if (time >= 12 && time < 16) $("p").text("Good Noon Jenipha");
    if (time >= 16 && time < 20) $("p").text("Good Evening Jenipha");
    if (time >= 20 && time < 23) $("p").text("Good Night Jenipha");
    if (time >= 24) $("p").text("Invalid Input");
  });
});
