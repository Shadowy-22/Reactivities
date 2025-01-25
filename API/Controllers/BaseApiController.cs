using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    [ApiController]
    [Route("api/[controller]")] // It takes any route like localhost:5000/api/name excluding the controller part
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= 
            HttpContext.RequestServices.GetService<IMediator>();
    }
}