'use strict';

import World from './scene.js';

let myConfig = {
    container: document.querySelector("#myView"),
    cordsViewer: document.querySelector("#cordsViewer"),
    topoLines: [
        {
            vertice : [-10, 0, 0]
        },
        {
            vertice : [0 , 10, 0]
        },
        {
            vertice : [10, 0, 0]
        }
    ]
}
let myWorld = new World(myConfig);
console.log(myView);
console.log(myWorld);