(function (factory) {
   if(typeof define === "function" && define.amd) {    
	define(['IUI-core','Container','ContainerUI'],factory);
	
  } else {
    factory(window.IUI);
  }
})(function(IUI){

	var Layout=IUI.ContainerUI.extend({
		name:'Layout',
		initialize: function(){
			IUI.ContainerUI.prototype.initialize.apply(this,arguments);	
			this._beforeRender();
			this.makeUI();		
			this.bindModels();
			this._afterRender();
		},
		classList: IUI.uiContainers.Container.prototype.classList.concat(['i-ui-layout']),
		subContainerClassList: ['i-ui-subcontainer'],
		makeUI: function(){
			var tagName=this.element.tagName;
			if(tagName!=='BODY' && tagName!=='DIV'){
				var layout=document.createElement('div'),
				subcontainer=document.createElement('div');
				IUI.behaviors.extractFromObject(subcontainer,this.options,['subconatiner-attribute']);	
				this.options.subcontainerOptions.element=subcontainer;
				this.options.subcontainerOptions.model=this.options.model;
				this.subcontainer=new IUI.ContainerUI(this.options.subcontainerOptions);
				this.subcontainer.makeUI();
				this.subcontainer.bindModels();
				$($(this.element).siblings()).appendTo(subcontainer);
				$($(this.element).children()).appendTo(layout);
				
				$(this.element).replaceWith($(layout));
				this.element=layout;
				this.$element=$(layout);
				this.subcontainer=subcontainer;
				this._appendSubContainer()
				this.processSubcontainer(subcontainer);
			}
			this._create(this.element.children);
			this._processOptions(this.element);
			//this._create(this.element.children);
			this.$element.addClass(this.classList);	
			if(this.options.id){
				this.subcontainer.id=this.options.id+'-subcontainer';
			}
			$(this.subcontainer).addClass(this.subContainerClassList);
			if(IUI.domAccessibility){
				this.element.uiContainer=this;
			}
		},
		_appendSubContainer: function(){
			this.$element.after(this.subcontainer);
		},
		_beforeRender:function(){
			
		},
		_afterRender:function(){
			
		},
		processSubcontainer:function(subcontainer){
			
		}
	});
	
	IUI.WidgetBuilder.plugin(Layout);


});