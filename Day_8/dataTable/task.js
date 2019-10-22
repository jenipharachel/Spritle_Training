$(document).ready(function() {
  $("#data-table").DataTable({
    ajax: {
      url: "https://spritle-fresher-training.herokuapp.com/users.json",
      method: "GET",
      dataSrc: ""
    },
    columns: [{ data: "name" }, { data: "age" }, { data: "email" }]
  });
});
