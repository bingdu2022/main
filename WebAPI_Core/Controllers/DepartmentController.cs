using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Data.SqlClient;
using System.Data;

namespace WebAPI_Core.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class DepartmentController : Controller
  {

    private readonly IConfiguration _configuration;

    public DepartmentController(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    [HttpGet]
    public JsonResult Get()
    {
      string query = @"select DepartmentId, DepartmentName from dbo.Department";
      DataTable table = new DataTable();
      string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
      SqlDataReader myReader;
      using(SqlConnection myCon = new SqlConnection(sqlDataSource))
      {
        myCon.Open();
        using (SqlCommand myCommand = new SqlCommand(query, myCon))
        {
          myReader = myCommand.ExecuteReader();
          table.Load(myReader);
          myReader.Close();
          myCon.Close();
        }
      }
      return new JsonResult(table);
    }

    // GET: DepartmentController
    public ActionResult Index()
    {
      return View();
    }

    // GET: DepartmentController/Details/5
    public ActionResult Details(int id)
    {
      return View();
    }

    // GET: DepartmentController/Create
    public ActionResult Create()
    {
      return View();
    }

    // POST: DepartmentController/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Create(IFormCollection collection)
    {
      try
      {
        return RedirectToAction(nameof(Index));
      }
      catch
      {
        return View();
      }
    }

    // GET: DepartmentController/Edit/5
    public ActionResult Edit(int id)
    {
      return View();
    }

    // POST: DepartmentController/Edit/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Edit(int id, IFormCollection collection)
    {
      try
      {
        return RedirectToAction(nameof(Index));
      }
      catch
      {
        return View();
      }
    }

    // GET: DepartmentController/Delete/5
    public ActionResult Delete(int id)
    {
      return View();
    }

    // POST: DepartmentController/Delete/5
    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult Delete(int id, IFormCollection collection)
    {
      try
      {
        return RedirectToAction(nameof(Index));
      }
      catch
      {
        return View();
      }
    }
  }
}
