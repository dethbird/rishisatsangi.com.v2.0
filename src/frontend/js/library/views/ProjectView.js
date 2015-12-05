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
