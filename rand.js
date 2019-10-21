var rand=
{
	seed:0,
	_at1:0,
	_at2:1,
	_b:[104746284,79400264614,403867385772957,120887566637485,3869295503,2,
	555933584,795328524,638,19,5678399,2848584920294,92646754731111122,
	7444479075,8532,358864,848582828485,20995,764239,488848280,327885543,2234,
	0,46821625192,29063891,345,8394,1479,2966548,042,29475,388471914,3945875832,
	88888,9999922,55388345247,8485,13,1123,997473,773],
	get:function()
	{
		rand.seed=(rand.seed*(rand._b[rand._at1]+1)+rand._b[rand._at2])%1000000000000000;
		rand._at1=(rand._at1+1)%rand._b.length;
		rand._at2=(rand._at2+1)%rand._b.length;

		return rand.seed/999999999999999;
	},//end get
	set:function(v)
	{
		rand.seed=v;
		rand._at1=v%rand._b.length;
		rand._at2=(v+1)%rand._b.length;
	},//end set
	setbuff:function(v)
	{
		rand.set(v);
		var b=[];
		for(var i=0;i<100000;i++)
		{
			b[i]=Math.floor(rand.get()*1000000000000);
		}

		rand._b=b;
	}

};

