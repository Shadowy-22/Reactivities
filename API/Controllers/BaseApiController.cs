using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    [ApiController]
    [Route("api/[controller]")] // It takes any route like localhost:5000/api/name excluding the controller part
    public class BaseApiController : ControllerBase
    {
        
    }
}