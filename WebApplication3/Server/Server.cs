using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Mail;
using System.Net.Mime;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mail;
using Newtonsoft.Json;
using SendGrid;
using SendGrid.Helpers.Mail;
using SendGrid.Helpers.Mail.Model;

namespace WebApplication3.Server
{
  public class SendGridService
  {
    private const string SendGridApiKey = "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"; // "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"; //   "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";
    private const string SendGridApiUrl = "https://api.sendgrid.com/v3/mail/send";

    // all the below SendEmailAsync, SendEmailAsync2, SendEmailAsync3 work but the SendEmailAsync3 is the best since it's simple, straightforward and free.

    public static async Task SendEmailAsync()
    {
      // Replace these values with your actual data
      var fromEmail = "bingduus2023@hotmail.com";
      var toEmail = "bingduus@gmail.com";
      var subject = "Your Subject Here";
      var emailContent = "Your email content here.";

      using (var httpClient = new HttpClient())
      {
        httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {SendGridApiKey}");

        var emailData = new
        {
          personalizations = new[]
            {
                    new
                    {
                        to = new[] { new { email = toEmail } },
                        subject = subject
                    }
                },
          content = new[]
            {
                    new
                    {
                        type = "text/plain",
                        value = emailContent
                    }
                },
          from = new
          {
            email = fromEmail
          }
        };

        var jsonContent = Newtonsoft.Json.JsonConvert.SerializeObject(emailData);
        var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

        try
        {
          var response = await httpClient.PostAsync(SendGridApiUrl, httpContent);

          if (response.IsSuccessStatusCode)
          {
            Console.WriteLine("Email sent successfully!");
          }
          else
          {
            Console.WriteLine($"Error sending email: {response.StatusCode} - {await response.Content.ReadAsStringAsync()}");
          }
        }
        catch (Exception ex)
        {
          Console.WriteLine($"Error sending email: {ex.Message}");
        }
      }
    }

    public static async Task SendEmailAsync2()
    {
      // the below of using apikey is not good way since the app stuck in getting the apiKey from the location computer
      //var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY1"); // NAME_OF_THE_ENVIRONMENT_VARIABLE_FOR_YOUR_SENDGRID_KEY");

      //foreach (KeyValuePair<string,string> variable in Environment.GetEnvironmentVariables())
      //{
      //  Console.WriteLine($"{variable.Key}: {variable.Value}");
      //}

      var client = new SendGridClient(SendGridApiKey);
      var from = new EmailAddress("bingduus2023@hotmail.com", "Example User");
      var subject = "Sending with SendGrid is Fun";
      var to = new EmailAddress("bingduus@hotmail.com", "Example User");
      var plainTextContent = "and easy to do anywhere, even with C#";
      var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
      var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
      try
      {

        var response = await client.SendEmailAsync(msg).ConfigureAwait(false);

        if (response.IsSuccessStatusCode)
        {
          Console.WriteLine("Email sent successfully!");
        }
        else
        {
          Console.WriteLine($"Error sending email: {response.StatusCode} - {await response.Body.ReadAsStringAsync()}");
        }
      }

      catch (Exception ex)
      {
        Console.WriteLine($"Error sending email: {ex.Message}");
      }
    }

    public static async Task SendEmailAsync3()
    {
      // Set your SMTP server details
      string smtpServer = "smtp.office365.com";
      int smtpPort = 587; // Use the appropriate port for your SMTP server
      string smtpUsername = "bingduus@hotmail.com";
      string smtpPassword = "D197311j";

      // Set sender and recipient email addresses
      string senderEmail = "bingduus@hotmail.com";   //"noreply@hotmail.com"; Note that using noreply@hotmail.com can test Error sending email: ...
      string recipientEmail = "bingduus2023@hotmail.com";

      // Create a MailMessage object
      System.Net.Mail.MailMessage mailMessage = new System.Net.Mail.MailMessage(senderEmail, recipientEmail)
      {
        Subject = "Test Email",
        Body = "This is a test email."
      };
            System.Net.Mail.Attachment attachment = new System.Net.Mail.Attachment("path",MediaTypeNames.Application.Zip);
      mailMessage.Attachments.Add(attachment);

      // Create a SmtpClient object
      SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort)
      {
        Credentials = new NetworkCredential(smtpUsername, smtpPassword),
        EnableSsl = true // Use SSL if your SMTP server requires it
      };
      // or use the below code to use . and intelliSense to quickly find out what properties smtpClient has
      //SmtpClient smtpClient = new SmtpClient(smtpServer, smtpPort);
      //smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
      //smtpClient.EnableSsl = true; // Use SSL if your SMTP server requires it

      try
      {
        // Asynchronously send the email
        await smtpClient.SendMailAsync(mailMessage);
        Console.WriteLine("Email sent successfully.");

      }
      catch (Exception ex)
      {
        Console.WriteLine($"Error sending email: {ex.Message}");
        throw new Exception($"Error sending email: {ex.Message}");  // to ensure the exception is propagated up the call stack. Without it, it goes back as success after await SendGridService.SendEmailAsync3();

      }

    }
  }
}
