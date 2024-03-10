using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication4_MVC.Models;
using static DataLibrary.BusinessRules.EmployeeProcessor;

namespace WebApplication4_MVC.Controllers
{
  public class SignUpController : Controller
  {
    // GET: SignUp
    public ActionResult SignUp()
    {
      return View();
    }

    public ActionResult ViewEmployee()
    {
      var data = LoadEmployees();
      List<EmployeeModel> employeeModels = new List<EmployeeModel>();
      foreach (var row in data)
      {
        employeeModels.Add(new EmployeeModel
        {
          EmployeeId = row.EmployeeId,
          FirstName = row.FirstName,
          LastName = row.LastName,
          EmailAddress = row.EmailAddress,
          ConfirmEmail = row.EmailAddress
        });
      }

      return View(employeeModels);

    }


    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult SignUp(EmployeeModel model)
    {
      if (ModelState.IsValid)  // it's a second layer of security
      {
        int count = CreateEmployee(model.EmployeeId, model.FirstName, model.LastName, model.EmailAddress);

        return RedirectToAction("ViewEmployee", "SignUp");
      }
      return View();
    }
  }

}