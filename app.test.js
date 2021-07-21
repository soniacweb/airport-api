const originalAirports = require("./airports.json");
const airports = require("./airports");
const app = require("./app");
const request = require("supertest");

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
            icao: "1234",
            name: "Sonias Airport",
            city: "LA",
            state: "Cal",
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
            icao: "02WI",
            iata: "",
            name: "Beer Airport",
            city: "Hudson",
            state: "Wisconsin",
            country: "US",
            elevation: 920,
            lat: 45.0318984985,
            lon: -92.6557998657,
            tz: "America/Chicago",
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
       
        let updatedAirport = {
            icao: "02WI",
            iata: "",
            name: "Sonias Airport",
            city: "Slough",
            state: "Wisconsin",
            country: "US",
            elevation: 920,
            lat: 45.0318984985,
            lon: -92.6557998657,
            tz: "America/Chicago",
        };
        request(app)
            .put("/airports/02WI")
            // .expect("Content-Type", /json/)
            .set(updatedAirport) // ask charlie if this is being used correctly
            // .send()
            .expect(200)
            .then((response) => {
                // console.log(existingAirport)
                expect(updatedAirport).toEqual(airports);
                done();
            });
    });
    test("Delete /airports/:id should delete specific airport", async () => {
        const expectedAirportList = [...airports]; // duplicate database
        const icaoToDelete = "00FL";
        const index = expectedAirportList.findIndex(
            (airport) => airport.icao === icaoToDelete
        ); // compare ids from array and chosen airport
        expectedAirportList.splice(expectedAirportList[index], 1);
        const response = await request(app).delete("/airports/" + icaoToDelete);
        expect(response.status).toEqual(200);
        expect(expectedAirportList).toEqual(airports);
    });
});