Template.IssueList.helpers({
    findIssues: function () {
        var issues = Issues.find({spaceId: this._id},{sort: {createdAt : -1}});
        return issues;
    },
    countIssues: function () {
        return Issues.find({spaceId: this._id}).count();
    }
});