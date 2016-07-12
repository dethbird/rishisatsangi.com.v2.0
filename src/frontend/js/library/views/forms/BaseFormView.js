var simplemde = require('simplemde');
var BaseFormView = Backbone.View.extend({
    baseUrl: '/api/project',
    events: {
        'click .submit-button': 'submit'
    },
    initialize: function() {
        var that = this;
        var $el = $(this.el);

        $el.find('.markdown-edit .markdown-edit-editor').each(function(i,editor){
            $editor = $(editor);
            var markdownEditor = new simplemde({
                element: $editor[0],
                forceSync: true,
                tabSize: 4
            });
        });

        $el.find('.datepicker').datepicker({
            dateFormat: "yy-mm-dd"
        });

    },
    submit: function(e) {
        var that = this;
        var $target = $(e.target);
        var $el = $(this.el);
        var data = _.object(_.map($el.serializeArray(), _.values));

        $.ajax({
            method: data['id'] == '' ? 'POST' : 'PUT',
            url: this.baseUrl + (
                data['id'] == '' ? '' : '/' + data['id']),
            data: data,
            beforeSend: function(){
                $el.find('.form-group').removeClass('has-danger');
                $target.addClass('disabled');
            }
        })
        .success(function(data){
            $el.find('input[name=id]').val(data.id);
        })
        .error(function(data){
            $.each(data.responseJSON, function(i,e){
                $el.find(
                    '[name=' +  e.property + ']').closest(
                        '.form-group').addClass('has-danger');
            });
        })
        .complete(function(){
            $target.removeClass('disabled');
        });
    }
});

module.exports = BaseFormView;
