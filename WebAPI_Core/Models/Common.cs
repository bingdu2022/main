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
using Microsoft.AspNetCore.Http;

namespace WebAPI_Core.Models
{
  public class Common
  {
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _evn;
    public Common(IConfiguration configuration)   // Equivalent to vb Sub New(.) 
    {
      _configuration = configuration;
    }
    public Common(IConfiguration configuration, IWebHostEnvironment evn)  // = vb sub new (.)
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

    public string AppPath()  // Get the physical path to the web root or home directory area of web app on server
                             // Web root vs home root: https://www.rochen.com/docs/documentation/full-physical-path-to-your-home-web-root-directory/
    {
      return _evn.ContentRootPath + "\\";  // i.e. C:\\bingdu2022.main\\WebAPI_Core\\
    }
    public string GetFilePath(string filePathRelativeToRoot)   // Web root folder + a file path relative to web root
    {
      return AppPath() + filePathRelativeToRoot;     //i.e. C:\\bingdu2022.main\\WebAPI_Core\\Images\\
    }

    public void UploadFiles(IFormCollection collection, string fileNameColumn = "")
    {
      if (fileNameColumn.Length > 0) { fileNameColumn = $", {fileNameColumn} = "; };
      try
      {
        IFormFile file = null;
        string fileName = null;
        string setFileNameTo = null;

        foreach (var item in collection.Files)
        {
          file = item;
          fileName = item.FileName;
          if (file.Length <= 0) continue;
          setFileNameTo = "";
          if (fileNameColumn.Length > 0) { setFileNameTo = $"{fileNameColumn} '{fileName}' "; }

          using (System.IO.Stream fileStream = file.OpenReadStream())
          {
            string whereClause = $" employeeid = {item.Name}";
            PutBlob("dbo.employee", "image", whereClause, fileStream, setFileNameTo);
            //byte[] bytes = new byte[file.Length];
            //fileStream.Read(bytes, 0, (int)file.Length);
          }
        }
      }
      catch (Exception e)
      {
        Console.WriteLine(e.Message);
      }

    }

    public void PutBlob(string tableName, string columnName, string whereClause, System.IO.Stream dataStream,string fileNameColumn="")
    {
      if (!whereClause.ToLower().TrimStart().StartsWith("where")) { whereClause = " where " + whereClause; };
      if (fileNameColumn.Length >0 && !fileNameColumn.TrimStart().StartsWith(",")) { _ = ", " + fileNameColumn; };

      string query = $"update {tableName} set {columnName} .WRITE(@bytes, @offset, @length) {fileNameColumn} {whereClause}";

      using (SqlConnection cn = Connection()) // The cn connection is automatically closed at the end of the using block.
      {
        cn.Open();

        //If the varbinary cell of a table is initialized with null, the .Write will fail with "Mutator 'write()' on 'Image' cannot be called on a null value".
        //So, always set the cell value to 0x0 first if it's null before updating the cell with a new varbinary
        string queryNull = $"update {tableName} set {columnName} = 0x0 {whereClause} and image is null; ";
        query = queryNull + query;

        IDbCommand cmd = cn.CreateCommand();
        IDbDataParameter offsetParm = cmd.CreateParameter();
        offsetParm.ParameterName = "@offset";
        offsetParm.Value = 0;
        offsetParm.DbType = DbType.Int32;
        cmd.Parameters.Add(offsetParm);
        IDbDataParameter lengthParm = cmd.CreateParameter();
        lengthParm.ParameterName = "@length";
        lengthParm.Value = dataStream.Length;
        lengthParm.DbType = DbType.Int32;
        cmd.Parameters.Add(lengthParm);
        IDbDataParameter bytesParm = cmd.CreateParameter();
        bytesParm.ParameterName = "@bytes";
        bytesParm.DbType = DbType.Binary;
        byte[] bytes = new byte[dataStream.Length];
        dataStream.Read(bytes, 0, (int)dataStream.Length);
        bytesParm.Value = bytes;
        cmd.Parameters.Add(bytesParm);

        cmd.CommandText = query;
        cmd.ExecuteNonQuery();
      }
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
