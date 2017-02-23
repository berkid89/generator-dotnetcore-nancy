using Nancy;
using System;
using <%= applicationName %>.BusinessLogic.Services.Interfaces;

namespace <%= applicationName %>.Modules
{
    public class MainModule : NancyModule
    {
        private readonly IVersionService versionService;

        public MainModule(IVersionService versionServiceSvc)
        {
            versionService = versionServiceSvc;

            Get("/", args =>
            {
                return Response.AsJson(new
                {
                    app = versionService.GetApplicationName(),
                    version = versionService.GetApplicationVersion(),
                    time = DateTime.Now
                });
            });
        }
    }
}
