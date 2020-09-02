/*
 *  zoomSlider - v0.2.3
 *  CSS3 background zoom slideshow
 *  http://mingthings.com
 *
 *  Made by Ming Yeung
 *  Under MIT License
 */
!function(s,t,e,n){
    function a(i,t){
        this.element=i,
        this.$el=s(i),
        this._defaults=o,
        this._name=l;
        var e=this.$el.data(),n={};
        for(var a in e)
        if(e.hasOwnProperty(a)&&a.match(/zs[A-Z]/)){
            var r=a.substr(2);
            r=r.charAt(0).toLowerCase()+r.slice(1),n[r]=e[a]
        }
            return this.settings=s.extend({},o,n,t),
            null==this.settings.src||this.settings.src.length<1?void console.log("ZoomSlider terminated - invalid input."):void this.init()
        }
        var l="zoomSlider",
        o={src:null,speed:8e3,switchSpeed:800,interval:4500,autoplay:!0,bullets:!0,overlay:"plain"};
        s.extend(
            a.prototype,
            {
                init:function(){
                    0==s.isArray(this.settings.src)&&(this.settings.src=[this.settings.src]),
                    this.transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},
                    this.transEndEventName=this.transEndEventNames[Modernizr.prefixed("transition")],
                    this.support=Modernizr.csstransitions&&Modernizr.csstransforms;
                    var i=Modernizr.prefixed("transform");
                    switch(
                        i=i.replace(
                            /([A-Z])/g,function(s,i){
                                return"-"+i.toLowerCase()
                            }).replace(/^ms-/,"-ms-"),
                    this.transitionProp={transition:i+" "+this.settings.speed+"ms ease-out, opacity "+this.settings.switchSpeed+"ms"},
                    this.numSlides=this.settings.src.length,
                    this.$el.css("position")
                    ){
                        case"relative":case"absolute":case"fixed":break;
                        default:this.$el.css("position","relative")
                    }
                        var t=this,e=s("<img />");
                        e.load(function(){1==t.numSlides?t.initSingle():t.initSlideshow()}),
                        e.attr("src",this.settings.src[0])
                    },
                    initSlideshow:function(){
                        var t=this,
                        e=s('<div class="zs-slideshow"></div>'),
                        n=s('<div class="zs-slides"></div>'),
                        a=s('<div class="zs-bullets"></div>');
                        for(i=0;i<this.numSlides;i++){
                            var l=s('<div class="zs-slide zs-slide-'+i+'"></div>');
                            l.css({"background-image":"url('"+this.settings.src[i]+"')"}).appendTo(n);
                            var o=s('<div class="zs-bullet zs-bullet-'+i+'"></div>');
                            o.appendTo(a),
                            0==i&&(l.addClass("active").css("opacity",1),o.addClass("active"))
                        }
                        if(t._promoteChildren(),
                        e.append(n).prependTo(this.$el),
                        1==this.settings.bullets&&(e.append(a),
                        e.on("click",".zs-bullet",function(i){
                            t.jump(s(this).index())
                        })),
                        this.pos=0,
                        this.pending=null,
                        this.switching=!1,
                        this.$slideshow=e,
                        this.$slides=n.children(".zs-slide"),
                        this.$bullets=a.children(".zs-bullet"),
                        this.$el.addClass("zs-enabled"),
                        "dots"==this.settings.overlay?this.$el.addClass("overlay-dots"):"plain"==this.settings.overlay&&this.$el.addClass("overlay-plain"),
                        this.support){
                            var r=this.$slides.eq(0);
                            r.css("opacity",0).css(this.transitionProp),
                            setTimeout(function(){
                                r.css({opacity:1,transform:"scale(1.0, 1.0)","z-index":2})
                            },50)}
                            1==this.settings.autoplay&&this.play()
                        },
                            initSingle:function(){
                                var i=this,
                                t=s('<div class="zs-slideshow"></div>'),
                                e=s('<div class="zs-slides"></div>'),
                                n=s('<div class="zs-slide zs-slide-0"></div>');
                                n.css({"background-image":"url('"+this.settings.src[0]+"')"}).appendTo(e),
                                n.addClass("active").css("opacity",1),i._promoteChildren(),
                                t.append(e).prependTo(this.$el),
                                this.$el.addClass("zs-enabled"),
                                "dots"==this.settings.overlay?this.$el.addClass("overlay-dots"):"plain"==this.settings.overlay&&this.$el.addClass("overlay-plain"),
                                this.support&&(n.css("opacity",0).css(this.transitionProp),
                                setTimeout(function(){n.css({opacity:1,transform:"scale(1.0, 1.0)","z-index":2})},50))
                            },
                            _promoteChildren:function(){
                                this.$el.children().each(
                                    function(i){
                                    $this=s(this),
                                    "auto"==$this.css("z-index")&&$this.css("z-index",2),
                                    "static"==$this.css("position")&&$this.css("position","relative")
                                })},
                                jump:function(s){
                                    if(s>=this.numSlides)
                                    return void console.log("ZoomSlider: jump(pos) aborted. supplied index out of range.");
                                    if(this.pos!=s){
                                        if(this.switching)
                                        return void(this.pending=s);
                                        var i=this,t=this.$slides.eq(this.pos),e=this.$slides.eq(s);
                                        this.support?(this.switching=!0,t.css("z-index",1),e.addClass("active").css(this.transitionProp).css({opacity:1,transform:"scale(1.0, 1.0)","z-index":2}).on(this.transEndEventName,function(s){"opacity"==s.originalEvent.propertyName&&(lastSlideBg=t.css("background-image"),t.removeClass("active").removeAttr("style").css("background-image",lastSlideBg),e.off(i.transEndEventName),i.switching=!1,null!=i.pending&&setTimeout(function(){var s=i.pending;i.pending=null,i.$bullets.eq(s).click()},30))})):(t.removeClass("active"),e.addClass("active")),this.$bullets.eq(this.pos).removeClass("active"),this.$bullets.eq(s).addClass("active"),this.pos=s,this.settings.autoplay&&this.play()}},prev:function(){var s=this.pos-1;s<0&&(s=this.numSlides-1),this.jump(s)},next:function(){var s=this.pos+1;s>=this.numSlides&&(s=0),this.jump(s)},play:function(){null!=this.timer&&clearInterval(this.timer);var s=this;this.settings.autoplay=!0,this.timer=setInterval(function(){s.next()},this.settings.interval)},stop:function(){this.settings.autoplay=!1,clearInterval(this.timer),this.timer=null}}),s.fn[l]=function(i){return this.each(function(){s.data(this,"plugin_"+l)||s.data(this,"plugin_"+l,new a(this,i))})};var r=s("[data-zs-src]");
                            r.length>0&&r.each(function(i){
                                var t=s(this);t.zoomSlider()
                            })}
                            (jQuery,window,document);