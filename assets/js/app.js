const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const start=new Date('2026-08-21T00:00:00'),end=new Date('2026-09-10T23:59:59');
function currentDay(){const n=new Date();if(n<start)return 1;if(n>end)return 21;return Math.min(21,Math.max(1,Math.floor((n-start)/86400000)+1))}
const dayPaths=['','paris/day1.html','paris/day2.html','paris/day3.html','switzerland/day4.html','switzerland/day5.html','switzerland/day6.html','switzerland/day7.html','switzerland/day8.html','switzerland/day9.html','italy/day10.html','italy/day11.html','italy/day12.html','italy/day13.html','italy/day14.html','italy/day15.html','italy/day16.html','italy/day17.html','italy/day18.html','italy/day19.html','italy/day20.html','italy/day21.html'];
const dashboard={
1:['Paris · Arrival','8月21日','卢浮宫博物馆','8月21日 · 15:30','Hotel de Fleurie','Paris · Saint-Germain','卢浮宫夜场与玻璃金字塔','Z8 24–120 / GR IV'],
2:['Paris · Musée d’Orsay','8月22日','奥赛博物馆','8月22日 · 10:30','Hotel de Fleurie','Paris · Saint-Germain','奥赛大钟与塞纳河线条','GR IV / Z8 24–120'],
3:['Paris · City Walk','8月23日','巴黎城市漫步','自由安排','Hotel de Fleurie','Paris · Saint-Germain','街头生活与蓝调时刻','GR IV'],
4:['Paris → Geneva','8月24日','TGV Paris → Geneva','08:18 出发','Stay KooooK Geneva City','Geneva','日内瓦湖与城市抵达','Z8 24–120'],
5:['Geneva → Grindelwald','8月25日','GoldenPass 路线','经 Spiez','Eiger Lodge Easy','Grindelwald','图恩湖与列车窗景','Z8 24–120'],
6:['Grindelwald First','8月26日','First 缆车','山地日','Eiger Lodge Easy','Grindelwald','Bachalpsee 倒影','Z8 24–120'],
7:['Jungfraujoch · Lauterbrunnen','8月27日','少女峰 + 劳特布龙嫩','按天气决定是否登顶','Eiger Lodge Easy','Grindelwald','雪原、Wengen 与施陶河瀑布','Z8 24–120 / GR IV'],
8:['Grindelwald → Lucerne','8月28日','Luzern–Interlaken Express','景观列车','Lucerne hotel','Lucerne','湖岸与卡佩尔廊桥','GR IV'],
9:['Lucerne → Milan','8月29日','瑞士段 + Chiasso → Milano','跨境日','iQ Hotel Milano','Milan','米兰中央车站建筑','Z8 24–120'],
10:['Milan → Dolomites','8月30日','Milano → Bolzano','徒步团集合','Dolomites stay','Dolomites','山谷初见','Action 6 / Z8'],
11:['Dolomites','8月31日','徒步行程','跟团安排','Dolomites stay','Dolomites','岩壁与徒步纪实','Z8 24–120'],
12:['Dolomites','9月1日','徒步行程','跟团安排','Dolomites stay','Dolomites','高山光影','Z8 24–120'],
13:['Dolomites','9月2日','徒步行程','跟团安排','Dolomites stay','Dolomites','山径与人物环境照','Action 6 / Z8'],
14:['Tre Cime','9月3日','Tre Cime 徒步','摄影重点日','Dolomites stay','Dolomites','Tre Cime 黄金时刻','Z8 24–120'],
15:['Dolomites','9月4日','徒步行程','跟团安排','Dolomites stay','Dolomites','山屋与层叠山景','Z8 / GR IV'],
16:['Dolomites → Venice','9月5日','Cortina Express','17:30 左右抵达','Hotel Ai Due Fanali','Venice','威尼斯蓝调时刻','GR IV'],
17:['Venice → Florence','9月6日','Trenitalia → Firenze','上午班次','Hotel Davanzati','Florence','威尼斯清晨与佛罗伦萨街景','GR IV'],
18:['Florence','9月7日','城市与教堂','博物馆闭馆日调整','Hotel Davanzati','Florence','百花大教堂与街巷','Z8 24–120'],
19:['Florence → Rome','9月8日','高铁 → Roma','约 1.5 小时','Hotel Valeri','Rome','斗兽场与古罗马遗迹','Z8 24–120'],
20:['Vatican City','9月9日','梵蒂冈博物馆','预约日','Hotel Valeri','Rome','圣彼得广场与穹顶','Z8 24–120'],
21:['Rome → Home','9月10日','FCO 航班','18:45 起飞','—','返程日','罗马最后的晨光','GR IV']};
function applyDashboard(){const d=currentDay(),v=dashboard[d];$$('[data-today-day]').forEach(e=>e.textContent=d);$$('[data-continue]').forEach(e=>e.href=dayPaths[d]);const fill=$('[data-journey-fill]');if(fill)fill.style.width=(d/21*100)+'%';const map={'[data-current-city]':v[0],'[data-current-date]':v[1],'[data-next-ticket]':v[2],'[data-next-ticket-time]':v[3],'[data-tonight-hotel]':v[4],'[data-tonight-city]':v[5],'[data-photo-highlight]':v[6],'[data-photo-gear]':v[7]};Object.entries(map).forEach(([s,t])=>{const e=$(s);if(e)e.textContent=t});const photo=$('[data-photo-link]');if(photo)photo.href=dayPaths[d]+'#photo';const pill=$(`.day-pill[data-day="${d}"]`);if(pill)pill.classList.add('current')}
applyDashboard();
const bar=$('[data-scroll-progress]');function updateScroll(){if(!bar)return;const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%'}addEventListener('scroll',updateScroll,{passive:true});updateScroll();
document.addEventListener('keydown',e=>{const p=$('[data-prev]'),n=$('[data-next]');if(e.key==='ArrowLeft'&&p)location.href=p.href;if(e.key==='ArrowRight'&&n)location.href=n.href});let sx=0,sy=0;document.addEventListener('touchstart',e=>{sx=e.changedTouches[0].screenX;sy=e.changedTouches[0].screenY},{passive:true});document.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-sx,dy=e.changedTouches[0].screenY-sy;if(Math.abs(dx)>90&&Math.abs(dx)>Math.abs(dy)*1.5){const l=dx>0?$('[data-prev]'):$('[data-next]');if(l)location.href=l.href}},{passive:true});
const fab=$('.quick-fab'),qa=$('.quick-access');if(fab&&qa){fab.addEventListener('click',()=>{qa.classList.toggle('open');fab.setAttribute('aria-expanded',qa.classList.contains('open'))});document.addEventListener('click',e=>{if(!qa.contains(e.target))qa.classList.remove('open')})}
$$('[data-mode]').forEach(b=>b.addEventListener('click',()=>{$$('[data-mode]').forEach(x=>x.classList.remove('active'));$$('[data-panel]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const p=$(`[data-panel="${b.dataset.mode}"]`);if(p)p.classList.add('active')}));
$$('[data-check]').forEach(c=>{const key='nora-check-'+location.pathname+'-'+c.dataset.check;c.checked=localStorage.getItem(key)==='1';c.addEventListener('change',()=>localStorage.setItem(key,c.checked?'1':'0'))});
const tripCurrent=document.querySelector(`.trip-row[data-day="${currentDay()}"]`);if(tripCurrent)tripCurrent.classList.add('current');
