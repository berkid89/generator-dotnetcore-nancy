using <%= applicationName %>.Models;
using Nancy;
using Nancy.Authentication.Forms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace <%= applicationName %>.BusinessLogic.Services
{
    public class UserProvider : IUserMapper
    {
        private static List<User> users = new List<User>();

        static UserProvider()
        {
            users.Add(new User()
            {
                ID = new Guid("55E1E49E-B7E8-4EEA-8459-7A906AC4D4C0"),
                LoginName = "admin",
                Password = "pass"
            });

            users.Add(new User()
            {
                ID = new Guid("56E1E49E-B7E8-4EEA-8459-7A906AC4D4C0"),
                LoginName = "user",
                Password = "pass"
            });
        }

        public ClaimsPrincipal GetUserFromIdentifier(Guid identifier, NancyContext context)
        {
            var user = users.FirstOrDefault(u => u.ID == identifier);

            return user == null
                       ? null
                       : new ClaimsPrincipal(new GenericIdentity(user.LoginName));
        }

        public static User ValidateUser(string username, string password)
        {
            var user = users.FirstOrDefault(u => u.LoginName == username && u.Password == password);

            return user;
        }
    }
}
