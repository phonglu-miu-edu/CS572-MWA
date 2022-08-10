# The Horse Racing (HoRa) project

## Summary

The HoRa project is a grand horse race betting system opened to let anybody bet on the horse races.

## Requirements

1. Authentication system.


2. The admin functionalities:
- Manage the Jockeys.
- Manage the Horses.
- Manage the races with a number of horses and set the running time for them.
- ~~Manage the history of races and the betting.~~
- ~~Review all the races in realtime.~~
- ~~Report of the income from races.~~

3. The user functionalities:
- ~~See the realtime update of the races (with animation).~~
- ~~Deposit/Withdraw the wallet.~~
- ~~Report of the income from their betting races.~~

4. Anonymous users:
- ~~See the result on realtime events.~~
- See the introduction of sites, register and login.

## Extra requirements
- Lazy-loaded modules and REST design in the backend.
- Angular Material for UI components and project layout.
- Azure Blob Storage for the image hosting.
- Public site on Github page or Azure.

## Setup

1. Clone this `github` repo.
2. Copy and paste the `.env` file from email to the `backend` directory.
3. The `backend` is setup with port `8080`.
4. The `frontend` is setup with port `4200`, and recognize the backend url as `localhost:8080`, it could be changed be changing the value in `src/environments/environment.ts`
5. Open new terminal, go to `backend` directory, and run the following commands: `npm install`, `npm start`.
6. Open new terminal, go to `frontend` directory, and run the following commands: `yarn install`, `yarn start`.

## Tasks

Starts with the group's project planning and discussion.

### Phong Lu (Techlead)
- Provide the project structures for `backend` and `frontend`.
- Setup the integration to the `MongoDB` on `Atlas`.
- Setup the middlewares for `validations` and `authorization`.
- Setup the cloud-services `Azure Blob Storage`, `Heroku`, and `GitHub Page` for ready to be hosted publicly.
- Implement the backend services as REST API.
- Implement the cloud-friendly approach for file storage on `Azure Blob Storage`.
- Implement the Authorization and the guard to the protected pages.
- Implement the `frontend`'s layout and management pages for `race`, `horse`, and `jockey`.
- Modularize the Angular components, and apply the `lazy-loading` for them.
- Deploy the projects.

### Binod Kathayat (Frontend UI designer)
- Provide the UI template bases on the Angular Material UI.
- Implement the Home Page UI.
- Implement the Dashboard UI.
- Link Dashboard Component.
- Create the Login/Register UI design to add a new User/Admin, and login.

## What we learnt

### The problem
- We started by just the idea of creating a new project but not about the scopes of it. Then we struggle with the timeline is so narrow compares to so many requirements and features.
- Lacking of the resources is critical.

### The solution
- We managed to narrow down the scope of the project, to make it something good enough for presentation.
- Push more time effort to the project.

### New things
- NodeJs and Angular are somehow new to us, as we are coming from different tech-stacks. But they are easy to learn.
- Balancing between life and work is better improved with TM.