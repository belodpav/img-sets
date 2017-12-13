;(function(){
  // Constructor
  function PictureBox( settings ) {
    this._name = settings.name;
    this._src = settings.src;
    this._alt = settings.alt;
    this._title = settings.alt;
    this._parent = settings.parent;

    this._likes = 0;
    this._id = generateId();
    this._core = getImgElement( this._src, this._alt, this._title );
    
    // Events Initialisation 
    _initEvents.call(this);
    
  }

  // Public Methods

  /**
   * @param {}
   * @return {string}
   */
  PictureBox.prototype.getName = function() {
    return this._name;
  };
  /**
   * @param {}
   * @return {string}
   */
  PictureBox.prototype.getID = function() {
    return this._id;
  };
  /**
   * @param {}
   * @return {}
   */
  PictureBox.prototype.render = function() {
    var box;
    box = _imgBuildOut.call( this );
    this._parent.appendChild( box );
  };


  // Private Methods

  /**
   * @param {}
   * @return {}
   */
  function _increaseLikesCount() {
    this._likes += 1;
  }
  /**
   * @param {}
   * @return {}
   */
  function _updateLikesCount() {
    this._i_likes.innerText = this._likes;
  }
  /**
   * @param {}
   * @return {string}
   */
  function generateId() {
    return '' + Date.now();
  }
  /**
   * @param {string} src
   * @param {string} alt
   * @param {string} title
   * @param {object}
   */
  function getImgElement(src, alt, title) {
    var imgElement = new Image();
    imgElement.src = src;
    imgElement.alt = alt;
    imgElement.title = title;

    return imgElement;
  }
  /**
   * @param {string} type
   * @param {string} className
   * @param {object}
   */
  function createElement( type, className ) {
    var el = document.createElement( type );
    if ( className && typeof className === 'string' ) {
      el.className = className;
    }
    return el;
  }
  function _imgBuildOut() {
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
  /**
   * @param {}
   * @return {}
   */
  function _initEvents() {
    var self = this;
    this._core.addEventListener('click', function() {
      _increaseLikesCount.call(self);
      _updateLikesCount.call(self);
    });
  }
  
  window.PictureBox = PictureBox;
  
})();