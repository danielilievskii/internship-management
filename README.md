# Internship Management

An application for managing university internships using Domain-Driven Design, CQRS, and Event Sourcing, built as an alternative to [internships.finki.ukim.mk](https://internships.finki.ukim.mk).

It supports students, companies, and coordinators throughout the internship lifecycle - from applications and journal submissions to validation and archiving - with a backend built around aggregates, commands, events, projections, handlers, and sagas.

## Tech Stack

- Spring Boot (Kotlin) + Axon Framework - Core backend that handles internship operations, events, and business logic.
- Spring Cloud Gateway - API Gateway which routes requests to backend services.
- Keycloak - Manages authentication and authorization.
- Apache Kafka - Event-driven messaging between services.
- Spring Cloud OpenFeign - HTTP communication between services.
- Consul - Service discovery.
- PostgreSQL - Database.
- React (TypeScript) - Frontend.
- Tailwind CSS - Styling.
- shadcn/ui - UI components.

## Features
#### Internship Lifecycle Management

- Companies create or assign internships to students.
- Students accept or reject internship offers.
- Students submit weekly internship journals.
- Companies validate or request changes to journals.
- Coordinators perform final validation.
- Administrative staff archive completed internships.
  
#### Additional Features

- Email notifications on key internship status changes.
- Interactive journal tracking with status change history and comments.
- Role-based access control for students, companies, coordinators, and administrators.

## Screenshots
<img width="1915" height="908" alt="1" src="https://github.com/user-attachments/assets/1caead56-c8fa-4924-8c3f-27c068adc101" />
<img width="1914" height="908" alt="2" src="https://github.com/user-attachments/assets/ad440e18-ea02-4651-880f-c74eddf9d248" />
<img width="1920" height="1204" alt="3" src="https://github.com/user-attachments/assets/7fe2f6ba-720b-4343-a6a5-a389f49773b2" />
<img width="1920" height="943" alt="4" src="https://github.com/user-attachments/assets/4cc6f8dc-7f8b-4840-af97-0751c8b49e24" />
<img width="1902" height="903" alt="5" src="https://github.com/user-attachments/assets/9811b82f-e9d2-4f92-8146-031fbc3fbd1d" />
<img width="1920" height="1035" alt="6" src="https://github.com/user-attachments/assets/8d4a1ce1-2b5e-4f66-acf7-a925875b8269" />
<img width="1902" height="906" alt="7" src="https://github.com/user-attachments/assets/e14b3c6b-7217-41c7-b57c-f5cb4854a8ae" />
<img width="1920" height="927" alt="8" src="https://github.com/user-attachments/assets/fe5fc6cb-f327-42e7-abce-e7c832664640" />
<img width="1915" height="906" alt="9" src="https://github.com/user-attachments/assets/82a9233e-864e-4634-9daf-c9c621438125" />


