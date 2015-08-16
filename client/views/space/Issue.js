Template.Issue.events({

    "click .clinto-upvote-button": function (event) {
        event.preventDefault();

        Meteor.call("upvote", this._id, Session.get("userId"), function (error, result) {

        });
    }
});

Template.Issue.helpers({
    upvoteClass: function () {

        var userId = Session.get("userId");

        if (userId && !_.include(this.upvoters, userId)) {
            return "upvotable";
        } else {
            return "disabled";
        }
    }
});

