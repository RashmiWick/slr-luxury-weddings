/* =====================================================
   SLR LUXURY WEDDINGS — SETTINGS (EDIT THIS PART ONLY)
   ===================================================== */
const CONFIG = {
  businessName: "SLR LUXURY WEDDINGS",
  whatsapp: "94771234567",            // country code + number, NO + or 0 at start (e.g. 94771234567)
  phoneDisplay: "+94 77 123 4567",
  email: "info@slrluxuryweddings.lk",
  address: "Colombo, Sri Lanka",
  currency: "LKR",
  social: [
    { name: "Facebook",  url: "https://facebook.com/yourpage" },
    { name: "Instagram", url: "https://instagram.com/yourpage" },
    { name: "TikTok",    url: "https://tiktok.com/@yourpage" },
    { name: "YouTube",   url: "https://youtube.com/@yourpage" }
  ]
};

// Put each car's photos in the /images folder and update the paths below.
const VEHICLES = [
  { id:1, name:"Mercedes-Benz S-Class", cat:"Luxury Sedan", price:65000, seats:4, ac:true, tag:"Best Seller",
    desc:"The ultimate wedding statement — spacious leather interior, smooth ride and unmatched elegance.",
    features:["Full flower decoration","Professional chauffeur","Bridal ribbon & stands","Red carpet on request","8 hours / 100 km"],
    imgs:["images/cars/s-class-1.jpg","images/cars/s-class-2.jpg","images/cars/s-class-3.jpg"] },
  { id:2, name:"BMW 7 Series", cat:"Luxury Sedan", price:55000, seats:4, ac:true, tag:"",
    desc:"Sporty luxury with a commanding presence — perfect for the modern couple.",
    features:["Full flower decoration","Professional chauffeur","Bridal ribbon","8 hours / 100 km"],
    imgs:["images/cars/bmw7-1.jpg","images/cars/bmw7-2.jpg"] },
  { id:3, name:"Audi A6", cat:"Luxury Sedan", price:45000, seats:4, ac:true, tag:"",
    desc:"Sleek, modern and refined. A stylish choice at a smart price.",
    features:["Flower decoration","Professional chauffeur","Bridal ribbon","8 hours / 100 km"],
    imgs:["images/cars/audi-a6-1.jpg"] },
  { id:4, name:"Rolls-Royce Style Classic", cat:"Vintage", price:95000, seats:4, ac:false, tag:"Premium",
    desc:"A timeless vintage beauty that turns every arrival into a royal procession.",
    features:["Full vintage decoration","Uniformed chauffeur","Photo-shoot time included","8 hours / 100 km"],
    imgs:["images/cars/vintage-1.jpg","images/cars/vintage-2.jpg"] },
  { id:5, name:"Classic Morris Oxford", cat:"Vintage", price:40000, seats:4, ac:false, tag:"",
    desc:"A charming Sri Lankan classic — great for traditional and retro-themed weddings.",
    features:["Flower decoration","Chauffeur included","Great for photos","8 hours / 100 km"],
    imgs:["images/cars/morris-1.jpg"] },
  { id:6, name:"Range Rover Vogue", cat:"SUV", price:70000, seats:5, ac:true, tag:"Popular",
    desc:"Bold luxury SUV — commanding road presence and a grand entrance.",
    features:["Full flower decoration","Professional chauffeur","Bridal ribbon","8 hours / 100 km"],
    imgs:["images/cars/rangerover-1.jpg","images/cars/rangerover-2.jpg"] },
  { id:7, name:"Toyota Land Cruiser Prado", cat:"SUV", price:42000, seats:6, ac:true, tag:"",
    desc:"Spacious and comfortable with plenty of room for the bridal party.",
    features:["Flower decoration","Professional chauffeur","8 hours / 100 km"],
    imgs:["images/cars/prado-1.jpg"] },
  { id:8, name:"Toyota Alphard", cat:"Luxury Van", price:38000, seats:7, ac:true, tag:"",
    desc:"Premium comfort for family members and the bridal party, all in one vehicle.",
    features:["Ribbon decoration","Professional chauffeur","Ideal for family","8 hours / 100 km"],
    imgs:["images/cars/alphard-1.jpg"] },
  { id:9, name:"Stretch Limousine", cat:"Limousine", price:120000, seats:8, ac:true, tag:"Luxury",
    desc:"Make a spectacular entrance with our stretch limousine and lounge-style interior.",
    features:["Full decoration","Uniformed chauffeur","Mood lighting","Photo-shoot time included","8 hours / 100 km"],
    imgs:["images/cars/limo-1.jpg","images/cars/limo-2.jpg"] }
];

