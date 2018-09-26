$(function () {
    $('span').css('color', 'red');
    ListaPaciente();
    $('#btnCadastrar').click(function () {
        CriaPaciente();
    });
    $('#btnAlterar').click(function () {
        AlteraPaciente();
    });
    $('#CancelarEdicao').click(function () {
        $('#ModalEditar').modal('hide');
    });
});

function CriaPaciente() {
    var res = ValidaFormulario();
    if (res == false) {
        $('#error').html("Campo(s) Obrigatórios!");
        return false;
    }
        var paciente = {};
        paciente.nome = $('#nome').val();
        paciente.idade = $('#idade').val();
        paciente.sexo = $("input[name='sexo']:checked").val();
        paciente.telefone = $('#tel').val();
        paciente.celular = $('#cel').val();
        paciente.email = $('#email').val();
        paciente.responsavel = $('#resp').val();

        $.ajax({
            url: "/Create/Insert",
            data: JSON.stringify(paciente),
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                $('#msg').html("Paciente Cadastrado Com Sucesso!");
                $('#CriaPaciente').trigger("reset");
                $('#nome').css('border-color', 'lightgrey');
                $('#idade').css('border-color', 'lightgrey');
                $('#sexo').html('');
                $('#tel').css('border-color', 'lightgrey');
                $('#email').css('border-color', 'lightgrey');
                $('#txtResp').css('border-color', 'lightgrey');
                $('#error').html('');
            },
            error: function (errormensage) {
                alert(errormessage.responseText);
            }
        });
}

function ListaPaciente() {
    $.ajax({
        url: "/List/ListAll",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.id + '</td>';
                html += '<td>' + item.nome + '</td>';
                html += '<td>' + item.idade + '</td>';
                html += '<td>' + item.sexo + '</td>';
                html += '<td>' + item.telefone + '</td>';
                html += '<td>' + item.celular + '</td>';
                html += '<td>' + item.email + '</td>';
                html += '<td>' + item.responsavel + '</td>';
                html += '<td><button type="button" id="btnEditar" data-toggle="modal" data-target="#ModalEditar" class="btn btn-info btn-sm" onclick="getbyID(' + item.id + ')">Editar</button> | <button type="button" class="btn btn-danger btn-sm" onclick="ExcluirPaciente(' + item.id + ')">Deletar</button></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert("Erro Na listagem de Pacientes!");
        }
    });
    return false;
}


function getbyID(id) {
    $('#nome').css('border-color', 'lightgrey');
    $('#idade').css('border-color', 'lightgrey');
    $('#sexo').html('');
    $('#tel').css('border-color', 'lightgrey');
    $('#email').css('border-color', 'lightgrey');
    $('#txtResp').css('border-color', 'lightgrey');
    $('#error').html('');
    $.ajax({
        url: "/List/getbyID/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#nome').val(result.nome);
            $('#idade').val(result.idade);
            result.sexo == "Masculino" ? $('#masculino').prop("checked", true) : $('#feminino').prop("checked", true);
            $('#tel').val(result.telefone);
            $('#cel').val(result.celular);
            $('#email').val(result.email);
            $('#resp').val(result.responsavel)
        },
        error: function (errormessage) {
            alert("erro");
        }
    });

}

function AlteraPaciente() {
    var res = ValidaFormulario();
    if (res == false) {
        $('#error').html("Campo(s) Obrigatórios!");
        return false;
    }
    var paciente = {};
    paciente.id = $('#id').val();
    paciente.nome = $('#nome').val();
    paciente.idade = $('#idade').val();
    paciente.sexo = $("input[name='sexo']:checked").val();
    paciente.telefone = $('#tel').val();
    paciente.celular = $('#cel').val();
    paciente.email = $('#email').val();
    paciente.responsavel = $('#resp').val();

    $.ajax({
        url: "/List/AlteraPaciente",
        type: "POST",
        data: JSON.stringify(paciente),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            ListaPaciente();
            $('#ModalEditar').modal('hide');
            $('#AlteraPaciente').trigger("reset");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ExcluirPaciente(ID) {
    var wrg = confirm("Deseja Realmente excluir o Paciente?");
    if (wrg) {
        $.ajax({
            url: "/List/ExcluiPaciente/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                ListaPaciente();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}
//Função Para Validar o Formulário
function ValidaFormulario() {
    var sexoM = $('#masculino').is(':checked');
    var sexoF = $('#feminino').is(':checked');

    var valido = true;

    if ($('#nome').val() == "") {
        $('#nome').css('border-color', 'red');
        valido = false;
    }
    else {
        $('#nome').css('border-color', 'lightgrey');
    }

    if ($('#idade').val() == "") {
        $('#idade').css('border-color', 'red');
        valido = false;
    }
    else {
        $('#idade').css('border-color', 'lightgrey');
    }

    if (!sexoM && !sexoF) {
        $('#sexo').html('Sexo é Obrigatório!');
        valido = false;
    }

    if ($('#tel').val() == "") {
        $('#tel').css('border-color', 'red');
        valido = false;
    }
    else {
        $('#tel').css('border-color', 'lightgrey');
    }

    if ($('#email').val() == "") {
        $('#email').css('border-color', 'red');
        valido = false;
    }
    else {
        $('#email').css('border-color', 'lightgrey');
    }

    if ($('#resp').val() == "" && $('#idade').val() < 18) {
        $('#resp').css('border-color', 'red');
        valido = false;
    }
    else {
        $('#resp').css('border-color', 'lightgrey');
    }

    return valido;
}