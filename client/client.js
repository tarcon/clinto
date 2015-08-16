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


        //todo: dont generate the code on the client
        var newSpaceId = Spaces.insert({
            name: name,
            code: Spaces.generateCode()
        });

        Router.go("/space/" + newSpaceId);

        $("#nameInput").val("");
    }
});

Template.spaceView.events({

    "submit .clinto-issue-create-form": function (event){
        event.preventDefault();

        var issue = $("#issueInput").val();

        Issues.insert({
            spaceId: this._id,
            issue: issue,
            reviewed: false,
            discarded: false
        });

        $("#issueInput").val("");
    }
});

Template.spaceView.helpers({
    findIssues: function () {
        var issues = Issues.find({spaceId: this._id},{sort: {createdAt : -1}});
        console.log(this._id);
        console.log(issues.count());
        return issues;
    },

    countIssues: function () {
        return Issues.find({spaceId: this._id}).count();
    }
});

