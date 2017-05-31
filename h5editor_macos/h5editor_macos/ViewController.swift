//
//  ViewController.swift
//  h5editor_macos
//
//  Created by  楚浩远 on 2017/5/31.
//  Copyright © 2017年  楚浩远. All rights reserved.
//

import Cocoa
let on = 1//开
let off = 0//关
class ViewController: NSViewController {
    var num = 1
    @IBOutlet weak var nameDield: NSTextField!
    @IBOutlet weak var ageComboBox: NSComboBox!
    @IBOutlet weak var radioMan: NSButton!
    @IBOutlet weak var radioWoman: NSButton!
    @IBOutlet weak var subButton: NSButton!
    @IBOutlet weak var showInfoLabel: NSTextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        addComboItem();
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }

    
    @IBAction func mainRadio(_ sender: Any) {
        if (radioWoman.state == on){
            radioWoman.state = off;
        }
        radioMan.state = on;
    }
   
    @IBAction func womanRadio(_ sender: Any) {
        if radioMan.state == on
        {
            radioMan.state = off;
        }
        radioWoman.state = on;
    }
    func sexValue()-> String {
        if radioMan.state == on{
            return "男"
        }else{
            return "女"
        }
    }

    @IBAction func subButton(_ sender: Any) {
        showInfoLabel.stringValue = "姓名:" + nameDield.stringValue + "\n" + "年龄:" + ageComboBox.stringValue + "\n" + "性别:" + sexValue()
    }
    func addComboItem(){
        repeat{
            ageComboBox.addItem(withObjectValue: num);
            num+=1;
        }while num <= 50;
        ageComboBox.stringValue = "25";
        
    }

}

