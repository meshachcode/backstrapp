define([
  'Backstrapp',
  'modules/sidebar/sidebar.main',
  'modules/hero/hero.main'
], function(Backstrapp, SidebarModule, HeroModule){
    
	return Backstrapp.View.extend({
            name: 'PageStaticView',
            
            initialize: function(){
                Backstrapp.View.prototype.initialize.call(this);
            },
            
            render: function(){
                Backstrapp.View.prototype.render.call(this);
                SidebarModule.model.set({sidebar_modules: this.model.get('current').sidebar_modules});
                HeroModule.model.set({current: this.model.get('current').hero});
            }
        });
});