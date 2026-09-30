(function(){
  var WHATSAPP_NUMBER = '5571982663512'; 

  var header = document.getElementById('site-header');
  window.addEventListener('scroll', function(){ header.classList.toggle('scrolled', window.scrollY > 8); }, {passive:true});

  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('mobileMenu');
  toggle.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });
  menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ menu.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }); });

  function buildWaLink(msg){ return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg); }
  document.querySelectorAll('.whatsapp-link').forEach(function(a){ a.setAttribute('href', buildWaLink(a.dataset.msg)); });

  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.p-card');
  filterBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      filterBtns.forEach(function(b){ b.classList.remove('active'); });
      btn.classList.add('active');
      var f = btn.dataset.filter;
      cards.forEach(function(c){ c.classList.toggle('hidden', f !== 'todos' && c.dataset.category !== f); });
    });
  });

  var overlay = document.getElementById('modalOverlay');
  var mCat = document.getElementById('modalCat'), mTitle = document.getElementById('modalTitle'), mDesc = document.getElementById('modalDesc'), mWhats = document.getElementById('modalWhats'), mImg = document.getElementById('modalImg'), mPrice = document.getElementById('modalPrice');
  cards.forEach(function(card){
    card.addEventListener('click', function(){
      mCat.textContent = card.dataset.catLabel;
      mTitle.textContent = card.dataset.name;
      mDesc.textContent = card.dataset.desc;
      mPrice.textContent = card.dataset.price;
      var cardImg = card.querySelector('img');
      mImg.src = cardImg ? cardImg.src : '';
      mImg.alt = card.dataset.name;
      mWhats.setAttribute('href', buildWaLink('Olá! Tenho interesse na peça "' + card.dataset.name + '" (' + card.dataset.price + ') que vi no site da Brilho de Maria.'));
      overlay.classList.add('open');
    });
  });
  document.getElementById('modalClose').addEventListener('click', function(){ overlay.classList.remove('open'); });
  overlay.addEventListener('click', function(e){ if(e.target === overlay) overlay.classList.remove('open'); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') overlay.classList.remove('open'); });

  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){ entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold:.2});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else { document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); }); }
})();