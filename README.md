## Summary

Developed a full-stack social media platform designed to help families and friends organize, plan, and share activities in a collaborative environment. The application enables users to create and manage events, share updates and photos, and communicate in real-time. Built with scalability and maintainability in mind, the platform incorporates modern architectural patterns and cutting-edge technologies to deliver a seamless user experience.

### Key Technologies and Methodologies

- **Backend**: Built with **ASP.NET Core**, leveraging **Clean Architecture** for modularity and maintainability.

- **Frontend**: Developed using **React with TypeScript**, ensuring a responsive and type-safe user interface.

- **State Management**: Utilized **MobX** for client-side state management and **React Query** for efficient server-side data synchronization and caching.

- **Real-Time Communication**: Integrated **SignalR** to enable real-time chat and notifications.

- **UI Framework**: Implemented **Material UI** for a consistent and modern design system.

- **Architectural Patterns**: Applied **CQRS (Command Query Responsibility Segregation)** and the ****Mediator Pattern** to streamline data flow and enforce separation of concerns.

This project showcases proficiency in modern software development practices, including clean architecture, real-time communication, and efficient state management, while providing a scalable foundation for future enhancements.

## Folder Structure

```bash
Reactivities/                     # Root project directory
│-- API/                          # Backend API (ASP.NET Core)
│   │-- Controllers/              # API Controllers handling HTTP requests
│   │   │-- ActivitiesController.cs
│   │   └── BaseApiController.cs
│   │-- Extensions/               # Extension methods for configuring services
│   │   └── ApplicationServiceExtensions.cs
│   │-- Properties/               # Contains project settings and configurations
│   │   └── launchSettings.json
│   │-- API.csproj                # Project file for the API
│   │-- Program.cs                # Entry point for the application
│   │-- appsettings.Development.json # Development-specific app configuration
│   │-- appsettings.json          # General application configuration
│   └── reactivities.db           # SQLite database file (if applicable)
│
│-- Application/                    # Business logic layer (Use Cases)
│   │-- Activities/                 # Features related to Activities
│   │   │-- Commands/               # Commands for modifying activities (CQRS)
│   │   │   │-- CreateActivity.cs
│   │   │   │-- DeleteActivity.cs
│   │   │   └── EditActivity.cs
│   │   └── Queries/                # Queries for retrieving activities (CQRS)
│   │       │-- Details.cs
│   │       └── GetActivityList.cs
│   │-- Core/                       # Core functionalities like AutoMapper
│   │   └── MappingProfiles.cs
│   └── Application.csproj          # Project file for the Application layer
│
│-- Domain/                         # Domain layer (Entities)
│   │-- Activity.cs                 # Activity entity definition
│   └── Domain.csproj               # Project file for the Domain layer
│
│-- Persistence/                     # Data access layer
│   │-- Migrations/                  # EF Core migrations
│   │   │-- 20250209162423_InitialCreate.Designer.cs
│   │   │-- 20250209162423_InitialCreate.cs
│   │   └── AppDbContextModelSnapshot.cs
│   │-- AppDbContext.cs              # Database context for Entity Framework Core
│   │-- DbInitializer.cs             # Database seeding logic
│   └── Persistence.csproj           # Project file for Persistence layer
│
│-- client/                          # Frontend (React + Vite)
│   │-- public/                      # Static assets
│   │   │-- images/                  # Image assets
│   │      │-- categoryImages/       # Category images
│   │      │   │-- culture.jpg
│   │      │   │-- drinks.jpg
│   │      │   │-- film.jpg
│   │      │   │-- food.jpg
│   │      │   │-- music.jpg
│   │      │   └── travel.jpg
│   │      │-- logo.png
│   │      │-- placeholder.png
│   │      └── user.png
│   │                
│   │
│   │-- src/                         # Source code
│   │   │-- app/                     # Core application layout & routing
│   │   │   │-- layout/              # Layout components
│   │   │   │   │-- App.tsx
│   │   │   │   │-- NavBar.tsx
│   │   │   │   └── styles.css
│   │   │   │-- router/              # Routing setup
│   │   │   │   └── Routes.tsx
│   │   │   └── shared/              # Reusable shared components
│   │   │       └── components/
│   │   │           └── MenuItemLink.tsx
│   │   │
│   │   │-- features/                # Feature-specific components
│   │   │   │-- activities/          # Activity-related components
│   │   │   │   │-- dashboard/       # Dashboard components
│   │   │   │   │   │-- ActivityCard.tsx
│   │   │   │   │   │-- ActivityDashboard.tsx
│   │   │   │   │   │-- ActivityFilters.tsx
│   │   │   │   │   └── ActivityList.tsx
│   │   │   │   │-- details/         # Detailed activity view components
│   │   │   │   │   │-- ActivityDetailedPage.tsx
│   │   │   │   │   │-- ActivityDetailsChat.tsx
│   │   │   │   │   │-- ActivityDetailsHeader.tsx
│   │   │   │   │   │-- ActivityDetailsInfo.tsx
│   │   │   │   │   └── ActivityDetailsSidebar.tsx
│   │   │   │   └── form/            # Forms for creating/editing activities
│   │   │   │       └── ActivityForm.tsx
│   │   │   └── home/                # Home page components
│   │   │       └── HomePage.tsx
│   │   │
│   │   │-- lib/                     # Utility functions & API interactions
│   │   │   │-- api/                 # API requests
│   │   │   │   └── agent.ts
│   │   │   │-- hooks/               # Custom hooks
│   │   │   │   │-- useActivities.ts
│   │   │   │   └── useStore.ts
│   │   │   │-- stores/              # Zustand stores (state management)
│   │   │   │   │-- store.ts
│   │   │   │   └── uiStore.ts
│   │   │   │-- types/               # TypeScript type definitions
│   │   │   │   └── index.d.ts
│   │   │   └── util/                # Utility functions
│   │   │       └── util.ts
│   │   │
│   │   │-- main.tsx                 # Entry point for React app
│   │   └── vite-env.d.ts            # Vite environment definitions
│   │
│   │-- eslint.config.js             # ESLint configuration
│   │-- index.html                   # HTML entry file
│   │-- package-lock.json            # Dependency lock file
│   │-- package.json                 # Package dependencies & scripts
│   │-- tsconfig.app.json             # TypeScript config for app
│   │-- tsconfig.json                 # Base TypeScript config
│   │-- tsconfig.node.json            # TypeScript config for Node
│   └── vite.config.ts               # Vite project configuration
│
│-- README.md                        # Project documentation
│-- Reactivities.sln                 # Solution file for .NET project
```
