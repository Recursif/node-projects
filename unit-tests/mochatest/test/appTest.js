
const assert = require("chai").assert
const app = require("../app")


let sayHelloResult = app.sayHello()
let addNumbersResult = app.addNumbers(5,5)



describe("App", () => {
    describe("sayHello()", () => {
        it("app should return hello", () => {
            assert.equal(sayHelloResult, "hello")
        }),
        it("app should should return type string", () => {
            assert.typeOf(sayHelloResult, "string")
        })
    })

    describe("addNumbers()", () => {
        it("addNumbers should be above 5", () => {
            assert.isAbove(addNumbersResult, 5)
        })

        it("addNumbers should return type number", () => {
            assert.typeOf(addNumbersResult, "number")
        })
    })
})