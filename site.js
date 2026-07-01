/* ─────────────────────────────────────────────────────────────
   Single source of truth for the contact address.
   To change the email everywhere, edit this ONE line:
   ───────────────────────────────────────────────────────────── */
var CONTACT_EMAIL = 'support@vouch.com';


(function () {
  function mailto(subject, body) {
    var q = [];
    if (subject) q.push('subject=' + encodeURIComponent(subject));
    if (body) q.push('body=' + encodeURIComponent(body));
    return 'mailto:' + CONTACT_EMAIL + (q.length ? '?' + q.join('&') : '');
  }

  // Build every contact link from its data-subject: <a data-mail data-subject="...">
  document.querySelectorAll('a[data-mail]').forEach(function (a) {
    a.href = mailto(a.getAttribute('data-subject') || '');
  });

  // Fill any element that should display the address: <span data-contact></span>
  document.querySelectorAll('[data-contact]').forEach(function (el) {
    el.textContent = CONTACT_EMAIL;
  });

  // Waitlist button: prefill the email body with the address the visitor typed.
  var wait = document.querySelector('a[data-waitlist]');
  if (wait) {
    wait.addEventListener('click', function () {
      var input = document.getElementById('waitemail');
      var v = input && input.value;
      wait.href = mailto(wait.getAttribute('data-subject') || '', v ? 'My email: ' + v : '');
    });
  }

  // Sticky-nav hairline on scroll.
  var nav = document.getElementById('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('stuck', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Demo consent toggles (visual only): click / space / enter flips the switch.
  document.querySelectorAll('.switch').forEach(function (sw) {
    sw.style.cursor = 'pointer';
    sw.setAttribute('role', 'switch');
    sw.setAttribute('tabindex', '0');
    var sync = function () { sw.setAttribute('aria-checked', sw.classList.contains('off') ? 'false' : 'true'); };
    var toggle = function () { sw.classList.toggle('off'); sync(); };
    sync();
    sw.addEventListener('click', toggle);
    sw.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    });
  });
})();
