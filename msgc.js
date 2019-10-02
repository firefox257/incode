var msgc =(function()
	{
		var fa = {};
		return {
			handle: function(name, fptr)
			{
				if(typeof name=="string")
				{
					if(fa[name] == undefined) fa[name] = [];
					fa[name].push(fptr);
					return;
				}
				for(n in name)
				{
					var nn=name[n];
					if(fa[nn] == undefined) fa[nn] = [];
					fa[nn].push(fptr);
				}
			},
			send: function(name)
			{
				if(arguments.length>0)
				{
					var cstr = "a[i](arguments[1]";
					for(var i = 2; i < arguments.length; i++)
					{
						cstr = cstr + ", arguments[" + i + "]";
					}
					cstr = cstr + ");";
					var a = fa[name];
					for(var i = 0; i < a.length; i++)
					{
						eval(cstr);
					}
				}//end if
				else
				{
					var a = fa[name];
					for(var i = 0; i < a.length; i++)
					{
						a[i]();
					}
				}
			}
		};
	})();
$h=msgc.handle;
$s=msgc.send;
