using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using productivityPlanner.Models;
using System.IO;
using productivityPlanner.Secrets;
using productivityPlanner.Models;

namespace productivityPlanner.Services
{
    public class FirebaseService
    {
        //using this class for actions, and appstate as the end store. 
        //compoenent will call actions, then pass returned value to state, then redirect user to other page if needed
        private FirebaseConfig config = new FirebaseConfig();


        private const string BaseUrl = @"https://identitytoolkit.googleapis.com";
        public async Task<string> SignUp(SignUpModel signUpModel)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(BaseUrl);
                var content = new FormUrlEncodedContent(new[]
                {
                new KeyValuePair<string, string>("email", signUpModel.Email),
                new KeyValuePair<string, string>("password", signUpModel.Password),
                new KeyValuePair<string, string>("returnSecureToken", "")
            });
                var result = await client.PostAsync("/v1/accounts:signUp?key="+ config.ApiKey, content);
                string resultContent = await result.Content.ReadAsStringAsync();
                return resultContent;
            }
        }



    }
}
