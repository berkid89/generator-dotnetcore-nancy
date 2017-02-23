using Nancy;
using System;
using <%= applicationName %>.BusinessLogic.Services.Interfaces;
<% if (includeFormsAuth) { %>using Nancy.Authentication.Forms;
using Nancy.Security;
using <%= applicationName %>.BusinessLogic.Services;<% } %>

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

            <% if (includeFormsAuth) { %>
            Post("/login", args =>
            {
                var user = UserProvider.ValidateUser((string)this.Request.Form.Username, (string)this.Request.Form.Password);

                if (user == null)
                {
                    var error = new Response();
                    error.StatusCode = HttpStatusCode.UnprocessableEntity;
                    error.ReasonPhrase = "Invalid user name / password.";
                    return error;
                }

                return this.LoginAndRedirect(user.ID);
            });

            Get("/logout", args =>
            {
                return this.LogoutAndRedirect("~/");
            });

            Get("/secure", args =>
            {
                this.RequiresAuthentication();

                return Response.AsJson(new
                {
                    loggedInAs = Context.CurrentUser.Identity.Name
                });
            });
            <% } %>
        }
    }
}
