using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Configuration;

namespace productivityPlanner.Services
{
    public class FirebaseService
    {
        public string firebaseConfig { get; set; }

        private const string BaseUrl = @"https://identitytoolkit.googleapis.com";
        private const string ApiKey = ConfigurationManager
        static async Task SignUp()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);
                var content = new FormUrlEncodedContent(new[]
                {
                new KeyValuePair<string, string>("email", "test@gmail.com"),
                new KeyValuePair<string, string>("password", "test@gmail.com"),
                new KeyValuePair<string, string>("returnSecureToken", "test@gmail.com")
            });
                var result = await client.PostAsync("/v1/accounts:signUp?key=[API_KEY]", content);
                string resultContent = await result.Content.ReadAsStringAsync();
                Console.WriteLine(resultContent);
            }
        }



    }
}
