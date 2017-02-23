using Nancy.Testing;
using <%= applicationName %>.Tests.TestHelpers;
using Xunit;

namespace <%= applicationName %>.Tests.Modules
{
    public class MainModuleTests : TestBase
    {
        [Fact(DisplayName = "VersionTest")]
        public void VersionTest()
        {
            var response = browser.Get("/", with =>
            {
                with.HttpRequest();
            });

            var info = response.Result.Body.AsString();

            Assert.False(string.IsNullOrEmpty(info));
        }
    }
}
