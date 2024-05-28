using Microsoft.AspNetCore.Mvc;

namespace CLICX.Web.Services.Controllers
{
    public class BaseController : Controller
    {
        protected ISession Session { get; private set; }

        public BaseController(IHttpContextAccessor httpContextAccessor)
        {
            Session = httpContextAccessor.HttpContext.Session;
        }
    }
}
