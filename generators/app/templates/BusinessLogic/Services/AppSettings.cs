using <%= applicationName %>.BusinessLogic.Services.Interfaces;

namespace <%= applicationName %>.Services
{
    public class AppSettings : IAppSettings
    {
        public string Value1 { get; set; }

        public string Value2 { get; set; }

        public string Value3 { get; set; }
    }
}
