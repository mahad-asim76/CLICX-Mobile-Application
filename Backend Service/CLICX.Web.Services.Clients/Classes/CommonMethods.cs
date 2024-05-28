using CLICX.Web.Service.Client.Clients;
using CLICX.Web.Service.Clients.Common;
using Entities.Common;
using LZStringCSharp;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CLICX.Web.Service.Clients.Classes
{
    public class CommonMethods
    {
        ServiceClient _ServiceClient = new ServiceClient();
        public DataTable GetAllUsers()
        {
            var response = _ServiceClient.GetData("CLICXAuthentication", "CLICX_App_GetUsers", "");
            var responseData = LZString.DecompressFromBase64(response);
            DataTable userResponse = JsonConvert.DeserializeObject<DataTable>(responseData);
            return userResponse;
        }

        public Dictionary<string, string> DecodedToken(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.SecretKey)),
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = true,
                ValidateLifetime = true
            };

            try
            {
                var principal = tokenHandler.ValidateToken(jwtToken, tokenValidationParameters, out SecurityToken validatedToken);
                var claims = new Dictionary<string, string>();

                foreach (Claim claim in principal.Claims)
                {
                    claims.Add(claim.Type, claim.Value);
                }
                return claims;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Dictionary<string, string> Get_DecompressedTokenandUserDetail(string token, out jsonTokenParams userDetails)
        {
            var decompressedToken = LZString.DecompressFromBase64(token);
            userDetails = JsonConvert.DeserializeObject<jsonTokenParams>(decompressedToken);
            var tokenDetails = DecodedToken(userDetails.accessToken);

            return tokenDetails;
        }
    }
}
