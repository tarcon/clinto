if (Meteor.isClient) {
    Meteor.startup(function() {
        Meteor.call("generateUserId", function (errors, result) {
            Session.set("userId", result);
        });
    });
}

Template.Home.events({

    "submit .clinto-join-form": function (event){
        event.preventDefault();

        var code = $("#codeInput").val();

        Router.go("/join/" + code);

        $("#codeInput").val("");
    }
});

Template.Home.helpers({
    hasActiveSpaces: function () {
       return Spaces.find().count() > 0;
    }
});

Template.Create.events({

    "submit .clinto-create-form": function (event){
        event.preventDefault();

        var name = $("#nameInput").val();

        Meteor.call("generateCode", function (error, result) {
            var newSpaceId = Spaces.insert({
                name: name,
                code: result
            });

            Router.go("/space/" + newSpaceId);

            $("#nameInput").val("");
        });
    }
});

