using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries
{
    public class GetActivityList
    {
        // Defines the request for a list of activities. It’s empty here because in this case 
        // it doesn't need any parameters to fetch all activities.
        public class Query : IRequest<List<Activity>> {}
        public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
        {
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Query the database for all activities and return them.
                return await context.Activities.ToListAsync(cancellationToken);
            }
        }
    }
}