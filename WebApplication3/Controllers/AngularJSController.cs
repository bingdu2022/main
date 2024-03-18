using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication3.Controllers
{
    public class AngularJSController : Controller
    {
        // GET: AngularJS
        public ActionResult MdDialog()
        {
            return View();
        }

        // GET: AngularJS/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: AngularJS/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: AngularJS/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: AngularJS/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: AngularJS/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: AngularJS/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: AngularJS/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
