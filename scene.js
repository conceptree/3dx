'use strict';
export default class World{
    constructor(config){
        this.container = config.container ? config.container : document;
        this.cordsViewer = config.cordsViewer ? config.cordsViewer : null;
        this.fov = config.fov ? config.fov : 75;
        this.nearPoint = config.nearPoint ? config.nearPoint : 0.1;
        this.farPoint = config.farPoint ? config.farPoint : 1000;
        this.viewWidth = config.container ? config.container.offsetWidth : window.innerWidth;
        this.viewHeight = config.container ? config.container.offsetHeight : window.innerHeight;
        this.ratio = this.viewWidth / this.viewHeight;
        this.topoLines = config.topoLines ? config.topoLines : [];
        this.topoTrains = config.topoTrains ? config.topoTrains : [];
        this.topoSignals = config.topoSignals ? config.topoSignals : [];
        this.onSceneLines = [];
        this.startScene();
    }

    startScene(){
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(this.fov, this.ratio, this.nearPoint, this.farPoint);
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.renderer.setSize(this.viewWidth, this.viewHeight);
        this.container.appendChild(this.renderer.domElement);
        if (this.topoLines.length > 0){
            this.createLines();
        }
    }

    createLines(){
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xFF0000
        });
        const lineGeometry = new THREE.Geometry();
        this.topoLines.forEach((el)=>{
            const vertices = new THREE.Vector3(el.vertice[0], el.vertice[1], el.vertice[2]);
            lineGeometry.vertices.push(vertices);
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        this.addGeometryToScene(line);
        this.onSceneLines.push(line.uuid);
    }

    createGeometry(){
        this.geometry = new THREE.BoxGeometry(2, 2, 2);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.addGeometryToScene();
    }

    addGeometryToScene(mesh){
        this.scene.add(mesh);
        this.camera.position.z = 20;
        this.camera.position.x = 0;
        this.camera.position.y = 5;
        this.controls.update();
        this.startAnimation();
    }

    startAnimation(){
        const startAnimation = this.startAnimation;
        requestAnimationFrame(startAnimation.bind(this));
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        if(this.cordsViewer){
            this.cordsViewer.innerText = `
                x:${this.camera.position.x}
                y:${this.camera.position.y}
                z:${this.camera.position.z}`;
        }
    }
}