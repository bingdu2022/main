using API.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Core.Controllers
{
  public class PeopleController : ApiController
  {
    List<Person> people = new List<Person>();

    /// <summary>
    /// Get/post/put/delete people info
    /// </summary>
    public PeopleController()
    {
      people.Add(new Person { FirstName = "Bing", LastName = "Du", Id = 1 });
      people.Add(new Person { FirstName = "t", LastName = "t", Id = 2 });
    }
    // GET: api/People
    /// <summary>
    /// Gets a person info.
    /// </summary>
    /// <returns></returns>
    public List<Person> Get()
    {
      return people;
    }

    // GET: customized
    [Route("api/people/firstNames/{userId:int}/{user_firstname}")]
    [HttpGet]
    public List<string> GetFirstNames(int userId, string user_firstname)
    {
      List<string> output = new List<string>();
      foreach (Person person in people)
      {
        if (person.Id == userId && user_firstname == "b") continue;

        output.Add(person.FirstName);
      }
      return output;
    }

    // GET: api/People/5
    public Person Get(int id)
    {
      return people.Where(x => x.Id == id).FirstOrDefault();
    }

    // POST: api/People
    public void Post(Person val)
    {
      people.Add(val);
    }

    // PUT: api/People/5
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE: api/People/5
    public void Delete(int id)
    {
      people.RemoveAt(id);
    }
  }
}
