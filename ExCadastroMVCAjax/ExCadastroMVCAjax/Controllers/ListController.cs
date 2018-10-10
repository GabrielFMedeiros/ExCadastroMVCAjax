using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GestaoPacienteService;
using GestaoPacienteService.VOL;

namespace ExCadastroMVCAjax.Controllers
{
    public class ListController : Controller
    {
        PacienteService service = new PacienteService();
        // GET: List
        public ActionResult List()
        {
            return View();
        }

        public JsonResult ListAll()
        {
            return Json(service.ListarPaciente(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyId(int id)
        {
            var paciente = service.ListarPaciente().Find(x => x.id.Equals(id));
            return Json(paciente, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AlteraPaciente(Paciente paciente)
        {
            return Json(service.AlteraPaciente(paciente), JsonRequestBehavior.AllowGet);
        }
        public JsonResult ExcluiPaciente(int ID)
        {
            return Json(service.ExcluiPaciente(ID), JsonRequestBehavior.AllowGet);
        }
    }
}
