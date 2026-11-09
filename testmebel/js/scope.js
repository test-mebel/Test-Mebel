/* Akkreditatsiya sohasi bo‘yicha qidiruv / Поиск по области аккредитации / Scope search */
(function(){
  var D=window.TM_SCOPE; if(!D) return;
  var L=(document.documentElement.lang||'uz').slice(0,2);
  var T={
    uz:{all:'Barchasi',found:'Topildi',pos:'pozitsiya',none:'Kiritilgan so‘rov bo‘yicha akkreditatsiya sohamizda mos pozitsiya topilmadi.',
      noneHint:'Kod yoki nomni tekshiring yoki bizga murojaat qiling — mutaxassis mahsulotingiz bo‘yicha maslahat beradi.',
      near:'Aniq kod topilmadi, lekin shu tovar pozitsiyasidagi (birinchi 4 raqam) quyidagi kodlar sohamizda bor. Aniq kodni mutaxassis bilan tekshiring:',
      codes:'TIF TN kodlari',std:'Me’yoriy hujjatlar',schemes:'Sxemalar',official:'Sohadagi rasmiy nomi',apply:'Shu mahsulot bo‘yicha so‘rov',
      copy:'Nusxalash',copied:'Nusxalandi',more:'Yana',less:'Yig‘ish',csv:'CSV yuklab olish',print:'Chop etish',reset:'Tozalash',contact:'Bog‘lanish',
      ask:'Mahsulot',showing:'Ko‘rsatilmoqda',of:'dan',hint:'Masalan: 9403, 4410113000, mebel, DSP, ГОСТ 19917'},
    ru:{all:'Все',found:'Найдено',pos:'позиций',none:'По вашему запросу соответствующих позиций в области аккредитации не найдено.',
      noneHint:'Проверьте код или наименование либо свяжитесь с нами — специалист проконсультирует по вашей продукции.',
      near:'Точный код не найден, но в области есть коды той же товарной позиции (первые 4 знака). Уточните точный код у специалиста:',
      codes:'Коды ТН ВЭД',std:'Нормативные документы',schemes:'Схемы',official:'Наименование по области',apply:'Запрос по этой продукции',
      copy:'Копировать',copied:'Скопировано',more:'Ещё',less:'Свернуть',csv:'Скачать CSV',print:'Печать',reset:'Сбросить',contact:'Связаться',
      ask:'Продукция',showing:'Показано',of:'из',hint:'Например: 9403, 4410113000, мебель, ДСП, ГОСТ 19917'},
    en:{all:'All',found:'Found',pos:'items',none:'No matching item was found in our accreditation scope.',
      noneHint:'Check the code or product name, or contact us — our specialist will advise on your product.',
      near:'The exact code was not found, but the scope contains codes from the same heading (first 4 digits). Please confirm the exact code with our specialist:',
      codes:'HS (TN VED) codes',std:'Standards',schemes:'Schemes',official:'Official name in the scope',apply:'Enquire about this product',
      copy:'Copy',copied:'Copied',more:'More',less:'Less',csv:'Download CSV',print:'Print',reset:'Reset',contact:'Contact us',
      ask:'Product',showing:'Showing',of:'of',hint:'E.g. 9403, 4410113000, furniture, particleboard, GOST 19917'}
  }[L]||{};
  var G={}; D.groups.forEach(function(g){G[g.id]=g});
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function norm(s){return String(s).toLowerCase().replace(/ё/g,'е').replace(/[‘’ʻʼ`']/g,"'").replace(/[«»"().,;:]/g,' ').replace(/\s+/g,' ').trim()}
  function title(it){return L==='ru'?it.ru.split(' (')[0].replace(/\.$/,''):it[L]}
  D.items.forEach(function(it){var g=G[it.g];it._h=norm([it.n,it.g,it.s,it.ru,it.uz,it.en,it.std,it.k,g.uz,g.ru,g.en].join(' '))});

  function search(q,grp){
    var raw=(q||'').trim(), digits=raw.replace(/[\s.\-]/g,''), res=[], near=[], hit={};
    var pool=D.items.filter(function(it){return !grp||it.g===grp});
    if(!raw) return {res:pool,near:[],hit:hit,mode:'all'};
    if(/^\d{2,10}$/.test(digits)){
      pool.forEach(function(it){
        var m=it.c.filter(function(c){return c.indexOf(digits)===0||digits.indexOf(c)===0});
        if(m.length){res.push(it);hit[it.n]=m}
        else if(it.std.replace(/\s/g,'').indexOf(digits)>-1) res.push(it);
      });
      if(!res.length&&digits.length>=4){var h=digits.slice(0,4);
        pool.forEach(function(it){var m=it.c.filter(function(c){return c.indexOf(h)===0});if(m.length){near.push(it);hit[it.n]=m}})}
      return {res:res,near:near,hit:hit,mode:'code'};
    }
    var toks=norm(raw).split(' ').filter(Boolean);
    pool.forEach(function(it){if(toks.every(function(t){return it._h.indexOf(t)>-1})) res.push(it)});
    return {res:res,near:[],hit:hit,mode:'text'};
  }

  function card(it,hit){
    var g=G[it.g], codes=it.c, hc=hit[it.n]||[], lim=12;
    var chips=codes.map(function(c,i){return '<button type="button" class="code'+(hc.indexOf(c)>-1?' on':'')+(i>=lim&&hc.indexOf(c)<0?' xtra':'')+'" data-copy="'+c+'" title="'+T.copy+'">'+c+'</button>'}).join('');
    var more=codes.length>lim?'<button type="button" class="morec" data-more>'+T.more+' +'+(codes.length-lim)+'</button>':'';
    var off=L==='ru'?'':'<p class="note"><b>'+T.official+':</b> '+esc(it.ru)+'</p>';
    var aq=encodeURIComponent(it.n+' — '+title(it)+(hc.length?' ('+hc.join(', ')+')':''));
    return '<article class="scard"><div class="shd"><span class="tag">'+it.n+'</span><span class="tag">'+it.s+' · '+it.g+'</span><span class="gname">'+esc(g[L])+'</span></div>'+
      '<h3>'+esc(title(it))+'</h3>'+off+
      '<div class="srow"><span class="lbl">'+T.codes+'</span><div class="codes'+(more?' clip':'')+'">'+chips+more+'</div></div>'+
      '<div class="srow"><span class="lbl">'+T.std+'</span><div>'+esc(it.std)+'</div></div>'+
      '<div class="srow"><span class="lbl">'+T.schemes+'</span><div class="mono">1С · 3С · 4С</div></div>'+
      '<div class="sact"><a class="cta sm" href="ariza.html?mahsulot='+aq+'">'+T.apply+'</a></div></article>';
  }

  function copyText(t,b){
    function ok(){var o=b.getAttribute('data-l')||b.textContent;b.setAttribute('data-l',o);b.classList.add('ok');setTimeout(function(){b.classList.remove('ok')},1200)}
    try{navigator.clipboard.writeText(t).then(ok,function(){})}catch(e){}
  }
  document.addEventListener('click',function(e){
    var b=e.target.closest('[data-copy]'); if(b){copyText(b.getAttribute('data-copy'),b);return}
    var m=e.target.closest('[data-more]'); if(m){var w=m.parentElement;var o=w.classList.toggle('open');m.textContent=o?T.less:T.more+' +'+w.querySelectorAll('.xtra').length}
  });

  /* Bosh sahifa / soha sahifasidagi kichik vidjet: guruh kartalari soni */
  document.querySelectorAll('[data-gcount]').forEach(function(el){var id=el.getAttribute('data-gcount');el.textContent=D.items.filter(function(i){return i.g===id}).length})
  document.querySelectorAll('[data-total]').forEach(function(el){el.textContent=D.items.reduce(function(a,i){return a+i.c.length},0)});

  var app=document.getElementById('scope-app'); if(!app) return;
  var inp=document.getElementById('sq'), chipsEl=document.getElementById('sgroups'), out=document.getElementById('sres'), cnt=document.getElementById('scount');
  var P=new URLSearchParams(location.search), grp=P.get('g')||'';
  inp.value=P.get('q')||''; inp.placeholder=T.hint;
  chipsEl.innerHTML='<button type="button" data-g="">'+T.all+' <span>'+D.items.length+'</span></button>'+D.groups.map(function(g){
    return '<button type="button" data-g="'+g.id+'">'+esc(g[L])+' <span>'+D.items.filter(function(i){return i.g===g.id}).length+'</span></button>'}).join('');
  var last=[];
  function render(push){
    var q=inp.value, r=search(q,grp);
    chipsEl.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-g')===grp)});
    last=r.res.length?r.res:r.near;
    var h='';
    if(r.res.length) h=r.res.map(function(it){return card(it,r.hit)}).join('');
    else if(r.near.length) h='<div class="panel snear">'+T.near+'</div>'+r.near.map(function(it){return card(it,r.hit)}).join('');
    else h='<div class="panel snone"><h3>'+T.none+'</h3><p class="note">'+T.noneHint+'</p><p><a class="cta sm" href="ariza.html?mahsulot='+encodeURIComponent(q)+'">'+T.contact+'</a> <a class="cta sm ghost" href="aloqa.html">Tel.: +998 90 007-58-83</a></p></div>';
    out.innerHTML=h;
    cnt.textContent=T.found+': '+r.res.length+' '+T.pos;
    if(push!==false){var u=new URLSearchParams();if(q.trim())u.set('q',q.trim());if(grp)u.set('g',grp);history.replaceState(null,'',location.pathname+(u.toString()?'?'+u:''))}
  }
  var tm; inp.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(render,180)});
  document.getElementById('sform').addEventListener('submit',function(e){e.preventDefault();render()});
  chipsEl.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;grp=b.getAttribute('data-g');render()});
  document.querySelectorAll('[data-q]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();inp.value=a.getAttribute('data-q');grp='';render();inp.focus()})});
  document.getElementById('sreset').addEventListener('click',function(){inp.value='';grp='';render();inp.focus()});
  document.getElementById('sprint').addEventListener('click',function(){window.print()});
  document.getElementById('scsv').addEventListener('click',function(){
    var rows=[['№','Sector','Object','TN VED / HS','Name (RU)',L==='ru'?'':'Name','Standards']];
    (last.length?last:D.items).forEach(function(i){rows.push([i.n,i.s,i.g,i.c.join(' '),i.ru,L==='ru'?'':title(i),i.std])});
    var csv='﻿'+rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"'}).join(';')}).join('\r\n');
    var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download='TEST-MEBEL-soha-MS0078.csv';document.body.appendChild(a);a.click();a.remove();
  });
  render(false);
})();
