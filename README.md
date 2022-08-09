# The Horse Racing (HoRa) project

## Summary

The HoRa project is a grand horse race betting system opened to let anybody bet on the horse races.

## Requirements

1. Authentication system.


2. The admin functionalities:
- Manage the Jockeys.
- Manage the Horses.
- Manage the races with a number of horses and set the running time for them.

3. The user functionalities:
- ~~Bet on the horses of the races, and see the result on realtime events.~~

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
2. Copy and paste the `.env` file to the backend directory.
3. The `backend` is setup with port `8080`.
4. The `frontend` is setup with port `4200`, and recognize the backend url as `localhost:8080`, it could be changed be changing the value in `app/environments/environment.ts`
5. Open new terminal, go to `backend` directory, and run the following commands: `npm install`, `npm start`.
6. Open new terminal, go to `frontend` directory, and run the following commands: `yarn install`, `yarn start`.

## Tasks

Starts with the group's project planning and discussion.

### Phong Lu
Coding for login/register.
Login flow with JWT, authentication, and guards with backend. 
Coding to manage the information about Jockeys/Horses/races.
Link a create a login/register/Jockeys/Horses/races form with backend and proper validations.

### Binod Kathayat
- Provide the UI template bases on the Angular Material UI.
- Implement the Home Page UI.
- Implement the Dashboard UI.
- Link Dashboard Component.
- Create the Login/Register UI design to add a new User/Admin, and login.