// this is created by Right-click on Controllers folder, select API > MVC API Controller - read/write

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WebAPI_Core.Models;
using Microsoft.AspNetCore.Hosting;


// created the below based on 'VS2019-Learn React JS and .NET Core API by Creating a Full Stack Web App from Scratch.mp4'
namespace WebAPI_Core.Controllers
{
  [Route("api/[controller]")]  //bd: I added it - see how to auto-generate it in EmployeeController.cs
  [ApiController]              //bd: I added it
  public class DepartmentController : Controller
  {

    private readonly Common _common;

    public DepartmentController(IConfiguration configuration)
    {
      _common = new Common(configuration);
    }
     

    [HttpGet]
    public JsonResult Get()
    {
      string query = "select DepartmentId, DepartmentName from dbo.Department";
      return _common.GetJsonResultOfDatabaseTable(query);

      //I coded the below into Common.cs

      //DataTable table = new DataTable();
      //string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
      //SqlDataReader myReader;
      //using(SqlConnection myCon = new SqlConnection(sqlDataSource))
      //{
      //  myCon.Open();
      //  using SqlCommand myCommand = new SqlCommand(query, myCon);
      //  myReader = myCommand.ExecuteReader();
      //  table.Load(myReader);
      //  myReader.Close();
      //  myCon.Close();
      //}
      //return new JsonResult(table);
    }

    [HttpPost]  // Create a record over postman Body (raw-JSON): {"DepartmentName": "Power Team"}
    public JsonResult Post(Department dep)  //Create a Department record in BDServer database
    {
      string query = $"insert into dbo.Department values ('{dep.DepartmentName}')" ;
      int numberOfRows = _common.ExecuteNonQuery(query);

      //I coded the below into Common.cs

      //DataTable table = new DataTable();
      //string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
      //SqlDataReader myReader;
      //using (SqlConnection myCon = new SqlConnection(sqlDataSource))
      //{
      //  myCon.Open();
      //  using SqlCommand myCommand = new SqlCommand(query, myCon);
      //  myReader = myCommand.ExecuteReader();
      //  table.Load(myReader);
      //  myReader.Close();
      //  myCon.Close();
      //}
      //return new JsonResult("successful!");

      return new JsonResult($"{numberOfRows} rows of data are successfully saved to database!");
    }

    [HttpPut]  // Update a record over postman Body (raw-JSON): {"DepartmentId": 2,"DepartmentName": "Power Team"}
    public JsonResult Put(Department dep)  //Update Department data in BDServer database
    {
      string query = $"update dbo.Department set DepartmentName ='{dep.DepartmentName}' where departmentId ={dep.DepartmentId} ";
      int numberOfRows = _common.ExecuteNonQuery(query);
      return new JsonResult($"The new '{dep.DepartmentName}' DepartmentName with the '{dep.DepartmentId}' id are successfully updated and saved to database!");
    }

    //[HttpDelete]  // Delete a record over postman Body (raw-JSON): {"DepartmentId": 2} or {"DepartmentId": 2,"DepartmentName": "Power Team"} 
    //public JsonResult Delete(Department dep)  //Delete a record from department table in BDServer database
    //{
    //  string query = $"delete from dbo.Department where DepartmentName ='{dep.DepartmentName}' or departmentId ={dep.DepartmentId} ";
    //  int numberOfRows = _common.ExecuteNonQuery(query);
    //  return new JsonResult($"The '{dep.DepartmentName}' DepartmentName with the '{dep.DepartmentId}' id is successfully deleted from database!");
    //}

    // The above works but commented to show the below different way of deleting a record

    [HttpDelete("{id}")]  // need to add id here in the root parameter since we send id in url: i.e. in postman, {{localhost44389}}department/4
    public JsonResult Delete(int id)  //Delete a record from department table in BDServer database
    {
      string query = $"delete from dbo.Department where departmentId ={id} ";
      int numberOfRows = _common.ExecuteNonQuery(query);
      return new JsonResult($"DepartmentName with the '{id}' id is successfully deleted from database!");
    }


    //  // GET: DepartmentController
    //  public ActionResult Index()
    //  {
    //    return View();
    //  }

    //  // GET: DepartmentController/Details/5
    //  public ActionResult Details(int id)
    //  {
    //    return View();
    //  }

    //  // GET: DepartmentController/Create
    //  public ActionResult Create()
    //  {
    //    return View();
    //  }

    //  // POST: DepartmentController/Create
    //  [HttpPost]
    //  [ValidateAntiForgeryToken]
    //  public ActionResult Create(IFormCollection collection)
    //  {
    //    try
    //    {
    //      return RedirectToAction(nameof(Index));
    //    }
    //    catch
    //    {
    //      return View();
    //    }
    //  }

    //  // GET: DepartmentController/Edit/5
    //  public ActionResult Edit(int id)
    //  {
    //    return View();
    //  }

    //  // POST: DepartmentController/Edit/5
    //  [HttpPost]
    //  [ValidateAntiForgeryToken]
    //  public ActionResult Edit(int id, IFormCollection collection)
    //  {
    //    try
    //    {
    //      return RedirectToAction(nameof(Index));
    //    }
    //    catch
    //    {
    //      return View();
    //    }
    //  }

    //  // GET: DepartmentController/Delete/5
    //  public ActionResult Delete(int id)
    //  {
    //    return View();
    //  }

    //  // POST: DepartmentController/Delete/5
    //  [HttpPost]
    //  [ValidateAntiForgeryToken]
    //  public ActionResult Delete(int id, IFormCollection collection)
    //  {
    //    try
    //    {
    //      return RedirectToAction(nameof(Index));
    //    }
    //    catch
    //    {
    //      return View();
    //    }
    //  }

  }
}
