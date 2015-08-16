// On server startup, if the database is empty, create some initial data.
Meteor.publish('spaces', function() {
    return Spaces.find();
});

Meteor.publish("issues", function(spaceId) {
    check(spaceId, String);
    return Issues.find({spaceId: spaceId});
});
