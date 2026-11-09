(function(){
  function v(id){var e=document.getElementById(id);return e?e.value.trim():''}
  function selAll(el){var r=document.createRange();r.selectNodeContents(el);var s=getSelection();s.removeAllRanges();s.addRange(r)}
  document.querySelectorAll('button.copy[data-target]').forEach(function(b){
    b.addEventListener('click',function(){var o=document.getElementById(b.getAttribute('data-target'));
      try{navigator.clipboard.writeText(o.textContent).then(function(){b.textContent='Copied'},function(){selAll(o)})}catch(e){selAll(o)}});
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
    return 'Request to the TEST MEBEL certification body\n\nFull name: '+v('r-name')+'\nPhone: '+v('r-phone')+'\nE-mail: '+(v('r-mail')||'—')+'\nOrganization: '+(v('r-org')||'—')+'\nType of service: '+v('r-type')+'\n\n'+v('r-info');
  },function(){return 'Request: '+v('r-type')});
  setup('f-app','a',['a-name','a-phone','a-mail','a-subj','a-text'],function(){
    var k=document.querySelector('input[name="a-kind"]:checked').value;
    return 'To the Head of the product certification body of “TEST MEBEL” LLC\n\n'+k.toUpperCase()+'\n\nApplicant: '+v('a-name')+'\nOrganization: '+(v('a-org')||'—')+'\nPhone: '+v('a-phone')+'\nE-mail: '+v('a-mail')+'\nPostal address: '+(v('a-addr')||'—')+
      '\n\nConcerning: '+v('a-area')+'\nDecision / application / certificate number: '+(v('a-num')||'—')+'\nDate: '+(v('a-date')||'—')+'\nSubject: '+v('a-subj')+
      '\n\nContent and grounds:\n'+v('a-text')+'\n\nExpected outcome: '+(v('a-want')||'—')+'\nAttachments: '+(v('a-att')||'—')+'\n\nDate: '+new Date().toLocaleDateString('ru-RU')+'\nSignature: ____________ '+v('a-name');
  },function(){var k=document.querySelector('input[name="a-kind"]:checked').value;return k+': '+v('a-subj')});
})();
