using Microsoft.Extensions.Logging;
using <%= applicationName %>.BusinessLogic.Services.Interfaces;

namespace <%= applicationName %>.BusinessLogic.Services
{
    public class HomeService : IHomeService
    {
        private readonly IAppSettings appSettings;
        private readonly ILogger<HomeService> logger;

        public HomeService(IAppSettings appSet, ILoggerFactory loggerFactory)
        {
            appSettings = appSet;
            logger = loggerFactory.CreateLogger<HomeService>();
        }

        public string SayHello()
        {
            logger.LogDebug(appSettings.Value1);
            return "Hello World, it's Nancy on .NET Core";
        }
    }
}
