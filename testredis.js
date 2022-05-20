function test(){
    return true;
}
console.log(test())
function test(){
    return false;
}
var test = function(){
    return 123;
}
console.log(test())

function task1(){
    return {
        test:"success"
    }
}

function task2(){
    return 
    {
        test:"success"
    }
}
console.log(task1())
console.log(task2())

const hero1 = {
    name: 'Batman',
    age: 50,
    home:'jakarta'
  };
const hero2 = {
    name: 'Batman',
    age: 50,
    home: 'jakarta'
  };
  function shallowEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (object1[key] !== object2[key]) {
        return false;
      }
    }
    return true;
  }

  function testing(){
      if(true){
          var valfirst = 1500
          let valsecond = 900
          console.log(valfirst,valsecond)
      }
  }

console.log(shallowEqual(hero1, hero2))
testing()