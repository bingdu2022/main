using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using WebApplication3.Server;

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

    public ActionResult AngularJS_Basics()
    {
      ViewBag.Title = "SinglePage AngularJS vs HTML";

      return View();
    }

    public ActionResult ShoppingModuleComponentsAngularJS()
    {
      ViewBag.Title = "Shopping Module Components AngularJS";
      return View();
    }

    public ActionResult AngularUiRouterApp()
    {
      ViewBag.Title = "Angular Ui Router App";
      return View();
    }

    public ActionResult Html_Css()
    {
      ViewBag.Title = "Html CSS";
      return View();
    }

    public ActionResult JS()
    {
      ViewBag.Title = "JS";
      return View();
    }

    public ActionResult JS_DynamicViews()
    {
      ViewBag.Title = "JS Dynamic Views In Body";
      return View();
    }
       

    // POST: Shopping/Weak_form
    [HttpPost]
    public ActionResult Weak_form(Int64 txtId, string txtName, double txtQuantity)
    {
      // TODO: Add insert logic here
      ViewBag.Id = txtId;
      ViewBag.Name = txtName;
      ViewBag.Quantity = txtQuantity;

      //Using RedirectToAction("Index") below doesn't work with index.cshtml > input type="submit" 
      return View("Index"); // RedirectToAction("Index");
    }

    [HttpPost]
    public ActionResult Submit(FormCollection fc)
    {
      ViewBag.Id = fc["Id"];
      ViewBag.Name = fc["Name"];
      ViewBag.Quantity = fc["Quantity"];
      return RedirectToAction("Index");
    }

    public ActionResult dashboard_widget()
    {
      ViewBag.Title = "Dashboard-Widget";
      return View();
    }

    [HttpPost]
    public async Task<ActionResult> SendEmail()
    {
      try
      {
        // Your email sending logic using SendGridService
        await SendGridService.SendEmailAsync3();

        return Json(new { success = true, message = "Email sent successfully" });
      }
      catch (Exception ex)
      {
        return Json(new { success = false, message = $"Error sending email: {ex.Message}" });
      }
    }
  }
}
