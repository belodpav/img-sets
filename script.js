;( function(PictureBox) {
  var MAX_TIME_OUT_REQUEST = 10000;
  // Constructor
  function Gallery ( settings ) {
    var root, data; 
    
    root = document.querySelector( settings.selector );
    this._wrapElement = root;

    if ( settings.ajax ) {
      connectWithXHR.call( this, settings.source );
    } else if ( settings.images && typeof settings.images === 'object' ) {
      data = settings.images;
      addDataAndRender.call( this, data );
    }
  }

  // Private 
  // Build new Images
  function buildNewImages( data ) {
    var newImg, imgList = [];
    data.forEach(function( item ) {
      newImg = new PictureBox( item );
      imgList.push( newImg );
    });
    return imgList;
  }
  // Render Images
  function render( imgObjList ) {
    imgObjList.forEach(function( img ) {
      img.render();
    });
  }
  // Adding Custom Properties
  function addCustomProps( data, props ) {
    data.forEach(function( item ) {
      item.parent = props.parent;
    });
    return data;
  }

  function addDataAndRender( data ) {
    data = addCustomProps( data, { parent: this._wrapElement } );
    this._data = data;
    this._imgList = buildNewImages( this._data );
    render( this._imgList );
  }

  // Get data with AJAX
  function connectWithXHR( url ) {
    var self = this;
    var xhr = new XMLHttpRequest();
    var strData, data;
    xhr.open( 'GET', url, true );
    xhr.timeout = MAX_TIME_OUT_REQUEST;

    xhr.send();
    
    xhr.addEventListener( 'timeout', function ( ) {
      console.log( 'I\'m sorry. Too long request' );
    });
    xhr.addEventListener( 'readystatechange', function() {

      if ( xhr.readyState !== 4 ) return;

      if ( xhr.status !== 200 ) {
        console.log( 'Error: ' + xhr.status + ' ' + xhr.statusText );
        return;
      } else {

        strData = xhr.responseText;
        data = JSON.parse( strData );
        addDataAndRender.call( self, data );
      }
    } );
    

  }

  window.Gallery = Gallery;
})( PictureBox );

