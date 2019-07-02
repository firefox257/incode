function style(callback)
{


function grad()
{
    var str="";
    for(var i =0;i<arguments.length-1;i++)
    str=str+arguments[i]+', ';
    str=str+arguments[arguments.length-1];
   
    return {
        'background-image': 'radial-gradient('+str+');'
        }
}

function hlgrad()
{
	var str="";
	for(var i =0;i<arguments.length-1;i++) 
	str=str+arguments[i]+', ';
	str=str+arguments[arguments.length-1];
	
	return {
		'background-image': 'linear-gradient('+str+');'
		}
}

function vlgrad()
{
	var str="";
	for(var i =0;i<arguments.length-1;i++) 
	str=str+arguments[i]+', ';
	str=str+arguments[arguments.length-1];
	
	return {
		'background-image': 'linear-gradient(90deg, '+str+');'
		}
}

function size(w,h,t)
{
	return{
		'width':w+t+';',
		'height':w+t*';'
	};
}

function pad()
	{
		var ll=arguments.length;
		var str ="";
		for(var i=0;i<ll-1;i++)
		{
			str=str+arguments[i]+arguments[ll-1]+" ";
		}
		return{
			"padding":str
		}
	}

function marg()
	{
		var ll=arguments.length;
		var str ="";
		for(var i=0;i<ll-1;i++)
		{
			str=str+arguments[i]+arguments[ll-1]+" ";
		}
		return{
			"margin":str
		}
	}

function cssimg(aa, aler)
{
	var str=":root\r\n{\r\n";
	for(var i in aa)
	{
		str=str+"--"+i+":url('"+aa[i]+"');\r\n";
	}
	str=str+"}\r\n";
	
	for(var i in aa)
	{
		str=str+"."+i+"\r\n"+
		"{\r\n"+
		"content:var(--"+i+");\r\n"+
		"}\r\n";
	}
	
	if(aler)alert(str);
	_w("<style>"+str+"<\/style>");
	
}

function backimg(val)
{

	return {
	'background': 'var(--'+val+') no-repeat center center fixed;', 
	'-webkit-background-sizue': 'cover',
	'-moz-background-size': 'cover',
	'-o-background-size': 'cover',
	'background-size': 'cover'
	};
}
var center={
	'position': 'absolute',
		'top': '50%',
		'left': '50%',
		'transform': 'translate(-50%, -50%)'
		};

function css(at,id,aler)
	{
		var rets="";
		for(var v1 in at)
		{
			rets+=v1+"{";
			var p=at[v1];
			for(var v2 in p)
			{
				rets+=v2+":"+p[v2]+";";
			}
			rets+="}";
		}
		if(aler)alert(rets);
		_w("<style id='"+id+"'>"+rets+"<\/style>");
	}
function bcolor(r,g,b,a)
{
return {
'background-color':'rgba('+r+', '+g+', '+b+', '+a+')'
};
}


eval("css(("+callback+")());");

}
