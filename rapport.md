# Step 1: Static HTTP server with apache httpd
The goal of this step is to set up a static HTTP server with apache. For this we made a Dockerfile in the appach-php-image folder. 

## Dockerfile
To achieve this, we import the "php:7.2-apache" image and copy the website data from the "static-data" folder to the "/var/www/html/" folder of the container. Finally we expose port 80.

To launch the container, we execute the command "docker run -d --rm --name apache -p 9090:80 contifurrer/apache". Then, we can access the website using the address localhost:9090

``` 
FROM php:7.2-apache

COPY static-data/ /var/www/html/

EXPOSE 80
```

## Website
For the website, we used a bootstrap template. Some small changes have been made to match the lab.

## Where the apache config files are located
The config files of a running container are located in root@e069e79246bc:/etc/apache2/sites-available# cat 000-default.conf (000-default could be the site name).


# Step 2: Dynamic HTTP server with express.js
## npm
First, we need to initialize an npm project to manage packages. For this, we used the command 
``npm init``
Then, we gave a project name, a version and an author name

## Express.js and Chance.js installation
Express.js and Chance.js can be installed using the commands : npm install express and npm install chance
Chance will be used to generatate some random strings, numbers, etc.

## Dockerfile
To achieve this, we import the "node:18.12" image and copy the website data from the "src" folder to the "/opt/app" folder of the container. Then, we expose port 3000.

Lately, we run the npm install command to install the dependencies (express and chance) then we launch the application using the command ``CMD ["node", "/opt/app/index.js"]``.

``` 
FROM node:18.12

WORKDIR ../
COPY ./src /opt/app

EXPOSE 3000

WORKDIR /opt/app
RUN npm install

CMD ["node", "/opt/app/index.js"]
```

## Website implementation (index.js)
First, we instantiate the variables chance and express
```js
var Chance = require('chance');
var chance = new Chance();
var express = require('express');
var app = express();
```

Then we specify that each GET request will perform a function (generateAnimals). Moreover we specify the port on which express will listen
```js
app.get('/', function (req, res) {
res.send( generateAnimals() );
});

app.listen(3000, function () {
console.log('Accept HTTP resquests on port 3000.');
});
```

Lastly, we implement the generateAnimals() function. To do this, we create an array with 1 to 10 animals, each of them will have a type, an age and a name.

```js
var numberOfAnimals = chance.integer({
min: 1,
max: 10
});

console.log(numberOfAnimals);
var animals = [];
var types = ["ocean", "desert", "grassland", "forest", "farm", "pet", "zoo"];

for (var i = 0; i < numberOfAnimals; i++) {
var randomType = types[Math.floor(Math.random()*types.length)];
var age = chance.age({min: 0,max: 100});
animals.push({type: randomType,animal: chance.animal({type: randomType}),age: age,});
}
console.log(animals);
return animals;
```

# Step 4: AJAX requests with JQuery
The goal of this step is to implement our API on our static web site in order to display animals every second. 
## Script
The script below allows to send an animal every second. For this, we used fetch API.
```js
setInterval(async() => {
const animals = await fetch('/api/').then(response => response.json());
let send = "Wait one second until first request."

if (animals.length > 0) {
send = animals[0].animal + " : [type : " + animals[0].type + "] " +
" [age : " + animals[0].age + "]";
}

document.getElementById("api-animals").innerHTML = send
}, 1000)
});
```
After that we had to include the script file in the html file : 
```html
<script src="js/animals.js"></script>
```
Then we display it using the <p> tag:
```html
<p id="api-animals"></p>
```

# Step 6: Management UI
For this part, we decided to use the portainer application. Indeed, portainer is a container manager.

## Docker compose
To use portainer, we add the lines below in our docker compose :
```GO
portainer:
image: portainer/portainer-ce:latest
ports:
	- 9443:9443
volumes:
	- data:/data
	- /var/run/docker.sock:/var/run/docker.sock
restart: unless-stopped
volumes:
	data:
```

After doing this, once the docker compose is executed, we can access it at the address localhost:9443.

Finally, all containers can be managed by clicking on the "local" group on the home page.