// this is created by Right-click on Controllers folder, select API > API Controller - empty

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;  // bd: added it
using WebAPI_Core.Models;    // bd: added it

namespace WebAPI_Core.Controllers
{
  [Route("api/[controller]")]   // auto-generated when doing Right-click on Controllers folder and then select API > API Controller - empty
                                // api call will take the url: https://localhost:44389/api/employee , tested in Postman
  [ApiController]               // auto-generated when doing Right-click on Controllers folder and then select API > API Controller - empty   
  public class EmployeeController : ControllerBase  // auto-generated when doing Right-click on Controllers folder and then select API > API Controller - empty
  {

    private readonly Common _common;
    public EmployeeController(IConfiguration configuration)
    {
      _common = new Common(configuration);
    }

    [HttpGet]
    public JsonResult Get()   // api call will take the url: https://localhost:44389/api/employee , tested in Postman
    {
      // below EmployeeId and employeename etc will be exactly listed in the result as [{"EmployeeId": 1, "employeename": "Sam", ...}]
      string query = "select EmployeeId, employeename, department, convert(varchar(10),dateofjoining, 120) dateofjoining, photofilename from dbo.employee";

      return _common.GetJsonResultOfDatabaseTable(query);
    }

    [HttpGet("{id}")]
    public JsonResult Get(int id)   // api call will take the url: i.e. https://localhost:44389/api/employee/2 , tested in Postman
    {
      // below EmployeeId and employeename etc will be exactly listed in the result as [{"EmployeeId": 1, "employeename": "Sam", ...}]
      string query = $"select EmployeeId, employeename, department, convert(varchar(10),dateofjoining, 120) dateofjoining, photofilename " +
        $"from dbo.employee where employeeid ={id}";

      return _common.GetJsonResultOfDatabaseTable(query);
    }

    [HttpPost]  // api call will take the url: https://localhost:44389/api/employee , tested in Postman
    public JsonResult Post(Employee e)
    {
      string query = $"insert into dbo.employee (employeename,department,DateOfJoining,PhotoFileName) values ('{e.EmployeeName}','{e.Department}','{e.DateOfJoining}','{e.PhotoFileName}')";
      int numberOfResult = _common.ExecuteNonQuery(query);
      return new JsonResult($"one row is saved to BDServer.Employee!");
    }
  }
}
