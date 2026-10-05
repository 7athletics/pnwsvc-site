// PNW SVC: small progressive enhancements. The site works without JS.
(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");

  // header shadow after scrolling
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // mobile nav
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // expand / collapse all accordions in a group
  document.querySelectorAll("[data-acc-all]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = document.getElementById(btn.dataset.accAll);
      const items = group ? group.querySelectorAll("details") : [];
      const anyClosed = [...items].some((d) => !d.open);
      items.forEach((d) => (d.open = anyClosed));
      btn.textContent = anyClosed ? "Collapse all" : "Expand all";
    });
  });

  // open the accordion a URL hash points at (e.g. /tournament-info/#payment)
  const openHash = () => {
    if (!location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el && el.tagName === "DETAILS") el.open = true;
  };
  openHash();
  window.addEventListener("hashchange", openHash);

  // reveal on scroll
  const els = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add("in"));
  }
  root.classList.add("js");
})();
