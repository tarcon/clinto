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
    this.layout("SpaceTemplate");

    var spaceId = this.params.id;

   Meteor.subscribe("issues", spaceId);

    if (this.ready()) {
        this.render('spaceView', { data: function () {
            return Spaces.findOne({_id: spaceId});
        }});
        this.render("copyrightFooter", {to: "footer"});
    }
});


Router.route("/join/:code", function ()  {
    this.layout("SpaceTemplate");

    this.render("spaceView", { data: function () {

        var targetSpace = Spaces.findOne({code: this.params.code});

        //todo: make dataNotFound work to prevent opening a space without data
        if (targetSpace !== undefined) {
            return targetSpace;
        } else {
            return null;
        }
    }});

    this.render("copyrightFooter", {to: "footer"});
});

Router.plugin("dataNotFound", {
    notFoundTemplate: "dataNotFound"
});