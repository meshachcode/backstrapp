define(["jQuery","Underscore","Backbone","views/home/main","views/projects/list","views/users/list"],function(a,b,c,d,e,f){var g=c.Router.extend({routes:{"/projects":"showProjects","/users":"showUsers","*actions":"defaultAction"},showProjects:function(){e.render()},showUsers:function(){f.render()},defaultAction:function(a){d.render()}}),h=function(){var a=new g;c.history.start()};return{initialize:h}})