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

    public ActionResult HtmlCss_InHtmlBody()
    {
      ViewBag.Title = "Html CSS";
      return View();
    }

    public ActionResult HtmlJs_InHtmlBody()
    {
      ViewBag.Title = "Html JS";
      return View();
    }

    public ActionResult HtmlJs_DynamicViews_InBody()
    {
      ViewBag.Title = "Html Js Dynamic Views In Body";
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
  }
}
