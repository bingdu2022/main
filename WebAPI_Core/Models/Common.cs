using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.JsonPatch;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

namespace WebAPI_Core.Models
{
  public class Common
  {
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _evn;
    public Common(IConfiguration configuration)
    {
      _configuration = configuration;
    }
    public Common(IConfiguration configuration, IWebHostEnvironment evn)
    {
      _configuration = configuration;
      _evn = evn;
    }

    public SqlConnection Connection()
    {
      string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
      SqlConnection myCon = new SqlConnection(sqlDataSource);
      return myCon;
    }

    public string AppPath()
    {
      return _evn.ContentRootPath + "\\";  // i.e. C:\\bingdu2022.main\\WebAPI_Core\\
    }
    public string GetFilePath(string fileName)
    {
      return AppPath() +  fileName;     //i.e. C:\\bingdu2022.main\\WebAPI_Core\\Images\\
    }

    public JsonResult GetJsonResultOfDatabaseTable(string queryString) {
       return new JsonResult(GetDataTableFromDatabase(queryString));
    }

    public int ExecuteNonQuery(string queryString)
    {
      //string queryString = @"select DepartmentId, DepartmentName from dbo.Department";
      int numberOfRows=-1;
      using (SqlConnection myCon= Connection())
      {
        myCon.Open();
        using SqlCommand myCommand = new SqlCommand(queryString, myCon);
        numberOfRows= myCommand.ExecuteNonQuery();
        myCon.Close();
      }
      return numberOfRows;
    }

    public DataTable GetDataTableFromDatabase(string queryString)
    {
      //string queryString = @"select DepartmentId, DepartmentName from dbo.Department";
      DataTable table = new DataTable();
      SqlDataReader myReader;
      using (SqlConnection myCon = Connection())
      {
        myCon.Open();
        using SqlCommand myCommand = new SqlCommand(queryString, myCon);
        myReader = myCommand.ExecuteReader();
        table.Load(myReader);
        myReader.Close();
        myCon.Close();
      }
      return table;
    }



  }
}
