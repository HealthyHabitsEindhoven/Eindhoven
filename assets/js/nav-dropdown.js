document.addEventListener('DOMContentLoaded', function(){
  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
  if (isHome) return;

  const accordions = document.querySelectorAll('.mobile-accordion');
  if (!accordions.length) return;

  const MOBILE_BREAKPOINT = 768;

  accordions.forEach(function(accordion){
    const toggle = accordion.querySelector('.accordion-toggle');
    const panel = accordion.querySelector('.accordion-panel');
    if (!toggle || !panel) return;

    function setState(open){
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.classList.toggle('is-open', open);
    }

    function toggleState(){
      const open = toggle.getAttribute('aria-expanded') === 'true';
      setState(!open);
    }

    toggle.addEventListener('click', function(e){
      if (window.innerWidth > MOBILE_BREAKPOINT) return;
      e.stopPropagation();
      toggleState();
    });

    window.addEventListener('resize', function(){
      if (window.innerWidth > MOBILE_BREAKPOINT){
        setState(false);
      }
    });
  });
});
