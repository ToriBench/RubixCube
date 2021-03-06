class World {
  constructor(game) {
    //super( true );
    this.game = game;

    this.container = this.game.dom.game;

    this.scene = new THREE.Scene(); 
    let width = this.container.offsetWidth;
    let height =this.container.offsetHeight


    this.camera = new THREE.PerspectiveCamera(
      55,
      this.container.offsetWidth -100 / this.container.offsetHeight,
      0.1,
      1000
    );
  //  this.camera = new THREE.OrthographicCamera( -width/1000, width/1000, height/1000, -height/1000, 1, 100);
    this.camera.position.z =7;

    this.stage = { width: 2, height: 3 };

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    
    this.renderer.setClearColor("#F4EBDC");
    // this.renderer.setClearColor("#000000");

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
    this.createLights();
    this.container.appendChild(this.renderer.domElement);
    this.update();
    this.resize();
    window.addEventListener("resize", () => this.resize(), false);
    window.addEventListener("mousemove",()=> this.update(),false);

  }

  update() {
    //requestAnimationFrame(this.update());
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.update()
  }

  resize() {
    this.camera.aspect =
      this.container.offsetWidth / this.container.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      this.container.offsetWidth,
      this.container.offsetHeight
    );
    this.update();
  }

  createLights() {
    this.lightHolder = new THREE.Object3D();

    this.lights = {
      ambient: new THREE.AmbientLight(0xffffff, 0.8),
      front: new THREE.DirectionalLight(0xffffff, 0.36),
      back: new THREE.DirectionalLight(0xffffff, 0.19),
    };

    Object.values(this.lights).forEach((light) => {
      this.lightHolder.add(light);
    });

    this.scene.add(this.lightHolder);
  }
}

export { World };
