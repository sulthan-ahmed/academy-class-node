var assert = require("assert");

describe("Demo App", function(){

    var app;

    beforeEach(function() {
        app = require("../app");
    });

    describe("Express App has server and is running", function() {

        it("should instantiate the application and server variables", function() {
            assert(app.expressApp);
            assert(app.server);
        });

        it("should add two numbers and return a type number", function() {
            assert.equal(app.addTwoValues(10, 20), 30);
            assert.equal(typeof app.addTwoValues(10, 100), "number");
            assert( !isNaN(app.addTwoValues(10, 10)) );
        });

        it("should set serverRunning boolean to true", function() {
            setTimeout(function() {
                assert(app.serverRunning);
                done();
            }, 500);
        });

    });

});