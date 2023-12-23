using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls.WebParts;
using WebApplication4_MVC.Models;

namespace WebApplication4_MVC.Controllers
{
    public class PeopleController : Controller
    {
        // GET: People
        public ActionResult Index()
        {
      PersonModel p = new PersonModel();
      int i = 5 / p.Age;

            return View();
        }

    public ActionResult ListPeople()
    {
      List<PersonModel> people = new List<PersonModel>();
      people.Add(new PersonModel { FirstName = "Bing", LastName = "Du", Age = 60 });
      people.Add(new PersonModel { FirstName = "Tim", LastName = "Corey", Age = 38 });
      people.Add(new PersonModel { FirstName = "Sarah", LastName = "Wright", Age = 30 });

      return View(people);

    }
  }
}