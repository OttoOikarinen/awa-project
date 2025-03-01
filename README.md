# AdvancedWebApplicationsProject
Author: Otto Oikarinen

## Installation guidelines

1. Install the files from for example from GitHub: `git clone https://github.com/OttoOikarinen/awa-project.git`
2. cd to the new directory.
3. Install dependecies using `npm install`
4. Setup PostgreSQL. Docs for that can be found: https://www.postgresql.org/docs/ and start it. 
5. Create a new database following the docs. 
6. Create the tables running `\i /path/to/awa-project/app/lib/database_setup.sql`
7. Change the name of .env.template to .env and fill the required variables.
8. Run the app `npm run dev` or `pnpm run dev`
9. Open the application in browser in localhost:3000 or whatever the provided port is. 

## User manual

From localhost:3000/ you can choose to register or sign in. Register a new account. Password has requirements (8 characters, numbers, small and capital letters and special characters.) After that sign in.

You can create a column by clicking create column and providing the name. Then you can create a todo by clicking Create todo and providing the task and the column you want to put it in. You cannot create a todo without a column first.

Then you can use the buttons for moving the todos and columns around and updating and deleting them. You can move a todo into another column by clicking edit button and changing the column there.

From the side panel you can log out.

## Technology choices

For this project, as ordered, I used Node.js. I choose Next.js framework, since it seems to be quite popular at the moment and my friend who is actually working for a software company, recommended it. For this purpose I went through the Next.js tutorial and used it as a source for how to do things in this project as well. I also used their documentations extensively. It wasn't easy to get a grip on yet another framework, since the whole course used Express.js, but it paid in the end, since Next.js seems a lot more fun to code with. 

For database I used PostgreSQL, since it is widely used and uses basic SQL syntax. It was also used in the Next.js tutorial, so implementation was easier.

I used Tailwind CSS, since they had readymade components available for free to modify.

I used GitHub to host the codebase, since I've used that for years and it was the easiest choice.

## Features and points requested

| Feature | Points requested |
|:--------|:----------------:|
| Mandatory Features | 25 |
| Learned a whole new framework for this (Next.js) | 5 |
| User is able to delete whole account | 1 |
| Home-page has counters to show current users and todos | 1 |
| UI translated to 2 languages | 2 |
| Navigation panel | 1 |
| User can logout | 1 |
| Extensive metadata on the page | 1 |
| Custom favicon.ico | 1 |
| not-found pages for updating columns and todos | 1 |
| *Total* | 34 |

Extensive metadata means robots.ts and sitemap.ts files as well as metadata in app/layout.tsx file. 


## Declaration of AI usage
For this project I have used two AI tools. ChatGPT and Grok. 
AI has been used for three purposes:
1. I created the database_setup.sql file based on the definitions file just to speed things up.
2. I have created a few UI components for the app with AI. For example "Give Tailwind CSS classNames for a button".
3. I have used it to debug errors. For example "PostgreSQL gives this error, tell me what's wrong with my SQL propmt."

All of the functionalities have been written by me with the help of the tutorial and docs.

## Declaration for other sources.

This project has been based on the nextjs-dashboard tutorial, which is available on their website to get to know nextjs.I finished the tutorial before starting the project. I have used the tutorial as a strong source for how to do things in nextjs. Some UI's have been somewhat copied from the tutorial, because they looked nice. Functionality has been modified by me to fit the purposes of this project.

I have also used nextjs documentation. From there session management and middleware have been copied, since they were already probably written in the best way possibble and I didn't want to mess with things for security reasons and all other possible reasons. I have clearly marked to files, what I have used as a source. 

I also used PostgreSQL documentation as a source for how to setup database etc.