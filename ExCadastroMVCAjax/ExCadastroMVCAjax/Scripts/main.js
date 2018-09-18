$(function () {
    $('span').css('color', 'red');
    $('#btnCadastrar').click(function () {
        var nome = $('#txtNome').val();
        var idade = $('#txtIdade').val();
        var sexoM = $('#Masc').is(':checked');
        var sexoF = $('#Fem').is(':checked');
        var tel = $('#txtTel').val();
        var cel = $('#txtCel').val()
        var resp = $('#txtResp').val();

        var erro = "";
        $('#errors').html('');

        if (nome == "")
            erro += "<p>* Campo nome é Obrigatório </p>";
        if (idade == "")
            erro += "<p>* Campo idade é Obrigatório </p>";
        if (!sexoM && !sexoF)
            erro += "<p>* Favor informar o Sexo </p>";
        if (tel == "")
            erro += "<p>* Campo telefone é Obrigatório </p>";
        if (resp == "" && idade < 18)
            erro += "<p>* Necessário informar responsável para menor de idade! </p>";

        if (erro) {
            $('#errors').html(erro);
            return false;
        } else {
            var paciente = {};
            paciente.nome = $('#txtNome').val();
            paciente.idade = $('#txtIdade').val();
            paciente.sexo = $("input[name='Sexo']:checked").val();
            paciente.telefone = $('#txtTel').val();
            paciente.celular = $('#txtCel').val();
            paciente.email = $('#txtEmail').val();
            paciente.responsavel = $('#txtResp').val();

            $.ajax({
                url: "/Create/Insert",
                data: JSON.stringify(paciente),
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (result) {
                    $('#msg').html("Paciente Cadastrado Com Sucesso!");
                    $('#CriaPaciente').trigger("reset");
                },
                error: function (errormensage) {
                    alert(errormessage.responseText);
                }
            });
        };
        return true;
    });

    $(function ListaPaciente()
    {
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
                    html += '<td><a href="#" onclick="return getbyID(' + item.id + ')">Edit</a> | <a href="#" onclick="Delele(' + item.id + ')">Delete</a></td>';
                    html += '</tr>';
                });
                $('.tbody').html(html);
            },
            error: function (errormessage) {
                alert("Erro Na listagem de Pacientes!");
            }
        });
    });
});