;( function(PictureBox) {
  var MAX_TIME_OUT_REQUEST = 10000;
  // Constructor
  function Gallery ( settings ) {
    var root, data, galElement; 
    
    root = document.querySelector( settings.selector );
    galElement = document.createElement('div');
    galElement.className = 'gallery';
    root.appendChild( galElement );

    this._wrapElement = galElement;

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
      //item.parent = props.parent;
      for (var prop in props) {
        item[prop] = props[prop];
      }
    });
    return data;
  }
  function addIdProps( data, id ) {
    data.forEach(function ( item ) {
      item.id = generateId();
    });
    return data;
  }
  /**
   * @param {}
   * @return {string}
   */
  function generateId() {
    return '' + Date.now() + Math.floor( Math.random() * 100000 );
  }
  function sortByHearts( data ) {
    data.sort(function( a, b ) {
      return b.hearts - a.hearts;
    });
    return data;
  } 
  function func( value ) {
    var h;
    console.log( value.id + '  ' + value.hearts);
    h = findObjByIDProp( this._data, value.id );
    console.log(h);
  }
  function findObjByIDProp( arr, id ) {
    var a;
    console.log( id );
    a = arr.filter(function( item ) {
      if ( item.id === id ) {
        return true;
      }
    });
    return a[0];
  }

  function addDataAndRender( data ) {
    data = addCustomProps( data, { parent: this._wrapElement, onChanged: func.bind(this) } );
    data = addIdProps( data );
    data = sortByHearts( data );
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

