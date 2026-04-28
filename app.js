function slider(images){
  const s=document.createElement("div");
  s.className="slider";
  const track=document.createElement("div");
  track.className="track";
  const dots=document.createElement("div");
  dots.className="dots";
  let i=0,start=0,timer;

  images.forEach((img,n)=>{
    track.innerHTML+=`<img src="${img}" loading="lazy">`;
    dots.innerHTML+=`<span class="dot ${n===0?'on':''}"></span>`;
  });

  function update(){
    track.style.transform=`translateX(-${i*100}%)`;
    dots.querySelectorAll(".dot").forEach((d,n)=>d.classList.toggle("on",n===i));
  }

  function auto(){
    clearInterval(timer);
    timer=setInterval(()=>{i=(i+1)%images.length;update();},4000);
  }

  dots.querySelectorAll(".dot").forEach((d,n)=>{
    d.onclick=()=>{i=n;update();auto();}
  });

  s.onmousedown=e=>start=e.clientX;
  s.onmouseup=e=>{
    let d=e.clientX-start;
    if(d<-50)i=Math.min(i+1,images.length-1);
    if(d>50)i=Math.max(i-1,0);
    update();auto();
  };

  s.ontouchstart=e=>start=e.touches[0].clientX;
  s.ontouchend=e=>{
    let d=e.changedTouches[0].clientX-start;
    if(d<-50)i=Math.min(i+1,images.length-1);
    if(d>50)i=Math.max(i-1,0);
    update();auto();
  };

  s.append(track,dots);
  auto();
  return s;
}

function structured(p){
  const json={
    "@context":"https://schema.org",
    "@type":"Product",
    name:p.name,
    description:p.desc,
    image:p.images.map(i=>location.origin+"/"+i),
    brand:{ "@type":"Brand", name:"Gadgetszzz" },
    url:location.href
  };
  const s=document.createElement("script");
  s.type="application/ld+json";
  s.textContent=JSON.stringify(json);
  document.head.appendChild(s);
}
