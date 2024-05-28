using Microsoft.AspNetCore.Mvc;
using Entities.Common;
using CLICX.Web.Service.Clients.Common;
using Entities.Common.Constants;
using System.Data;
using CLICX.Web.Service.Clients.Cache;
using CLICX.Web.Service.Clients.Classes;


namespace CLICX.Web.Services.Controllers
{
    [ApiController]

    [Route("[controller]/[action]")]
    public class AuthenticationController : ControllerBase
    {
        Authentication ObjAuth = new Authentication();
        CommonMethods methods = new CommonMethods();
        CacheMemory cache = new CacheMemory(AppConstants.CacheConstants.ConnectionString);
        [HttpPost]
        public async Task<ActionResult> VerifyUserAuthentication(AuthenticationParams Params)
        {
            var result = await ObjAuth.VerifyUserAuthentication(Params);
            DataTable data = methods.GetAllUsers();
            cache.Set<DataTable>(AppConstants.CacheConstants.UniqueKey, data);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> VerifyUserMacAddress(tokenParams token)
        {
            var result = await ObjAuth.VerifyUserMacAddress(token);
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult> UpdateUserSession(tokenParams token)
        {
            var result = await ObjAuth.UpdateUserSession(token);
            return Ok(result);
        }
    }
}
