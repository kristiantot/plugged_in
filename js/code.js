var container, stats;

var camera, controls, scene, renderer;

var cross;

var loader = new THREE.JSONLoader();

init();
animate();
onWindowResize();



function init() {

  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 10;

  controls = new THREE.OrbitControls( camera );
  controls.addEventListener( 'change', render );

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

  // world
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
//scene.add( cube );
 	loader.load( "assets/usb_3.json", function(geometry){
        var material = new THREE.MeshLambertMaterial({color: 0x55B663});
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      });




  // lights

  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 1, 1, 1 );
  scene.add( light );

  light = new THREE.DirectionalLight( 0x002288 );
  light.position.set( -1, -1, -1 );
  scene.add( light );

  light = new THREE.AmbientLight( 0x222222 );
  scene.add( light );


  // renderer

  renderer = new THREE.WebGLRenderer( { antialias: false } );
  renderer.setClearColor( scene.fog.color, 1 );
  renderer.setSize( window.innerWidth, window.innerHeight );

  container = document.getElementById( 'container' );
  container.appendChild( renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  render();

}

function animate() {

  requestAnimationFrame( animate );
  controls.update();

}

function render() {
  renderer.render( scene, camera );
}