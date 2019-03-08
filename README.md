# [Read.io React Player (ver2)](https://github.com/jaimemendozadev/readio-v2)

A personalized music player that helps you find SoundCloud music and lets you create/save your playlists!

Read.io (v2) has been refactored with a GraphQL Backend API, Apollo Client on the Frontend, and Google OAuth with Passport.js.

## Table of contents

- Initial Setup
- Create a `.env` File
- Starting the App
- Future +Plus Features
- Created By

## Initial Setup

Open up your terminal and clone the repo locally to your computer by running the following command at the target destination: `$ git clone https://github.com/jaimemendozadev/jaimemendoza_v2.git`

## Create a `.env` File

Fire up your terminal and create a new `.env` by simply running `$ touch .env.`

After creating the `.env` file, use your text editor to enter all the necessary credentials, urls, and app variables (like the Server Port) into separate lines inside the `.env` file. 

This app uses Social Authentication like Google from the [Passport.js](http://www.passportjs.org/) library. Go to the [Google Passport Strategy GitHub](https://github.com/jaredhanson/passport-google-oauth2) for more info on Google credentials. 

This app uses MongoDB, but if you prefer, you can sign up for a free [mLab MongoDB database](https://mlab.com/) to make it easy to save your app data.

There should be no spacing between the lines and do not end the line with punctuation or spacing. The `.env` should appear like the following snippet:

```
PORT = ENTER_VALUE_HERE

JWT_KEY = ENTER_VALUE_HERE

DB_URL = mongodb://DB_USER:DB_PW@RANDOM_DB.mlab.com:49023/readio_v2

GOOGLE_CLIENT_ID = ENTER_VALUE_HERE

GOOGLE_CLIENT_SECRET = ENTER_VALUE_HERE

GOOGLE_CALLBACK_URL = ENTER_VALUE_HERE



```

After creating the `.env` and you fire up the app, the key value pairs in the file will correspond to any line of code that references `process.env`.

## Starting the App
This project uses the [Yarn package manager](https://yarnpkg.com/en/). Go to the Yarn website to learn more about how to install the package manger on your computer.

In the root of the app, use your terminal to run `$ yarn install` to install all the app dependencies. Wait until everything finishes loading.

In the same terminal window, run `$ yarn run dev:build` to build all the dependencies. Wait until everything finishes building.

Finally in another opened terminal tab, run the command `$ yarn run start` to start the app.

Go to `http://localhost:3000` in your favorite browser to view the website. 

Remember, you can always stop the server from running by typing `Control + z` in the terminal window you used to start the app.


## Future +Plus Features
- Give Users the ability to add songs to an already created playlist.
- Enable scrolling of entire playlist on the back of playlist card.
- Create responsive design for mobile.
- Add Facebook Social Authentication.


## Created By

**Jaime Mendoza**
[https://github.com/jaimemendozadev](https://github.com/jaimemendozadev)