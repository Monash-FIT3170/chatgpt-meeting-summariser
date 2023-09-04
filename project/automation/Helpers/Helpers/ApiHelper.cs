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
        static HttpClient client = new HttpClient();

        private IConfiguration _config;


        public ApiHelper(IConfiguration config)
        {
            _config = config;
        }

        public async Task ResetTheWorld()
        {
            client.BaseAddress = new Uri(_config["apiUrl"]!);
            await client.PostAsync("/test/reset-the-world", null);
        }
    }
}
