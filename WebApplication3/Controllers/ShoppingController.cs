using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
  public class ShoppingController : ApiController
  {
    public static List<Shopping> shoppingList;

    // GET: api/Shopping
    public List<Shopping> Get()
    {
      if (shoppingList is null) shoppingList=Shopping.CreateShoppingList();
      return shoppingList;
    }

    // GET: api/Shopping/5
    public Shopping Get(int id)
    {
      if (shoppingList is null) shoppingList=Shopping.CreateShoppingList();
      return shoppingList[id];
      //Or, replace the above with the below:
      //return shoppingList.Where(x => x.Id == id).FirstOrDefault();
    }

    // Customized GET: api/Shopping/Names
    [Route("api/Shopping/Names")]  //note the Names doesn't have to be the below GetShoppingNames. Also, /Shopping/ can be anything but it's better to use /Shopping/ here because it's easy to track by knowing it's from ShoppingController or belong to ShoppingController.
    [HttpGet]
    public List<string> GetShoppingNames()
    {
      if (shoppingList is null) shoppingList = Shopping.CreateShoppingList();
      return Shopping.GetShoppingNameList(shoppingList);
    }

    /// <summary>
    /// Searches one item in ShoppingList by both name and quantity
    /// </summary>
    /// <param name="name"></param>
    /// <param name="quantity"></param>
    /// <returns>one item</returns>
    // Customized GET: api/Shopping/SearchItemByNameQuantity with parameters of default string type and needed-naming-type int type
    [Route("api/Shopping/SearchItemByNameQuantity/{name}/{quantity:int}")] 
    [HttpGet]
    public Shopping GetShoppingItem(string name,int quantity)
    {
      if (shoppingList is null) shoppingList = Shopping.CreateShoppingList();
      return shoppingList.Where(x=>x.Name.ToLower()==name.ToLower() && x.Quantity==quantity).FirstOrDefault();
    }


    // POST: api/Shopping
    public void Post(Shopping val) // Post([FromBody] string value)
    {
      shoppingList.Add(val);
    }

    // PUT: api/Shopping/5
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE: api/Shopping/5
    public void Delete(int id)
    {
    }

  }
}
