using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GestaoPacienteService
{
    public enum TipoParametro
    {
        String,
        Int
    }
    public class PassagemParametro
    {
        public String nomeParametro { get; set; }
        public Object valorParametro { get; set; }
        public TipoParametro TipoParametro { get; set; }

        public PassagemParametro(String NomeParametro, Object ValorParametro, TipoParametro tipo)
        {
            this.nomeParametro = NomeParametro;
            this.valorParametro = ValorParametro;
            this.TipoParametro = tipo;
        }
    }
    public class Connection
    {
        public string connectionString { get; set; }

        public Connection()
        {
            this.connectionString = ConfigurationManager.ConnectionStrings["connectionDB"].ToString();
        }

        public Connection(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public void ExecuteNonQuery(string comandoSQL, List<PassagemParametro> parametros)
        {
            Connection con = new Connection();
            SqlConnection conn = new SqlConnection(con.connectionString);
            conn.Open();
            SqlCommand command = new SqlCommand(comandoSQL, conn);
            command.Parameters.AddRange(RecuperarParametros(parametros));
            command.ExecuteNonQuery();
            conn.Close();
        }

        private SqlParameter[] RecuperarParametros(List<PassagemParametro> parametros)
        {
            List<SqlParameter> parametrosSQL = new List<SqlParameter>();

            foreach (var param in parametros)
            {
                SqlDbType sqlDbType = SqlDbType.VarChar;

                switch (param.TipoParametro)
                {
                    case TipoParametro.Int:
                        sqlDbType = SqlDbType.Int;

                        break;
                }

                parametrosSQL.Add(new SqlParameter { ParameterName = param.nomeParametro, Value = param.valorParametro, SqlDbType = sqlDbType });

            }
            return parametrosSQL.ToArray();
        }
    }
}
