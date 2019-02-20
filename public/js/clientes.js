var url = "https://reqres.in/api/users/?page=2";

$().ready(function () {
    listarClientes();
});

function listarClientes() {
    var dir = url;
    $.ajax({
        type: 'GET',
        url: dir,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
          var html='<option value="" disabled selected>Clientes</option>';
          for (var i = 0; i < data.data.length; i++) {
            html+='<option value="'+data.data[i].first_name+'">'+data.data[i].first_name+'</option>';
          }
            $("#clientes").html(html);
        },
        error: function (jqXHR, textStatus, jqXHR) {

        }
    });
}
