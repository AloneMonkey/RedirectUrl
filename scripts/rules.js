$(function(){
	Rules.init();

	$('.AddRule').click(function(){
		Rules.Add(Rules.getClickRule($(this)));
		$('#show').find('.db').remove();
		Rules.init();
	});

	$('.UpdateRule').click(function(){
		Rules.Update(Rules.getClickRule($(this)));
	});

	$('.RemoveRule').click(function(){
		Rules.Remove(Rules.getClickRule($(this)));
		$('#show').find('.db').remove();
		Rules.init();
	});

	$('#removeAllRules').click(function(){
		Rules.RemoveAll();
		$('#show').find('.db').remove();
	});
});

var Rules = {
	index:window.localStorage.getItem("Ruls:index"),
	init:function(){
		if(!Rules.index){
            window.localStorage.setItem('Ruls:index',Rules.index=0);
        }
		var key;
		for(var i = window.localStorage.length;i > 0; i--){
			key = window.localStorage.key(i);
			if(/ruls:\d+/.test(key)){
				Rules.AppandHtml(JSON.parse(window.localStorage.getItem(key)));
			}
		}
	},
	Add:function(rule){
		window.localStorage.setItem('Ruls:index', ++Rules.index);
		rule.id = Rules.index;
		window.localStorage.setItem("ruls:"+Rules.index,JSON.stringify(rule));
	},
	Update:function(rule){
		window.localStorage.setItem("ruls:"+rule.id,JSON.stringify(rule));
	},	
	Remove:function(rule){
		window.localStorage.removeItem("ruls:"+rule.id);
	},
	isMatch:function(requrl){
		var key,value;
		for(var i = window.localStorage.length;i > 0; i--){
			key = window.localStorage.key(i);
			if(/ruls:\d+/.test(key)){
				value = JSON.parse(window.localStorage.getItem(key));
				if(requrl.indexOf(value.from) > -1){
					return value;
				}
			}
		}
		return;
	},
	getClickRule:function(click){
		var parent = click.parent().parent();
		var id = parent.find('#id').val();
		var from = parent.find('#from').val();
		var to = parent.find('#to').val();
		var rule = {id:id,from:from,to:to};
		if(from == '' || to == '') return;
		return rule;
	},
	AppandHtml:function(rule){
		$('#show tr:first-child').after("<tr class='db'>"+
					"<input id='id' type='hidden' value='"+rule.id+"'/>"+
					"<td><input type='text' id='from' value='"+rule.from+"'/></td>"+
					"<td>-</td>"+
					"<td><input type='text' id='to' value='"+rule.to+"'/></td>"+
					"<td><input type='button' value='Update' class='UpdateRule' /></td>"+
					"<td><input type='button' value='Remove' class='RemoveRule' /></td>"+
				"</tr>");
	},
}