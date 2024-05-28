using Microsoft.AspNetCore.Mvc;
using Entities.Reporting.Pulse;
using CLICX.Web.Services.Clients.Services;
using Entities.Common;
using CLICX.Web.Service.Clients.Common;
using Entities.Reporting.Finances.Dealer_Commissions;
using CLICX.Web.Service.Clients.Cache;
using CLICX.Web.Services.Attributes;
using Entities.Common.Constants;


namespace CLICX.Web.Services.Controllers
{
    [ApiController]

    [Route("[controller]/[action]")]
    
    public class ReportingController : Controller
    {
        Authentication ObjAuth = new Authentication();
        ReportingMethods ObjReports = new ReportingMethods();

        #region Pulse
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Params"></param>
        /// <returns></returns>

        [HttpPost]
        //[CustomAuthorizeAttribute]
        public async Task<ActionResult> BD_Pulse_DashBoardData(PostFilterParams Params)
        {
            JsonResult jsonResult;
            var json = await ObjReports.PulseDashBoardData("14051", Params);
            jsonResult = Json(new
            {
                success = true,
                Data = json,
                status = "200"
            });   
            return Ok(jsonResult);
        }

        [HttpPost]
        public async Task<ActionResult> BD_Pulse_GetAgentsLogs(tokenParams token)
        {

            JsonResult jsonResult;
            UserAuthentication UserDetails = await ObjAuth.UserAuthentication(token.JsonToken);
            if (UserDetails.Authorize == false)
            {
                jsonResult = Json(new { success = false, status = UserDetails.status });
            }
            else
            {
                var json = await ObjReports.GetPulseAgentsLogs();
                jsonResult = Json(new
                {
                    success = true,
                    Data = json,
                    status = UserDetails.status
                });
            }
            return Ok(jsonResult);
        }

        #endregion

        #region Finances

        #region Dealer Commissions

        [HttpPost]
        [CustomAuthorizeAttribute]
        public async Task<ActionResult> BD_Commissions_GetApprovedInvoice(InvoiceParams invoiceParams)
        {
            JsonResult jsonResult;
            UserAuthentication UserDetails = await ObjAuth.UserAuthentication(invoiceParams.JsonToken);

            if (UserDetails.Authorize == false)
            {
                jsonResult = Json(new { success = false, status = UserDetails.status });
            }
            else
            {
                bool EnableScreen = await ObjReports.BD_Commission_VerifyAuthentication(UserDetails.UserID);
                if (!EnableScreen)
                {
                    jsonResult = Json(new { success = false });
                }
                else
                {
                    var json = await ObjReports.GetApprovedInvoice(UserDetails.UserID, invoiceParams);
                    jsonResult = Json(new
                    {
                        success = true,
                        Data = json,
                        status = "200"
                    });
                }
            }
            return Ok(jsonResult);
        }

        [HttpPost]
        public async Task<ActionResult> BD_Commissions_DDL(tokenParams token)
        {
            JsonResult jsonResult;
            UserAuthentication UserDetails = await ObjAuth.UserAuthentication(token.JsonToken);

            if (UserDetails.Authorize == false)
            {
                jsonResult = Json(new { success = false, status = UserDetails.status });
            }
            else
            {
                bool EnableScreen = await ObjReports.BD_Commission_VerifyAuthentication(UserDetails.UserID);
                if (!EnableScreen)
                {
                    jsonResult = Json(new { success = false });
                }
                else
                {
                    var json = await ObjReports.GetCommissionDDL(UserDetails.UserID);
                    jsonResult = Json(new
                    {
                        success = true,
                        Data = json,
                        status = "200"
                    });
                }
            }
            return Ok(jsonResult);
        }

        [HttpPost]
        public async Task<ActionResult> BD_Commissions_GetPreviousInvoice(InvoiceParams invoiceParams)
        {
            JsonResult jsonResult;
            UserAuthentication UserDetails = await ObjAuth.UserAuthentication(invoiceParams.JsonToken);

            if (UserDetails.Authorize == false)
            {
                jsonResult = Json(new { success = false, status = UserDetails.status });
            }
            else
            {
                var json = await ObjReports.GetPreviousInvoice(invoiceParams);
                jsonResult = Json(new
                {
                    success = true,
                    Data = json,
                    status = "200"
                });
            }
            return Ok(jsonResult);
        }

        #endregion

        #endregion
    }
}
