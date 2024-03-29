# ChatGPT Meeting Summariser
Meetings can go on for a long time with someone tasked with taking notes and
then distributing them after. The task of taking notes and summarising them can also be a
tedious one. Now we ask ChatGPT to be that someone! We will utilise the summarisation
skills of ChatGPT to practise brevity on tedious conversions and then notify everyone who
attended so that people do not miss out on important meeting points again.



## Run Locally

Clone the project

Github -> profile -> settings -> Developer Settings -> Personal Access Tokens -> Tokens (Classic)
Generate and save token
```bash
  git clone https://github.com/Monash-FIT3170/chatgpt-meeting-summariser
```
Username: Github Username 
Password: Personal Access Token

Go to the project directory

```bash
  cd /user/..../chatgpt-meeting-summariser/project
```

To run the back end server application

```bash
  cd backend
  npm install
  npm install nodemon 
  nodemon server.js
```
Note: Make sure you delcare your MongoDB URI in .env before starting the project

Start the frontend server

```bash
  cd meeting-summariser
  npm install
  npm start
```

Install dependencies

```bash
  npm install 'package name'
```


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Tech Stack

**Client:** React

**Server:** Node, Express

**Database:** Mongo



## Outstanding issues

#
#
#