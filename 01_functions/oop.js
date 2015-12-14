"use strict";

/**
 * Model Class for storing a person
 * @param {string} [surname]
 * @param {string} [forename]
 * @param {number} [age]
 * @constructor
 */

function Person(surname, forename, age) {
    if (typeof surname == "string")
        this.surname = surname;
    if (typeof forename == "string")
        this.forename = forename;
    if (typeof age == "number")
        this.age = age;
}


Person.createAnonymous = function() {
    console.log("Creating anonymous person");
    return new Person("Person", "Unknown", 100);
};

/**
 * The surname of a person
 * @type {string}
 */
Person.prototype.surname = "Person";

/**
 * The forename of a person
 * @type {string}
 */
Person.prototype.forename = "New";

/**
 * The age of a person in years
 * @type {number}
 */
Person.prototype.age = 0;


/**
 * Get full name: forename surname
 * @return {string}
 */
Person.prototype.getFullName = function() {
    return this.forename+" "+this.surname+", age in 10 years: "+this._ageIn10Years();
};

/**
 * Private method for getting age in 10 years
 * @return {*}
 * @private
 */
Person.prototype._ageIn10Years = function() {
    return this.age + 10;
};


var leon = new Person("Baird", "Leon", 40);
var mary = new Person("Jones", "Mary", 23);
var bob = new Person("Bob", "Bob", 30);
var blank = new Person();

var anonymous = Person.createAnonymous();

bob.surname = "Mazy";

console.log(leon.surname);
console.log(mary.surname);
console.log(bob.getFullName());
console.log(blank.getFullName());
console.log(anonymous.getFullName());