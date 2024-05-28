using CLICX.Web.Service.Client.Clients;
using Entities.Common;
using LZStringCSharp;
using Newtonsoft.Json;
using static Entities.Reporting.Pulse.AuthorizeParams;
using Entities.Common.Constants;
using CLICX.Web.Service.Clients.Classes;
using CLICX.Web.Service.Clients.Cache;
using System.Data;

namespace CLICX.Web.Service.Clients.Common
{
    public class Authentication
    {
        ServiceClient _ServiceClient = new ServiceClient();
        CommonMethods methods = new CommonMethods();
        CacheMemory cache = new CacheMemory(AppConstants.CacheConstants.ConnectionString);
        public async Task<string> VerifyUserAuthentication(AuthenticationParams Params)
        {
            return await _ServiceClient.GetDataAsync("CLICXAuthentication", "CLICX_App_VerifyAuthentication", JsonConvert.SerializeObject(Params));
        }

        public async Task<UserAuthentication> VerifyUserMacAddress(tokenParams token)
        {
            return await UserAuthentication(token.JsonToken);
        }
        public async Task<string> UpdateUserSession(tokenParams token)
        {
            jsonTokenParams userDetails;
            var tokenDetails = methods.Get_DecompressedTokenandUserDetail(token.JsonToken, out userDetails);
            string SessinID = tokenDetails[AppConstants.UserAuthentication.SessionID];
            cache.DeleteRecordFromCache(SessinID);
            var userExistsInCache = cache.Get<DataTable>(AppConstants.CacheConstants.UniqueKey);
            return await _ServiceClient.GetDataAsync("CLICXAuthentication", "CLICX_App_UpdateUserSession", JsonConvert.SerializeObject(new SessionParams { sessionID = SessinID }));
        }

        public async Task<UserAuthentication> UserAuthentication(string token)
        {
            UserAuthentication objAuth = new UserAuthentication();
            AuthorizeBuilder authorizeBuilder = new AuthorizeBuilder();
            var JsonToken = LZString.DecompressFromBase64(token);
            var userDetails = JsonConvert.DeserializeObject<jsonTokenParams>(JsonToken);
            var tokenDetails = methods.DecodedToken(userDetails.accessToken);
            if(tokenDetails != null) 
            {
                DateTime sessionEndDate = DateTime.Parse(tokenDetails[AppConstants.UserAuthentication.SessionExpiryDate]);
                if (sessionEndDate < DateTime.Now)
                {
                    objAuth.Authorize = false;
                }
                else
                {
                    var authorizeParams = authorizeBuilder.BuildParams(tokenDetails[AppConstants.UserAuthentication.SessionID], userDetails.macAddress);
                    var response = await _ServiceClient.GetDataAsync("CLICXAuthentication", "CLICX_App_VerifyUserMacAddress", JsonConvert.SerializeObject(authorizeParams));
                    var responseData = LZString.DecompressFromBase64(response);
                    var userResponse = JsonConvert.DeserializeObject<ResponseParams>(responseData);
                    if (userResponse.valid)
                    {
                        objAuth.Authorize = true;
                        objAuth.UserID = Convert.ToString(userResponse.UserID);
                        objAuth.status = "200";
                    }
                    else
                    {
                        objAuth.status = "403";
                        objAuth.Authorize = false;
                    }
                }
            }
            else
            {
                objAuth.status = "403";
                objAuth.Authorize = false;
            }

            return objAuth;
        }
    }
}