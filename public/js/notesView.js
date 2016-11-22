// notesView.js
(function(angular) {
    var theModule = angular.module("notesView", ["ui.bootstrap"]);

    // $scope is the view model!!!
    theModule.controller("notesViewController",
    [
        "$scope", "$window", "$http",
        function($scope, $window, $http) {
            //$scope.notes = [
            //    {
            //        note: "hhh",
            //        color: "yellow",
            //        author: "Mario"
            //    },
            //    {
            //        note: "hhh 2",
            //        color: "blue",
            //        author: "Mario"
            //    },
            //    {
            //        note: "hhh 3",
            //        color: "green",
            //        author: "Mario"
            //    },
            //];

            $scope.notes = [];
            $scope.newNote = createBlankNote();

            // get the category name
            var urlParts = $window.location.pathname.split("/");
            var categoryName = urlParts[urlParts.length - 1];

            var notesUrl = "/api/notes/" + categoryName;
            $http.get(notesUrl)
                .then(function(result) {
                    //success
                    $scope.notes = result.data;
                }, function(err) {
                    // error
                    alert(err)
                });

            $scope.save = function () {
                $http.post(notesUrl, $scope.newNote)
                    .then(function (result) {
                        //success
                        $scope.notes.push(result.data);
                        $scope.newNote = createBlankNote();
                    }, function(err) {
                        //failure
                        // TODO
                    });
            };
        }
        ]);

    function createBlankNote() {
        return {
            note: "",
            color: "yellow"
        };
    }
})(window.angular);