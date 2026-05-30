Isaac Schulz - Assignment 8

## Live URLs

- **Client:** https://platescout-yourname.vercel.app
- **Server:** https://platescout-yourname.onrender.com
- **Server health check:** https://platescout-yourname.onrender.com/api/health

## Local setup

1. Clone the repo
2. Copy `server/.env.example` to `server/.env` and fill in `MONGO_URI` + `JWT_SECRET`
3. From the root: `npm install` (client) and `cd server && npm install` (server)
4. Two terminals: `npm run dev` (root, client) + `npm run dev` (server)
5. Open http://localhost:5173

## What I learned during deployment

During this deployment, I was a little surprised by how quickly vercel redeployed after pushing a change to github, but other than that, not much surprised me. Getting the yelp integration working again took the longest to debug.

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/jYpz8rDY)
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=24038632&assignment_repo_type=AssignmentRepo)
