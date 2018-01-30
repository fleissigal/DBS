// all code here derived from https://github.com/mrdoob/three.js/blob/master/editor/js/Loader.js

	var JAFO = {} || JAFO;

	if ( window.location.origin === 'http://' ) {
		JAFO.loadersBase = '../../../three.js/examples/';
	} else {
		JAFO.loadersBase = '../../../../three.js/examples/';
	}

//	JAFO.count = 0;

	JAFO.addFileOpenTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.title = 'Open a file';
		tab.innerHTML =
			'<a href=# id=tabFileOpen ><p class=button >' +
				'<i class="fa fa-paw"></i> File Open...' +
			'</p></a>'; 
		tabFileOpen.onclick = function() { JA.toggleTab( JAFO.FileOpen ); };

		JAFO.FileOpen = JA.menu.appendChild( document.createElement( 'div' ) );
		JAFO.FileOpen.style.cssText = 'cursor: auto; display: none; ' ;
		JAFO.FileOpen.innerHTML =
			'<p>Select a file to load</p>' +
			'Scale: <input type=number id=inpScale value=1.000 max=1000 min=0.001 step=0.1 /><br>' +
			'<p>Open & overwrite current view: <input type=file id=inpOpenFile ></p>' +
			'<p>Append to current view: <input type=file id=inpAppendFile ></p>' +
		'';

		inpOpenFile.onchange = function() { JAFO.openFile ( this ); };
		inpAppendFile.onchange = function() { JAFO.appendFile ( this ); };

		if ( !JAFO.ifr ) {
			JAFO.ifr = document.body.appendChild( document.createElement( 'iframe' ) );
			JAFO.ifr.height = window.innerHeight;
			JAFO.ifr.width = window.innerWidth;
			JAFO.ifr.style.cssText = 'border-width: 0; position: absolute; ';
		}
	};

	JAFO.openUrl = function ( things ) {  // good
console.log( 'openHtml', things[0] )
		var extension = things[0]['tmpl'].split( '.' ).pop().toLowerCase();
		JAFO.ifr.src = '';
		if ( extension === 'html' ) {
			JAFO.ifr.onload = function() {
				var title = JAFO.ifr.contentDocument.title
				JAFO.addUsefelThings( things, title );
			};
			JAFO.ifr.src = things[0]['tmpl'];


		} else {
			JAFO.ifr.onload = function() {
console.log( 'openObject', link );
				JAFO.addUsefelThings( link, 'title', thing );
				var contents = JAFO.requestFile( link );
				JAFO.switchType( link, contents, inpScale.value );
			};
			JAFO.ifr.src = 'boilerplate-simple.html';
		}
	};

	JAFO.openFile = function ( that ) {  // good
		if ( !that.files ) return;

		var filename = that.files[0].name;
		var extension = filename.split( '.' ).pop().toLowerCase();

		if ( extension === 'html' ) {
				var scale = 1;
				var reader = new FileReader();

				reader.addEventListener( 'load', function ( event ) {
					var contents = reader.result;
					JAFO.ifr.onload = function() {
						JAFO.addUsefelThings( that.files[0].name );
					}
					JAFO.ifr.srcdoc = contents;

console.log( 'read html ' )
				}, false );
				reader.readAsText( that.files[0] );

		} else {
			JAFO.ifr.onload = function() {
console.log( 'read Object ' )
				var filename = that.files[0].name;
				var scale = inpScale.value;
				var reader = new FileReader();

				reader.addEventListener( 'load', function ( event ) {
					var contents = reader.result;
					JAFO.switchType( filename, contents, scale );
				}, false );

				reader.readAsText( that.files[0] );

				JAFO.addUsefelThings( filename );

			};
			JAFO.ifr.src = 'boilerplate-simple.html';
//			JAFO.ifr.contentWindow.location.reload();
		}
	};

	JAFO.addUsefelThings = function( things, title ) {
		var name = title ? title : things[0]['tmpl'].split('/').pop();
		app = JAFO.ifr.contentWindow;
		THREE = app.THREE;
		renderer = app.renderer;
		scene = app.scene;
		scene.name = name;
		scene.select = app.mesh;
		camera = app.camera;
		controls = app.controls;
		material = app.material;

		renderer.shadowMapEnabled = true;
		renderer.shadowMapSoft = true;
		scene.add( camera );

		chkLightAmbient.checked = true;
		JALI.toggleLightAmbient();

		chkLightCamera.checked = true;
		JALI.toggleLightCamera();

		chkLightPosition.checked = true;
		JALI.toggleLightPosition();

		if ( !JAFO.ifr.contentWindow.controls ) {

			var script = document.body.appendChild( document.createElement( 'script' ) );
			script.onload = function() {
				JAFO.ifr.contentWindow.controls = new THREE.OrbitControls( camera, renderer.domElement );

				JAFO.ifr.contentWindow.animate2 = function() {
					requestAnimationFrame( JAFO.ifr.contentWindow.animate2 );
					JAFO.ifr.contentWindow.controls.update();
				}
			}
			script.src = 'http://mrdoob.github.io/three.js/examples/js/controls/OrbitControls.js'
		}

		var thg = JAPL.things[0];

		if ( controls && thg ) {
			controls.target.set( thg['tarx'], thg['tary'], thg['tarz'] );
			camera.position.set( thg['camx'], thg['camy'], thg['camz'] );
			camera.up = v( 0, 1, 0 );
		}

		JAPR.setRandomGradient();

		projector = new THREE.Projector();
		app.window.addEventListener( 'click', JATH.onDocumentMouseClick, false );

		scene.template = things[0]['tmpl'];
		scene.select = scene.children[ 0 ];
		scene.select.name = name;
		scene.select.link = things[0]['tmpl'];

//		scene.select.material = things[0]['mat'];
//		scene.select.castShadow = true;
//		scene.select.receiveShadow = true;

		JAFO.targetList = scene.children;

		divMsg1.innerHTML = 'Base: ' + name;


		for (var i = 1, len = JAPL.things.length; i < len; i++) {
//			JAFO.appendUrl( JAPL.things[i]["url"], 1, JAPL.things[i] );
		}
	}

	JAFO.appendUrl = function ( link, scale, thing ) { // good
console.log( 'append URL', thing);
		var scl = scale ? scale : 1;
		var contents = JAFO.requestFile( link );
		JAFO.switchType( link, contents, scl, thing );
		var filename = link.split('/').pop();
		divMsg1.innerHTML += '<br>append: ' + filename;
	};

	JAFO.appendFile = function ( that ) { // good
console.log( 'append file');
		if ( that.files ) {
			var filename = that.files[0].name;
			var reader = new FileReader();
			reader.addEventListener( 'load', function ( event ) {
				var contents = reader.result;
				JAFO.switchType( filename, contents, inpScale.value );
			}, false );

			reader.readAsText( that.files[0] );
			divMsg1.innerHTML += '<br>append ' + filename;
		}
	};

	JAFO.switchType = function ( link, contents, scale, thing ) {

		var extension = link.split( '.' ).pop().toLowerCase();

		switch ( extension ) {
			case 'html' :
console.log('switch html', thing );
				JAFO.loadHtml( link, contents, scale, thing );
				break;

			case 'dae':
				JAFO.loadDAE( link, contents, scale, thing );
				break;

			case 'js':
			case 'json':

			case '3geo':
			case '3mat':
			case '3obj':
			case '3scn':
				JAFO.loadJSON( link, contents, scale, thing );

				break;

			case 'obj':
				JAFO.loadOBJ( link, contents, scale );
				break;

			case 'stl':
				JAFO.loadSTL( link, contents, scale );
				break;

			case 'vtk':
				JAFO.loadVTK( link, contents, scale );
				break;

			case 'wrl':
				JAFO.loadVRML( link, contents, scale );
				break;

			default:
				alert( 'Unsupported file format.' );
				break;
		}
	};

