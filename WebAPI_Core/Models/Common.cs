using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.JsonPatch;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI_Core.Models
{
  public class Common
  {
    private readonly IConfiguration _configuration;
    public Common(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public SqlConnection Connection()
    {
      string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
      SqlConnection myCon = new SqlConnection(sqlDataSource);
      return myCon;
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
