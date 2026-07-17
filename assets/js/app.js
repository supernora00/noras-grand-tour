
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-check]').forEach((el)=>{
    const key='nora-v2-'+location.pathname+'-'+el.dataset.check;
    el.checked=localStorage.getItem(key)==='1';
    el.addEventListener('change',()=>localStorage.setItem(key,el.checked?'1':'0'));
  });
  const buttons=[...document.querySelectorAll('[data-mode]')];
  const panels=[...document.querySelectorAll('[data-panel]')];
  if(buttons.length){
    const activate=(name)=>{
      buttons.forEach(b=>b.classList.toggle('active',b.dataset.mode===name));
      panels.forEach(p=>p.classList.toggle('active',p.dataset.panel===name));
      history.replaceState(null,'','#'+name);
    };
    buttons.forEach(b=>b.addEventListener('click',()=>activate(b.dataset.mode)));
    const initial=location.hash.replace('#','');
    activate(['plan','map','photo'].includes(initial)?initial:'plan');
  }
});
