using Microsoft.Extensions.Configuration;
using Nancy.Bootstrapper;
using Nancy.Testing;
using <%= applicationName %>.Services;
using System;
using System.IO;
using System.Reflection;

namespace <%= applicationName %>.Tests.TestHelpers
{
    public abstract class TestBase
    {
        private IConfiguration config { get; set; }
        protected INancyBootstrapper bootstrapper { get; set; }
        protected Browser browser { get; set; }

        public TestBase()
        {
            var location = typeof(TestBase).GetTypeInfo().Assembly.Location;
            var directory = Path.GetDirectoryName(location).Split(new string[] { "bin" }, StringSplitOptions.None);

            var builder = new ConfigurationBuilder()
                .AddJsonFile(Path.Combine(directory[0], "appsettings.Test.json"));

            config = builder.Build();

            var appSettings = new AppSettings();
            ConfigurationBinder.Bind(config, appSettings);

            bootstrapper = new Bootstrapper(appSettings, new MockServiceProvider());
            browser = new Browser(bootstrapper);
        }
    }
}
