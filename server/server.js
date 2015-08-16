// On server startup, if the database is empty, create some initial data.
Meteor.publish("spaces", function() {
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
    },

    generateUserId: function() {
        return Random.id();
    },

    upvote: function(issueId, userId) {;
        check(userId, String);
        check(issueId, String);

        console.log(userId);

        var issue = Issues.findOne(issueId);

        if (!issue)
            throw new Meteor.Error("invalid", "issue not found");

        if (_.include(issue.upvoters, userId))
            throw new Meteor.Error("invalid", "Already upvoted this post");

        Issues.update(issue._id, {
            $addToSet: {upvoters: userId},
            $inc: {votes: 1}
        }, function (error, docs) {

            if (error) {
                return false;
            } else {
                return true;
            }
        });
    }
});