
function get(object, key, default_value) {
    var result = object[key];
    return (typeof result !== "undefined") ? result : default_value;
}

var deptToAbbreviation = {

    "ELECTRICALENGINEERING": "ECE", 
    "COMPUTERSCIENCE": "CS" 

};

function processCourseInput(course) { 

    course = course.replace(/\s/g, ''); 
    course = course.toUpperCase(); 
    slicePt = course.indexOf(course.match(/\d/)); 

    dept = course.substring(0, slicePt); 
    console.log(dept)
    dept = get(deptToAbbreviation, dept, dept) 
    number = course.substring(slicePt); 

    while (dept.length + number.length < 6) {
        number = "0" + number 
    } 

    course = dept + number;
    return course;

}

console.log(processCourseInput("CS 35l"));
console.log(processCourseInput("Computer Science 131"));
console.log(processCourseInput("Electrical Engineering 3"))

