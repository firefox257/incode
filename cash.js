var mimeType =  {
	get:function(u)
	{
		var a = u.split(".");
		var l = "." + a[a.length-1].toLowerCase();
		return this[l];
	},
	".avi": "video/avi",
	".bin": "application/x-binary",
	".bmp": "image/bmp",
	".bz":  "application/x-bzip",
	".c": "text/x-c",
	".cc": "text/x-c",
	".c++": "text/x-c",
	".cpp": "text/x-c",
	".css": "text/css",
	".cxx": "text/x-c",
	".doc": "application/msword",
	".exe": "application/octet-stream",
	".gif": "image/gif",
	".gz": "application/x-gzip", 
	".gzip": "application/x-gzip", 
	".h": "text/x-h",
	".hh": "text/x-h",
	".hlp": "application/hlp",
	".htm": "text/html",
	".html": "text/html",
	".ico": "image/x-icon",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".js": "text/javascript",
	".json":"application/json",
	".midi": "audio/midi",
	".mov": "video/quicktime",
	".mp3": "audio/mpeg3",
	".mpa": "audio/mpeg",
	".mpeg": "video/mpeg", 
	".mpg": "video/mpeg",
	".mpga": "audio/mpeg",
	".mp4":"video/mp4",
	".pdf": "application/pdf",
	".png": "image/png",
	".ps": "application/postscript",
	".py": "text/x-script.phyton",
	".rtf": "text/richtext",
	".s": "text/x-asm",
	".sh": "text/x-script.sh",
	".shtml": "text/html",
	".snd": "audio/basic",
	".spr": "application/x-sprite",
	".sprite": "application/x-sprite",
	".svg": "image/svg+xml",
	".tar": "application/x-tar",
	".tgz": "application/x-compressed",
	".tif": "image/tiff",
	".tiff": "image/tiff",
	".txt": "text/plain",
	".wav": "audio/wav",
	".word": "application/msword",
	".xls": "application/x-excel",
	".xlt": "application/excel",
	".xml": "text/xml",
	".zip": "application/zip"
};

var site = (function()
	{
		if("caches" in window)
		{
			var _atSite = "_blank";
			var _atUrl= "http://localhost/";
			return {
				setSite: function(s)
				{
					_atSite = s;
					_atUrl = "http://localhost/";
				},
				set: function(u, data)
				{
					return caches.open(_atSite).then((cache)=>
						{
							var b = new Blob([data], {type:mimeType.get(_atUrl + u)});
							var r = new Response(b, {"status": 200, "statusText":"ok"});
							return cache.put(_atUrl+u, r);
						});
				}, 
				setBlob: function(u, data)
				{
					return caches.open(_atSite).then((cache)=>
						{
							var r = new Response(data, {"status": 200, "statusText":"ok"});
							return cache.put(_atUrl+u, r);
						});
				}, 
				getText: function(u)
				{
					return caches.open(_atSite).then((cache)=> cache.match(_atUrl +  u)).then((item)=> item.text()).then((t) => t);
				},
				getBlobUrl: function(u)
				{
					return caches.open(_atSite).then((cache)=> cache.match(_atUrl +  u)).then((item)=> item.blob()).then((b) => URL.createObjectURL(b));
				},
				getBlob: function(u)
				{
					return caches.open(_atSite).then((cache)=> cache.match(_atUrl +  u)).then((item)=> item.blob()).then((b) => b);
				},
				remove: function(u)
				{
					if(confirm("Permanitly remove file?"))
					{
						return caches.open(_atSite).then((cache)=>
						{
							this.set(u," ").then(function()
							{
								return cache.remove(_atUrl +  u);
							});
						});
					}
				}
				
			};

		}

		return undefined;
	})();




/*site.set("try1.js", `alert("hi there123");`).then(function()
	{
		site.getBlobUrl("try1.js").then((t) =>
			{
				alert(t);
			});
	});*/
	
