Template.Space.events({

    "submit .clinto-issue-create-form": function (event){
        event.preventDefault();

        var issue = $("#issueInput").val();

        Issues.insert({
            spaceId: this._id,
            issue: issue,
            votes: 1,
            upvoters: [],
            reviewed: false,
            discarded: false
        });

        $("#issueInput").val("");
    }
});

