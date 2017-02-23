using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using <%= applicationName %>.BusinessLogic.Services.Interfaces;

namespace <%= applicationName %>.BusinessLogic.Services
{
    public class VersionService : IVersionService
    {
        private readonly IAppSettings appSettings;
        private readonly ILogger<VersionService> logger;

        public VersionService(IAppSettings appSet, ILoggerFactory loggerFactory)
        {
            appSettings = appSet;
            logger = loggerFactory.CreateLogger<VersionService>();
        }

        public string GetApplicationVersion()
        {
            logger.LogDebug(appSettings.Value1);

            return PlatformServices.Default.Application.ApplicationVersion;
        }

        public string GetApplicationName()
        {
            return PlatformServices.Default.Application.ApplicationName;
        }
    }
}
