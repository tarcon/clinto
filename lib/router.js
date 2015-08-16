Router.configure({
    layoutTemplate: "MainTemplate",
    loadingTemplate: "LoadingTemplate",

    waitOn: function () {
        return [
            Meteor.subscribe("spaces")
        ];
    }
});

Router.route("/", function ()  {
    this.render('Home', { data: function () {
        return Spaces.find(); //all
    }});
    this.render("copyrightFooter", {to: "footer"});
});

Router.route("/create", function () {
    this.render("Create");
    this.render("copyrightFooter", {to: "footer"});
});


Router.route("/space/:id", function ()  {
    this.layout("SpaceLayout");

    var spaceId = this.params.id;

    Meteor.subscribe("issues", spaceId);

    if (this.ready()) {
        this.render('Space', { data: function () {
            return Spaces.findOne({_id: spaceId});
        }});
        this.render("copyrightFooter", {to: "footer"});
    }
});


Router.route("/join/:code", function ()  {
    this.layout("SpaceLayout");

    var targetSpace = Spaces.findOne({code: this.params.code});

    if (targetSpace._id) {
        Router.go("/space/" + targetSpace._id);
    }
});