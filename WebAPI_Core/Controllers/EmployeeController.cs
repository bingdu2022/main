// this is created by Right-click on Controllers folder, select API > API Controller - empty

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;  // bd: added it
using WebAPI_Core.Models;    // bd: added it
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI_Core.Controllers
{
  [Route("api/[controller]")]   // auto-generated when doing Right-click on Controllers folder and then select API > API Controller - empty
                                // api call will take the url: https://localhost:44389/api/employee , tested in Postman
  [ApiController]               // auto-generated when doing Right-click on Controllers folder and then select API > API Controller - empty   
  public class EmployeeController : ControllerBase  // auto-generated when doing Right-click on Controllers folder and then select API > API Controller - empty
  {

    private readonly Common _common;
    public EmployeeController(IConfiguration configuration, IWebHostEnvironment evn)  //Use IWebHostEnvironment to get the physical web app path or server root path on the server.
    {
      _common = new Common(configuration,evn);
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

    [HttpPost] // api call will take the url: https://localhost:44389/api/employee with Body (raw-JSON) of i.e. {"employeename": "Xiao 2","department": "IT","dateofjoining": "2022-12-28","photofilename": "Xiao.png"} , tested in Postman 
    public JsonResult Post(Employee e)
    {
      string query = $"insert into dbo.employee (employeename,department,DateOfJoining,PhotoFileName) values ('{e.EmployeeName}','{e.Department}','{e.DateOfJoining}','{e.PhotoFileName}')";
      int numberOfResult = _common.ExecuteNonQuery(query);
      return new JsonResult($"one row is saved to BDServer.Employee!");
    }

    [HttpPut] // api call will take the url: https://localhost:44389/api/employee with Body (raw-JSON) of i.e. {"EmployeeId": 4, "employeename": "Xiao 4"} , tested in Postman
    public JsonResult Put(Employee e)
    {
      string query = $"update dbo.employee set employeename='{e.EmployeeName}' where employeeid = {e.EmployeeId}";
      int numberOfRows = _common.ExecuteNonQuery(query);
      return new JsonResult($"The new employeename '{e.EmployeeName}' with employeeid = {e.EmployeeId} is updated and saved to database.");
    }

    [HttpDelete]  // api call will take the url: https://localhost:44389/api/employee with Body (raw-JSON) of i.e. {"Names": "Xiao,Xiao 4"} , tested in Postman
    public JsonResult Delete(Employee e)
    {
      if (e.Names == null) { return new JsonResult("EmployeeName cannot be null!"); };

      string whereClause = $" where employeename in ('{e.Names.Replace(",","','")}')";

      int numberOfRows = _common.ExecuteNonQuery($"delete from employee {whereClause}");
      return new JsonResult($"Deleted {numberOfRows} row(s) in BDServer.Emloyee!");
    }

    [Route("UploadImageFile")]  // Define a custom route
    [HttpPost]
    public JsonResult UploadImageFile()   // It uploads an image file from the client machine to the server web root/Images/ folder.
                                          // In Postman, POST {{localhost44389}}employee/uploadimagefile and in Body (form-data): 
                                          // In KEY, enter uploadedFile and select its dropdown as File, and then in VALUE, select an image file locally, click Send.
    {
      try
      {
        var httpRequest = Request.Form;

        // Upload the images to BDServer Employee.Image column
        Console.WriteLine("httpRequest.Keys",httpRequest.Keys);
        Console.WriteLine("httpRequest", httpRequest);
        Console.WriteLine("httpRequest.Files: ", httpRequest.Files);
        _common.UploadFiles(httpRequest, "PhotoFileName");

        // Upload the first image to web root/Images/ folder 
        var postedFile = httpRequest.Files[0];  // simply gets the name of the first file attached in Body (form-data): In KEY, enter uploadedFile and select its dropdown as File, and then in VALUE, select an image file locally, click Send in Postman. 
        string filename = postedFile.FileName;
        var physicalPath = _common.GetFilePath($"Images\\{filename}");
        using(var stream = new FileStream(physicalPath, FileMode.Create))
        {
          postedFile.CopyTo(stream);
        }
        return new JsonResult($"{filename}");     //($"Saved {filename} to ./Images/ folder")
      }
      catch (Exception)
      {
        return new JsonResult($"Failed to save the file.");
      }

    }

    [Route("UploadImageFileToDB")]  // Define a custom route
    [HttpPost]
    public JsonResult UploadImageFileDB()   // It uploads an image file from the client machine to the server database.
                                            // In Postman, POST {{localhost44389}}employee/UploadImageFileDB and in Body (form-data): 
                                            // In KEY, enter uploadedFile and select its dropdown as File, and then in VALUE, select an image file locally, click Send.
    {
      try
      {
        var httpRequest = Request.Form;

        // Upload the images to BDServer Employee.Image column
        //Console.WriteLine("httpRequest.Keys", httpRequest.Keys);
        //Console.WriteLine("httpRequest", httpRequest);
        //Console.WriteLine("httpRequest.Files: ", httpRequest.Files);
        _common.UploadFiles(httpRequest, "PhotoFileName");

        // Upload the first image to web root/Images/ folder 
        var postedFile = httpRequest.Files[0];  // simply gets the name of the first file attached in Body (form-data): In KEY, enter uploadedFile and select its dropdown as File, and then in VALUE, select an image file locally, click Send in Postman. 
        string filename = postedFile.FileName;
        return new JsonResult($"{filename}");     //($"Saved {filename} to ./Images/ folder")
      }
      catch (Exception)
      {
        return new JsonResult($"Failed to save the file.");
      }

    }

  }
}
