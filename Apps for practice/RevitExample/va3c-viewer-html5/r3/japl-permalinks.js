	var JAPL = [] || JAPL;

// defaults & values all lower case to make editing the URL by hand easier
	JAPL.defaults = {
		camx: 100,
		camy: 100,
		camz: 100,
		mat: 'PhongRandom',
		posx: 0,
		posy: 0,
		posz: 0,
		rotx: 0,
		roty: 0,
		rotz: 0,
		sclx: 1,
		scly: 1,
		sclz: 1,
		tarx: 0,
		tary: 0,
		tarz: 0, 
		tmpl: 'boilerplate-simple.html',
		url: ''
	};
	JAPL.values = {}; // current or runtime updates

	JAPL.things = [];

	JAPL.addPermalinksTab = function() {
		var tab = JA.menu.appendChild( document.createElement( 'div' ) );
		tab.innerHTML =
			'<a id=tabPermalinks style=cursor:pointer; ><p class=button >' +
				'<i class="fa fa-link"></i> Permalinks...' +
			'</p></a>';
		tabPermalinks.onclick = function() { JAPL.refreshParameters(); JA.toggleTab( JAPL.permalinks ); };

		JAPL.permalinks = tab.appendChild( document.createElement( 'div' ) );
		JAPL.permalinks.style.cssText = 'cursor: auto; display: none; ' ;
	};

	JAPL.refreshParameters = function () {

		var txt =
		'<div>' +

			'<p><small><i><a href="http://en.wikipedia.org/wiki/Permalink" target="_blank">Permalinks</a> enable you to create a scene and save it as a link you can share..</i></small></p>' +

			'<p><a href=JavaScript:JAPL.getAutoCrap(); >Get AUTOcrap</a></p>' +

			'<p><a href=JavaScript:JAPL.setPermalinks(); >Set Permalinks</a></p>' +

			'<p><a href=JavaScript:JAPL.parsePermalinks(); >Parse Permalinks</a></p>' +

			'<p><a href=JavaScript:JAPL.clearPermalink(); >Clear Permalink</a></p>' +

			'<p style=text-align:right; >' +
				'<a class=button href=JavaScript:JA.toggleTab(JAPL.permalinks); >Close</a> ' +
			'</p>' +

		'</div>';

		JAPL.permalinks.innerHTML = txt;

	};

	JAPL.getAutoCrap = function() {

		var mats = [
			'BasicRedFlat','LambertRandomSmooth','NormalFlat','NormalSmooth','NormalWireframe','PhongBlueFlat','PhongBlueRefractPisa','PhongDefault',
			'PhongDefaultReflectDenim','PhongDefaultReflectWhite','PhongDefaultReflectionBasic','PhongDefaultRefractDenim','PhongGoldRefLectWhite',
			'PhongGreenSmooth','PhongPurpleFlat','PhongRandom','PhongRandomReflectCadillac','PhongRandomReflectDenim','PhongRandomReflectDisturb',
			'PhongRandomReflectGrid','PhongRandomReflectLavatile','PhongRandomReflectUVGrid','PhongRandomReflectWhite','PhongRandomReflectWire',
			'PhongRedPlastic','PhongWhiteReflectPisa','PhongWhiteReflectWhite','PhongWhiteRelectPalace'
		]
		var mat1 = mats[ Math.floor( mats.length * Math.random() ) ];
		var mat2 = mats[ Math.floor( mats.length * Math.random() ) ];
		var mat3 = mats[ Math.floor( mats.length * Math.random() ) ];

		var items = [ 1, 11, 12, 14, 33, 42, 54, 58, 62, 131, 151, 155 ];
		var index = items[ Math.floor( items.length * Math.random() ) ];
		fileTitle = V3MH.files[ index ][ 1 ];
		basepath = V3MH.basepath + V3MH.files[ index ][ 0 ] + '/';
		fname = V3MH.files[ index ][ 0 ] + '.html';
		JAPL.url = basepath + fname;

		var txt = '' +
			'#camx=' + ( 200 * Math.random() - 100 ) + '#camy=' + ( 200 * Math.random() - 100 ) + '#camz=' + ( 200 * Math.random() - 100 ) + 
			'#tarx=0#tary=0#tarz=0' +
			'#tmpl=' + basepath + fname +
			'#posx=' + ( 200 * Math.random() - 100 ) + '#posy=' + ( 200 * Math.random() - 100 ) + '#posz=' + ( 200 * Math.random() - 100 ) + 
			'#rotx=0.5#roty=0.9#rotz=0.2#sclx=1#scly=1#sclz=1#mat=' + mat1 +
			'#url=' + basepath + fname + '&' +

			'#posx=' + ( 200 * Math.random() - 100 ) + '#posy=' +( 200 * Math.random() - 100 ) + '#posz=' + ( 200 * Math.random() - 100 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) + 
			'#sclx=1#scly=1#sclz=1#mat=' + mat2 +
			'#url=../../../../three.js/examples/models/animated/flamingo.js&' +

			'#posx=' + ( 200 * Math.random() - 100 ) + '#posy=' +( 200 * Math.random() - 100 ) + '#posz=' + ( 200 * Math.random() - 100 ) +
			'#rotx=' + ( 6 * Math.random()) + '#roty=' + ( 6 * Math.random()) + '#rotz=' + ( 6 * Math.random()) + 
			'#sclx=3#scly=3#sclz=3#mat=' + mat3 +
			'#url=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js&'; 
		'';
		location.hash = txt;
console.log( txt );
	}

	JAPL.setPermalinks = function() {
		var c = camera.position;
		var t = controls.target;
		var d = JAPL.defaults;
		var txt = '';
/*
// camera
		if ( c.x !== d.camx ) txt += '#camx=' + parseInt( c.x, 10 );
		if ( c.y !== d.camy ) txt += '#camy=' + parseInt( c.y, 10 );
		if ( c.z !== d.camz ) txt += '#camz=' + parseInt( c.z, 10 );

// target
		if ( t.x !== d.tarx ) txt += '#tarx=' + parseInt( t.x, 10 );
		if ( t.y !== d.tary ) txt += '#tary=' + parseInt( t.y, 10 );
		if ( t.z !== d.tarz ) txt += '#tarz=' + parseInt( t.z, 10 );
*/

// camera
		txt += '#camx=' + parseInt( c.x, 10 );
		txt += '#camy=' + parseInt( c.y, 10 );
		txt += '#camz=' + parseInt( c.z, 10 );

// target
		txt += '#tarx=' + parseInt( t.x, 10 );
		txt += '#tary=' + parseInt( t.y, 10 );
		txt += '#tarz=' + parseInt( t.z, 10 );

		if ( scene.template ) {
			txt += '#tmpl=' + scene.template;
		}
		txt += '&';

		for (var i = 0, len = scene.children.length; i < len; i++) {
			var obj = scene.children[i];
// 			if ( obj.geometry && scene.template !== obj.link ) {
			if ( obj.geometry ) {
				txt += '#url=' + obj.link;

				if ( obj.materialKey && obj.materialKey !== 'undefines' ) {
					txt += '#mat=' + obj.materialKey;
				} else {
					txt += '#mat=' + d.mat;
				}
				txt += '#posx=' + obj.position.x;
				txt += '#posy=' + obj.position.y;
				txt += '#posz=' + obj.position.z;

				txt += '#rotx=' + parseFloat( obj.rotation.x );
				txt += '#roty=' + parseFloat( obj.rotation.y );
				txt += '#rotz=' + parseFloat( obj.rotation.z );

				txt += '#sclx=' + parseFloat( obj.scale.x );
				txt += '#scly=' + parseFloat( obj.scale.y );
				txt += '#sclz=' + parseFloat( obj.scale.z );

/*
				if ( obj.materialKey !== d.mat ) txt += '#mat=' + obj.materialKey;

				if ( obj.position.x !== d.posx ) txt += '#posx=' + obj.position.x;
				if ( obj.position.y !== d.posy ) txt += '#posy=' + obj.position.y;
				if ( obj.position.z !== d.posz ) txt += '#posz=' + obj.position.z;

				if ( obj.rotation.x !== d.rotx ) txt += '#rotx=' + parseFloat( obj.rotation.x );
				if ( obj.rotation.y !== d.roty ) txt += '#roty=' + parseFloat( obj.rotation.y );
				if ( obj.rotation.z !== d.rotz ) txt += '#rotz=' + parseFloat( obj.rotation.z );

				if ( obj.scale.x !== d.sclx ) txt += '#sclx=' + parseFloat( obj.scale.x );
				if ( obj.scale.y !== d.scly ) txt += '#scly=' + parseFloat( obj.scale.y );
				if ( obj.scale.z !== d.sclz ) txt += '#sclz=' + parseFloat( obj.scale.z );
*/
				txt += '&';
			}
		}
		window.location.hash = txt;
console.log( 'pmp', txt );
	}
		var hashes, vales;
	JAPL.parsePermalinks = function() {

		if ( !location.hash ) {

			var items = [ 1, 11, 12, 14, 33, 42, 54, 58, 62, 131, 151, 155 ];
			index = items[ Math.floor( items.length * Math.random() ) ];
			fileTitle = V3MH.files[ index ][ 1 ];
			basepath = V3MH.basepath + '/' + V3MH.files[ index ][ 0 ] + '/';
			fname = V3MH.files[ index ][ 0 ] + '.html';
			hashes = 
				['#camx=100#camy=100#camz=100#tarx=0#tary=0#tarz=0' +
				'#tmpl=' +  basepath + fname +
				'#posx=0#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1#mat=NormalSmooth' +
				'#url=' + basepath + fname +
			''];

		} else {

			var txt = '';
			hashes = location.hash.split('&');
		}

		for ( var i = 0; i < hashes.length; i++ ) {

			values = {};
			for ( var key in JAPL.defaults ) {
				values[ key ] = JAPL.defaults [ key ];
			}

			items = hashes[i].slice(1).split( '#' );
			for ( var j = 0; j < items.length; j++ ) {
				item = items[j].split( '=' );
				if ( item[0] === 'mat' || item[0] === 'tmpl' || item[0] === 'url' ) {
					values[ item[0] ] = item[1];
				} else {
					values[ item[0] ] = parseFloat( item[1] );
				}
			}

			JAPL.things.push( values );
		}

console.log( 'things', values, JAPL.things );
		JAFO.openUrl( JAPL.things );
	}

	JAPL.clearPermalink = function () {
		window.history.pushState( '', '', window.location.pathname);
	};


