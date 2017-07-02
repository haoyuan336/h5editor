//: Playground - noun: a place where people can play

import UIKit

var str = "Hello, playground"
print("\(str)")
var list = [10,20,30,50]
list.append(100)
list.remove(at: 1)
list.insert(300, at: 2)
list.append(200)
list.reverse()
list.count
func thirdFunctin(_ left: Int, _ right: Int)->Int{
    return left + right
}
thirdFunctin(100, 200)

//func fourFunction<T>(_ left: T, _ right: T)->T{
//    return left + right
//}
//fourFunction(100, 500)

func fiveFunction(_ left: Int, _ right: Int)->(first: Int,second: Int){
    return (right,left)
}
fiveFunction(100, 400).1
func sixFunction (left: Int, right: Int)->(first: Int,second: Int){
    return (right,left)
}
sixFunction(left: 1000, right: 2000).second



func sevenFunction(num: Int...) -> Int {
    var total = 0
    for number in num {
    
        total += number
    }
    
    return total
}
sevenFunction(num: 10,20,30,40,50)


//var test1 = 100
//var test2 = 500
//func eightFunctin (inout  left: Int, inout right: Int){
//    let temp = left
//    left = right
//    right = temp
//}
//
//eightFunctin(&test1,  &test2)
//print("test1 = \(test1)")
//print("test2 = \(test2)")








