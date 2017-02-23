using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Nancy;
using Nancy.TinyIoc;
using <%= applicationName %>.BusinessLogic.Services;
using <%= applicationName %>.BusinessLogic.Services.Interfaces;
using System;
<% if (includeFormsAuth) { %>using Nancy.Bootstrapper;
using Nancy.Authentication.Forms;<% } %>

namespace <%= applicationName %>
{
    public class Bootstrapper : DefaultNancyBootstrapper
    {
        private readonly IAppSettings appSettings;
        private readonly IServiceProvider serviceProvider;
        public Bootstrapper()
        {
        }

        public Bootstrapper(IAppSettings appSet, IServiceProvider serviceProv)
        {
            appSettings = appSet;
            serviceProvider = serviceProv;
        }

        protected override void ConfigureApplicationContainer(TinyIoCContainer container)
        {
            base.ConfigureApplicationContainer(container);

            container.Register(appSettings);
            container.Register(serviceProvider.GetService<ILoggerFactory>());

            container.Register<IVersionService, VersionService>();
        }

        <% if (includeFormsAuth) { %>
        protected override void RequestStartup(TinyIoCContainer requestContainer, IPipelines pipelines, NancyContext context)
        {
            var formsAuthConfiguration =
                new FormsAuthenticationConfiguration()
                {
                    RedirectUrl = "~/ login",
                    UserMapper = requestContainer.Resolve<IUserMapper>(),
                };

            FormsAuthentication.Enable(pipelines, formsAuthConfiguration);
        }
        <% } %>
    }
}
