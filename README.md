# Traily
This is a full-stack (MERN) application built for a client. Users of the site are able to register an account, login, and then add unique pins to the map. Each pin has the title of the trailhead as well as a description. Users are able to see all the pins that have been placed by other users as well as their own, which are indicated by a green marker. 

**Link to project:** https://traily.netlify.app/

![traily](https://user-images.githubusercontent.com/62025065/176498706-8f16b2f2-25b6-491c-8850-c3fa108789ae.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, Mongodb, Express, React, Nodejs, Mongoose, bcrypt

This app was built using the MERN stack. From the top down, I used React to build my frontend; the login, register and header were built using components and I managed the state of the project using useEffect() and useState().

Next, I used the Express inside my Node.js server. With Express, I built the routing and HTTP requests & responses. Additionally, every password was encrypted.

Lastly, I used the NoSQL database MongoDb to store data about the pins (such as the longitude, latitude, title, description, creation date, and so on) as well as data about the users. I managed my backend with NodeJs and Express. I built models for the data using Mongoose. 

## Optimizations

Originally, I didn't build this website with an encrytped password. However, after having built the project I decided that it was something that I could add that would grealty improve upon the project. I used bcrypt to hash each password upon registering for an account. The implementation proved a little tricky but I was able to figure it out in time.

This is the first iteratino of the project and another version is being worked on. For the next version I'd like to implement the following: 

• Use Redux to manage the state of the application

• Captcha - so users cant be made via web automation

• There should be some more constraints on the password input, username, and email

• Would put Mapbox token into some sort of environmental variable hosting like Azure

• A way for an admin to delete user posts, etc



## Lessons Learned:

Prior to this project, I had no experience with Mapbox but had wanted to give it a try. While similar to Google Maps in some regards (I have some experience working with the Google Maps API), there were some differences that left room for me to learn. Although the Mapbox documentation was useful, I had to use "react-map-gl" - a wrapper for a React application. Many things were not the same, and I had to find answers to my problems elsewhere.

  Central to the appplication was overlaying the markers on the map with data that came from the database. It took some time with lots of mishaps during the development. 
  
   Lastly, deploying the application was an arduous process. It turns out that Mapbox has some issues deploying with React and some work arounds must be done.
   
   In the end, my client was as happy as I was with how this unique project turned out.
  



# A more detailed description of how this app works is outlined below:



# FRONTEND

The front end was built with React. The landing page is a fullscreen map with various markers placed on it; each marker includes a title, description, and information about when and who created the marker. In the upper right-hand corner, there are buttons for logging in and registering. When clicked, a popup box opens in the center of the screen. 

When users are logged in, the markers they have created are colored green whilst those created by others are colored grey. 

The map used for this application was MapBox. I used ‘react-map-gl’ which served as a React wrapper for using Mapbox GL JS. 

## Users

### Registering Users
 I created a form where users can input their username, email, and password to register an account. If a user successfully registers an account (if their inputted data correctly matches the user schema), then the message “Successful. You can log in now” will be displayed. Similarly, if there is an error, the message “Something went wrong” will be displayed.
 
**On Submit**

Using the react hook ‘useRef’ to access the inputted values of the form, I created an object entitled ‘newUser’ containing all of these values. If the request is successful this new object is sent, using Axios, in a POST request to the ‘register’ API endpoint as defined in the routes. 

### Logging In 

The login feature is contained in a component ‘Login’ that takes in three props: setShowLogin, myStorage, and setCurrentUser. Where this ‘Login’ component is used in App.js, the prop passed for myStorage is window.localStorage. This prop allows for the saving of the user across browser sessions. 


**On Submit**

Using the react hook ‘useRef’ to access the inputted values of the form, I created an object entitled ‘user’ containing all of these values (username and password).  If the request is successful this new object is sent, using Axios, in a POST request to the ‘login’ URL as defined in the routes. Additionally, the following will happen: a ‘user’ is set in localStorage based on the username input (the user is now saved across browsing sessions), the current user is set to what was inputted, and the log-in component is set to ‘false’ rendering it invisible.	





## App.js
In this file, I’ve imported ‘Map’ (to display the map), ‘Marker’ (to add markers to the map), and ‘Popup’ (to display popup boxes next to markers) - all from ‘react-map-gl’ (a wrapper used for mapbox to make it easier to use within React applications).


### Log in/Register Display
Depending on whether a user is logged in or not, either “Logout” will be displayed or “Log in”/”Register” will be displayed. This is dependent on the piece of state called currentUser. It has an initial value of ‘myStorage.getItem('user')’. As defined in the ‘Login’ component, a ‘user’ is added to localStorage upon logging in. Therefore, if a user is logged in there will be a user saved to local storage.	


### Map component


Adding this component in JSX requires adding props of initial view state, style, as well as access token. Additionally, I added a prop ‘onDblClick’ that points to a hander function ‘handleAddClick’

## Markers
### Adding a Marker
One of the props of the ‘Map’ component is onDblClick={handleAddClick}. The ‘handleAddClick’ function first finds the latitude and longitude from the click event on the map and only while a user is logged in will it then set the values of the state ‘newPlace’ to the latitude and longitude of the event. 
Now that the state of ‘newPlace’ is no longer null, a pop-up will open up with a form with a title and description. Upon closing this popup, the state ‘newplace’ is reset to null. The popup pops up at the longitude and latitude of the click event. 
	The entered title and description will be saved to the state ‘title’ and ‘desc‘ respectively. When this form is submitted, the function ‘handleSubmit’ is triggered.
First, a new object is created called ‘newPin’ - the username is set to the current user, the title and description are set to what was entered in the form. The lat and long are set to the lat and long that were saved to the state ‘newPlace’. On submit, this object is sent, using Axios, to an API endpoint defined in the ‘pin’ route and it is saved in the database.
The state ‘newPlace’ is now reset to null, and the ‘pins’ state reflects the addition of this new pin

### Displaying Markers
Each pin is reflected on the map by using the Marker component. Mapping over the state ‘pins’ we are able to define each marker by each pins long and lat. Additionally, if a user is logged in their marker will be green. When a marker is clicked the ‘handleMarkerClick’ function is triggered (with the props of lat, long, and id of the pin that was clicked). The function sets the state ‘currentPlaceId’ to the id that was just passed in.  The function then checks whether the pin’s id matches that of the marker that was clicked - if so, a pop-up will be displayed/. Its props are the latitude and longitude of the pin clicked. Additionally, on close, the state ‘currentPlaceId’ is reset. This pop-up displays the title, desc, as well as information about the user who made it and when it was made (using the module time ago).



# BACKEND
I created two schemas with Mongoose for two collections in a MongoDB database: Pins and Users. 

Using Express as a node framework, I created routes for registering and logging-in users and routes for creating and getting markers.

## Registering a User
I created a POST route for registering a user. When registering a user, the inputted password is hashed using ‘bcrypt’  - the new user is then created with a hashed password. This user is then saved to the database. 

## Logging in a User
I created a POST route for logging in users, that checks the inputted username and password against what is stored in the user collection in the database. 

## Creating a Pin
I created a POST route that awaits for a new pin to be selected and then sends that back as the response. 

## Getting all Pins
I created a GET route that finds all the pins and then sends that back as a response. 


