using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command : IRequest<string> 
        {
            public required Activity Activity { get; set; }
        }
        
        public class Handler(AppDbContext context) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
               // We add the activity in memory and we do not access the DB at this point
               context.Activities.Add(request.Activity);

               // Now we save the changes and the data get persisted.
               await context.SaveChangesAsync(cancellationToken);

               return request.Activity.Id;
            }
        }
    }
}