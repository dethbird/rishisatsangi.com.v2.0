(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ProjectCardView = Backbone.View.extend({
    model: null,
    initialize: function(options) {
        var that = this;
        this.model = options.model;
        // click thumbnails to select preview
        $(this.el).find('.thumbnail').click(function(e){

            $(that.el).find('.thumbnail').removeClass('active');
            $(e.currentTarget).addClass('active');

            var thumbnailImage =  $(e.currentTarget).find('img');
            var displayImage = $(that.el).find('img.display');
            displayImage.removeClass('portrait').removeClass('landscape');
            displayImage.attr('src', thumbnailImage.attr('src'));
            displayImage.attr('data-image-index', displayImage.attr('data-image-index'));
            // previewImage.addClass(
            //   that.model.get('images')[thumbnailImage.attr('data-image-index')].orientation
            // );
        });


    }
});

module.exports = ProjectCardView;

},{}],2:[function(require,module,exports){
var ProjectCardView = require('./ProjectCardView');
var ProjectView = Backbone.View.extend({
    configs: null,
    initialize: function(options) {
        var that = this;
        that.project = options.project;

        $('.card').each(function(i,e){
            var $e = $(e);
            var cardView = new ProjectCardView({
                el: e
            });
        });

        $('#project').on('change', function(e){
            document.location = '/projects/' + $(e.currentTarget).find('option:selected').val();
        });

    }
});

module.exports = ProjectView;

},{"./ProjectCardView":1}],3:[function(require,module,exports){
var ProjectView = require('../../library/views/ProjectView');
var projectView = new ProjectView({
  el: 'body',
  configs: project
});

},{"../../library/views/ProjectView":2}]},{},[3]);
