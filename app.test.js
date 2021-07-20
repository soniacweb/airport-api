const originalAirports = require("./airports.json");
const airports = require("./airports");
const app = require("./app");
const request = require("supertest");

describe("airport tests", () => {
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
});
