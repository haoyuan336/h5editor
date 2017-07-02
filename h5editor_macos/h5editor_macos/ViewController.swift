//
//  ViewController.swift
//  h5editor_macos
//
//  Created by  楚浩远 on 2017/5/31.
//  Copyright © 2017年  楚浩远. All rights reserved.
//

import Cocoa
class ViewController: NSViewController,NSTextFieldDelegate,NSAlertDelegate {
    var airports = ["YYZ": "Toronto Pearson","DUB": "Dublin"];
    override func viewDidLoad() {
        super.viewDidLoad()
        for index in 1...5 {
            print("inde \(index) = \(index * 5)")
        }
    }

  
    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }

    
    
    
    @IBOutlet weak var helloButton: NSButton!
    @IBAction func showAlert(_ sender: Any) {

        let v1 = Vector2d(200,200)
        let v2 = Vector2d(400,600)
        let v3 = add(v1, v2)
        print("v3 = \(v3.x)")
    }
    

    class Test {
        var id: Int
        init(_ id: Int){
            print("id = \(id)");
            self.id = id
        }
    }
    
    class Test1{
        var test1: Test
        lazy var test2 : Test = Test(5000)
        init(){
        
            test1 = Test(20000)
           
        }
    }

    
    class Vector2d {
        var x, y : Double
        
        init(_ x: Double,_ y: Double){
            self.x = x
            self.y = y
        }
        
    }
    
    func add(_ left : Vector2d,_ right: Vector2d) -> Vector2d {
        return Vector2d(left.x + right.x , left.y + right.y)
    }
    

}