/*

#camx=233#camy=169#camz=163#tarx=0#tary=0#tarz=0#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//jeener-klein-surface/jeener-klein-surface.html&#url=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//jeener-klein-surface/jeener-klein-surface.html#mat=NormalSmooth#posx=0#posy=-35#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../three.js/examples/models/animated/horse.js#mat=NormalSmooth#posx=0#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js#mat=PhongRedPlastic#posx=82#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../three.js/examples/models/animated/flamingo.js#mat=PhongGreenSmooth#posx=38#posy=78#posz=46#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../fgx-repos/fgx-aircraft/data/C-160-Transall/c160.js#mat=PhongRandom#posx=74#posy=56#posz=-42#rotx=-0.0015#roty=2.5285#rotz=-0.0015#sclx=5#scly=5#sclz=5&

#camx=-226#camy=-24#camz=-22#tarx=-6#tary=16#tarz=24#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//tranguloid-trefoil/tranguloid-trefoil.html&#url=../../../../fgx-repos/fgx-aircraft/data/zzz-operations/jeep/jeep.js#mat=PhongRandom#posx=-88#posy=-36#posz=34#rotx=-0.0015#roty=-0.0015#rotz=0#sclx=20#scly=20#sclz=20&#url=../../../../fgx-repos/fgx-aircraft/data/wrightFlyer1903/WrightFlyer-pb-jw.js#mat=PhongRandom#posx=-52#posy=20#posz=8#rotx=-0.0015#roty=0#rotz=0#sclx=20#scly=20#sclz=20&

#camx=84#camy=275#camz=197#tarx=0#tary=0#tarz=0#tmpl=../../../../jaanga.github.io/projects/algesurf/parametric-equations/equation-files//hyperbolic-octahedron/hyperbolic-octahedron.html&#url=../../../../three.js/examples/models/animated/horse.js#mat=PhongRandom#posx=-42#posy=0#posz=0#rotx=0#roty=0#rotz=0#sclx=1#scly=1#sclz=1&#url=../../../../three.js/examples/obj/WaltHeadLo.js#mat=PhongPurpleFlat#posx=32#posy=42#posz=50#rotx=-0.5615#roty=0.4485#rotz=-0.0015#sclx=2#scly=2#sclz=2&#url=../../../../three.js/examples/models/animated/ratamahatta/ratamahatta.js#mat=PhongRandom#posx=68#posy=70#posz=-6#rotx=-0.0015#roty=-0.0015#rotz=-0.0015#sclx=3#scly=3#sclz=3&

*/
