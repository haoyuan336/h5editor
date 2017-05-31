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
class ViewController: NSViewController,NSTextFieldDelegate {


    
    @IBOutlet weak var inputMessage: NSTextField!
    @IBOutlet weak var collectionView: NSCollectionView!
    let reuse = "reuseItem"
    var data:[String] = ["张三","李四","王五","小六"]
    var item = SBCollectionItem();
    override func viewDidLoad() {
        super.viewDidLoad()
        inputMessage.delegate = self
        collectionView.register(forDraggedTypes: [reuse])
        inputMessage.becomeFirstResponder()
        
//        inputMessage.becomeFirstResponder();
        // Do any additional setup after loading the view.

    }

    @IBAction func add(_ sender: Any) {
        addMessage();
    }
    func addMessage(){
        if !inputMessage.stringValue.isEmpty{
//            data.append(inputMessage.stringValue)
            let indexPath = NSIndexPath.init(forItem: data.count - 1,inSection: 0)
//            collectionView.insertItems(at: [indexPath as IndexPath])
//            collectionView.scrollToItems(at: [indexPath as IndexPath], scrollPosition: .bottom)
//            collectionView.reloadItems(at: [indexPath as IndexPath])
            collectionView.insertItems(at: [indexPath as IndexPath])
            inputMessage.stringValue = ""
            
        }
    }
    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }

    
    
    

}