const PACKAGES = [
  { name:"Classic", price:45000, pop:false, items:["1 Luxury car","Flower decoration","Professional chauffeur","6 hours / 80 km"] },
  { name:"Royal",   price:95000, pop:true,  items:["2 Luxury cars (bridal + groom)","Full flower decoration","Uniformed chauffeurs","8 hours / 120 km","Photo-shoot time"] },
  { name:"Grand",   price:180000,pop:false, items:["3 cars incl. Vintage / Limousine","Premium decoration","Red carpet & ribbons","Full day service","Dedicated coordinator"] }
];

const GALLERY = Array.from({length:8},(_,i)=>`images/gallery/${i+1}.jpg`);

const REVIEWS = [
  { name:"Nimali & Kasun", text:"Our vintage car was absolutely stunning and the driver was so professional. Highly recommended!" },
  { name:"Dilshan & Sachini", text:"Everything was on time and the car decoration was exactly what we wanted. Thank you SLR!" },
  { name:"Ruwan & Tharushi", text:"Amazing service and fair pricing. The WhatsApp booking was very easy and quick." }
];

const FAQS = [
  { q:"How do I book a car?", a:"Choose your vehicle, fill in the booking form and your enquiry will open in WhatsApp. We confirm availability and share the final quote quickly." },
  { q:"How much advance payment is required?", a:"A small advance payment is needed to reserve your date. The balance is paid on the wedding day." },
  { q:"Are decorations included?", a:"Yes — basic flower and ribbon decoration is included. Custom themes can be arranged on request." },
  { q:"Do you provide service outside Colombo?", a:"Yes, we serve the whole island. Additional distance charges may apply." },
  { q:"Can I see the car before the wedding?", a:"Of course. Contact us on WhatsApp and we will arrange a viewing." },
  { q:"What if I need extra hours?", a:"Extra hours can be added at a small hourly rate — just let us know in advance." }
];

/* =====================================================
   APP CODE
   ===================================================== */
const $  = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const fmt = n => `${CONFIG.currency} ${n.toLocaleString("en-US")}`;
const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

// Image with graceful fallback
function img(src, alt, label){
  const el = document.createElement("img");
  el.src = src; el.alt = alt; el.loading = "lazy";
  el.onerror = () => { el.remove(); };
  return el;
}

/* ---------- Fleet ---------- */
let activeCat = "All";
function renderFilters(){
  const cats = ["All", ...new Set(VEHICLES.map(v=>v.cat))];
  $("#filters").innerHTML = cats.map(c=>`<button class="chip ${c===activeCat?'active':''}" data-cat="${c}">${c}</button>`).join("");
  $$("#filters .chip").forEach(b=>b.onclick=()=>{ activeCat=b.dataset.cat; renderFilters(); renderFleet(); });
}
function renderFleet(){
  const list = VEHICLES.filter(v=>activeCat==="All"||v.cat===activeCat);
  const grid = $("#fleetGrid"); grid.innerHTML="";
  if(!list.length){ grid.innerHTML='<p class="empty">No vehicles in this category.</p>'; return; }
  list.forEach(v=>{
    const card = document.createElement("article");
    card.className = "car reveal";
    card.innerHTML = `
      <div class="car-img" data-id="${v.id}">
        <div class="ph">${v.name}</div>
        ${v.tag?`<span class="badge">${v.tag}</span>`:""}
      </div>
      <div class="car-body">
        <h3>${v.name}</h3>
        <div class="meta"><span>🚗 ${v.cat}</span><span>👥 ${v.seats} seats</span><span>${v.ac?"❄️ A/C":"🌿 Classic"}</span></div>
        <div class="price">${fmt(v.price)} <small>/ wedding day</small></div>
        <div class="car-actions">
          <button class="btn btn-outline" data-view="${v.id}">View Details</button>
          <button class="btn btn-gold" data-book="${v.id}">Book Now</button>
        </div>
      </div>`;
    $(".car-img",card).prepend(img(v.imgs[0], v.name));
    grid.appendChild(card);
  });
  $$("#fleetGrid [data-view], #fleetGrid .car-img").forEach(el=>el.onclick=()=>openModal(+(el.dataset.view||el.dataset.id)));
  $$("#fleetGrid [data-book]").forEach(el=>el.onclick=()=>chooseCar(+el.dataset.book));
  observeReveal();
}

