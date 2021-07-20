const express = require("express");
const airports = require("./airports");

const app = express();

app.use(express.json());

// get all the airports
app.get("/airports", (req, res) => {
    res.json(airports); // can also use res.send works the same, however json is more explicit
});

// create new airport
app.post("/airports", (req, res) => {
    airports.push(req.body);
    console.log(airports);
    res.sendStatus(201);
});

// return the airport with the id specified in the URL
app.get("/airports/:id", (req, res) => {
    const singleAirportId = req.params.id 
    const singleAirport = airports.find(airport => airport.icao == singleAirportId)
    res.json(singleAirport)
    res.sendStatus(201);
});

// update an airport
app.put("/airports/:id", (req, res) => {
    const singleAirportId = req.params.id // identifying specific id
    const body = req.body // what you're passing to the endpoint
    let airport = airports.find(airport => airport.icao == singleAirportId) // first id that matches with the searched id
    const index = airports.indexOf(airport) //finds the array index of the argument that you pass in- where airport sitss in airports
    airport = body // updating your changes into airport
    airports[index] = airport // reassigning the updated airport
    res.json(airport)
    res.sendStatus(201);
});

// delete an airport
app.delete("/airports/:id", (req, res) => {
    const singleAirportId = req.params.id 
    let airport = airports.find(airport => airport.icao == singleAirportId) // first id that matches with the searched id
    const index = airports.indexOf(airport) //finds the array index of the argument that you pass in- where airport sitss in airports
    airports.splice(airports[index], 1) // reassigning the updated airport

    res.json(airports)
    res.sendStatus(201);
});

module.exports = app;
