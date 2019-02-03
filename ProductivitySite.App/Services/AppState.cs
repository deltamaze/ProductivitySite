﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ProductivitySite.App.Services
{
    public class AppState
    {
        // reference : https://github.com/aspnet/samples/blob/master/samples/aspnetcore/blazor/FlightFinder/FlightFinder.Client/Services/AppState.cs
        // Actual state

        // Lets components receive change notifications
        // Could have whatever granularity you want (more events, hierarchy...)
        public event Action OnChange;

        // Receive 'http' instance from DI
        public AppState()
        {
            
        }
        

        public void ExampleAction()
        {
            //insert coe that will update state
            NotifyStateChanged();
        }

        private void NotifyStateChanged() => OnChange?.Invoke();
    }
}
