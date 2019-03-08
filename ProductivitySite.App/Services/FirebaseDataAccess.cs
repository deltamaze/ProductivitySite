using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Cloud.Firestore;

namespace ProductivitySite.App.Services
{
    public class FirebaseDataAccess : IDataAccess 
    {
        [FirestoreData]
        public class FirebaseAppState
        {
            [FirestoreProperty]
            public string userId { get; set; }
            [FirestoreProperty]
            public string ToDo { get; set; }
        }

    }
}
