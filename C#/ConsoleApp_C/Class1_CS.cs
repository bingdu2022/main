using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp_C
{
  public class Class1_CS
  {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string fullName { get { return FirstName + " " + LastName; } }
    public string GetFullName()
    {
      return FirstName + " " + LastName;
    }

    //private property, coding conversion: start with lowercase or underscore
    string middleName = "Secret"; // equivalent to VB's private 

    //overridable: virtual public or public virtual
    virtual public string Output()
    {
      return $"this original output can be overrided.";
    }
    
  }

  public class Class2_CS: Class1_CS  //new Class2_CS inherits Class1_CS
  {
    public string myName { get; set; }
    public override string Output()
    {
      return base.Output().Replace("this","this overrided");
    }
  }

  public abstract class Class3_CS  //abstract class: can't be instantiated 
  {
    public string myName { get; set; }
  }

  public class Class3_CS_1 : Class3_CS
  {

  }

}
