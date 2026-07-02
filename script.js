(function(){
  "use strict";

  /* ---------- Single-page router ---------- */
  var PAGES = ["home", "cars", "about", "contact"];

  function showPage(page){
    PAGES.forEach(function(p){
      var el = document.getElementById("page-" + p);
      if (el) el.classList.toggle("is-active", p === page);
    });
    document.querySelectorAll("[data-page]").forEach(function(link){
      link.classList.toggle("active", link.getAttribute("data-page") === page);
    });
    document.title = pageTitle(page);
    window.scrollTo(0, 0);
  }

  function pageTitle(page){
    switch(page){
      case "cars": return "Honda Cars Rock Hill | Luke Laliberte";
      case "about": return "About Luke | Honda Cars Rock Hill";
      case "contact": return "Contact Luke | Honda Cars Rock Hill";
      default: return "Luke Laliberte | Honda Cars Rock Hill";
    }
  }

  function route(){
    var raw = (window.location.hash || "").replace("#", "");
    if (PAGES.indexOf(raw) !== -1){
      showPage(raw);
    } else if (raw){
      var el = document.getElementById(raw);
      if (el && el.closest(".page.is-active")){
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      showPage("home");
    }
  }

  window.addEventListener("hashchange", route);
  route();

  /* ---------- Nav scroll state ---------- */
  var nav = document.querySelector(".site-nav");
  function updateNavState(){
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  updateNavState();
  window.addEventListener("scroll", updateNavState, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burger = document.querySelector(".nav-burger");
  var panel = document.querySelector(".mobile-panel");
  var ICON_MENU = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var ICON_CLOSE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

  if (burger && panel){
    burger.addEventListener("click", function(){
      var open = panel.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.innerHTML = open ? ICON_CLOSE : ICON_MENU;
    });
    panel.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        panel.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        burger.innerHTML = ICON_MENU;
      });
    });
  }

  /* ---------- Language toggle (EN / ES) ---------- */
  var STORAGE_KEY = "hondaRockHillLang";
  var savedLang = "en";
  try { savedLang = localStorage.getItem(STORAGE_KEY) || "en"; } catch(e) { savedLang = "en"; }

  function applyLang(lang){
    document.documentElement.setAttribute("lang", lang === "es" ? "es" : "en");
    document.querySelectorAll("[data-en]").forEach(function(el){
      var text = lang === "es" ? el.getAttribute("data-es") : el.getAttribute("data-en");
      if (text !== null && text !== undefined) el.textContent = text;
    });
    document.querySelectorAll("[data-en-html]").forEach(function(el){
      var text = lang === "es" ? el.getAttribute("data-es-html") : el.getAttribute("data-en-html");
      if (text !== null && text !== undefined) el.innerHTML = text;
    });
    document.querySelectorAll(".lang-toggle button").forEach(function(btn){
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch(e) {}
  }

  document.querySelectorAll(".lang-toggle button").forEach(function(btn){
    btn.addEventListener("click", function(){
      applyLang(btn.getAttribute("data-lang"));
    });
  });

  applyLang(savedLang);

})();
