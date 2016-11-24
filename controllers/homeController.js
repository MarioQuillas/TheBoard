(function (homeController) {

    var data = require("../data");
    var auth = require("../auth");

    homeController.init = function(app) {
        app.get("/",
            function (req, res) {
                data.getNoteCategories(function(err, results) {
                    res.render("index",
                    {
                        title: "The Board",
                        error: err,
                        categories: results,
                        newCatError: req.flash("newCatName"),
                        user: req.user
                    });
                });
            });

        // it is like a pipeline, we tell the get to call first auth.ensur.... and if succeed call the next one
        app.get("/notes/:categoryName",
            auth.ensureAuthenticated,
            function(req, res) {
                var categoryName = req.param.categoryName;
                res.render("notes", { title: categoryName, user: req.user });
            });

        app.post("/newCategory",
            function(req, res) {
                var categoryName = req.body.categoryName;

                data.createNewCategory(categoryName, function(err) {
                    if (err) {
                        // handle error
                        console.log(err);
                        req.flash("newCatName", err);
                        res.redirect("/");
                    } else {
                        res.redirect("/notes/", categoryName);
                    }
                });

            });

    };

})(module.exports);