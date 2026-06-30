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
})();
