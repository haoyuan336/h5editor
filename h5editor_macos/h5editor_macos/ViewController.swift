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
        
    
    }

}

