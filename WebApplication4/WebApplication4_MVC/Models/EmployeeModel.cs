using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApplication4_MVC.Models
{
  public class EmployeeModel
  {
    [Display(Name = "ID")]
    [Range(100, 999, ErrorMessage = "You need to enter a valid EmployeeId.")]
    public int EmployeeId { get; set; }

    [Display(Name = "First Name")]
    [Required(ErrorMessage = "Must have your last name.")]
    public string FirstName {  get; set; }

    public string LastName { get; set; }

    [DataType(DataType.EmailAddress)]
    [Display(Name = "Email Address")]
    [Required(ErrorMessage = "Must enter your email address.")]
    public string EmailAddress {  get; set; }

    [Compare("EmailAddress", ErrorMessage = "The email and confirm email must match.")]
    public string ConfirmEmail { get; set; }

    [Display(Name = "Password")]
    [Required(ErrorMessage = "Must enter your passowrd.")]
    [DataType(DataType.Password)]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Password does not match.")]
    public string Password {  get; set; }

    public string ConfirmPassword { get; set;}
  }
}