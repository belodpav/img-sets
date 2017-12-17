;( function(PictureBox) {
  var MAX_TIME_OUT_REQUEST = 10000;
  // Constructor
  function Gallery (settings) {
    var root, data, galElement; 
    
    root = document.querySelector(settings.selector);
    galElement = document.createElement('div');
    galElement.className = 'gallery';
    root.appendChild(galElement);

    this._wrapElement = galElement;

    if (settings.ajax) {
      connectWithXHR.call(this, settings.source);
    } else if (settings.images && typeof settings.images === 'object') {
      data = settings.images;
      initGalleryItems.call(this, data);
      updateGallery.call(this);
    }
  }

  // Private 
  
  /**
   * Create Gallery items based on PictureBox class
   * @param {Object[]} data
   * @return {Object[]}
   */
  function buildNewImages(data) {
    var newImg, imgList = [];
    data.forEach(function( item ) {
      newImg = new PictureBox( item );
      imgList.push( newImg );
    });
    return imgList;
  }
  /**
   * Render Gallery items
   * @param {Object[]} imgObjList
   */
  function render(imgObjList) {
    imgObjList.forEach(function(img) {
      img.render();
    });
  }
  /**
   * Adding custom properties to gallery items
   * @param {Object[]} data
   * @param {Object} data
   * @return {Object[]}
   */
  function addCustomProps(data, props) {
    data.forEach(function(item) {
      for (var prop in props) {
        item[prop] = props[prop];
      }
    });
    return data;
  }
  /**
   * Adding ID properties to gallery items
   * @param {Object[]} data
   * @return {string}
   */
  function addIdProps(data) {
    data.forEach(function ( item ) {
      item.id = generateId();
    });
    return data;
  }
  /**
   * Unique ID generator
   * @param {}
   * @return {string}
   */
  function generateId() {
    return '' + Date.now() + Math.floor(Math.random() * 100000);
  }
  /**
   * Soring PictureBox instances by count of hearts
   * @param {Object[]} data
   * @return {Object[]} 
   */  
  function sortByHearts(data) {
    data.sort(function(a, b) {
      return b.hearts - a.hearts;
    });
    return data;
  }
  /**
   * Callback function which reat on changing count of heatrs of photos
   * @param {Object}
   */
  function onChangeHearts(value) {
    var h;
    h = findObjByIDProp(this._data, value.id);
    h.hearts = value.hearts;
    updateGallery.call(this);
  }
  /**
   * Update Gallery
   */
  function updateGallery() {
    var data = this._data;
    data = sortByHearts(data);
    this._imgList = buildNewImages(data);
    this._wrapElement.innerHTML = '';
    render( this._imgList );
  }
  /**
   * Find Gallery Item by ID 
   * @param {Object[]} arr
   * @param {string} id
   * @return {Object}
   */
  function findObjByIDProp(arr, id) {
    var a;
    a = arr.filter(function( item ) {
      if (item.id === id) {
        return true;
      }
    });
    return a[0];
  }
  /**
   * Init Gallery Items
   * @param {Object[]} data
   */
  function initGalleryItems(data) {
    data = addCustomProps( 
      data, 
      { 
        parent: this._wrapElement, 
        onChanged: onChangeHearts.bind(this) 
      }
    );
    data = addIdProps( data );
    this._data = data;
  }

  /**
   * Get data via AJAX 
   * @param {string} url
   */
  function connectWithXHR(url) {
    var self = this;
    var xhr = new XMLHttpRequest();
    var strData, data;
    xhr.open('GET', url, true);
    xhr.timeout = MAX_TIME_OUT_REQUEST;

    xhr.send();
    
    xhr.addEventListener('timeout', function() {
      console.log('I\'m sorry. Too long request');
    });
    xhr.addEventListener('readystatechange', function() {

      if (xhr.readyState !== 4) return;

      if (xhr.status !== 200) {
        console.log('Error: ' + xhr.status + ' ' + xhr.statusText);
        return;
      } else {

        strData = xhr.responseText;
        data = JSON.parse(strData);
        initGalleryItems.call(self, data);
        updateGallery.call(self);
      }
    } );
  }

  window.Gallery = Gallery;
})(PictureBox);

