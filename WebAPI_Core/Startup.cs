using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.FileProviders; //bd: for configuring FileProvider = new PhysicalFileProvider(.)
using System.IO;                           //bd: for configuring FileProvider = new PhysicalFileProvider(.)

namespace WebAPI_Core
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {

      // bd: nable CORS: from 'VS2019-Learn React JS and .NET Core API by Creating a Full Stack Web App from Scratch.mp4'
      services.AddCors(c => {
        c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
      });
      //JSON Serializer: set it as default and need Newtonsoft package to do the below
      // Right-click on Solution, select Manage NuGet ..., search mvc.newtonsoft, select Miscrosoft.AspNetCore.Mvc.NewtonsoftJson: version 3.1.9
      services.AddControllersWithViews()
        .AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft
      .Json.ReferenceLoopHandling.Ignore)
        .AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver
        = new DefaultContractResolver());

      services.AddControllers();

    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      // bd: Enable CORS: from 'VS2019-Learn React JS and .NET Core API by Creating a Full Stack Web App from Scratch.mp4'
      app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseHttpsRedirection();

      app.UseRouting();

      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllers();
      });

      // bd: I added /Images/ folder under the project, so I need to add a instruction here:
      app.UseStaticFiles(new StaticFileOptions
      {
        FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(),"Images")),
        RequestPath="/Images"
      });
    }
  }
}
