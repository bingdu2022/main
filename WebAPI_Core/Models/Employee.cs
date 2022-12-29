using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI_Core.Models
{
  public class Employee
  {
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; }
    public string Department { get; set; }
    public string DateOfJoining { get; set; }
    public string PhotoFileName { get; set; }

    public string Names { get; set; }  // For deleting multi records whose EmployeeName in 'Names', i.e. Names = "name1,name2" etc.

  }
}
