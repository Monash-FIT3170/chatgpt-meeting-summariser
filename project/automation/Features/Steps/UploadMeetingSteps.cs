using Helpers.Enums;
using Pages.Pages;
using TechTalk.SpecFlow;

namespace Features.Steps;

[Binding]
public class UploadMeetingSteps
{
    private DashboardPage _dashboardPage;
    private string _fileName;

    public UploadMeetingSteps(DashboardPage dashboardPage)
    {
        _dashboardPage = dashboardPage;
    }

    [Given(@"I have a meeting in '([^']*)'")]
    public void GivenIHaveAMeetingIn(FileFormats formats)
    {

        var currentDirectory = Directory.GetCurrentDirectory();
        switch (formats)
        {
            case FileFormats.Mp4:
                _fileName = Path.Combine(currentDirectory,"Meetings/large.mp4");
                break;
        }
    }

    [When(@"I upload my meeting")]
    public void WhenIUploadMyMeeting()
    {
        _dashboardPage.ClickCreateNewMeeting();
        _dashboardPage.UploadFile(_fileName);
    }

    [Then(@"I can see a valid meeting summary")]
    public void ThenICanSeeAValidMeetingSummary()
    {
        _dashboardPage.WaitForMeetingText("During the meeting");
    }

}