namespace <%= applicationName %>.BusinessLogic.Services.Interfaces
{
    public interface IVersionService
    {
        string GetApplicationVersion();

        string GetApplicationName();
    }
}
