$(document).ready(function() {
  $("#myname, #tabledata").hide();

  setTimeout(function() {
    $("body").css({ "background-color": "grey" });
  }, 5000);
  $("#myname")
    .delay(10000)
    .fadeIn()
    .animate({ left: "45%" });

  $("#tabledata")
    .delay(15000)
    .fadeIn()
    .animate({ left: "45%" });
  $("#showhide").on("change", function() {
    if (this.value == "show") {
      $("#tables").show();
    } else {
      $("#tables").hide();
    }
  });
  $("#tables").mouseenter(function() {
    $("#tables").css({ color: "red" });
  });
  $("#tables").mouseleave(function() {
    $("#tables").css({ color: "black" });
  });
  $("h1").click(function() {
    $("*").css({ "background-color": "orange" });
  });
});
