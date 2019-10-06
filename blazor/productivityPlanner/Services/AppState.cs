using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using productivityPlanner.Models;

namespace productivityPlanner.Services
{
    public class AppState
    {
        // reference : https://github.com/aspnet/samples/blob/master/samples/aspnetcore/blazor/FlightFinder/FlightFinder.Client/Services/AppState.cs
        // Actual state

        public DateTime targetDate = DateTime.Now;

        // Lets components receive change notifications
        // Could have whatever granularity you want (more events, hierarchy...)
        public event EventHandler OnChange;
        // Receive 'http' instance from DI

        
        public void ShiftTargetMonth(ShiftDateDirection direction, DatePart datePart)
        {
            if (datePart.Equals(DatePart.Month))
            {
                targetDate = targetDate.AddMonths((int)direction);
            }
            if (datePart.Equals(DatePart.Year))
            {
                targetDate = targetDate.AddYears((int)direction);

            }
            if (datePart.Equals(DatePart.Day))
            {
                targetDate = targetDate.AddDays((int)direction);

            }
            NotifyStateChanged();
        }
        private void NotifyStateChanged() {
            OnChange?.Invoke(this,EventArgs.Empty);
            //if (OnChange != null) {
            //    OnChange(this, EventArgs.Empty);
            //}
        }
    }
}