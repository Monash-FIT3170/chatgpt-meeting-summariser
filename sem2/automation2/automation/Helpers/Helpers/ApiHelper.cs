using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers.Helpers
{
    public static class ApiHelper
    {
        static HttpClient client = new HttpClient();

        public static string ApiUri = "http://localhost:5000";

        public static async Task ResetTheWorld()
        {
            client.BaseAddress = new Uri(ApiUri);
            await client.PostAsync("/test/reset-the-world", null);
        }
    }
}
