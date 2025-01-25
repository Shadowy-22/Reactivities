using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest 
        {
            public Activity Activity { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            public readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
               // We add the activity in memory and we do not access the DB at this point
               _context.Activities.Add(request.Activity);

               // Now we save the changes and the data get persisted.
               await _context.SaveChangesAsync();
            }
        }
    }
}