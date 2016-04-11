// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

// the controler pass function scope,
// ionicPopup - shows popup to add new tasks
// ionicListDelegate - to close all butons like edit or label
app.controller('mainController', function ($scope, $ionicPopup, $ionicActionSheet, $ionicListDelegate) {

    // creat a new object - File class TasksModel.js
    var tasks = new getTasks;

    // declar scope
    $scope.list = tasks.item;
    $scope.showMarked = false;
    $scope.removeStatus = false;



    // function to get the tasks and save
    function getItem(item, newItem) {

        $scope.data = {};
        $scope.data.newTask = item.name;


        // Popup for new task or edit tasks
        $ionicPopup.show({
            title: "Task",
            scope: $scope,
            template: "<input type='text' placeholder='Task' autofocus='true' ng-model='data.newTask'>",
            buttons: [{
                text: "Ok",
                //Event onTap ok button pass function to add a new task
                onTap: function (e) {
                    item.name = $scope.data.newTask;

                    // Condition for cases were we need add task
                    // if not will just save, for example edit task
                    if (newItem) {
                        // add task
                        tasks.add(item);
                    }
                    // call the method to save any modification
                    tasks.save();
                }
            },
            {
                text: "Cancel"
            }]
        });
        //Close all butoons, this case Edit and Label after any change
        $ionicListDelegate.closeOptionButtons();
    };


    //**********************************************


    // function to get the tasks and save
    function getAtribute(item) {


        $scope.data = {};
        //$scope.data.newLabel = item.name;


        // This is the ref i used to inser icon -> ionicActionSheet
        //http://stackoverflow.com/questions/30374896/align-ionicactionsheet-content

        // Popup for new task or edit tasks
        $ionicActionSheet.show({
            buttons: [{
                text: '<i class="ion-arrow-right-c icon-button icon-action" ></i>    <span class="tab-action"></span> <i class="text-action">Normal</i>'
            }, {
                text: '<i class="ion-arrow-up-c icon-button icon-action" ></i>    <span class="tab-action"></span> <i class="text-action">Priority</i>'
            }, {
                text: '<i class="ion-arrow-down-c icon-button icon-action" ></i>    <span class="tab-action"></span> <i class="text-action">Low</i>'
            }, {
                text: 'Blue'
            }, {
                text: 'Red'
            }, {
                text: 'Green'
            }],

            titleText: 'Task Label and Color',

            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                if (index === 0) {
                    item.label = "Normal";
                    tasks.save();
                    return true;
                }

                if (index === 1) {
                    item.label = "Priority";
                    tasks.save();
                    return true;
                }

                if (index === 2) {
                    item.label = "Low";
                    tasks.save();
                    return true;
                }

                if (index === 3) {
                    item.color = "button-positive";
                    tasks.save();
                    return true;
                }

                if (index === 4) {
                    item.color = "button-assertive";
                    tasks.save();
                    return true;
                }

                if (index === 5) {
                    item.color = "button-balanced";
                    tasks.save();
                    return true;
                }
            }
        });
        //Close all butoons, this case Edit and Label after any change
        $ionicListDelegate.closeOptionButtons();
    };

    //**************************************************
    $scope.info = function () {
        //console.log("pass");
        $ionicPopup.alert({
            title: 'Help!',
            template: 'To edit or change label and color the task, just slide the right task to the left.'
        });
    };


    // function to set value true or false var finish
    $scope.onMarkTask = function (item) {
        //console.log("pass");
        item.finish = !item.finish;

        // call the method to save any modification
        tasks.save();
    };

    // Verify if var finish for each task, this will define if the task will be
    // visible on screen or not
    $scope.onHideItem = function (item) {
        return item.finish && !$scope.showMarked;
    };

    // function add task
    $scope.onItemAdd = function () {
        var item = {
            name: "",
            label: "Normal",
            color: "button-positive",
            finish: false
        };

        // values to be save
        getItem(item, true);



    };


    $scope.onItemAtribute = function (item) {

        getAtribute(item);


    };



    // edit task and sent to be save
    $scope.onItemEdit = function (item) {
        getItem(item, false);



    };

    // Remove task and sent to be save
    $scope.onItemRemove = function (item) {
        tasks.remove(item);
    };

    $scope.onClickRemove = function () {
        $scope.removeStatus = !$scope.removeStatus;
        tasks.save();
    };


});
