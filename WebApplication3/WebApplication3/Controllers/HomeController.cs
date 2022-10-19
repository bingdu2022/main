using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication3.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      ViewBag.Title = "Basic AngularJS vs HTML";

      return View();
    }

    public ActionResult AdvancedAngularJS()
    {
      ViewBag.Title = "Advanced AngularJS vs HTML";

      return View();
    }
  }
}
