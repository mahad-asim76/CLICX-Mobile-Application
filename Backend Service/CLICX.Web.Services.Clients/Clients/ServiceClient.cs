using CLICX.Web.Service.Clients.Common;
using Entities.Common;
using System.Net.Http.Headers;

namespace CLICX.Web.Service.Client.Clients
{
    public class ServiceClient
    {
        private static HttpClient client = null;
        static ServiceClient()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(Configuration.BDReportingServiceUrl);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("text/plain"));
            //TimeOut set to 1 min.. TimeSpan(Hours,Minutes,Seconds)
            client.Timeout = new TimeSpan(0, 1, 0);
        }
        public async Task<string> GetDataAsync(string controller, string action, string body)
        {
            string json = string.Empty;
            string controllerUri = string.Format("{0}{1}/{2}", client.BaseAddress, controller, action);

            using (HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, controllerUri))
            {
                httpRequestMessage.Content = new StringContent(body, null, "application/json");

                try
                {
                    using (HttpResponseMessage httpResponseMessage = await client.SendAsync(httpRequestMessage))
                    {
                        if (httpResponseMessage.IsSuccessStatusCode)
                        {
                            json = await httpResponseMessage.Content.ReadAsStringAsync();
                        }
                        else
                        {
                            LoggingService.Logger.Error(httpResponseMessage.ToString());
                        }
                    }
                }
                catch (Exception ex)
                {
                   LoggingService.Logger.Error(ex.Message.ToString());
                }
            }
            return json;
        }
        public string GetData(string controller, string action, string body)
        {
            string json = string.Empty;
            string controllerUri = string.Format("{0}{1}/{2}", client.BaseAddress, controller, action);

            using (HttpRequestMessage httpRequestMessage = new HttpRequestMessage(HttpMethod.Post, controllerUri))
            {
                httpRequestMessage.Content = new StringContent(body, null, "application/json");

                try
                {
                    using (HttpResponseMessage httpResponseMessage = client.SendAsync(httpRequestMessage).Result)
                    {
                        if (httpResponseMessage.IsSuccessStatusCode)
                        {
                            json = httpResponseMessage.Content.ReadAsStringAsync().Result;
                        }
                        else
                        {
                            LoggingService.Logger.Error(httpResponseMessage.ToString());
                        }
                    }
                }
                catch (Exception ex)
                {
                    LoggingService.Logger.Error(ex.Message.ToString());
                }
            }
            return json;

        }
    }
}