/*

Each of the following functions should be enhanced to take advatage of the special features and unique characteristics of each file type...

*/

	JAFO.loadHtml = function ( link, contents, scale, thing ) {
console.log( 'load HTML', thing );
		scene.select = scene.children[0];
		scene.select.name = link.split('/').pop();
		scene.select.link = link;
		scene.select.castShadow = true;
		scene.select.receiveShadow = true;
console.log( 'load HTML', scene.select );
		scene.select.position.set( thing['posx'], thing['posy'], thing['posz'] );
		scene.select.rotation.set( thing['rotx'], thing['roty'], thing['rotz'] );
		scene.select.scale.set( thing['sclx'], thing['scly'], thing['sclz'] );
		scene.select.material = JAMA.materials[ thing['mat'] ].set();
		scene.select.materialKey = thing['mat'];

	}


	JAFO.loadDAE = function ( link, contents, scale ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			var parser = new DOMParser();
			var xml = parser.parseFromString( contents, 'text/xml' );

			var loader = new THREE.ColladaLoader();
			loader.parse( xml, function ( collada ) {

				collada.scene.name = link;
				scene.add( collada.scene );

			} );
		};
		script.src = JAFO.loadersBase + 'js/loaders/ColladaLoader.js';

	};

	JAFO.loadJSON = function ( link, contents, scale, thing ) {

		if ( contents.indexOf( 'postMessage' ) !== -1 ) {
console.log( 'worker did some work!', link );
			var blob = new Blob( [ contents ], { type: 'text/javascript' } );
			var url = URL.createObjectURL( blob );
			var worker = new Worker( url );
			worker.onmessage = function ( event ) {
				event.data.metadata = { version: 2 };
				JAFO.handleJSON( event.data, link, scale );
			};
			worker.postMessage( Date.now() );
			return;
		}
		// >= 3.0
		var data;
		try {
			data = JSON.parse( contents );
		} catch ( error ) {
			alert( error );
			return;
		}
		JAFO.handleJSON( data, link, scale, thing );

	};

	JAFO.loadOBJ = function ( link, contents, scale ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			var object = new THREE.OBJLoader().parse( contents );

			mesh = object.children[0];
			mesh.name = link;
			mesh.material = new THREE.MeshPhongMaterial();
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/OBJLoader.js';

	};

	JAFO.loadSTL = function ( link, contents, scale ) {

		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.src = JAFO.loadersBase + 'js/wip/TypedGeometry.js';

		script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			geometry = new THREE.STLLoader().parse( contents );
			material = new THREE.MeshPhongMaterial();

			mesh = new THREE.Mesh( geometry, material );
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/STLLoader.js';

	};

	JAFO.loadVTK = function ( link, contents, scale ) {
		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			geometry = new THREE.VTKLoader().parse( contents );
			material = new THREE.MeshPhongMaterial();

			mesh = new THREE.Mesh( geometry, material );
			mesh.name = link;
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( mesh );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/VTKLoader.js';
	};

	JAFO.loadVRML = function ( link, contents, scale ) {
		var script = document.body.appendChild( document.createElement( 'script' ) );
		script.onload = function() {

			object = new THREE.VRMLLoader().parse( contents );

			mesh = object.children[0];
			mesh.name = link;
			mesh.material = new THREE.MeshPhongMaterial();
			mesh.castShadow = true;
			mesh.receiveShadow = true;

			scene.add( object );
			scene.select = mesh;

		};
		script.src = JAFO.loadersBase + 'js/loaders/VRMLLoader.js';
	};

	JAFO.handleJSON = function ( data, link, scale, thing ) {
console.log( 'xxxthing', thing );
		var loader, result;

		if ( data.metadata === undefined ) { // 2.0
			data.metadata = { type: 'Geometry' };
		}
		if ( data.metadata.type === undefined ) { // 3.0
			data.metadata.type = 'Geometry';
		}
		if ( data.metadata.version === undefined ) {
			data.metadata.version = data.metadata.formatVersion;
		}
		if ( data.metadata.type.toLowerCase() === 'geometry' ) {
console.log( 'geometry' );
			loader = new THREE.JSONLoader();
			result = loader.parse( data );

			geometry = result.geometry;

			if ( result.materials !== undefined ) {
				if ( result.materials.length > 1 ) {
					material = new THREE.MeshFaceMaterial( result.materials );
				} else {
					material = result.materials[ 0 ];
				}
			} else if ( thing ){
				material = JAMA.materials[ thing['mat'] ].set();
			} else {
				material = JAMA.materials[ 'NormalSmooth' ].set();
			}

			material = JAMA.materials[ thing['mat'] ].set();

			geometry.sourceType = "ascii";
			geometry.sourceFile = link;

			var mesh = new THREE.Mesh( geometry, material );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			
			if ( thing ) {
				mesh.position.set( thing['posx'], thing['posy'], thing['posz'] );
				mesh.rotation.set( thing['rotx'], thing['roty'], thing['rotz'] );
				mesh.scale.set( thing['sclx'], thing['scly'], thing['sclz'] );
				mesh.materialKey = thing['mat'];
			} else {
console.log( ' no thing');
				mesh.scale.set( scale, scale, scale );
			}
			mesh.name = link.split('/').pop();
			mesh.link = link;

			scene.add( mesh );
			scene.select = mesh;
//			JAPL.resetValues();

		} else if ( data.metadata.type.toLowerCase() === 'object' ) {

			loader = new THREE.ObjectLoader();
			result = loader.parse( data );

			if ( result instanceof THREE.Scene ) {
				JAFO.updateScene( result, link, scale, thing );

			} else {
console.log( 'object', result );
				scene.add( result );
				scene.select = result;
				scene.select.name = link.split('/').pop();
				scene.select.link = link;
				scene.select.materialKey = JAPL.mat;
				scene.select.castShadow = true;
				scene.select.receiveShadow = true;

				if ( thing ) {
					scene.select.position.set( thing['posx'], thing['posy'], thing['posz'] );
					scene.select.rotation.set( thing['rotx'], thing['roty'], thing['rotz'] );
					scene.select.scale.set( thing['sclx'], thing['scly'], thing['sclz'] );
					scene.select.material = JAMA.materials[ thing['mat'] ].set();
					scene.select.materialKey = thing['mat'];
				}
			}
		} else if ( data.metadata.type.toLowerCase() === 'scene' ) {
console.log( 'deprecated');
			// DEPRECATED
			loader = new THREE.SceneLoader();
			loader.parse( data, function ( result ) {
//				scene.add( result.scene );
				JAFO.updateScene( result, link, scale );
			}, '' );
		} else {
console.log( 'wh0ops');
		}
	};

	JAFO.updateScene = function( result, link, scale ) {
console.log( 'scene' );

		JATH.attributes.innerHTML = '';
		scene = result;

		app.scene = scene;
		scene.add( camera );


		chkLightAmbient.checked = true;
		JALI.toggleLightAmbient();
		chkLightCamera.checked = true;
		JALI.toggleLightCamera();
		chkLightPosition.checked = true;
		JALI.toggleLightPosition();

		for (var i = 0, len = result.children.length; i < len; i++) {
//			result.children[i].scale.set( scale, scale, scale );
			if ( result.children[i].geometry ) {
				result.children[i].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
			} 
			if ( result.children[i].children[0] && result.children[i].children[0].geometry ) {
				result.children[i].children[0].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
			}
			if ( result.children[i].children[1] && result.children[i].children[1].geometry ) {
				result.children[i].children[1].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
			}
			if ( result.children[i].children[2] && result.children[i].children[2].geometry ) {
				result.children[i].children[2].geometry.applyMatrix( new THREE.Matrix4().multiplyScalar( scale) );
			}
		}

		scene.select = result.children[0];
		scene.select.name = link.split('/').pop();
		scene.select.link = link;
		scene.select.materialKey = JAPL.mat;

		JAFO.updateTargetList( link );
	};

	JAFO.updateTargetList = function( link ) {

		if ( link.indexOf( '.rvt.js' ) > 0 ) {
			JAFO.targetList = [];
			for ( var i = 0; i < scene.children.length; i++ ){
				for ( var k = 0; k < scene.children[i].children.length; k++){
//					if ( scene.children[i].children[k].hasOwnProperty("geometry") ) {
						JAFO.targetList.push( scene.children[i].children[k] );
						scene.children[i].children[k].userData = scene.children[i].userData;
//					} else {

//					}
				}
			}
		} else {
			JAFO.targetList = scene.children;
		}
	}

	JAFO.requestFile = function( fname ) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.crossOrigin = "Anonymous"; 
		xmlhttp.open( 'GET', fname, false );
		xmlhttp.send( null );
		return xmlhttp.responseText;
	};
