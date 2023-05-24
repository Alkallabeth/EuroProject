/* 

This file handles everything to do with game controllers

*/



// Used to take action based on controller input

let Controls = {
    clear: function(){
        let keys = Object.keys(this);
        for(let i=0;i<keys.length;i++){
            this[keys[i]] = function(){};
        }
    },
    a: function(){
        document.getElementById("show-rules-btn").click();
    },
    b: function(){
        document.getElementById("six-player-btn").click();
    },
    x: function(){
        document.getElementById("two-player-btn").click();
    },
    y: function(){
        document.getElementById("four-player-btn").click();
    },
    lb: function(){
        
    },
    rb: function(){
        
    },
    l: function(){
        
    },
    r: function(){
        
    },
    lt: function(){
        
    },
    rt: function(){
        
    },
    left: function(){
        
    },
    right: function(){
        
    },
    top: function(){
        
    },
    down: function(){
        
    },
    start: function(){
        
    },
    map: function(){
        
    },
    logo: function(){
        
    }
}

// Used to control the mouse element on the character selection screen

let Mouse = {
    active: false,
    element: document.getElementById("mouse"),
    x: 10,
    y: 10,
    changePosition: function(left, top){
        this.x += left;
        this.y += top;
        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
        let elems = document.elementsFromPoint(this.x, this.y);
        let elem;
        for(let i=0;i<elems.length;i++){
            if(elems[i].title){
                elem = elems[i];
            }
        }
        if(elem){
            const mouseOverEvent = new MouseEvent('mouseover', {
                view: window,
                bubbles: true,
                cancelable: true
            });
              
            elem.dispatchEvent(mouseOverEvent);
        }
    },
    activate: function(){
        this.active = true;
        if(gamepadConnected){
            this.element.show();
        }
    },
    deactivate: function(){
        this.active = false;
        this.element.hide();
    },
    click: function(){
        let elems = document.elementsFromPoint(this.x, this.y);
        let elem;
        for(let i=0;i<elems.length;i++){
            if(elems[i].title){
                elem = elems[i];
            }
        }
        if (elem) {
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            elem.dispatchEvent(clickEvent);
        }
    }
}

let gamepadConnected = false;

// Handles control changes and notifies user when a controller is connected or disconnected

window.addEventListener("gamepadconnected",function(){
    popup("success","Controller Connected!");
    let cs = document.querySelectorAll(".controller-controls");
    for(let i=0;i<cs.length;i++){
        if(cs[i] != Mouse.element){
            cs[i].show();
        }
    }
    gamepadConnected = true;
});
window.addEventListener("gamepaddisconnected",function(){
    popup("danger","Controller Disconnected");
    if(!navigator.getGamepads()[0]){
        let cs = document.querySelectorAll(".controller-controls");
        for(let i=0;i<cs.length;i++){
            cs[i].hide();
        }
        gamepadConnected = false;
    }
});

// Used to make sure the game loop doesn't register one button press as multiple

class BtnPress{
    constructor(index){
        this.index = index;
        this.time = new Date();
    }
    checkTime(other){
        let difference = Math.abs(this.time.getTime() - other.time.getTime());
        return(difference <= 500);
    }
    checkSame(other){
        return(this.index == other.index);
    }
}

let previousButtonsPressed = [new BtnPress(-1)];

// The game loop. It runs every 100 milliseconds (10 times per second) to check for button presses on controller

setInterval(function(){
    const gamepads = navigator.getGamepads();
    for(let i=0;i<gamepads.length;i++){
        let controller = gamepads[i];
        if(controller){
            let buttons = controller.buttons;
            for(let i=0;i<buttons.length;i++){
                if(buttons[i].pressed){
                    
                    // Checks to make sure that the event isn't a duplicate of the same button press as the last one
                    
                    let thisEvent = new BtnPress(i);
                    let lastEvent = previousButtonsPressed[previousButtonsPressed.length - 1];
                    if(!(thisEvent.checkTime(lastEvent) && thisEvent.checkSame(lastEvent))){
                        previousButtonsPressed.push(new BtnPress(i));
                        if(i == 0){
                            Controls.a();
                        }
                        if(i == 1){
                            Controls.b();
                        }
                        if(i == 2){
                            Controls.x();
                        }
                        if(i == 3){
                            Controls.y();
                        }
                        if(i == 4){
                            Controls.lb();
                        }
                        if(i == 5){
                            Controls.rb();
                        }
                        if(i == 6){
                            Controls.lt();
                        }
                        if(i == 7){
                            Controls.rt();
                        }
                        if(i == 10){
                            Controls.l();
                        }
                        if(i == 11){
                            Controls.r();
                        }
                        if(i == 14){
                            Controls.left();
                        }
                        if(i == 12){
                            Controls.top();
                        }
                        if(i == 15){
                            Controls.right();
                        }
                        if(i == 13){
                            Controls.down();
                        }
                        if(i == 9){
                            Controls.start();
                        }
                        if(i == 8){
                            Controls.map();
                        }
                        if(i == 16){
                            Controls.logo();
                        }
                    }
                }
            }
        }
    }
},100);

// Another game loop, but this runs constantly (or at least as fast as the computer will allow). This loop controls the left and right joystick movement and moves the mouse element accordingly.

setInterval(function(){
    let allCs = navigator.getGamepads();
    for(let i=0;i<allCs.length;i++){
        let controller = allCs[i];
        if(controller){
            if(Mouse.active){
                let axes = controller.axes;
                Mouse.changePosition(axes[0] * 2, axes[1] * 2);
            }
        }
    }
},0);

// Button index mapping for Gamepad API

//a = 0, b=1, x=2, y=3, lb=4, rb=5, lt=6, rt=7, l=10, r=11, left = 14
//top = 12, right = 15, down = 13, start = 9, map = 8, logo = 16
//0 = (l)left and right, 1 = (l)up and down, 2 = (r)left and right, 3 = (r)up and down
