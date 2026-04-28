function slider(images){
  const s=document.createElement("div");
  s.className="slider";
  const t=document.createElement("div");
  t.className="track";
  const d=document.createElement("div");
  d.className="dots";
  let i=0,x=0,auto;

  images.forEach((img,n)=>{
    t.innerHTML+=`<img src="${img}" loading="lazy">`;
    d.innerHTML+=`<span class="dot ${n===0?'on':''}"></span>`;
  });

  function update(){
    t.style.transform=`translateX(-${i*100}%)`;
    [...d.children].forEach((e,n)=>e.classList.toggle("on",n===i));
  }

  function start(){
    clearInterval(auto);
    auto=setInterval(()=>{i=(i+1)%images.length;update();},4000);
  }

  d.querySelectorAll(".dot").forEach((e,n)=>e.onclick=()=>{i=n;update();start();});

  s.onmousedown=e=>x=e.clientX;
  s.onmouseup=e=>{
    let m=e.clientX-x;
    if(m<-50)i=Math.min(i+1,images.length-1);
    if(m>50)i=Math.max(i-1,0);
    update();start();
  };

  s.ontouchstart=e=>x=e.touches[0].clientX;
  s.ontouchend=e=>{
    let m=e.changedTouches[0].clientX-x;
    if(m<-50)i=Math.min(i+1,images.length-1);
    if(m>50)i=Math.max(i-1,0);
    update();start();
  };

  s.append(t,d);
  start();
  return s;
}

function structured(p){
  const s=document.createElement("script");
  s.type="application/ld+json";
  s.textContent=JSON.stringify({
    "@context":"https://schema.org",
    "@type":"Product",
    name:p.name,
    description:p.desc,
    image:p.images.map(i=>location.origin+"/"+i),
    brand:{ "@type":"Brand", name:"Gadgetszzz" },
    url:location.href
  });
  document.head.appendChild(s);
}
