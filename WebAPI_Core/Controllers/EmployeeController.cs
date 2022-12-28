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
  [ApiController]               // auto-generated when doing Right-click on Controllers folder and then select API > API Controller - empty   
  public class EmployeeController : ControllerBase  // auto-generated when doing Right-click on Controllers folder and then select API > API Controller - empty
  {

    private readonly Common _common;
    public EmployeeController(IConfiguration configuration)
    {
      _common = new Common(configuration);
    }

    [HttpGet]
    public JsonResult Get()
    {
      // below EmployeeId and employeename etc will be exactly listed in the result as [{"EmployeeId": 1, "employeename": "Sam", ...}]
      string query = "select EmployeeId, employeename, department, convert(varchar(10),dateofjoining, 120) dateofjoining, photofilename from dbo.employee";

      return _common.GetJsonResultOfDatabaseTable(query);
    }
  }
}
