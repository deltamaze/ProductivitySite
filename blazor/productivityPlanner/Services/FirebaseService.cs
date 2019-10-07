using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;

namespace productivityPlanner.Services
{
    public class FirebaseService
    {
        public string firebaseConfig { get; set; }

        private const string BaseUrl = @"https://identitytoolkit.googleapis.com/";

        static async Task SignUp()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);
                var content = new FormUrlEncodedContent(new[]
                {
                new KeyValuePair<string, string>("", "login")
            });
                var result = await client.PostAsync("/v1/accounts:signUp?key=[API_KEY]", content);
                string resultContent = await result.Content.ReadAsStringAsync();
                Console.WriteLine(resultContent);
            }
        }



    }
}
