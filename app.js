function slider(images){
  const s=document.createElement("div");
  s.className="slider";

  const slides=document.createElement("div");
  slides.className="slides";

  const dots=document.createElement("div");
  dots.className="dots";

  let i=0,x=0,auto;

  images.forEach((img,idx)=>{
    slides.innerHTML+=`<img src="${img}" loading="lazy">`;
    dots.innerHTML+=`<span class="dot ${idx==0?'active':''}"></span>`;
  });

  s.append(slides,dots);

  function update(){
    slides.style.transform=`translateX(-${i*100}%)`;
    [...dots.children].forEach((d,idx)=>d.classList.toggle("active",idx===i));
  }

  function next(){
    i=(i+1)%images.length;
    update();
  }

  function reset(){
    clearInterval(auto);
    auto=setInterval(next,4000);
  }

  dots.querySelectorAll(".dot").forEach((d,idx)=>{
    d.onclick=()=>{i=idx;update();reset();}
  });

  s.onmousedown=e=>x=e.clientX;
  s.onmouseup=e=>{
    let d=e.clientX-x;
    if(d<-50)i=Math.min(i+1,images.length-1);
    if(d>50)i=Math.max(i-1,0);
    update();reset();
  };

  s.ontouchstart=e=>x=e.touches[0].clientX;
  s.ontouchend=e=>{
    let d=e.changedTouches[0].clientX-x;
    if(d<-50)i=Math.min(i+1,images.length-1);
    if(d>50)i=Math.max(i-1,0);
    update();reset();
  };

  reset();
  return s;
}

/* STRUCTURED DATA (AUTO, NO PRICE) */
function injectStructuredData(product){
  const data={
    "@context":"https://schema.org",
    "@type":"Product",
    name:product.name,
    description:product.desc,
    image:product.images.map(i=>location.origin+"/"+i),
    brand:{ "@type":"Brand", name:"Gadgetszzz" },
    url:location.href
  };

  const script=document.createElement("script");
  script.type="application/ld+json";
  script.textContent=JSON.stringify(data);
  document.head.append(script);
}
