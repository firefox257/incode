$codeFilter=(function()
	{
		function strRep(s,c,i)
		{
			return s.substr(0, i) + c + s.substr(i + 1);
		}
		
		function isLB(c)
		{
			return c=="{" || c=="(" || c == "[";
		}
		
		function isRB(c)
		{
			return c=="}" || c==")" || c == "]";
		}
		
		function isE(c)
		{
			return c=="\r"|| c=="\n";
		}
		
		function tabs(c)
		{
			var s="";
			for(var i=0; i<c;i++) s+="\t";
			return s;
		}
		
		function lastC(s, c)
		{
			if(c!=undefined)
			{
				return strRep(s,c,s.length-1);
			}
			return s[s.length-1];
		}
		
		function strEq(s,s1,i)
		{
			if((i+s1.length)>=s,length)return false;
			for(var ii=0;ii<s1.length;ii++)
			{
				if(s[i+ii]!=s1[ii]) return false;
			}
			return true;
		}
		
		function isSp(c)
		{
			return c==" " || c=="\t";
		}
		
		return {
			cpp: function(tx)
			{
				
				var s="";
				var i=0;
				var tc=0;
				
				while(i<tx.length)
				{
					
					if(tx[i]=="\t")
					{
						i++;
					}
					else if(isLB(tx[i]))
					{
						s+=tx[i];
						tc++;
						i++;
					}
					else if(isRB(tx[i]))
					{
						if(lastC(s)=="\t")
						{
							s=lastC(s, tx[i]);
						}
						else
						{
							s+=tx[i];
						}
						
						i++
						tc--;
					}
					else if(strEq(tx,"/>",i))
					{
						s+="/>";
						i+=2;
					}
					else if(strEq(tx,"-->",i))
					{
						s+="-->";
						i+=3;
					}
					else if(strEq(tx,">\r",i)||strEq(tx,">\n",i))
					{
						tc++;
						s+=tx[i];
						i++;
					}
					else if(strEq(tx,"</",i))
					{
						if(lastC(s)=="\t")
						{
							s=lastC(s, tx[i]);
						}
						else
						{
							s+=tx[i];
						}
						i++;
						while(i<tx.length&&tx[i]!=">")
						{
							s+=tx[i];
							i++;
						}
						s+=tx[i];
						i++;
						tc--;
					}
					else if(isE(tx[i]))
					{
						s+=tx[i];
						i++;
						if(isE(tx[i]))
						{
							s+=tx[i];
							i++;
						}
						while(isSp(tx[i]))i++;
						s+=tabs(tc);
						
					}
					else if(tx[i]=="\"")
					{
						s+=tx[i];
						i++;
						
						while(i<tx.length && tx[i]!="\"")
						{
							if(tx[i]=="\\")
							{
								s+=tx[i];
								i++;
								s+=tx[i];
								i++;
							}
							else
							{
								s+=tx[i];
								i++;
							}
						}
						s+=tx[i];
						i++;
						
					}
					else if(tx[i]=="'")
					{
						s+=tx[i];
						i++;
						while(i<tx.length && tx[i]!="'")
						{
							if(tx[i]=="\\")
							{
								s+=tx[i];
								i++;
								s+=tx[i];
								i++;
							}
							else
							{
								s+=tx[i];
								i++;
							}
						}
						s+=tx[i];
						i++;
					}
					else if(tx[i]=="`")
					{
						s+=tx[i];
						i++;
						while(i<tx.length && tx[i]!="`")
						{
							if(tx[i]=="\\")
							{
								s+=tx[i];
								i++;
								s+=tx[i];
								i++;
							}
							else
							{
								s+=tx[i];
								i++;
							}
						}
						s+=tx[i];
						i++;
					}
					else if(strEq(tx,"R\"(",i))
					{
						s+="R\"(";
						i+=3;
						
						while(i<tx.length && !strEq(tx,")\"",i))
						{
							if(tx[i]=="\\")
							{
								s+=tx[i];
								i++;
								s+=tx[i];
								i++;
							}
							else
							{
								s+=tx[i];
								i++;
							}
						}
						s+=")\"";
						i+=2;
						
					}
					else if(strEq(tx,"/*",i))
					{
						s+="/*";
						i+=2;
						
						while(i<tx.length && !strEq(tx,"*/",i))
						{
							s+=tx[i];
							i++;
						}
						s+="*/";
						i+=2;
					}
					else if(strEq(tx,"//",i))
					{
						s+="//";
						i+=2;
						
						while(i<tx.length && !isE(tx[i]))
						{
							s+=tx[i];
							i++;
						}
						
					}
					else
					{
						s+=tx[i];
						i++;
					}
					
				}//end while
				return s;
				
			}//end cpp
			
		};
		
		
	})();