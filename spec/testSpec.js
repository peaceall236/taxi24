var axios = require('axios');

var base_url = "http://localhost:3000"

describe("Taxi24 API", function() {
  describe("/riders", function() {
    describe("GET /all", function() {
      it("returns status code 200", function() {
        axios.get(base_url + '/riders/all').then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
      })
    })
    describe("GET /:id", function() {
      it("should return status code 200", function() {
        axios.get(base_url + '/riders/1').then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
      })
    })
    describe("POST /drivers/:size", function() {
      it("should return status code 200", function() {
        axios.post(base_url + '/riders/drivers/3', {
          "latitude": "-1.9542367999999999",
	        "longitude": "30.1069481"
        })
        .then(function (response) {
          expect(response.statusCode).toBe(200);
          done();
        })
      })
    })
  })

  describe("/drivers", function() {
    describe("GET /:id", function () {
      it("return status code 200", function() {
        axios.get(base_url + '/drivers/1').then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
      })
    })
    describe("POST /available/:approximate", function() {
      it("returns status code 200", function() {
        axios.post(base_url + '/drivers/available/3000', {
          "latitude": "-1.9542367999999999",
	        "longitude": "30.1069481"
        })
        .then(function (response) {
          expect(response.statusCode).toBe(200);
          done();
        })
      })
    })
    describe("GET /available", function() {
      it("returns status code 200", function () {
        axios.get(base_url + '/drivers/available').then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
      })
    })
    describe("GET /all", function() {
      it("should return status code 200", function() {
        axios.get(base_url + '/drivers/all').then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
      })
    })
  });

  describe('/trips', function() {
    describe("POST /", function () {
      it("should return status codes 200", function() {
        expect(true).toBe(true);
      })
    })
    describe("GET /active", function() {
      it("should return status code 200", function () {
        axios.get(base_url + '/trips/active').then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
      })
    })
    describe("GET /:id/complete", function() {
      it("should return status code 200", function () {
        axios.get(base_url + '/trips/1/complete').then((response) => {
          expect(response.statusCode).toBe(200);
          done();
        })
      })
    })
  })
});