/* ---------- Modal ---------- */
function openModal(id){
  const v = VEHICLES.find(x=>x.id===id);
  const body = $("#modalBody");
  body.innerHTML = `
    <div class="m-grid">
      <div class="m-gal">
        <div class="m-main" id="mMain"><div class="ph">${v.name}</div></div>
        <div class="m-thumbs" id="mThumbs"></div>
      </div>
      <div class="m-info">
        <span class="badge" style="position:static;display:inline-block">${v.cat}</span>
        <h2>${v.name}</h2>
        <div class="price">${fmt(v.price)} <small>/ wedding day</small></div>
        <p>${v.desc}</p>
        <ul>${v.features.map(f=>`<li>${f}</li>`).join("")}<li>${v.seats} passenger seats</li></ul>
        <div class="car-actions">
          <button class="btn btn-gold" id="mBook">Book This Car</button>
          <a class="btn btn-wa" target="_blank" rel="noopener" href="${waLink(`Hello ${CONFIG.businessName}, I'm interested in the ${v.name}. Is it available for my wedding?`)}">Ask on WhatsApp</a>
        </div>
      </div>
    </div>`;
  const main = $("#mMain"), thumbs = $("#mThumbs");
  const show = (src,i)=>{ $("img",main)?.remove(); main.prepend(img(src,v.name)); $$("div",thumbs).forEach((d,k)=>d.classList.toggle("on",k===i)); };
  v.imgs.forEach((src,i)=>{ const d=document.createElement("div"); d.appendChild(img(src,v.name)); d.onclick=()=>show(src,i); thumbs.appendChild(d); });
  show(v.imgs[0],0);
  $("#mBook").onclick=()=>{ closeModal(); chooseCar(id); };
  $("#modal").classList.add("open"); document.body.style.overflow="hidden";
}
function closeModal(){ $("#modal").classList.remove("open"); document.body.style.overflow=""; }
$("#modalX").onclick = closeModal;
$("#modal").onclick = e => { if(e.target.id==="modal") closeModal(); };
document.addEventListener("keydown", e => { if(e.key==="Escape") closeModal(); });

/* ---------- Packages ---------- */
function renderPackages(){
  $("#pkgGrid").innerHTML = PACKAGES.map(p=>`
    <div class="pkg ${p.pop?'pop':''} reveal">
      <h3>${p.name}</h3>
      <div class="pp">${fmt(p.price)}</div>
      <ul>${p.items.map(i=>`<li>${i}</li>`).join("")}</ul>
      <button class="btn ${p.pop?'btn-gold':'btn-outline'}" data-pkg="${p.name}">Choose ${p.name}</button>
    </div>`).join("");
  $$("[data-pkg]").forEach(b=>b.onclick=()=>{ $("#fPkg").value=b.dataset.pkg; $("#book").scrollIntoView({behavior:"smooth"}); });
}

/* ---------- Gallery ---------- */
function renderGallery(){
  const g = $("#galleryGrid");
  GALLERY.forEach((src,i)=>{
    const d=document.createElement("div"); d.className="g-item reveal";
    d.appendChild(img(src,`Wedding ${i+1}`));
    d.onclick=()=>{ if(!$("img",d)) return; $("#modalBody").innerHTML=`<img src="${src}" alt="" style="width:100%;display:block">`; $("#modal").classList.add("open"); document.body.style.overflow="hidden"; };
    g.appendChild(d);
  });
}

/* ---------- Reviews / FAQ / Contact ---------- */
function renderReviews(){
  $("#reviewGrid").innerHTML = REVIEWS.map(r=>`
    <div class="review reveal"><div class="stars">★★★★★</div><p>“${r.text}”</p><strong>— ${r.name}</strong></div>`).join("");
}
function renderFaq(){
  $("#faqList").innerHTML = FAQS.map(f=>`
    <div class="faq-item"><button class="faq-q">${f.q}</button><div class="faq-a"><p>${f.a}</p></div></div>`).join("");
  $$(".faq-q").forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("open"));
}
function renderContact(){
  $("#cPhone").innerHTML = `<a href="tel:+${CONFIG.whatsapp}">${CONFIG.phoneDisplay}</a>`;
  $("#cMail").innerHTML  = `<a href="mailto:${CONFIG.email}">${CONFIG.email}</a>`;
  $("#cAddr").textContent = CONFIG.address;
  $("#social").innerHTML = CONFIG.social.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${s.name}</a>`).join("");
  $("#waFloat").href = waLink(`Hello ${CONFIG.businessName}, I would like to know about your wedding car hire.`);
  $("#yr").textContent = new Date().getFullYear();
}

