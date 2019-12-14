

function $var()
{
	var _v;
	var _t = [];

	function getset(v)
	{

		if(v || v == "")
		{
			_v = v;
			var l = _t.length;
			for(var i = 0; i < l; i++)
			{
				_t[i](_v);
			}
			return;
		}
		return _v;
	}
	getset.track = function(f)
	{
		_t.push(f);
	}
	return getset;
}

function $track(d, v)
{
	var tag = d.tagName.toLowerCase();
	var alttag = d.getAttribute("altTag");
	if(tag == "input" || tag == "select" || tag == "textarea" || tag == "progress" || (alttag != null && alttag == "input"))
	{
		d.oninput = function()
		{
			var t = d.getAttribute("type");
			if(!t)
			{
				v(d.value);
			}
			else if(t == "checkbox" || t == "radio")
			{
				v(d.checked);
			}
			else
			{
				v(d.value);
			}
		};

		v.track(function(vv)
			{
				d.value = vv;
			});
	}
	else
	{
		v.track(function(vv)
			{
				d.innerHTML = vv;
			});
	}
}

/*
(function()
{
var v = $var();
$track($g("#h"), v);
$track($g("#a1"), v);

var v2 = $var();
$track($g("#h2"), v2);
$track($g("#a2"), v2);


var v3 = $var();
$track($g("#h3"), v3);
$track($g("#a3"), v3);

var v4 = $var();
$track($g("#p1"), v4);
$track($g("#pp1"), v4);

var v5 = $var();
$track($g("#s1"), v5);
$track($g("#ss1"), v5);
})();

*/
