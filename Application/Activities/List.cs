using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        // Defines the request for a list of activities. It’s empty here because in this case 
        // it doesn't need any parameters to fetch all activities.
        public class Query : IRequest<List<Activity>> {}
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context; 
            public Handler(DataContext context){
                _context = context;  
            }
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Query the database for all activities and return them.
                return await _context.Activities.ToListAsync();
            }
        }
    }
}