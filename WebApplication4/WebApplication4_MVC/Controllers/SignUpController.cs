using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication4_MVC.Models;

namespace WebApplication4_MVC.Controllers
{
  public class SignUpController : Controller
  {
    // GET: SignUp
    public ActionResult SignUp()
    {
      return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult SignUp(EmployeeModel model)
    {
      if (ModelState.IsValid)  // it's a second layer of security
      {
        return RedirectToAction("Index", "Home");
      }
      return View();
    }
  }

}