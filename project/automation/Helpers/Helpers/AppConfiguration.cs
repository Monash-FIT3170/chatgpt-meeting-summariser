using System.Configuration;
using Microsoft.Extensions.Configuration;

namespace Helpers.Helpers;

public class AppConfiguration
{
    private static IConfiguration _config = null!;

    public static void Initialize(IConfiguration Configuration)
    {
        _config = Configuration;
    }


    public static string DefaultUserName => _config["defaultUsername"]!;
    public static string DefaultPassword => _config["defaultPassword"]!;
    public static string ApiUrl => _config["ApiUrl"]!;
    public static string WebPortalAddress => _config["webPortalAddress"]!;
}