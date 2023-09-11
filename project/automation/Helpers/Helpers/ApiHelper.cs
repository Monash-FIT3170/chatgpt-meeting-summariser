using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Helpers.Helpers
{
    public class ApiHelper
    {
        private readonly HttpClient _client;

        public ApiHelper()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri(AppConfiguration.ApiUrl);
        }

        public async Task ResetTheWorld()
        {
            
            await _client.PostAsync("/test/reset-the-world", null);
        }
    }
}
