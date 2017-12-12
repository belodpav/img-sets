;(function(){
  
  function ImgObj( settings ) {
    this._name = settings.name;
    this._src = settings.src;
    this._alt = settings.alt;
    this._title = settings.alt;
    this._parent = settings.parent;

    this._likes = 0;
    this._id = generateId();
    
    this._core = getImgElement( this._src, this._alt, this._title );
    initEvents.call(this);
    
    function generateId() {
      return '' + Date.now();
    }
    function getImgElement(src, alt, title) {
      var imgElement = new Image();
      imgElement.src = src;
      imgElement.alt = alt;
      imgElement.title = title;

      return imgElement;
    }

  }
  ImgObj.prototype.getName = function() {
    return this._name;
  };
  ImgObj.prototype.getID = function() {
    return this._id;
  };
  ImgObj.prototype.render = function() {
    var box;
    box = imgBuildOut.call( this );
    this._parent.appendChild( box );
  };
  ImgObj.prototype.increaseLikesCount = function() {
    this._likes += 1;
  };
  ImgObj.prototype.updateLikesCount = function() {
    this._i_likes.innerText = this._likes;
  };

  function createElement( type, className ) {
    var el = document.createElement( type );
    if ( className && typeof className === 'string' ) {
      el.className = className;
    }
    return el;
  }

  function initEvents() {
    var self = this;
    this._core.addEventListener('click', function() {
      self.increaseLikesCount();
      self.updateLikesCount();
    });
  }
  
  function imgBuildOut() {
    var pict, title, likes, pictInfo; 
    pict = createElement( 'div', 'pict' );
    title = createElement( 'span', 'pict__title' );
    likes = createElement( 'span', 'pict__likes' );
    pictInfo = createElement( 'div', 'pict__info' );
    
    title.innerText = this._name;
    likes.innerText = this._likes;

    pictInfo.appendChild( title );
    pictInfo.appendChild( likes );

    pict.appendChild( this._core );
    pict.appendChild( pictInfo );
    
    this._i_likes = likes;
    return pict; 
  }

  window.ImgObj = ImgObj;

})();