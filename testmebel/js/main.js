(function(){
  var nav=document.getElementById('nav'), burger=document.getElementById('burger');
  function closeAll(except){document.querySelectorAll('nav.main li.open').forEach(function(li){if(li!==except){li.classList.remove('open');li.querySelector('button').setAttribute('aria-expanded','false')}})}
  nav.querySelectorAll(':scope>ul>li>button').forEach(function(b){
    b.addEventListener('click',function(){var li=b.parentElement,o=!li.classList.contains('open');closeAll(li);li.classList.toggle('open',o);b.setAttribute('aria-expanded',o)});
  });
  document.addEventListener('click',function(e){if(!e.target.closest('nav.main')) closeAll()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape') closeAll()});
  burger.addEventListener('click',function(){var o=nav.classList.toggle('show');burger.setAttribute('aria-expanded',o)});
})();
/* Qo‘shimcha: ariza shaklini to‘ldirish, yuqoriga qaytish va qo‘ng‘iroq tugmalari */
(function(){
  var p=new URLSearchParams(location.search).get('mahsulot'), f=document.getElementById('r-info');
  if(p&&f){f.value=(f.value?f.value+'\n':'')+p+'\n';var t=document.getElementById('r-type');if(t&&t.options.length)t.selectedIndex=0;}
  var L=(document.documentElement.lang||'uz').slice(0,2);
  var lab={uz:['Yuqoriga','Qo‘ng‘iroq qilish'],ru:['Наверх','Позвонить'],en:['Back to top','Call us']}[L]||['Top','Call'];
  var w=document.createElement('div');w.className='fab';
  w.innerHTML='<a class="fab-call" href="tel:+998900075883" aria-label="'+lab[1]+'" title="'+lab[1]+'"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg></a>'+
    '<button type="button" class="fab-top" aria-label="'+lab[0]+'" title="'+lab[0]+'" hidden><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="M12 5l7 7-1.4 1.4L13 8.8V20h-2V8.8l-4.6 4.6L5 12z"/></svg></button>';
  document.body.appendChild(w);
  var top=w.querySelector('.fab-top');
  top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
  window.addEventListener('scroll',function(){top.hidden=window.scrollY<500},{passive:true});
})();
