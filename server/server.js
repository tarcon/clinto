// On server startup, if the database is empty, create some initial data.
Meteor.publish('spaces', function() {
    return Spaces.find();
});

Meteor.publish("issues", function(spaceId) {
    check(spaceId, String);
    return Issues.find({spaceId: spaceId});
});


Meteor.methods({

    generateCode: function () {
        var nextLetter = "A", nextCode = nextLetter;

        while (Spaces.findOne({code: nextCode})) {
            nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
            nextCode = nextLetter;
        }

        return nextCode;
    }

});