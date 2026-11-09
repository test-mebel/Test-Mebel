(function(){
  function sel(el){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)}
  const opts=['Отлично','Хорошо','Удовлетворительно','Плохо'];
  document.querySelectorAll('#survey .scale').forEach((s,i)=>{
    s.innerHTML=opts.map((o,j)=>'<label><input type="radio" name="q'+i+'" id="q'+i+'-'+j+'" value="'+o+'">'+o+'</label>').join('');
  });
  const f=document.getElementById('survey');
  f.addEventListener('submit',e=>{
    e.preventDefault();
    let t='Анкета — орган по сертификации TEST MEBEL\nОрганизация: '+(document.getElementById('s-org').value||'—')+'\n';
    document.querySelectorAll('#survey .scale').forEach((s,i)=>{const c=f.querySelector('input[name="q'+i+'"]:checked');t+=s.dataset.name+': '+(c?c.value:'—')+'\n'});
    t+='Предложения: '+(document.getElementById('s-note').value||'—');
    document.getElementById('s-out').textContent=t; document.getElementById('s-res').hidden=false;
  });
  document.getElementById('s-copy').addEventListener('click',e=>{
    const o=document.getElementById('s-out'),b=e.currentTarget;
    try{navigator.clipboard.writeText(o.textContent).then(()=>{b.textContent='Скопировано'},()=>sel(o))}catch(_){sel(o)}
  });
})();
