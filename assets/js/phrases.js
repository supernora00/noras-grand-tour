(() => {
  const phrases = [
    {category:'quick', zh:'你好', en:'Hello', fr:'Bonjour', de:'Hallo', it:'Buongiorno'},
    {category:'quick', zh:'谢谢', en:'Thank you', fr:'Merci', de:'Danke', it:'Grazie'},
    {category:'quick', zh:'非常感谢', en:'Thank you very much', fr:'Merci beaucoup', de:'Vielen Dank', it:'Grazie mille'},
    {category:'quick', zh:'不客气', en:"You're welcome", fr:'De rien', de:'Gern geschehen', it:'Prego'},
    {category:'quick', zh:'请', en:'Please', fr:"S’il vous plaît", de:'Bitte', it:'Per favore'},
    {category:'quick', zh:'打扰一下 / 不好意思', en:'Excuse me', fr:'Excusez-moi', de:'Entschuldigung', it:'Mi scusi'},
    {category:'quick', zh:'对不起', en:"I’m sorry", fr:'Je suis désolée', de:'Es tut mir leid', it:'Mi dispiace'},
    {category:'quick', zh:'再见', en:'Goodbye', fr:'Au revoir', de:'Auf Wiedersehen', it:'Arrivederci'},
    {category:'quick', zh:'是', en:'Yes', fr:'Oui', de:'Ja', it:'Sì'},
    {category:'quick', zh:'不是 / 不', en:'No', fr:'Non', de:'Nein', it:'No'},
    {category:'quick', zh:'好的', en:'Okay', fr:"D’accord", de:'Okay', it:"D’accordo"},
    {category:'quick', zh:'你会说英语吗？', en:'Do you speak English?', fr:'Parlez-vous anglais ?', de:'Sprechen Sie Englisch?', it:'Parla inglese?'},
    {category:'quick', zh:'我不会说法语。', en:"I don’t speak French.", fr:'Je ne parle pas français.', de:'Ich spreche kein Französisch.', it:'Non parlo francese.'},
    {category:'quick', zh:'我不会说德语。', en:"I don’t speak German.", fr:'Je ne parle pas allemand.', de:'Ich spreche kein Deutsch.', it:'Non parlo tedesco.'},
    {category:'quick', zh:'我不会说意大利语。', en:"I don’t speak Italian.", fr:'Je ne parle pas italien.', de:'Ich spreche kein Italienisch.', it:'Non parlo italiano.'},
    {category:'transport', zh:'这趟火车从哪个站台发车？', en:'Which platform does this train leave from?', fr:'De quel quai part ce train ?', de:'Von welchem Gleis fährt dieser Zug ab?', it:'Da quale binario parte questo treno?'},
    {category:'transport', zh:'这趟车会停在这里吗？', en:'Does this train stop here?', fr:'Ce train s’arrête-t-il ici ?', de:'Hält dieser Zug hier?', it:'Questo treno ferma qui?'},
    {category:'transport', zh:'我坐错车了。', en:'I took the wrong train.', fr:'Je me suis trompée de train.', de:'Ich bin in den falschen Zug gestiegen.', it:'Ho preso il treno sbagliato.'},
    {category:'transport', zh:'这里有人坐吗？', en:'Is this seat taken?', fr:'Cette place est prise ?', de:'Ist dieser Platz besetzt?', it:'Questo posto è occupato?'},
    {category:'transport', zh:'下一站是哪里？', en:'What is the next stop?', fr:'Quel est le prochain arrêt ?', de:'Was ist die nächste Haltestelle?', it:'Qual è la prossima fermata?'},
    {category:'hotel', zh:'我有预订。', en:'I have a reservation.', fr:'J’ai une réservation.', de:'Ich habe eine Reservierung.', it:'Ho una prenotazione.'},
    {category:'hotel', zh:'我可以把行李寄存在这里吗？', en:'Could I leave my luggage here?', fr:'Puis-je laisser mes bagages ici ?', de:'Kann ich mein Gepäck hier lassen?', it:'Posso lasciare qui i bagagli?'},
    {category:'hotel', zh:'几点可以办理入住？', en:'What time is check-in?', fr:'À quelle heure est l’enregistrement ?', de:'Ab wann ist der Check-in?', it:'A che ora è il check-in?'},
    {category:'hotel', zh:'无线网络密码是什么？', en:'What is the Wi-Fi password?', fr:'Quel est le mot de passe Wi-Fi ?', de:'Wie lautet das WLAN-Passwort?', it:'Qual è la password del Wi-Fi?'},
    {category:'restaurant', zh:'请给我菜单。', en:'Could I have the menu, please?', fr:'Puis-je avoir le menu, s’il vous plaît ?', de:'Könnte ich bitte die Speisekarte haben?', it:'Posso avere il menù, per favore?'},
    {category:'restaurant', zh:'我要这个。', en:"I’ll have this one, please.", fr:'Je vais prendre ceci, s’il vous plaît.', de:'Ich nehme das hier, bitte.', it:'Prendo questo, per favore.'},
    {category:'restaurant', zh:'我不能吃辣。', en:"I can’t eat spicy food.", fr:'Je ne peux pas manger épicé.', de:'Ich kann nicht scharf essen.', it:'Non posso mangiare piccante.'},
    {category:'restaurant', zh:'可以刷卡吗？', en:'Can I pay by card?', fr:'Puis-je payer par carte ?', de:'Kann ich mit Karte bezahlen?', it:'Posso pagare con la carta?'},
    {category:'restaurant', zh:'请结账。', en:'The bill, please.', fr:'L’addition, s’il vous plaît.', de:'Die Rechnung, bitte.', it:'Il conto, per favore.'},
    {category:'emergency', zh:'请帮帮我。', en:'Please help me.', fr:'Aidez-moi, s’il vous plaît.', de:'Bitte helfen Sie mir.', it:'Mi aiuti, per favore.'},
    {category:'emergency', zh:'请叫救护车。', en:'Please call an ambulance.', fr:'Appelez une ambulance, s’il vous plaît.', de:'Rufen Sie bitte einen Krankenwagen.', it:'Chiami un’ambulanza, per favore.'},
    {category:'emergency', zh:'请报警。', en:'Please call the police.', fr:'Appelez la police, s’il vous plaît.', de:'Rufen Sie bitte die Polizei.', it:'Chiami la polizia, per favore.'},
    {category:'emergency', zh:'最近的药店在哪里？', en:'Where is the nearest pharmacy?', fr:'Où est la pharmacie la plus proche ?', de:'Wo ist die nächste Apotheke?', it:'Dov’è la farmacia più vicina?'}
  ];
  const langMap = {
    'fr-FR': {key:'fr', label:'Français', flag:'🇫🇷'},
    'de-DE': {key:'de', label:'Deutsch', flag:'🇩🇪'},
    'it-IT': {key:'it', label:'Italiano', flag:'🇮🇹'},
    'en-US': {key:'en', label:'English', flag:'🇬🇧'}
  };
  let language = localStorage.getItem('nora-phrase-language') || 'fr-FR';
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const escapeHTML=(value='')=>String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  function card(item,index){
    const local=langMap[language];
    return `<article class="phrase-card" data-search="${escapeHTML([item.zh,item.en,item.fr,item.de,item.it].join(' ').toLowerCase())}">
      <div class="phrase-card-top"><span class="phrase-zh">${escapeHTML(item.zh)}</span><button class="speak-button" type="button" data-speak="${index}" aria-label="朗读${escapeHTML(local.label)}">🔊</button></div>
      <strong class="phrase-local"><span>${local.flag}</span>${escapeHTML(item[local.key])}</strong>
      ${local.key==='en'?'':`<span class="phrase-english">🇬🇧 ${escapeHTML(item.en)}</span>`}
      <div class="phrase-actions"><button type="button" data-copy="${index}">复制</button><button type="button" data-speak-en="${index}">朗读英文</button></div>
    </article>`;
  }
  function render(){
    Object.keys({quick:1,transport:1,hotel:1,restaurant:1,emergency:1}).forEach(category=>{
      const list=$(`[data-phrase-list="${category}"]`);
      list.innerHTML=phrases.map((p,i)=>p.category===category?card(p,i):'').join('');
    });
    $$('[data-language]').forEach(btn=>btn.classList.toggle('active',btn.dataset.language===language));
    bindActions(); filter();
  }
  function bindActions(){
    $$('[data-speak]').forEach(btn=>btn.addEventListener('click',()=>speak(phrases[Number(btn.dataset.speak)][langMap[language].key],language)));
    $$('[data-speak-en]').forEach(btn=>btn.addEventListener('click',()=>speak(phrases[Number(btn.dataset.speakEn)].en,'en-US')));
    $$('[data-copy]').forEach(btn=>btn.addEventListener('click',()=>copyText(phrases[Number(btn.dataset.copy)][langMap[language].key])));
  }
  function speak(text,lang){
    if(!('speechSynthesis' in window)){toast('当前浏览器不支持朗读');return;}
    speechSynthesis.cancel(); const utter=new SpeechSynthesisUtterance(text); utter.lang=lang; utter.rate=.88; speechSynthesis.speak(utter);
  }
  async function copyText(text){
    try{ if(navigator.clipboard&&window.isSecureContext) await navigator.clipboard.writeText(text); else {const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();document.execCommand('copy');area.remove();} toast('已复制'); }catch(e){toast('复制失败，请长按文字复制');}
  }
  function toast(message){const el=$('[data-phrase-toast]');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),1500)}
  function filter(){
    const q=($('[data-phrase-search]')?.value||'').trim().toLowerCase(); let shown=0;
    $$('.phrase-card').forEach(card=>{const ok=!q||card.dataset.search.includes(q);card.hidden=!ok;if(ok)shown++;});
    $$('.phrase-category').forEach(section=>{const visible=$$('.phrase-card:not([hidden])',section).length;section.hidden=visible===0;});
    $('[data-phrase-empty]').hidden=shown!==0;
  }
  $$('[data-language]').forEach(btn=>btn.addEventListener('click',()=>{language=btn.dataset.language;localStorage.setItem('nora-phrase-language',language);render()}));
  $('[data-phrase-search]')?.addEventListener('input',filter);
  render();
})();