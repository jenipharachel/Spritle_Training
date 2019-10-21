$(document).ready(function() {
  var error_fname = false;
  var error_sname = false;
  var error_email = false;
  var error_pname = false;
  var error_rname = false;
  var error_contact = false;
  var error_date = false;

  $("#firstName").focusout(function() {
    console.log("firstName focusout");
    check_fname();
  });
  $("#lastName").focusout(function() {
    console.log("lastName focusout");
    check_sname();
  });
  $("#preferredName").focusout(function() {
    check_pname();
  });
  $("#inputEmail").focusout(function() {
    check_email();
  });
  $("#referredBy").focusout(function() {
    check_rname();
  });
  $("#contactNumber").focusout(function() {
    check_contact();
  });
  $("#date").focusout(function() {
    console.log("hello");
    check_date();
  });

  function check_fname() {
    var pattern = /^[a-zA-Z]*$/;
    var fname = $("#firstName").val();
    if (!pattern.test(fname) || fname == "") {
      alert("Should contain only Characters");
      error_fname = true;
    }
  }
  function check_sname() {
    var pattern = /^[a-zA-Z]*$/;
    var sname = $("#lastName").val();
    if (!pattern.test(sname) || sname == "") {
      alert("Should contain only Characters");
      error_sname = true;
    }
  }

  function check_pname() {
    var pattern = /^[a-zA-Z]*$/;
    var pname = $("#preferredName").val();
    if (!pattern.test(pname) || pname == "") {
      alert("Should contain only Characters");
      error_pname = true;
    }
  }

  function check_email() {
    var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $("#inputEmail").val();
    if (!pattern.test(email) || email == "") {
      alert("Invalid Email");
      error_email = true;
    }
  }

  function check_rname() {
    var pattern = /^([A-Za-z]{3,})\s([A-Za-z]{3,})$/;
    var rname = $("#referredBy").val();
    if (!pattern.test(rname) || rname == "") {
      alert("Should contain two names separated by white space");
      error_rname = true;
    }
  }

  function check_contact() {
    var pattern = /^[0-9]{10}$/g;
    var contact = $("#contactNumber").val();
    if (!pattern.test(contact) || contact == "") {
      alert("Should contain 10 digits");
      error_contact = true;
    }
  }

  function check_date() {
    var date = $("#date")
      .val()
      .split("-")[0];
    console.log(date);
    if (date < 1980) {
      alert("DOB should be after 1st Jan 1980");
      error_date = true;
    }
  }

  $("#inputForm").submit(function() {
    error_fname = false;
    error_sname = false;
    error_pname = false;
    error_email = false;
    error_rname = false;
    error_contact = false;
    error_date = false;

    check_fname();
    check_sname();
    check_pname();
    check_email();
    check_rname();
    check_contact();
    check_date();

    if (
      error_fname === false &&
      error_sname === false &&
      error_pname === false &&
      error_email === false &&
      error_rname === false &&
      error_contact === false &&
      error_date === false
    ) {
      alert("Registration Successfull");
      return true;
    } else {
      alert("Please Fill the form Correctly");
      return false;
    }
  });

  $("#inputForm").submit(function(event) {
    var name = $("#firstName")
      .val()
      .toLowerCase();
    var dob = $("#date")
      .val()
      .split("-")
      .reverse()
      .join("");
    var insuranceNumber = dob + "-" + name;
    console.log("name", name);
    console.log("dob", dob);
    console.log("insuranceNumber", insuranceNumber);
    event.preventDefault();
  });
});
