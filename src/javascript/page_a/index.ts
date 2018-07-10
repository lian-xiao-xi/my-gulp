import * as tscomFun from '../common/common'

/**
 * ====== 接口 ======
 */

/**
 * 接口初探
 */
interface LabelledVal {
  label: string;
}
function printLabel(labelledObj:LabelledVal):void {
  console.log(`pringtLabel 函数 +++ `, labelledObj.label)
}
let myObj = {
  size: 10,
  label: 'size is 10'
}
printLabel(myObj)

/**
 * 可选属性
 */
interface SquareConfig {
  color?: string;
  width?: number;
}
function createSquare(config:SquareConfig): {color: string, area: number} {
  let newSquare = {
    color: 'white',
    area: 100
  };
  if(config.color) {
    newSquare.color = config.color
  }
  if(config.width) {
    newSquare.area = config.width*config.width
  }
  console.log('createSquare 函数 +++ ', newSquare)
  return newSquare;
}
let mySquare: SquareConfig = {color: 'red', width: 123}
createSquare(mySquare)

/**
 * 只读属性
 */
interface Point {
  readonly x: number;
  y: string;
}
let p1: Point = {x: 10, y: 'ttt'};
// p1.x = 5; // error!
let numArr: number[] = [1,2,3];
let roArr: ReadonlyArray<number> = numArr;
// roArr[1] = 5; // error!
// roArr.push(5) // error!
// roArr.length = 10; // error!

/**
 * 额外的属性检查
 */
interface testOtherKey {
  name: string;
  sex?: number;
  // [propName: string]: any
}
function oKey(keyVal:testOtherKey) {
  console.log('oKey 函数 +++ ', keyVal.name)
}
// let theKeyVal: testOtherKey = {name: 'lcc', birth: '1990'} // error!
// oKey({name: 'lll', birth: '1996'}) // error！

let theKeyVal = {name: 'lcc', birth: '1990'}
oKey(theKeyVal) // right!

/**
 * 接口描述函数类型
 */
interface searchFun {
  (source: string, subStr: string): boolean;
}

let mySearch = <searchFun>function (src, sub) {
  let result = src.search(sub)
  return result>-1;
}

console.log(mySearch('sdfewcvds5445', '5'))

/**
 * 可索引的类型
 */
interface StringArray {
  [index: string]: string;
}

let myArray: StringArray;
// myArray = ["Bob", "Fred"];
myArray = {
  'a': 'aaaa'
}

let myStr: string = myArray['a'];
console.log(myStr)

/**
 * 继承接口
 */
interface Shape {
  color: string;
}
interface PenStroke {
  penWidth: boolean;
}
interface Square extends Shape,PenStroke {
  sideLength: number;
}
let square = <Square>{
  sideLength: 1212,
  color: 'blue'
};
console.log('继承接口', square)

/**
 * 混合类型
 */
interface Counter {
  (start: number): string;
  interval: number;
  reset(setNum: number): boolean;
}

function getCounter(): Counter {
  let counter = <Counter>function(startNum: number):string {
    return startNum.toString()
  };
  counter.reset = function() {
    return true
  }
  return counter;
}
let c = getCounter();
console.log(c(55))

/**
 * ====== 类 ======
 */
/**
 * 继承
 */
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName
  };
  move(distance:number = 0):void {
    console.log(`${this.name} moved ${distance} 米`)
  };
}
class Snake extends Animal {
  age?: number;
  constructor(snakeName: string, age?: number) {
    super(snakeName)
    age && (this.age = age)
  };
  move(snakeDistance:number = 5):void {
    console.log('Snake Class ...')
    super.move(snakeDistance);
  }
}
let sam = new Snake('it is a snake')
console.log(sam)
sam.move(11)

/**
 * 存取器
 */
let passcode = '123'
class Employee {
  private _fullName: string;
  
  public get fullName() : string {
    return this._fullName
  }

  
  public set fullName(newName: string) {
    if(passcode && passcode === '123') this._fullName = newName;
    else console.log('ERROR: unauthorized update of employee')
  }
}
// passcode = '111'
let employee = new Employee();
employee.fullName = 'Tom Bob'
console.log(employee.fullName)
if(employee.fullName) { alert(employee.fullName)}