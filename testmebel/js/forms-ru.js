(function(){
  function v(id){var e=document.getElementById(id);return e?e.value.trim():''}
  function selAll(el){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)}
  document.querySelectorAll('button.copy[data-target]').forEach(function(b){
    b.addEventListener('click',function(){var o=document.getElementById(b.getAttribute('data-target'));
      try{navigator.clipboard.writeText(o.textContent).then(function(){b.textContent='Скопировано'},function(){selAll(o)})}catch(e){selAll(o)}});
  });
  function setup(formId,prefix,req,build,subj){
    var f=document.getElementById(formId); if(!f) return;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var miss=req.some(function(id){return !v(id)});
      document.getElementById(prefix+'-err').hidden=!miss; if(miss) return;
      var t=build(); document.getElementById(prefix+'-out').textContent=t;
      document.getElementById(prefix+'-send').href='mailto:test_mebel@mail.ru?subject='+encodeURIComponent(subj())+'&body='+encodeURIComponent(t);
      document.getElementById(prefix+'-res').hidden=false;
    });
  }
  setup('f-req','r',['r-name','r-phone','r-info'],function(){
    return 'Запрос в орган по сертификации TEST MEBEL\n\nФ.И.О.: '+v('r-name')+'\nТелефон: '+v('r-phone')+'\nE-mail: '+(v('r-mail')||'—')+'\nОрганизация: '+(v('r-org')||'—')+'\nВид услуги: '+v('r-type')+'\n\n'+v('r-info');
  },function(){return 'Запрос: '+v('r-type')});
  setup('f-app','a',['a-name','a-phone','a-mail','a-subj','a-text'],function(){
    var k=document.querySelector('input[name="a-kind"]:checked').value;
    return 'Руководителю органа по сертификации продукции ООО «TEST MEBEL»\n\n'+k.toUpperCase()+'\n\nЗаявитель: '+v('a-name')+'\nОрганизация: '+(v('a-org')||'—')+'\nТелефон: '+v('a-phone')+'\nE-mail: '+v('a-mail')+'\nПочтовый адрес: '+(v('a-addr')||'—')+
      '\n\nПредмет обращения: '+v('a-area')+'\nНомер решения / заявки / сертификата: '+(v('a-num')||'—')+'\nДата: '+(v('a-date')||'—')+'\nТема: '+v('a-subj')+
      '\n\nСодержание и обоснование:\n'+v('a-text')+'\n\nОжидаемый результат: '+(v('a-want')||'—')+'\nПриложения: '+(v('a-att')||'—')+'\n\nДата: '+new Date().toLocaleDateString('ru-RU')+'\nПодпись: ____________ '+v('a-name');
  },function(){var k=document.querySelector('input[name="a-kind"]:checked').value;return k+': '+v('a-subj')});
})();
