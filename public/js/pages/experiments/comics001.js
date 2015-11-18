(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CharacterCollection = Backbone.Collection.extend({
    initialize: function() {
        // console.log('init');
    }
});

module.exports = CharacterCollection;
},{}],2:[function(require,module,exports){
var PageCollection = Backbone.Collection.extend({
    initialize: function(data) {
        var that = this;
        $.each(data, function(i,e){
            e.id = i+1;
            var model = new Backbone.Model(e);
            that.add(model);
        });
    }
});

module.exports = PageCollection;
},{}],3:[function(require,module,exports){
var PageCollection = require('../collections/comic/PageCollection');
var CharacterCollection = require('../collections/comic/CharacterCollection');

var ComicView = Backbone.View.extend({
    // pages: null, // pages of the comic
    currentPage: null,
    characterCollection: null, // characters in order of appearance
    pageCollection: null, // the page data
    initialize: function(options) {
        // variables
        var that = this;
        // that.pages = options.pages;
        // that.indexes = options.indexes;
        that.currentPage = 0;
        this.characterCollection = new CharacterCollection();
        this.pageCollection = new PageCollection(options.pages);

        // interactions
        $(document).on('keydown', function(e) {
            that.keyPress(e);
        });

        this.render();
    },
    keyPress: function(e) {
        var that = this;

        // prev or next
        switch (e.which) {
            case 39:
                this.currentPage++;
                if(this.currentPage>this.pageCollection.models.length-1) {
                    this.currentPage = 0;
                }
                this.render();
                break;
            case 37:
                this.currentPage--;
                if(this.currentPage<0) {
                    this.currentPage = this.pageCollection.models.length-1;
                }
                this.render();
                break;
        }
    },
    render: function() {
        var that = this;
        // current page
        var page = this.pageCollection.models[this.currentPage];
        var template = _.template($('#template-page').html());
        var html = template(page.attributes, {escape: false});
        $(this.el).find('#page .display').html(html);
        $(this.el).find('#page .page-indicator').html('page ' + (this.currentPage+1) + ' of ' + this.pageCollection.length);

        $(this.el).find('.delta').addClass('disabled');

        // character deltas
        $.each(page.get('deltas'), function(character,deltas){
            var model = that.characterCollection.findWhere({name: character});

            if (model==undefined){
                model = new Backbone.Model({
                    name: character
                });
                that.characterCollection.add(model);

                var template = _.template($('#template-character-box').html());
                var html = template(model.attributes, {escape: false});
                $($(that.el).find('#characters')[0]).append(html);

            }
            model.set(deltas);
            that.renderDeltas(character, deltas, model);

        });
    },
    renderDeltas: function(character, deltas, model){
        var that = this;
        var characterBox = $($('#characters .character[data-character-name="' + character + '"]')[0]);

        $.each(deltas, function(i,e){
            var delta = characterBox.find('.delta[data-delta-name="' + i + '"]');
            var previousValue = model._previousAttributes[i]==undefined?0:model._previousAttributes[i];
            if(delta.length==0){
                var template = _.template($('#template-character-delta').html());
                var html = template({name: i, value: e, previousValue: previousValue}, {escape: false});
                characterBox.append(html);
                delta = characterBox.find('.delta[data-delta-name="' + i + '"]');
                delta.removeClass('disabled');
                that.animateDelta(delta[0]);
            } else {
                delta.attr('data-delta-value', e);
                delta.attr('data-delta-previous-value', previousValue);
                delta.removeClass('disabled');
                that.animateDelta(delta[0])
            }
        });
    },
    animateDelta: function(el) {
        var that = this;
        el = $(el);

        el.find('.name').html(el.attr('data-delta-name'));

        var value = el.attr('data-delta-value');
        el.find('.value').html(value);

        var diff =(value - el.attr('data-delta-previous-value'));
        el.find('.value-diff').html(diff);
        if(diff > 0) {
            el.find('.value-diff').addClass('positive');
        } else {
            el.find('.value-diff').removeClass('positive');
        }

        TweenLite.to(el.find('.value-indicator'), 2, {
            width: Math.abs(value) + 'px',
            marginLeft: value < 0 ? value : 0,
            ease: Elastic.easeOut.config(1, 0.25)
        });
    }
});

module.exports = ComicView;
},{"../collections/comic/CharacterCollection":1,"../collections/comic/PageCollection":2}],4:[function(require,module,exports){
var ComicView = require("../../library/views/ComicView");
var comicView = new ComicView({
    el: '#comic',
    pages: experimentConfigs.pages,
    indexes: experimentConfigs.indexes
});


// console.log(comicView);
// console.log(configs);
// console.log(experimentConfigs);
},{"../../library/views/ComicView":3}]},{},[4]);