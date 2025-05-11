var dbVacas = localStorage.getItem("dbVacas");
var operacion = "A";
dbVacas = JSON.parse(dbVacas);
if (dbVacas === null)
  dbVacas = [];

function Mensaje(t) {
  switch (t) {
    case 1:
      $(".mensaje-alerta").append(
        "<div class='alert alert-success' role='alert'>Se agrego con exito la vaca</div>"
      );
      break;
    case 2:
      $(".mensaje-alerta").append(
        "<div class='alert alert-danger' role='alert'>Se elimino la vaca</div>"
      );
      break;
    default:
  }
}

function AgregarVaca() {
  var datos_cliente = JSON.stringify({
    Nombre: $("#nombre").val(),
    Correo: $("#correo").val(),
    Peso: $("#peso").val(),
    Fecha_nacimiento: $("#fecha_nacimiento").val(),
    Raza: $("#raza").val(),
    Numero_arete: $("#numero_arete").val(),
    // Nuevos Campos Agregados:
    Propietario: $("#propietario").val(),  // Campo para el nombre del propietario
    Num_partos: $("#num_partos").val()    // Campo para el número de partos
  });

  dbVacas.push(datos_cliente);
  localStorage.setItem("dbVacas", JSON.stringify(dbVacas));
  ListarVacas();
  return Mensaje(1);
}

function ListarVacas() {
  $("#dbVacas-list").html(
    "<thead>" +
      "<tr>" +
        "<th> ID </th>" +
        "<th> Nombre </th>" +
        "<th> Correo </th>" +
        "<th> Peso </th>" +
        "<th> fecha_nacimiento </th>" +
        "<th> Raza </th>" +
        "<th> Número de Arete </th>" +
        "<th> Propietario </th>" + // Nueva columna para Propietario
        "<th> Número de Partos </th>" + // Nueva columna para Num_partos
        "<th> </th>" +
        "<th> </th>" +
      "</tr>" +
    "</thead>" +
    "<tbody>" +
    "</tbody>"
  );

  for (var i in dbVacas) {
    var d = JSON.parse(dbVacas[i]);
    $("#dbVacas-list").append(
      "<tr>" +
        "<td>" + i + "</td>" +
        "<td>" + d.Nombre + "</td>" +
        "<td>" + d.Correo + "</td>" +
        "<td>" + d.Peso + "</td>" +
        "<td>" + d.Fecha_nacimiento + "</td>" +
        "<td>" + d.Raza + "</td>" +
        "<td>" + d.Numero_arete + "</td>" +
        "<td>" + d.Propietario + "</td>" + // Se muestra el propietario
        "<td>" + d.Num_partos + "</td>" + // Se muestra el número de partos
        "<td> <a id='"+ i +"' class='btnEditar' href='#'> <span class='glyphicon glyphicon-pencil'> </span>  </a> </td>" +
        "<td> <a id='" + i + "' class='btnEliminar' href='#'> <span class='glyphicon glyphicon-trash'> </span> </a> </td>" +
      "</tr>"
    );
  }
}

if (dbVacas.length !== 0) {
  ListarVacas();
} else {
  $("#dbVacas-list").append("<h2> No tienes vacas </h2>");
}

function contarVacas() {
  var vacas = dbVacas;
  nVacas = vacas.length;
  $("#numeroVacas").append(
    "<a>Tienes actualmente<br><span class='badge'>" + nVacas + "</span></a> Vacas"
  );
  return nVacas;
}

function Eliminar(e) {
  dbVacas.splice(e, 1);
  localStorage.setItem("dbVacas", JSON.stringify(dbVacas));
  return Mensaje(2);
}

function Editar() {
  dbVacas[indice_selecionado] = JSON.stringify({
    Nombre: $("#nombre").val(),
    Correo: $("#correo").val(),
    Peso: $("#peso").val(),
    Fecha_nacimiento: $("#fecha_nacimiento").val(),
    Raza: $("#raza").val(),
    Numero_arete: $("#numero_arete").val(),
    Propietario: $("#propietario").val(), // Se guarda el propietario editado
    Num_partos: $("#num_partos").val()   // Se guarda el número de partos editado
  });
  localStorage.setItem("dbVacas", JSON.stringify(dbVacas));
  operacion = "A";
  return true;
}

$(".btnEliminar").bind("click", function() {
  alert("¿ Me quieres eliminar ?");
  indice_selecionado = $(this).attr("id");
  Eliminar(indice_selecionado);
  ListarVacas();
});

$(".btnEditar").bind("click", function() {
  alert("¿ Me quieres editar ?");
  $(".modo").html("<span class='glyphicon glyphicon-pencil'> </span> Modo edición");
  operacion = "E";
  indice_selecionado = $(this).attr("id");

  var vacaItem = JSON.parse(dbVacas[indice_selecionado]);
  $("#nombre").val(vacaItem.Nombre);
  $("#correo").val(vacaItem.Correo);
  $("#peso").val(vacaItem.Peso);
  $("#fecha_nacimiento").val(vacaItem.Fecha_nacimiento);
  $("#raza").val(vacaItem.Raza);
  $("#numero_arete").val(vacaItem.Numero_arete);
  $("#propietario").val(vacaItem.Propietario); // Se carga el propietario en el formulario
  $("#num_partos").val(vacaItem.Num_partos);   // Se carga el número de partos en el formulario
  $("#nombre").focus();
});

contarVacas();

$("#vacas-form").bind("submit", function() {
  if (operacion == "A")
    return AgregarVaca();
  else {
    return Editar();
  }
});
