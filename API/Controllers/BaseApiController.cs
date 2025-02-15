using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers

{
    [ApiController]
    [Route("api/[controller]")] // It takes any route like localhost:5000/api/name excluding the controller part
    public class BaseApiController : ControllerBase
    {
        private IMediator? _mediator;

        // If we dont have access to Mediator we request it manually
        protected IMediator Mediator => 
            _mediator ??= HttpContext.RequestServices.GetService<IMediator>()
                ?? throw new InvalidOperationException("IMediator service is unavailable");
    }
}