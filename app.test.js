const originalAirports = require("./airports.json");
const airports = require("./airports");
const app = require("./app");
const request = require("supertest");

// console.log('length', originalAirports.length)

describe("get all airport tests", () => {
    test("GET /airports should return all airports", (done) => {
        request(app)
            .get("/airports")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(originalAirports);
                done();
            });
    });
    test("POST /airports should create the new airport", (done) => {
        const newAirport = {
            "icao": "1234",
            "name": "Sonias Airport",
            "city": "LA",
            "state": "Cal",

        };
        const expectedAirportList = [...originalAirports];
        expectedAirportList.push(newAirport);
        request(app)
            .post("/airports")
            .send(newAirport)
            .expect(201)
            .end(() => {
                expect(airports).toEqual(expectedAirportList);
                return done();
            });
    });

    test("GET /airports/:id should return specific airport", (done) => {
        const newAirport = {
            "icao": "02WI",
            "iata": "",
            "name": "Beer Airport",
            "city": "Hudson",
            "state": "Wisconsin",
            "country": "US",
            "elevation": 920,
            "lat": 45.0318984985,
            "lon": -92.6557998657,
            "tz": "America/Chicago"
        };
        request(app)
            .get("/airports/02WI")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(newAirport);
                done();
            });
    });

    test("PUT /airports/:id should update specific airport with my changes", (done) => {
        let existingAirport = {
            "icao": "02WI",
            "iata": "",
            "name": "Beer Airport",
            "city": "Hudson",
            "state": "Wisconsin",
            "country": "US",
            "elevation": 920,
            "lat": 45.0318984985,
            "lon": -92.6557998657,
            "tz": "America/Chicago"
        };
        let updatedAirport = {
            "icao": "02WI",
            "iata": "",
            "name": "Sonias Airport",
            "city": "Slough",
            "state": "Wisconsin",
            "country": "US",
            "elevation": 920,
            "lat": 45.0318984985,
            "lon": -92.6557998657,
            "tz": "America/Chicago"
        };
        request(app)
            .put("/airports/02WI")
            .expect("Content-Type", /json/)
            .set(existingAirport = updatedAirport) // ask charlie if this is being used correctly
            .send(existingAirport)
            .expect(200)
            .then((response) => {
                // console.log(existingAirport)
                expect(response.body).toEqual(existingAirport);
                done();
            });
    });

    test("Delete /airports/:id should delete specific airport", (done) => {

        let existingAirport = {
            "icao": "02WI",
            "iata": "",
            "name": "Beer Airport",
            "city": "Hudson",
            "state": "Wisconsin",
            "country": "US",
            "elevation": 920,
            "lat": 45.0318984985,
            "lon": -92.6557998657,
            "tz": "America/Chicago"
        };

        const expectedAirportList = [...originalAirports]; //create array from json
        const find = expectedAirportList.find(airport => airport.icao == existingAirport.icao) // compare ids from array and chosen airport
        const index = expectedAirportList.indexOf(find) // get the indexof from the matched id
        expectedAirportList.splice(expectedAirportList[index], 1);

        request(app)
            .delete("/airports/02WI")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(() => {
                console.log('hello', expectedAirportList[1].icao)
                expect(expectedAirportList.length).toEqual(true);
                done();
            });
    });

});
