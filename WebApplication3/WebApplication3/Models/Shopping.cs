using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication3.Models
{
  public class Shopping
  {
    public Int64 Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }

    public static List<Shopping> CreateShoppingList()
    {
      List<Shopping> ShoppingList = new List<Shopping>();
      ShoppingList.Add(new Shopping { Id = 0, Name = "Cookie", Quantity = 2 });
      ShoppingList.Add(new Shopping { Id = 1, Name = "Fruit", Quantity = 3 });
      return ShoppingList;
    }

    public static List<string> GetShoppingNameList(List<Shopping> shoppingList)
    {
      List<string> ShoppingNameList = new List<string>();
      foreach (Shopping item in shoppingList)
      {
        ShoppingNameList.Add(item.Name);
      }
      
      return ShoppingNameList;
    }
  }
}