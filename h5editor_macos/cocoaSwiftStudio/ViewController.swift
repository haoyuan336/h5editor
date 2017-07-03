//
//  ViewController.swift
//  cocoaSwiftStudio
//
//  Created by  楚浩远 on 2017/6/29.
//  Copyright © 2017年  楚浩远. All rights reserved.
//

import UIKit
class ViewController: UIViewController {
    @IBOutlet weak var imageView: UIImageView!

    var dynamicAnimator = UIDynamicAnimator()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        dynamicAnimator = UIDynamicAnimator(referenceView: self.view)
        let gravityBehavior = UIGravityBehavior(items: self.imageView);
        dynamicAnimator.addBehaviotgravityBehavior)
        
        let collsionBehavior = UICollisionBehavior(items: self.imageView)
        collsionBehavior.translateReferenceBoundsIntoBoundary = true
        dynamicAnimator.addBehavio(collsionBehavior)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