/* ---------- Booking form → WhatsApp ---------- */
function fillSelects(){
  $("#fCar").innerHTML = '<option value="">Select a vehicle</option>' + VEHICLES.map(v=>`<option value="${v.id}">${v.name} — ${fmt(v.price)}</option>`).join("");
  $("#fPkg").innerHTML = '<option value="">No package (single car)</option>' + PACKAGES.map(p=>`<option>${p.name}</option>`).join("");
  $("#fDate").min = new Date().toISOString().split("T")[0];
}
function chooseCar(id){ $("#fCar").value = id; $("#book").scrollIntoView({behavior:"smooth"}); }

$("#bookForm").addEventListener("submit", e=>{
  e.preventDefault();
  const val = id => $(id).value.trim();
  const car = VEHICLES.find(v=>v.id==val("#fCar"));
  const err = $("#formErr");
  if(!val("#fName")||!val("#fPhone")||!val("#fDate")||!car||!val("#fPickup")||!val("#fVenue")){
    err.textContent = "Please fill in all required (*) fields."; return;
  }
  if(!/^[0-9+\s-]{9,15}$/.test(val("#fPhone"))){ err.textContent="Please enter a valid phone number."; return; }
  err.textContent = "";
  const msg =
`*New Wedding Car Enquiry*
━━━━━━━━━━━━━━
👤 Name: ${val("#fName")}
📞 Phone: ${val("#fPhone")}
📅 Wedding Date: ${val("#fDate")}
⏰ Pick-up Time: ${val("#fTime")||"Not specified"}
🚘 Vehicle: ${car.name} (${fmt(car.price)})
📦 Package: ${val("#fPkg")||"None"}
📍 Pick-up: ${val("#fPickup")}
🏛️ Venue: ${val("#fVenue")}
📝 Notes: ${val("#fNote")||"-"}`;
  window.open(waLink(msg), "_blank");
});

/* ---------- UI helpers ---------- */
window.addEventListener("scroll", ()=> $("#nav").classList.toggle("scrolled", scrollY>40));
$("#burger").onclick = ()=> $("#menu").classList.toggle("open");
$$("#menu a").forEach(a=>a.onclick=()=>$("#menu").classList.remove("open"));

function observeReveal(){
  const io = new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("show"); io.unobserve(en.target); } }),{threshold:.12});
  $$(".reveal:not(.show)").forEach(el=>io.observe(el));
}
function countUp(){
  const io = new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting) return;
    const el=en.target, end=+el.dataset.count; let n=0; const step=Math.max(1,Math.ceil(end/60));
    const t=setInterval(()=>{ n=Math.min(end,n+step); el.textContent=n; if(n>=end) clearInterval(t); },25);
    io.unobserve(el);
  }),{threshold:.5});
  $$("[data-count]").forEach(el=>io.observe(el));
}

/* ---------- Init ---------- */
renderFilters(); renderFleet(); renderPackages(); renderGallery();
renderReviews(); renderFaq(); renderContact(); fillSelects();
observeReveal(); countUp();