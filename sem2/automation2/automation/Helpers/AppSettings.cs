using System.Configuration;

namespace Helpers;

public static class AppSettings
{
    public static string ApiUrl => ConfigurationManager.AppSettings["apiUri"]!;

    public static string BaseUrl => ConfigurationManager.AppSettings["baseUrl"]!;
}