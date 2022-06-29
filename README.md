# Traily
This is a full-stack (MERN) application. Users of the site are able to register an account, login, and then add unique pins to the map. Each pin has the title of the trailhead as well as a description. USers are able to see all the pins that have been placed by other users as well as their own, which are indicated by a green marker. 

**Link to project:** https://traily.netlify.app/

![traily](https://user-images.githubusercontent.com/62025065/176498706-8f16b2f2-25b6-491c-8850-c3fa108789ae.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Mongodb, Express, React, Nodejs, Mongoose, bcrypt

This app was built using the MERN stack. From the top down, I used React to build my frontend; the login, register and header were built using components and I managed the state of the project using useEffect() and useState().
Next, I used the Express inside my Node.js server. With express, I built the routing and HTTP requests & responses. Additionally, every password was encrypted.
Lastly, I used the NoSQL database MongoDb to store data about the pins (such as the longitude, latitude, title, description, creation date, and so on) as well as data about the users. I managed my backend with NodeJs and Express. I built models for the data using Mongoose. 

## Optimizations

Originally, I didn't build this website with an encrytped password. However, after having built the project I decided that it was something that I could add that would grealty improve upon the project. I used bcrypt to hash each password upon registering for an account. The implementation proved a little tricky but I was able to figure it out in time.

## Lessons Learned:

This project was difficult. I had no experience with Mapbox but had wanted to give it try. While similar to Google Maps in some regards (I have some experience working with the Google Maps API), there were some differences that left room for me to learn. Although the Mapbox documentation was useful, I had to use "react-map-gl" for my React application. Many things I were not the same, and I had to find answers to my problems elsewhere.
  Central to the entire idea of the appplicatin was overlaying the markers on the map with data that came from the database. It took some time with lots of mishaps during the development. 
   Lastly, deploying the application was an arduous process. It turns out that Mapbox has some issues deploying with React and some work arounds must be done.
   All in all, this project made me problem solve and think around every corner.
  

