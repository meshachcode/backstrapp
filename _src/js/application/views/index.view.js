define([
  'Backbone',
  'jQuery'
], function(Backstrapp, $){
    
	return Backstrapp.View.extend({
            name: 'AppView',

            initialize: function(){
                Backstrapp.View.prototype.initialize.call(this);
                _.bindAll(this);
                
                DataModel.bind('change:request.params', this.siteCatalyst, this);
                DataModel.bind('change:request.params', this.updateNav, this);
                DataModel.bind('change:request.params', this.scrollTop, this);
                this.quickSearch();
                this.speedBump();  
            },
            
            //loadMeta: function(){
            //    var meta = DataModel.get('pageMeta');
            //    if(typeof meta != 'undefined'){
            //        $('meta[name="description"]').attr('content', meta.description);
            //        $('meta[name="keywords"]').attr('content', meta.keywords);
            //        document.title = meta.title;
            //        Vent.trigger('changed:meta');
            //    }
            //},
    
            /**
                * @method scrollTop
            */
            scrollTop: function(){
                if(document.body.scrollTop > 120){
                    $('html, body').animate({scrollTop: 0}, 'fast');
                }
            },
    
            /**
                * @method siteCatalyst
            */
            siteCatalyst: function(){
                /* You may give each page an identifying name, server, and channel on the next lines. */
                //s_gi(citicitimortsupport)
                s.pageName=document.title;
                s.channel="HomeownersSupport"
    
                var myProps=location.pathname.split("/");
                //alert(myProps);
                myProps.pop();
    
                //s.server="serverA";
                s.prop1="PubMo";
                s.prop2="HomeownersSupport";
                s.hier1 = s.channel +"/"+ s.prop1 +"/"+ s.prop2;
    
                if (myProps[1]) {
                        s.prop3=myProps[1];
                        s.hier1 += "/"+ s.prop3;
                        }
                if (myProps[2]) {
                        s.prop4=myProps[2];
                        s.hier1 += "/"+ s.prop4;
                        }
                if (myProps[3]) {
                        s.prop5=myProps[3];
                        s.hier1 += "/"+ s.prop5;
                        }
                if (myProps[4]) {
                        s.prop6=myProps[4];
                        s.hier1 += "/"+ s.prop6;
                        }
                if (myProps[5]) {
                        s.prop7=myProps[5];
                        s.hier1 += "/"+ s.prop7;
                        }
                if (myProps[6]) {
                        s.prop8=myProps[6];
                        s.hier1 += "/"+ s.prop8;
                        }
                if (myProps[7]) {
                        s.prop9=myProps[7];
                        s.hier1 += "/"+ s.prop9;
                        }
    
                /* Conversion Variables */
                s.linkTrackVars="prop46,prop47,prop48,prop49,eVar20,pageName";
                /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
                var s_code=s.t();if(s_code)document.write(s_code)//-->
            },
    
            /**
                * @method updateNav
            */
            updateNav: function(){
                $('.navigation a.active').removeClass('active');
    
                var activeNavItem;
    
                if(window.location.hash.indexOf('/mortgage/') != -1){
                    activeNavItem = $('.navigation a[href="#/mortgage-options-beyond-refinancing"]');
                } else if(window.location.hash.indexOf('/refinance-loan-modification-help-faq/') != -1){
                    activeNavItem = $('.navigation a[href="#/refinance-loan-modification-help-faq"]');
                } else if(window.location.hash == '#/' || window.location.hash == '') {
                    activeNavItem =$('.navigation a[href="#/homeowner-support-citimortgage"]');
                } else {
                    activeNavItem = $('.navigation a[href="'+window.location.hash+'"]');
                }
    
                if(typeof activeNavItem != 'undefined'){
                    activeNavItem.addClass('active');
                }
            },
    
            /**
                * @method quickSearch
            */
            quickSearch: function(){
                $('#quickSearch_link').click(function(e){
                    e.preventDefault();
    
                    var windowWidth, windowHeight, popupHeight, popupWidth, quickSearch = $('#quickSearch_popup');
    
                    var windowWidth = document.documentElement.clientWidth;
                    var windowHeight = document.documentElement.clientHeight;
                    var popupHeight = quickSearch.height();
                    var popupWidth = quickSearch.width();
    
                    quickSearch.show().css({opacity: 0});
    
                    var offset = $(this).offset();
                    var top = offset.top;
                    var left = (windowWidth / 2 - popupWidth / 2+$(window).scrollLeft()) + (($('.content').width() - popupWidth) / 2);
    
                    if(top < 0){
                        top = 0;
                    }
    
                    quickSearch.css({
                            "position": "absolute",
                            "top": top + "px",
                            "left": left + "px"
    
                    }).hide().css({opacity: 1}).fadeIn('slow', function(){
                        $('#quickSearch_close, a', quickSearch).one('click', function(){
                            quickSearch.hide();
                        });
                    });
    
                });
            },
    
            /**
                * @method speedBump
            */
            speedBump: function(){
    
                $('div.account a.tts').each(function(index) {
                    $(this).hover(function() {
                        var cssObj = {
                            'top': $(this).offset().top + $(this).height(),
                            'left': $(this).offset().left
                        }
                        $(this).next().css(cssObj);
                        $(this).addClass('active');
                    }, function(event) {
                        if (event.relatedTarget != $(this).next()[0] && $(event.relatedTarget).parent()[0] != $(this).next()[0]) {
                            $(this).next().css('top', '-1000em');
                            $(this).removeClass('active');
                        }
                    });
                    var href = $(this);
                    $(this).next().mouseleave(function(event) {
                        if (event.relatedTarget != href[0]) {
                            $(this).css('top', '-1000em');
                            href.removeClass('active');
                        }
                    });
                });
    
                // variables
                var popupEnabled = false;
                var extURL;
    
                // functions
                function loadPopup(){
                    if (!popupEnabled) {
                        $("#speedBump_popup");
                        $("#speedBump_popup").fadeIn("slow");
                        popupEnabled = true;
                    }
                }
    
                function disablePopup(){
                    if (popupEnabled) {
                            $("#speedBump_popup").hide();
                            popupEnabled = false;
                    }
                }
    
                function centerPopup(){
                        var windowWidth = document.documentElement.clientWidth;
                        var windowHeight = document.documentElement.clientHeight;
                        var popupHeight = $("#speedBump_popup").height();
                        var popupWidth = $("#speedBump_popup").width();
                        $("#speedBump_popup").css({
                                "position": "absolute",
                                "top": windowHeight / 2 - popupHeight / 2+$(window).scrollTop() + "px",
                                "left": windowWidth / 2 - popupWidth / 2+$(window).scrollLeft() + "px"
                        });
                }
    
                // event handlers
                $(".speedBump_link").live("click", function(event){
                    event.preventDefault();
                    extURL = this.href;
                    centerPopup();
                    loadPopup();
                    $("#speedBump_popup_inner").focus();
                });
    
                $("#speedBump_continue").click(function(event){
                    disablePopup();
                    window.open(extURL, '', 'location=yes,menubar=yes,status=yes,titlebar=yes,toolbar=yes,scrollbars=yes,resizable=yes');
                });
    
                $("#speedBump_return, #speedBump_close").click(function(event){
                    event.preventDefault();
                    disablePopup();
                });
    
                $(document).click(function(event){
                    if(popupEnabled && !$(event.target).hasClass('speedBump_link') && $(event.target).parents('#speedBump_popup').length==0){
                        disablePopup();
                    }
                });
            }            
        });
});