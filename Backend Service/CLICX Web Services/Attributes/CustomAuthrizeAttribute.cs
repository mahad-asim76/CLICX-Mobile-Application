using CLICX.Web.Service.Clients.Cache;
using CLICX.Web.Service.Clients.Classes;
using Entities.Common.Constants;
using Entities.Common;
using LZStringCSharp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Newtonsoft.Json;
using MySqlX.XDevAPI;

namespace CLICX.Web.Services.Attributes
{
    public class CustomAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private bool isAuthrize = false;
        private readonly CacheMemory _cacheService;
        public CustomAuthorizeAttribute() : base()
        {
            _cacheService = new CacheMemory(AppConstants.CacheConstants.ConnectionString);
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            isAuthrize = UserAuthentication(context.HttpContext);
            if (!isAuthrize)
            {
                context.Result = new UnauthorizedResult();
            }
        }

        public bool UserAuthentication(HttpContext context)
        {
            try
            {
                CommonMethods methods = new CommonMethods();
                var JsonToken = context.Request.Headers.Authorization.ToString().Replace("Bearer ", "");
                if(string.IsNullOrEmpty(JsonToken))
                {
                    isAuthrize = false;
                }
                else
                {
                    //var decompressedToken = LZString.DecompressFromBase64(JsonToken);
                    //var userDetails = JsonConvert.DeserializeObject<jsonTokenParams>(decompressedToken);
                    //var tokenDetails = methods.DecodedToken(userDetails.accessToken);
                    jsonTokenParams userDetails;
                    var tokenDetails = methods.Get_DecompressedTokenandUserDetail(JsonToken, out userDetails);
                    if (tokenDetails != null)
                    {
                        if(userDetails.Platform == AppConstants.Platforms.Web)
                        {
                            isAuthrize = false;
                        }
                        else
                        {
                            context.Session.SetString(AppConstants.DataHolderContents.LoginUser, userDetails.UserLoginID);
                            var UserID = userDetails.UserLoginID;
                            var SessinID = tokenDetails[AppConstants.UserAuthentication.SessionID];
                            DateTime sessionEndDate = DateTime.Parse(tokenDetails[AppConstants.UserAuthentication.SessionExpiryDate]);
                            if (sessionEndDate < DateTime.Now)
                            {
                                isAuthrize = false;
                            }
                            else
                            {
                                var userExistsInCache = _cacheService.Get<DataTable>(AppConstants.CacheConstants.UniqueKey);
                                var ID = userExistsInCache.AsEnumerable().FirstOrDefault(row => row[AppConstants.UserAuthentication.SessionID].ToString() == SessinID);
                                if (ID != null)
                                {
                                    isAuthrize = true;
                                }
                                else
                                {
                                    isAuthrize = false;
                                }
                            }
                        }
                       
                    }
                    else
                    {
                        isAuthrize = false;
                    }
                }
               
            }
            catch (Exception ex)
            {
                LoggingService.Logger.Error(AppConstants.UserAuthentication.NoTokenFound);
            }
            return isAuthrize;
        }
    }
}