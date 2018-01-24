// 2014-11-30 ~ Theo Armour ~ MIT License

	browseUsingFileDialog( location.hash );

	function browseUsingFileDialog( parameters ) {

		location.hash = '';

		if ( !scene || parameters.indexOf( '#new=true' ) > -1 ) {

			loadFileHTMLByURL( '#load-file-html-by-url.js#../templates/template-lights-shadows.html#displayInfo' );

			callbackIframe = function() {

				callbackBrowseUsingFileDialog( parameters ) ;

			}

		} else {

				callbackBrowseUsingFileDialog( parameters );

		} 

	}

	function callbackBrowseUsingFileDialog ( parameters) {

		VH.loadScript( 'http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js');

//		VH.loadScript( 'load-file-by-contents.js' );
		VH.loadScript( 'load-file-json-by-contents.js' );
		VH.loadScript( 'load-file-stl-by-content.js' );

		VH.displayMarkdown( 'browse-using-file-dialog.md', menuLeft );

		callbackIframe = callbackIframeDefault;

console.log( 'callbackBrowseUsingFileDialog' );

	}


	function getFile() {

		var txt = '';

		if ( 'files' in inpFile ) {

			if ( inpFile.files.length == 0 ) {

				txt = 'Select one or more files.';

			} else {

				for (var i = 0, len = inpFile.files.length; i < 1; i++) {

					txt += ( i + 1 ) + '. ';

					file = inpFile.files[ i ];

					if ('name' in file) {

						txt += "name: " + file.name + "<br>";

					}

					if ('size' in file) {

						txt += "size: " + file.size + " bytes <br>";

					}

			var reader = new FileReader();

			reader.onload = function ( event ) {

				output = reader.result;
//				msg2.innerHTML = output;

				msg.innerHTML = 'name: ' + file.name + ' size: ' + file.size + 
				' type: ' + file.type + ' modified: ' + file.lastModifiedDate +
				'';

				timeLastModified = file.lastModified;

				loadFileByContents( output, file.name );

			};

			//reader.readAsText( file );

				if ( reader.readAsBinaryString !== undefined ) {

					reader.readAsBinaryString( file );

				} else {

					reader.readAsArrayBuffer( file );

				}

//console.log( 'file:' + file );

				}

			}

		} else {

			if (x.value == "") {

				txt += 'Select one or more files.';

			} else {

				txt += 'The files property is not supported by your browser!';
				txt += '<br>The path of the selected file: ' + inpFileToMonitor.value; // If the browser does not support the files property, it will return the path of the selected file instead. 

			}

		}

		msg1.innerHTML = txt;

	}
