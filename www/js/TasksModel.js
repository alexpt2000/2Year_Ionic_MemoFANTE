function getTasks() {

    // Declare loca VAR
    this.item = [];

    // using a browser locar storage pass the name tasklist
    var list = localStorage.getItem("tasklist");

    

    // convert each element to string, Json format
    if (list !== null)
        this.item = angular.fromJson(list);

    // method used for each modification, edit or save
    // convert to string Json and save localStorage
    this.save = function () {
        var list = angular.toJson(this.item);
        localStorage.setItem("tasklist", list);
    }

    // function for each task added
    this.add = function (item) {
        this.item.push(item);
    };

    // function each removed task
    this.remove = function (item) {
        var pos = this.item.indexOf(item);
        this.item.splice(pos, 1);
    };
}
