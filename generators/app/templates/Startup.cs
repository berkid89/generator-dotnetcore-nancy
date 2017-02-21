using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Nancy.Owin;
using <%= applicationName %>.Services;

namespace <%= applicationName %>
{
    public class Startup
    {
        private readonly IConfiguration config;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json")
                .SetBasePath(env.ContentRootPath)
                .AddEnvironmentVariables();

            config = builder.Build();
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory
                .AddConsole(config.GetSection("Logging"))
                .AddDebug();

            var appSettings = new AppSettings();
            ConfigurationBinder.Bind(config, appSettings);

            app.UseOwin(x => x.UseNancy(opt => opt.Bootstrapper = new Bootstrapper(appSettings, app.ApplicationServices)));
        }
    }
}
