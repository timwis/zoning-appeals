/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/appeal.html',
    '../models/current-appeal'
], function ($, _, Backbone, Template, CurrentAppeal) {
    'use strict';

    var AppealView = Backbone.View.extend({
        template: _.template(Template),

        tagName: 'tr',

        className: 'appeal-row',

        initialize: function(options) {
          this.model = options.model;
          this.render();
          this.model.on('remove', this.modelRemoved, this);
          this.model.on('destroy', this.modelDestroyed, this);
        },

        events: {
          'click': 'showAppealDetails'
        },

        showAppealDetails: function(e) {
          e.stopPropagation();
          var appealNum = this.model.get('APPEAL_NUM');
          CurrentAppeal.set('appealNum', appealNum);
          CurrentAppeal.set(this.model.toJSON());
          Backbone.history.navigate('/appeals/' + this.model.get('APPEAL_NUM'), { trigger: true });
        },

        close: function() {
          this.remove();
          this.unbind();
        },

        render: function() {
          this.delegateEvents();
          this.$el.html(this.template(this.model.toJSON()));
          return this;
        }
    });

    return AppealView;
});