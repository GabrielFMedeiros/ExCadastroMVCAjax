using GestaoPacienteService;
using GestaoPacienteService.VOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Services;

namespace ExCadastroMVCAjax.Controllers
{
    public class CreateController : Controller
    {
        PacienteService service = new PacienteService();
        // GET: Create
        public ActionResult Register()
        {
            return View();
        }
        
        public JsonResult Insert(Paciente paciente)
        {
            PacienteResultado result = service.CriaPaciente(paciente);
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}