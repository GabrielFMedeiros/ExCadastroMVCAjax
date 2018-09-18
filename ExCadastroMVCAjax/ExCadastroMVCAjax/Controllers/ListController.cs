using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GestaoPacienteService;

namespace ExCadastroMVCAjax.Controllers
{
    public class ListController : Controller
    {
        // GET: List
        public ActionResult List()
        {
            return View();
        }

        public JsonResult ListAll()
        {
            PacienteService service = new PacienteService();
            return Json(service.ListarPaciente(), JsonRequestBehavior.AllowGet);
        }
    }
}