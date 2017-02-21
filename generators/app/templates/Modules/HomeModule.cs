using Nancy;
using <%= applicationName %>.BusinessLogic.Services.Interfaces;

namespace <%= applicationName %>.Modules
{
    public class HomeModule : NancyModule
    {
        private readonly IHomeService homeService;

        public HomeModule(IHomeService homeSvc)
        {
            homeService = homeSvc;

            Get("/", args => homeService.SayHello());
        }
    }
}
