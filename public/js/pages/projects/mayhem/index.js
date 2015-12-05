(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CharacterCollection = Backbone.Collection.extend({
    initialize: function() {
        // console.log('init');
    }
});

module.exports = CharacterCollection;

},{}],2:[function(require,module,exports){
var CharacterCardView = Backbone.View.extend({
    model: null,
    initialize: function(options) {
        var that = this;
        this.model = options.model;
        $(this.el).find('thumbnail').click(function(e){
            $(that.el).find('thumbnail').removeClass('active');
            $(e.currentTarget).addClass('active');
            $(that.el).find('preview img').attr('src', $(e.currentTarget).find('img').attr('src'));
        });
        this.render();
    }
});

module.exports = CharacterCardView;

},{}],3:[function(require,module,exports){
var CharacterCollection = require('../collections/projects/CharacterCollection');
var CharacterCardView = require('./CharacterCardView');

var ProjectView = Backbone.View.extend({
    characterCollection: null, // characters in order of appearance
    initialize: function(options) {
        // variables
        var that = this;
        this.characterCollection = new CharacterCollection();
        $.each(options.configs.characters.list, function(type,characters){
          $.each(characters, function(i,character) {
            character = new Backbone.Model(character);
            character.set('type', type);
            that.characterCollection.add(character);
            var card = new CharacterCardView({
                el: '#' + character.get('id'),
                model: character
            });
            console.log(card);
          });
        });
        this.render();
    }
});

module.exports = ProjectView;

},{"../collections/projects/CharacterCollection":1,"./CharacterCardView":2}],4:[function(require,module,exports){
var ProjectView = require('../../../library/views/ProjectView');

var projectView = new ProjectView({
  el: 'body',
  configs: projectConfigs
});
console.log(projectView);

},{"../../../library/views/ProjectView":3}]},{},[4]);
