

   function codeedit(id) 
   {
       
       var o=$q.s(id);
       o.b(['keydown'],function(e)
       {
           if(e.keyCode==9)
           {
               document.execCommand("insertText",true,"\t");
               e.preventDefault();
           }
       });
       o.b(['keyup'],function(e)
       {
           if(e.keyCode==13)
           {
               var s1=o.$at.selectionStart-1;
               var tx=o.val();
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
           o.html(o.val());
       });
       
       var top = o.attr('atscroll');
       o.$at.scrollTop=parseInt(top);
       
       function pointup(e)
       {
           
           o.attr('atscroll',o.$at.scrollTop);
       }
       o.b(['mouseup','touchend'],pointup);
       
       o.b(['change'],function()
       {
           o.html(o.val());
       });
       
   }
   
