using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;


namespace ConsoleApp_C  //group things for organization: namespace > classes > members > methods > statements
{
  class Program
  {
    //static: can call it directly, e.g. WriteLine() is a static method and we can use it like System.Console.WriteLine(). 
    //If it's non-static (call it as instance method), you need to create an instance of it first and then use its methods & properties.
    //instance method: First, object obj1 = new object(), and then object.Equals(...)
    //If a class is static, all of its memebers must be static and any of the members can be called directly. Console is an example of static class
    //public static class xxx = vb's public shared class xxx
    //var cannot be used to define static members


    static void Main(string[] args)  // a method: Main is required and a start method for a C# project and invoked automatically
    {

      //Debug outputs to Immediate Window
      //Debug.Print or WriteLine
      Debug.WriteLine(double.MaxValue); //not need to convert as you do in Debug.Print
      Debug.Print(Convert.ToString(double.MaxValue)); // need a conversion

      //Console outputs to CMD window like the output of doing exe
      Console.WriteLine("Hellow World");

      //Use \ as escape in string, char or @, or as a way to write special symbols/keys in a string, i.e. \t for Tab key
      Debug.WriteLine(int.MaxValue + "\t" + int.MinValue); //2147483647	-2147483648
      // \' \" \n \t \\ \0=null
      string ss1 = "hello my 'name' is \"Caleb\"";
      char letter1 = '\''; // can't do =''';
      char letter2 = '"'; //  good
      string ss2 = @"hello my 'name' is ""Caleb"""; // @".." doesn't work with escape\ or prints \t as \t etc.
      Debug.WriteLine(ss2);

      //Value types (store in stack): int, bool, enum types: enum E {...}, struct types: struct S {...} 
      //Reference types (store in heap): class types, string, interface I {...}, Array types: int[], Delegate types: delegate int D(...)

      //string strCmdText;
      ////For Testing
      //strCmdText = "/K ipconfig";
      //System.Diagnostics.Process.Start("CMD.exe", strCmdText);

      System.Console.WriteLine(); //fully qualified name
      System.Diagnostics.Debug.Print("Hellow");
      Console.WriteLine("Hellow World");
      //List<int> list1;

      //Program myPro = new Program();
      //myPro.MyPrint();

      var x = Console.ReadLine(); // = string x=Console.ReadLine(). 
      //var is for any types of variable and depends on the right side of =.

      Console.WriteLine($"Your input is {x}");

      int integerOrint32 = 5;  //integerOrint32: variable name or identifier and can't start with any number, e.g. 2x is invalid variable. _x33 is legal
      // variable is case-sensitive, e.g. int x=5; differ int X=5;

      int? y = null; //nullable type y is defined as int and can be null, and doesn't have a value in its initialization
      Console.WriteLine(y);// doesn't give an error

      //char in C# is 16bit which can do UNICODE symbols. In comparison, ASCII is 8bit and hold up to 255 characters.
      var c1 = 'C'; //'C' is character vs "C" is string
      char c2 = 'c';
      int inta = 'a';// =97 because a's Dec =97
      int intA = 'A';// =65 because A's Dec =65
      char c3 = (char)97; // c3=a or 97'a'

      uint positiveI = 5;//uint can't be negative

      //double is 64bit while float is 32bit. If memory is tight and 32bit is enough for number, use float. Most time, double is used.
      float f1 = 5.5f; //5.5 is not valid and must be 5.5f, or 
      float f2 = (float)5.5; //or must have explicit cast (float)
      double d1 = 5.5;  //double (64bit) can contain 'large' things, so doesn't need an ending.
                        //double.IsNaN: is not number

      //use type's methods
      double d2 = double.NaN; // = d2=NaN or not number

      //use Math. If intel. disappears and want to see it again, ctrl+shift+spacebar at inside () of Math.round() to show it again 
      Debug.WriteLine(Math.Round(50.5));// 50. Note it rounds to a nearest number or banker rounding or MidpointRounding.ToEven
      Debug.WriteLine(Math.Round(50.5, 0, MidpointRounding.AwayFromZero));// 51. Note it rounds to a nearest number or banker rounding
      Debug.WriteLine(Math.Ceiling(50.1));// 51.
      Debug.WriteLine(Math.Floor(50.9));// 50.
      Debug.WriteLine(Math.Truncate(50.9));// 50

      decimal de1 = 5.5m; //must end with m
      bool b1 = true; //boolean
      string s1 = "string";

      //array in C# is reference type
      int[] i2 = { 1, -5 };
      Console.WriteLine(i2[0]);
      //Debug.Print($"{i2[0].ToString} {i2[1].ToString}" );
      int[] i3 = i2;
      Console.WriteLine(i3[0]);
      i3[0] = -1; //changing i3 changes i2 due to reference type
      Debug.Print($"{Convert.ToString(i2[0])}, {Convert.ToString(i2[1])}");

      //built-in type: aliases vs .net framework, e.g. bool vs System.Boolean
      //string x; = System.String x;

      //explicit casting
      int i4 = (int)5.999; // i4=5
      //wrong:  int i5 = 5.5;
      double d3 = 5; //it's correct: = 5. double is 64bit while float is 32bit

      //string - reference type (conceptual or save memory) but differs array reference type
      string s2 = "abc";
      string s3 = s2;
      s2 += "\t123"; // = abc\t123
      Debug.WriteLine(s2); // abc	123
      Debug.WriteLine(s3); // abc. It means changing s2 doesn't change s3 though string is reference type

      //char array vs string
      char[] cr1 = { 'l', 'e', 't' };
      string s4 = new string(cr1);
      Debug.WriteLine(s4.CompareTo("let")); //0 = true
      Debug.WriteLine(s4.CompareTo("met")); //-1 = false m is after l 
      Debug.WriteLine(s4.CompareTo("get")); //1 = false  g is before l
      char[] cr2 = s4.ToCharArray(); //={ 'l', 'e', 't' } or [108'l', 101'e', 116't'
      string[] sa1 = "I am   a".Split(' '); //{I,am, , ,a}
      string[] sa2 = "I am   a".Split(' ', ((char)StringSplitOptions.RemoveEmptyEntries)); //{I,am, , ,a}
      string[] sa3 = "I am   a".Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries); //{I,am, , ,a}
      var sa4 = "I am   a".Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()); // System.Collections.Generic.IEnumerable<string>
      string[] sa5 = "I am   a".Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries).Select(s => s.Trim()).ToArray();//{I,am,a}

      //class properties and method
      Class1_CS class1 = new Class1_CS();
      class1.FirstName = "Caleb";
      class1.LastName = "Curry";

      Debug.WriteLine(class1.GetFullName());
      Debug.WriteLine(class1.fullName);  // not fullName() becuase it's a property and not function

      //control
      if (class1.FirstName == "Caleb")  //js may use ===
      {
        Debug.WriteLine("You got the name and win");
      } else if (class1.LastName != "Curry")
      {

      }
      else { };

      int ii1 = 3;
      if (ii1 >= 4 && ii1 < 100)
      {
        Debug.WriteLine(ii1);
      } else if (ii1 == 2 || ii1 < -1 || !(ii1 != 5))
      {
        Debug.WriteLine(ii1);
      } else
      {

      };

      if (ii1 == 3) ii1 = 4;

      //expression? true: false
      bool correct = true;
      int pointsEarned = correct ? 10 : 0;
      Debug.WriteLine(pointsEarned);

      //switch
      string ss4 = "Caleb";
      switch (ss4)
      {
        case "Caleb":
          break;
        case "Cal":
          return;  //goes out of the method: Main
        default:
          break;
      };

      //loops-------------------------------------------------------
      int wi1 = 0;
      while (wi1 < 2)
      {
        wi1++;
      };
      int dw1 = 0;
      do {
        dw1++;
      } while (dw1 < 2);
      for (int i5 = 0; i5 < 2; i5++)
      {

      }
      for (int i5 = 2; i5 > -1; i5--)
      {

      }

      for (int k = 0; k < 2; k++)
      {
        for (int j = 3; j > -1; j -= 2)
        {
          if (j == 1) break; // out of its loop and continue its outter loop
          if (j == 3) continue; //continue the next j value in its loop, or go back to its next move in for (...)
          Debug.WriteLine("k: " + k + " j: " + j);
        };
      };

      //array
      int[] grades = new int[3]; //initial values = [0,0,0]
      grades[0] = 1;
      int[] grades1 = { 1, 5, 3 };  //initialize array during defining. Wrong: grades = { 1, 2, 3 }
      string[] namesS = { "n1", "l2", "n3" };
      object[] obj1 = { "o1", 2, 3.4 };
      Array.Sort(grades1);
      Array.Sort(namesS);
      double[] dub1 = { 1, 8, 6.5 };
      Debug.WriteLine(Array.IndexOf(dub1, 4)); //1
      double[] dub2 = { 1, 8, 6.5 };
      bool eql = dub1 == dub2; //false: wrong - why: can't directly compare two arrays.
      eql = System.Linq.Enumerable.SequenceEqual(dub1, dub2);// true - a right way to compare two arrays

      int[,] gra2 = new int[2, 3];  //2 dimentions
      int[,] gra3 = { { 1, 2 }, { 1, 3 } }; //define and initailize 
      int[][] gra4 =  //jaggered array
      {
        new int[]{1,2 },
        new int[]{2,6,8,9 },
        new int[]{1 }
      };
      Debug.WriteLine(gra2.Length); //6
      Debug.WriteLine($"Rows: {gra2.GetLength(0)} vs Cols: {gra2.GetLength(1)}"); // Rows: 2 vs Cols: 3
      Debug.WriteLine(gra3.Length); //4
      Debug.WriteLine(gra4.Length); //3 = the number of rows
      Debug.WriteLine(gra4[0].Length); //2 = the number of elements of Row 0

      for (int j = 0; j < gra4.Length; j++)
      {
        for (int k = 0; k < gra4[j].Length; k++)
        {
          Debug.Write(gra4[j][k] + " ");
        }
        Debug.WriteLine("");
      }

      //List
      List<int> lst1 = new List<int>();
      lst1.Add(4); lst1.Add(2);
      Debug.WriteLine(lst1[0]);//4
      List<int> lst2 = new List<int> { 3, 2 }; //define and initialize. Can't do: = {3, 2};
      lst2.Insert(1, 5); // = {3,5,2}
      lst2.Remove(5);// = {3,2}
      lst2.RemoveAt(1); // = {3}
      List<int> lst3 = new List<int> { 3 };
      bool compareLst2_3 = lst2.Equals(lst3); //false: wrong - can't compare Lists in this way
      compareLst2_3 = Enumerable.SequenceEqual(lst2, lst3); // true - a correct way to compare two lists
      foreach (int g in lst1)  //when to use foreach: if you don't change the member of a list
      {
        Debug.WriteLine(g);  //can't edit g. Can use for () loop to edit members of lst1
      };
      List<List<int>> lst2Dimention = new List<List<int>>()
      {
        new List<int>{2,1,4 },
        new List<int>{5,1,6,7,9}
      };
      Debug.WriteLine(lst2Dimention[0][2]);
      foreach (List<int> l in lst2Dimention)
      {
        Debug.WriteLine(l.Count);  //3 and 5
        foreach (int g in l)
        {
          Debug.WriteLine(g);
        }
      }

      //conversion between list and array
      List<int> lst4 = new List<int> { 3, 2 };
      int[] convert1 = lst4.ToArray();
      List<int> lst5 = convert1.ToList();
      //sort
      lst4.Sort();//2,3
      lst4.Reverse();//3,2

      //OOP: object oriented programming
      //class vs object: an object = one instantiation of a class 

      var chld1 = new Child1();
      chld1.Name = "Caleb";
      chld1.Grade = 100;
      chld1.Method1(2);
      Debug.WriteLine(chld1.Profile);

      Child1 chld2 = new Child1();
      chld2.Name = "B";
      chld2.Grade = 50;
      List<Child1> lst_child1 = new List<Child1>();
      lst_child1.Add(chld1); lst_child1.Add(chld2);
      foreach (Child1 c in lst_child1)
      {
        Debug.WriteLine(c.Name);
      }

      //List: initialize
      List<string> list1 = new List<string>() { "b1", "a1" };

      //static use
      Child1.Pub_chi1(new int[] { 4, 1 }); // can see public static but not non-public

      //optional parameters
      Child1.Output();

      //overwrite
      Debug.WriteLine(chld1.ToString());
      Debug.WriteLine(chld1.Equals(chld2));  //false because chld1.name <> chld2.name by comparing chld1 to chld2 in my own way
      Debug.WriteLine(chld1.Equals("Caleb"));  //false because chld1 is child1 type and "Caleb" is string type

      //overload
      Child1.Pub_chi1(new string[] { "B", "A" }); //overload of child1.pub_chi1(new int[] { 4, 1 });

      //object arguments - reference type
      Child2 cx = new Child2();
      cx.Name = "old one";
      ObjTest(cx);
      Debug.WriteLine(cx.Name); //"changed new" which is changed from "old one" by ObjTest();

      //inheritance
      Class2_CS cl2 = new Class2_CS();
      cl2.myName = "New";
      cl2.FirstName = "Caleb";

      //can't instantiate abstract class
      // Class3_CS cl3 = new Class3_CS(); // this is wrong to try to instantiate the abstract Class3_CS class.

      //when a class inherits a abstract class, it Must override the abstract method of the abstract class.
      //The abstract method in the abstract class can't have a body or can just have a method name.
      //See Child5 inherit Child4

      //polymophisim
      Class1_CS_A teacher1 = new Class1_CS_A();
      teacher1.FirstName = "Teacher 1";
      Class1_CS_B student1 = new Class1_CS_B();
      student1.FirstName = "Student 1";
      List<Class1_CS> class1_cs_list1 = new List<Class1_CS>() { teacher1, student1 };
      foreach (Class1_CS people in class1_cs_list1)
      {
        Debug.WriteLine(people.FirstName);
      }

      //constructor
      Child2 chld_2constructor = new Child2("Caleb", "Curry");
      Debug.WriteLine(chld_2constructor.fullName);

      //ReadOnly property
      Debug.WriteLine(chld_2constructor.firstName); //the readOnly firstName property can be read but can't be changed in an object (chld_2constructor)
      //chld_2constructor.firstName = "Bing"; //it gives an error because chld_2constructor.firstName is readOnly

      //interface
      IDoWork I_IDo = new I_class1(); //Treat IDoWork as a type only over a class which implements the IDoWork interface
      I_IDo.Title = "Iinterface title";
      Debug.WriteLine(I_IDo.Title);
      Debug.WriteLine(((I_class1)I_IDo).Name); //access the properties of the class of implementing IDoWork

    }

    //interface
    public class I_class1 : Child1, IDoWork  //, IDoWork means implement IDoWork interface, so it must implement void IDoWork.Connection etc.
    {
      public string Title { get; set; }
      void IDoWork.Connection()
      {
        throw new NotImplementedException();
      }

      public string 
    }

    void MyPrint()  //void: don't return anything, equivalent to vb Sub()
    {
      System.Diagnostics.Debug.Print("Hellow");
      Console.WriteLine("Hellow World from MyPrint");

    }

    public static void ObjTest(Child2 x) //equivalent to vb public shared Sub()
    {
      x.Name = "changed new"; //object arguments - reference type
    }

    public class Child2
    {
      public string Name { get; set; }
      public string fullName { get; set; }
      public string firstName { get; }

      public Child2() { }  //always create this default constructor without passing in args if needed when any types of other constructors are created like the below one

      public Child2(string firstName, string lastName)
      {
        fullName= firstName + ", " + lastName;
        Name = firstName;
        this.firstName = firstName;
      }

    }
 
    public abstract class Child4
    {
      public string Name { get; set; }
      public abstract void PringName(); //void PringName; is wrong and MUST have () which means method or not field or property
    }

    public class Child5 : Child4   //Must override the abstract method in the inherited abstract class
    {
      public override void PringName()  //Must implement the abstract method of the inherited abstract class
      {
        throw new NotImplementedException();
      }
    }

    public class Class1_CS_A : ConsoleApp_C.Class1_CS
    {
      public string Teacher { get; set; }
    }

    public class Class1_CS_B : ConsoleApp_C.Class1_CS
    {
      public string Student { get; set; }

    }

    
  }

  public class Child1
  {
    public string Name { get; set; } //naming convention: capital first letter for public type: Name

    double _grade = 0;  //default value
    public double Grade
    {
      get
      {
        return _grade;
      }
      set
      {
        _grade = value;
      }
    }
    public string Profile
    {
      get
      {
        return $"My name is {Name} and my grade is {Grade}.";
      }
    }

    static void Chi1(string[] args)
    {
      Debug.WriteLine(args[0]);
    }

    public static void Pub_chi1(int[] args)  //pub_chil has 2 overload methods
    {
      Debug.WriteLine(args[0]);
    }
    public static void Pub_chi1(string[] args)  //pub_chil has 2 overload methods
    {
      Debug.WriteLine(args[0]);
    }

    public void Method1(int times)
    {
      for (int i0 = 0; i0 < times; i0++)
      {
        Debug.WriteLine($"My name is {Name} and my grade is {Grade}.");
      }
    }

    public static string Output(int times = 1)  // int times is optional like VB's Output(optional times as integer =1)
    {
      Debug.WriteLine(times);
      return Convert.ToString(times);

    }

    public override string ToString()
    {
      //return base.ToString();
      return "override ToString()";
    }

    public override bool Equals(object obj)   //overrite Equals() of an object
    {
      //return base.Equals(obj);
      if (this.GetType().Equals(obj.GetType()) && ((Child1)obj).Name == Name) return true; //I define it's true as long as my name = obj's name regardless other properties etc.
      return false;
    }

    public override int GetHashCode()  //should do it after overrite bool Equals() ...
    {
      return base.GetHashCode();
    }
  }

  public interface IDoWork  //can be used as a type only over a class which implements the interface 
  {
    string Title {get;set; }
    void Connection();


  }
}


