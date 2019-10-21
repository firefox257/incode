var $c=(function()
	{
		var at=0;
		var s=0;
		var t="";
		function isNum()
		{
			var c=t[at];
			return ( c>= "0" &&c<="9") || c==".";
		}
		function isAlpha()
		{
			var c=t[at];
			return (c>="a"&&c<="z")||(c>="A"&&c<="Z");
		}
		function isSpec()
		{
			var c=t[at];
			return c=="$" || c=="_" || c== "~";
		}
		function isBracket()
		{
			var c=t[at];
			return c=="(" || c==")" || c=="[" || c=="]" || c=="{" || c=="}";
		}
		function isToken()
		{
			return isNum() || isAlpha() || isSpec();
		}
		function isSpace()
		{
			var c=t[at];
			return c==" " || c== "\t" || c=="\r" || c=="\n";
		}
		function skipSpace()
		{
			while(at<s&&isSpace())at++;
		}
		function isOp()
		{
			var c=t[at];
			return c=="+" 
			|| c=="-"
			|| c=="*"
			|| c=="/"
			|| c=="&"
			|| c=="|"
			|| c=="^"
			|| c=="%"
			|| c=="="
			|| c==">"
			|| c=="<";
		}
		function nextOp()
		{
			var tok="";
			skipSpace();
			while(isOp())
			{
				tok+=t[at];
				at++;
			}
			
			return tok;
			
		}
		function isToken()
		{
			return isNum() || isAlpha() || isSpec();
		}
		function nextToken()
		{
			var tok="";
			skipSpace();
			while(isToken())
			{
				tok+=t[at];
				at++;
			}
			
			return tok;
			
		}
		function nextBracket()
		{
			skipSpace();
			var c=t[at];
			at++;
			return c;
		}
		function isComma()
		{
			var c=t[at];
			return c==",";
		}
		function nextComma()
		{
			var c=t[at];
			at++;
			return c;
		}
		function isEnd()
		{
			var c=t[at];
			return c==";";
		}
		function nextEnd()
		{
			var c=t[at];
			at++;
			return c;
		}
		function isString()
		{
			return (t[at]=="R"&& t[at+1]=="\"" && t[at+2]=="(")
			|| t[at]=="\""
			|| t[at]=="'";
		}
		function nextString()
		{
			var i = 0;
			var str = "";
			if(t[at]=="R"&& t[at+1]=="\"" && t[at+2]=="(")
			{
				str = "R(\"";
				i+=3;
				while(!(t[at + i] == ")" && t[at +i + 1] == "\"")  )
				{
					if(t[at] == "\")
					{
						str += t[at + i];
						i++;
						str += t[at + i]
						i++;
					}
					else
					{
						str += t[at +i];
						i++;
					}
					
				}
				i+=2;
				str += ")\"";
				at+=i;
				return "";
			}
			else if(t[at]=="\"")
			{
				str = "\"";
				while(t[at + i] != "\"")
				{
					if(t[at] == "\")
					{
						str += t[at + i];
						i++;
						str += t[at + i]
						i++;
					}
					else
					{
						str += t[at +i];
						i++;
					}
				}
				i++;
				str += "\"";
				at +=i;
				return "";
			}
			else if(t[at]=="'")
			{
				
				str = "'";
				while(t[at + i] != "'")
				{
					if(t[at] == "\")
					{
						str += t[at + i];
						i++;
						str += t[at + i]
						i++;
					}
					else
					{
						str += t[at +i];
						i++;
					}
				}
				i++;
				str += "'";
				at +=i;
				return "";
			}
			
			return "";
		}
		
		function isPrim(t)
		{
			return t=="bool"
			|| t=="char"
			|| t=="short"
			|| t=="int"
			|| t=="long"
			|| t=="float"
			|| t=="double"
			|| t=="unsigned";
		}
		function nextPrim(t)
		{
			while(at<s)
			{
				skipSpace();
				if(!isToken())
				{
					
				}
				
				
			}
			
		}
		
		return{
			
			c:function(txt)
			{
				
				t=txt;
				at=0;
				s=t.length;
				while(at<s)
				{
					skipSpace();
					if(isToken())
					{
						alert(nextToken());
					}
					else if(isBracket())
					{
						alert(nextBracket());
					}
					else if(isOp())
					{
						alert(nextOp());
					}
					else if(isComma())
					{
						alert(nextComma());
					}
					else if(isEnd())
					{
						alert(nextEnd());
					}
					else
					{
						at++;
					}
					
					
				}
				
				
			}
		};
		
	})();
	
	
	$c.c(`
void transx(float * a, int s, float d)
{
	for(int i=0; i<s; i++)
	{
		a[i]+=d;
	}
	
}

int sum(int*a,int s)
{
	
	return 0;
}


	`);
	
	
	undefined