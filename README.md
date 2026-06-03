Isaac Schulz - Assignment 8

## Live URLs

- **Client:** [https://assignment8-snail-dust.vercel.app](https://assignment8-snail-dust.vercel.app/)
- **Server:** [https://platescout-schulz.onrender.com](https://platescout-schulz.onrender.com/)
- **Server health check:** [https://assignment8-snail-dust.vercel.app/api/health](https://assignment8-snail-dust.vercel.app/api/health)

## Local setup

1. Clone the repo
2. Copy `server/.env.example` to `server/.env` and fill in `MONGO_URI` + `JWT_SECRET`
3. From the root: `npm install` (client) and `cd server && npm install` (server)
4. Two terminals: `npm run dev` (root, client) + `npm run dev` (server)
5. Open http://localhost:5173

## What I learned during deployment

During this deployment, I was a little surprised by how quickly vercel redeployed after pushing a change to github, but other than that, not much surprised me. Getting the yelp integration working again took the longest to debug. I ended up moving the actual yelp api call into the backend server. This way the yelp key is not exposed to the user, the requests are forwarded through the backend server, and there aren't CORS issues. It doesn't seem to take a little longer for the results to load, but that is to be expected since the yelp request is being forwarded. With more time I would like to add actual functionality to the user profile, but since that wasn't required for this course, the user profile just shows some info about the user.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/jYpz8rDY)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=24038632&assignment_repo_type=AssignmentRepo)
