using Helpers.Enums;
using Helpers.Helpers;
using Microsoft.Extensions.Configuration;

namespace SharedData.DTOs;

public class WebPortalUnderTest
{
    private static WebPortalUnderTest _instance = null;

    
    public UserUnderTest UserUnderTest;
    public PageEnum currentPage { get; set; }
    
    public WebPortalUnderTest()
    {
        PopulateUserUnderTest();
        currentPage = PageEnum.Login;
    }

    public static WebPortalUnderTest GetInstance()
    {
        if (_instance == null)
        {
            _instance = new WebPortalUnderTest();
        }
        return _instance;
    }


    private void PopulateUserUnderTest()
    {
        UserUnderTest = new UserUnderTest()
        {
            UserName = AppConfiguration.DefaultUserName,
            Password = AppConfiguration.DefaultPassword,
        };
    }
}