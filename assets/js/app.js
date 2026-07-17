
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('[data-check]').forEach((el)=>{
    const key='nora-v1-'+location.pathname+'-'+el.dataset.check;
    el.checked=localStorage.getItem(key)==='1';
    el.addEventListener('change',()=>localStorage.setItem(key,el.checked?'1':'0'));
  });
});
