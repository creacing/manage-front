<pre><code class="language-html">&lt;html&gt;
 
 &lt;head&gt;&lt;/head&gt;
 
 &lt;body&gt;
     &lt;form action=&quot;&quot;&gt;
         &lt;input type=&quot;text&quot; size=&quot;25&quot; maxlength=&quot;50&quot; name=&quot;inputOne&quot; id=&quot;&quot; value=&quot;initial value&quot;&gt;
     &lt;/form&gt;
     &lt;script&gt;
         //默认值为选中
         const textbox = document.forms[0].elements['inputOne']
 
         // textbox.select()
         //聚焦选中
         textbox.addEventListener('focus', (event) =&gt; {
             console.log('event.target', event.target);
             event.target.select()
         })
     &lt;/script&gt;
 &lt;/body&gt;
 
 &lt;/html&gt;
 </code></pre>
 