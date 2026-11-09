(function(){
  function v(id){var e=document.getElementById(id);return e?e.value.trim():''}
  function selAll(el){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)}
  document.querySelectorAll('button.copy[data-target]').forEach(function(b){
    b.addEventListener('click',function(){var o=document.getElementById(b.getAttribute('data-target'));
      try{navigator.clipboard.writeText(o.textContent).then(function(){b.textContent='Nusxalandi'},function(){selAll(o)})}catch(e){selAll(o)}});
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
    return 'TEST MEBEL sertifikatlashtirish organiga so‘rov\n\nF.I.Sh.: '+v('r-name')+'\nTelefon: '+v('r-phone')+'\nE-mail: '+(v('r-mail')||'—')+'\nTashkilot: '+(v('r-org')||'—')+'\nXizmat turi: '+v('r-type')+'\n\n'+v('r-info');
  },function(){return 'So‘rov: '+v('r-type')});
  setup('f-app','a',['a-name','a-phone','a-mail','a-subj','a-text'],function(){
    var k=document.querySelector('input[name="a-kind"]:checked').value;
    return '“TEST MEBEL” MChJ mahsulotlarni sertifikatlashtirish organi rahbariga\n\n'+k.toUpperCase()+'\n\nArizachi: '+v('a-name')+'\nTashkilot: '+(v('a-org')||'—')+'\nTelefon: '+v('a-phone')+'\nE-mail: '+v('a-mail')+'\nPochta manzili: '+(v('a-addr')||'—')+
      '\n\nNima yuzasidan: '+v('a-area')+'\nQaror / ariza / sertifikat raqami: '+(v('a-num')||'—')+'\nSana: '+(v('a-date')||'—')+'\nMavzu: '+v('a-subj')+
      '\n\nMazmuni va asoslari:\n'+v('a-text')+'\n\nKutilayotgan natija: '+(v('a-want')||'—')+'\nIlovalar: '+(v('a-att')||'—')+'\n\nSana: '+new Date().toLocaleDateString('ru-RU')+'\nImzo: ____________ '+v('a-name');
  },function(){var k=document.querySelector('input[name="a-kind"]:checked').value;return k+': '+v('a-subj')});
})();
