
function codeedit(id) 
   {
       
       var o=document.querySelector(id);
       o.addEventListener('keydown',function(e)
       {
           if(e.keyCode==9)
           {
               document.execCommand("insertText",true,"\t");
               e.preventDefault();
           }
       });
       o.addEventListener('keyup',function(e)
       {
           if(e.keyCode==13)
           {
               var s1=o.selectionStart-1;
               var tx=o.value;
               var tabc=0;
               var ttab=0;
               while(s1>=0 &&(tx[s1]=='\r' || tx[s1]=='\n'))s1--;
               if(tx[s1]=="{" || tx[s1]==">")ttab=1;
               while(s1>=0&&tx[s1]!='\r'&&tx[s1]!='\n')
               {
                   s1--;
               }
               s1++;
               while(tx[s1+tabc]=='\t')tabc++;
               for(var i=0;i<tabc+ttab;i++)document.execCommand("insertText",true,"\t");
           }
           o.innerHTML = o.value;
       });
       
       var top = o.getAttribute('atscroll');
       o.scrollTop=parseInt(top);
       
       function pointup(e)
       {
           
           o.setAttribute('atscroll',o.scrollTop);
       }
       o.addEventListener('mouseup',pointup);
	   o.addEventListener('touchend',pointup);
       
       o.addEventListener('change',function()
       {
           o.innerHTML = o.value;
       });
       
   }
