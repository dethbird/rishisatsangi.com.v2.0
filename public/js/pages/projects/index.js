(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CharacterCollection = Backbone.Collection.extend({
    initialize: function() {
        // console.log('init');
    }
});

module.exports = CharacterCollection;

},{}],2:[function(require,module,exports){
var CardView = Backbone.View.extend({
    model: null,
    initialize: function(options) {
        var that = this;
        this.model = options.model;
        // click thumbnails to select preview
        $(this.el).find('thumbnail').click(function(e){
            // active states of thumbnails
            $(that.el).find('thumbnail').removeClass('active');
            $(e.currentTarget).addClass('active');

            var thumbnailImage =  $(e.currentTarget).find('img');
            var previewImage = $(that.el).find('preview img');
            previewImage.removeClass('portrait').removeClass('landscape');
            previewImage.attr('src', thumbnailImage.attr('src'));
            previewImage.attr('data-image-index', thumbnailImage.attr('data-image-index'));
            previewImage.addClass(
              that.model.get('images')[thumbnailImage.attr('data-image-index')].orientation
            );
        });

        // click preview to open full size
        $(this.el).find('preview.overlay-trigger').click(function(e){
          var imageIndex = $(e.target).attr('data-image-index');
          var image = that.model.get('images')[imageIndex];

          $('body overlay content').html('<img src="' + image.display + '" class="' + image.orientation + '" />');
          $('body overlay content').css('margin-top', $(window).scrollTop());
          $('body overlay').show();
        });

        // hide overlay on escape
        $(document).keydown(function(e) {
            // ESCAPE key pressed
            if (e.keyCode == 27) {
                 $('body overlay').hide();
            }
        });
        this.render();
    }
});

module.exports = CardView;

},{}],3:[function(require,module,exports){
var CardViewSingleImage = Backbone.View.extend({
    model: null,
    initialize: function(options) {
        var that = this;
        this.model = options.model;

        // click preview to open full size
        $(this.el).find('preview.overlay-trigger').click(function(e){
          var imageIndex = $(e.target).attr('data-image-index');
          var image = that.model.attributes;

          $('body overlay content').html('<img src="' + image.url + '" class="' + image.orientation + '" />');
          $('body overlay content').css('margin-top', $(window).scrollTop());
          $('body overlay').show();
        });

        // hide overlay on escape
        $(document).keydown(function(e) {
            // ESCAPE key pressed
            if (e.keyCode == 27) {
                 $('body overlay').hide();
            }
        });
        this.render();
    }
});

module.exports = CardViewSingleImage;

},{}],4:[function(require,module,exports){
var CharacterCollection = require('../collections/projects/CharacterCollection');
var CardView            = require('./CardView');
var CardViewSingleImage = require('./CardViewSingleImage');

var ProjectView = Backbone.View.extend({
    characterCollection: null,
    conceptArtCollection: null,
    initialize: function(options) {
        var that = this;

        this.characterCollection = new CharacterCollection();
        $.each(options.configs.characters.list, function(i,character){
          character = new Backbone.Model(character);
          that.characterCollection.add(character);
          var card = new  CardView({
              el: '#' + character.get('id'),
              model: character
          });
        });

        if(options.configs.concept_art!=undefined) {
          this.conceptArtCollection = new Backbone.Collection();
          $.each(options.configs.concept_art.list, function(i,item){
            item = new Backbone.Model(item);
            that.conceptArtCollection.add(item);
            var card = new CardView({
                el: '#' + item.get('id'),
                model: item
            });
          });
        }

        if(options.configs.storyboards!=undefined) {
          $.each(options.configs.storyboards, function(i,storyboard){
              $.each(storyboard.boards, function(i,item){
                item = new Backbone.Model(item);
                var card = new CardView({
                    el: '#' + item.get('id'),
                    model: item
                });
              });
          });
        }

        if(options.configs.reference_images!=undefined) {
            $.each(options.configs.reference_images.list, function(i,item){
              item = new Backbone.Model(item);
              console.log(item);
              var card = new CardViewSingleImage({
                  el: '#' + item.get('id'),
                  model: item
              });
            });
        }

        $('#project').on('change', function(e){
          document.location = '/projects/' + $(e.currentTarget).find('option:selected').val();
        });

        $('body overlay content').click(function(){
          $('body overlay').hide();
        })
    }
});

module.exports = ProjectView;

},{"../collections/projects/CharacterCollection":1,"./CardView":2,"./CardViewSingleImage":3}],5:[function(require,module,exports){
var ProjectView = require('../../library/views/ProjectView');
var projectView = new ProjectView({
  el: 'body',
  configs: projectConfigs
});

},{"../../library/views/ProjectView":4}]},{},[5]);
