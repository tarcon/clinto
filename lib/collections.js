Issues = new Mongo.Collection("issues");
Spaces = new Mongo.Collection("spaces");

Spaces.generateCode = function() {
    var nextLetter = "A", nextCode = nextLetter;
    while (Spaces.findOne({code: nextCode})) {
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        nextCode = nextLetter;
    }

    return nextCode;
};
