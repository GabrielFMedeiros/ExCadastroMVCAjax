using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoPacienteService.VOL
{
    public class PacienteResultado
    {
        public string Mensagem { get; }
        public bool Sucesso { get; }

        public Paciente Paciente { get; }

        public PacienteResultado(Paciente paciente, bool sucesso, string mensagem)
        {
            this.Paciente = paciente;
            this.Mensagem = mensagem;
            Sucesso = sucesso;
        }
    }
    public class Paciente
    {
        public int id { get; set; }
        public String nome { get; set; }
        public int idade { get; set; }
        public String sexo { get; set; }
        public String telefone { get; set; }
        public String celular { get; set; }
        public String email { get; set; }
        public String responsavel { get; set; }
    }
}
