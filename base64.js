function ab2str(buf) 
{
	return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) 
{
	var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
	var bufView = new Uint16Array(buf);
	var s = str.length;
	for (var i = 0; i < s; i++) 
	{
		bufView[i] = str.charCodeAt(i);
	}
	return buf;
}


function str2abUtf8(str) 
{
	var s = str.length;
	var ss=0;
	for (var i = 0; i < s; i++) 
	{
		var co= str.charCodeAt(i);
		//co=(co<<8)|(co>>8);
		if(co>0x07FF)
		{
			ss+=3;
		}
		else if(co>0x7f)
		{
			ss+=2;
		}
		else
		{
			ss++;
		}
	}
	
	var buf=new ArrayBuffer(ss);
	var dv=new DataView(buf);
	ss=0;
	
	for (var i = 0; i < s; i++) 
	{
		var co= str.charCodeAt(i);
		//co=(co<<8)|(co>>8);
		
		if(co>0x07FF)
		{
			dv.setUint8(ss,0x70 | (co>>12));
			ss++;
			dv.setUint8(ss,0x40 | ((co>>6)&0x3f));
			ss++;
			dv.setUint8(ss, 0x40 | (co&0x3f));
			ss++;
		}
		else if(co>0x7f)
		{
			//dv.setUint8(ss, 0x60 | ((co>>6)&0x1f));
			ss++;
			dv.setUint8(ss, 0x40 | (co&0x3f));
			ss++;
		}
		else
		{
			dv.setUint8(ss,co);
			ss++;
		}
	}
	
	
	return buf;
}

var b64=(function()
	{
		var ic="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
		var oc={};
		for(var i=0;i<ic.length;i++)
		{
			oc[ic[i]]=i;
		}
		
		return {
			enc:function(b)
			{
				var dv=new DataView(b);
				var d=0|0;
				var tot=0;
				var s=b.byteLength;
				var t="";
				for(i=0;i<s;i++)
				{
					d=(d<<8) | dv.getUint8(i);
					tot+=8;
					while(tot>=6)
					{
						tot-=6;
						var a=(d>>tot);
						d=d&(0xffffff>>(24-tot));
						t+=ic[a];
					}
				}
				if(tot>0)
				{
					t+=ic[d<<(6-tot)];
				}
				return t;
			},
			dec:function(t)
			{
				var ab=new ArrayBuffer((t.length*6)/8);
				var dv= new DataView(ab);
				var s=t.length;
				var d=0|0;
				var tot=0;
				var c=0;
				for(var i=0;i<s;i++)
				{
					d=(d<<6) | oc[t[i]];
					tot+=6;
					while(tot>=8)
					{
						tot-=8;
						dv.setUint8(c,d>>tot);
						c++;
						d=d&(0xffffff>>(24-tot));
					}
				}
				
				return ab;
			},
			encstr:function(t)
			{
				return this.enc(str2ab(t));
			},
			decstr:function(t)
			{
				return ab2str(this.dec(t));
			},
			encstrUtf8:function(t)
			{
				return this.enc(str2abUtf8(t));
			},
			decstrUtf8:function(t)
			{
				
			}
			
			
		};
		
	})();









