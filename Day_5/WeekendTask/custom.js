$(document).ready(function() {
  setTimeout(function() {
    $("body").css({ "background-color": "grey" });
  }, 5000);
  $("#myname")
    .delay(10000)
    .animate({ "margin-left": "500px" });
  $("#tabledata")
    .delay(15000)
    .animate({ "margin-left": "450px" });
  $("#showhide").on("change", function() {
    if (this.value == "show") {
      $("#tables").show();
    } else {
      $("#tables").hide();
    }
  });
  // $("#tables").hover(function() {
  //   $("#tables").css({ color: "red" });
  // });
  $("#tables").mouseenter(function() {
    $("#tables").css({ color: "red" });
  });
  $("#tables").mouseleave(function() {
    $("#tables").css({ color: "black" });
  });
  // $("h1").click(function() {
  //   $("*").addClass("orange");
  // });
  // $("h1").click(function() {
  //   $("*").removeClass("orange");
  // });

  $("h1").click(function() {
    $("*").css({ "background-color": "orange" });
  });
});
