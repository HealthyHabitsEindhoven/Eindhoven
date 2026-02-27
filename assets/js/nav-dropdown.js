document.addEventListener('DOMContentLoaded', function(){
  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
  if (isHome) return;

  const accordions = document.querySelectorAll('.mobile-accordion');
  if (!accordions.length) return;

  const MOBILE_BREAKPOINT = 768;

  accordions.forEach(function(accordion){
    const toggle = accordion.querySelector('.accordion-toggle');
    const panel = accordion.querySelector('.accordion-panel');
    const label = accordion.querySelector('.mobile-accordion__label');
    if (!toggle || !panel || !label) return;

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
      e.preventDefault();
      e.stopPropagation();
      toggleState();
    });

    label.addEventListener('click', function(e){
      if (window.innerWidth > MOBILE_BREAKPOINT) return;
      e.preventDefault();
      toggleState();
    });

    window.addEventListener('resize', function(){
      if (window.innerWidth > MOBILE_BREAKPOINT){
        setState(false);
      }
    });
  });
});
