/* Sinov Maydoni — brauzer tomoni skriptlari (kutubxonalarsiz) */
(function () {
  "use strict";

  var csrfMeta = document.querySelector('meta[name="csrf-token"]');
  var CSRF = csrfMeta ? csrfMeta.content : "";
  var LETTERS = ["A", "B", "C", "D"];

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function postJSON(url, body) {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": CSRF },
      body: JSON.stringify(body),
      credentials: "same-origin"
    }).then(function (r) {
      return r.json().then(function (data) { return { status: r.status, data: data }; });
    });
  }

  /* ---------- Umumiy: menyu, tasdiqlash, chop etish, havola nusxalash ---------- */
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        var old = btn.textContent;
        btn.textContent = "Nusxalandi ✓";
        setTimeout(function () { btn.textContent = old; }, 1800);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done).catch(done);
      else done();
    });
  });
  var navToggle = document.querySelector("[data-nav-toggle]");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var nav = document.getElementById("site-nav");
      var open = nav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.addEventListener("submit", function (e) {
    var msg = e.target.getAttribute && e.target.getAttribute("data-confirm");
    if (msg && !window.confirm(msg)) e.preventDefault();
  });
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("button[data-confirm]");
    if (btn && !window.confirm(btn.getAttribute("data-confirm"))) e.preventDefault();
    if (e.target.closest && e.target.closest("[data-print]")) window.print();
  });
  document.querySelectorAll("[data-autosubmit]").forEach(function (s) {
    s.addEventListener("change", function () { s.form.submit(); });
  });

  /* ---------- Kunduzgi / tungi rejim ---------- */
  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try { localStorage.setItem("sm-theme", next); } catch (e) {}
    });
  }

  /* ---------- Ochiladigan menyular: qo'ng'iroqcha, foydalanuvchi ---------- */
  var dropdowns = document.querySelectorAll("[data-dropdown]");
  if (dropdowns.length) {
    dropdowns.forEach(function (dd) {
      var toggle = dd.querySelector("[data-dropdown-toggle]");
      if (!toggle) return;
      toggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var willOpen = !dd.classList.contains("open");
        dropdowns.forEach(function (o) { o.classList.remove("open"); o.querySelector("[data-dropdown-toggle]").setAttribute("aria-expanded", "false"); });
        if (willOpen) { dd.classList.add("open"); toggle.setAttribute("aria-expanded", "true"); }
      });
    });
    document.addEventListener("click", function () {
      dropdowns.forEach(function (o) { o.classList.remove("open"); o.querySelector("[data-dropdown-toggle]").setAttribute("aria-expanded", "false"); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") dropdowns.forEach(function (o) { o.classList.remove("open"); o.querySelector("[data-dropdown-toggle]").setAttribute("aria-expanded", "false"); });
    });
  }

  /* ---------- Til almashtirgich: UZ / RU / ЎЗ (lotin, rus, kirill) ---------- */
  var I18N = {
    "nav.tests": { ru: "Тесты", kir: "Тестлар" },
    "nav.ai": { ru: "AI Учитель", kir: "AI Устоз" },
    "nav.dtm": { ru: "Симуляция ДТМ", kir: "ДТМ симуляцияси" },
    "nav.milliy": { ru: "Нац. сертификат", kir: "Миллий сертификат" },
    "nav.leaderboard": { ru: "Рейтинг", kir: "Рейтинг" },
    "nav.news": { ru: "Новости", kir: "Янгиликлар" },
    "nav.about": { ru: "О нас", kir: "Биз ҳақимизда" },
    "nav.contact": { ru: "Контакты", kir: "Алоқа" },
    "nav.login": { ru: "Войти", kir: "Кириш" },
    "nav.register": { ru: "Регистрация", kir: "Рўйхатдан ўтиш" },
    "user.profile": { ru: "Профиль", kir: "Профил" },
    "user.settings": { ru: "Настройки", kir: "Созламалар" },
    "user.admin": { ru: "Админ-панель", kir: "Админ панел" },
    "user.logout": { ru: "Выйти", kir: "Чиқиш" },
    "bell.title": { ru: "Последние новости", kir: "Сўнгги янгиликлар" },
    "bell.empty": { ru: "Пока новостей нет.", kir: "Ҳозирча янгиликлар йўқ." },
    "bell.all": { ru: "Все новости", kir: "Барча янгиликлар" },
    "footer.platform": { ru: "Платформа", kir: "Платформа" },
    "footer.all_tests": { ru: "Все тесты", kir: "Барча тестлар" },
    "footer.info": { ru: "Информация", kir: "Маълумот" },
    "footer.faq": { ru: "Вопрос-ответ", kir: "Савол-жавоб" },
    "footer.contact": { ru: "Контакты", kir: "Боғланиш" },
    "footer.rights": { ru: "Все права защищены.", kir: "Барча ҳуқуқлар ҳимояланган." },
    "banner.days": { ru: " дн.", kir: " кун" },
    "banner.hours": { ru: " ч.", kir: " соат" }
  };
  // Lotin-kirill o'girish jadvali — banner kabi admin kiritgan erkin matnlar uchun.
  var LAT2KIR = [
    [/sh/gi, "ш"], [/ch/gi, "ч"], [/yo/gi, "ё"], [/yu/gi, "ю"], [/ya/gi, "я"],
    [/o‘|o'/gi, "ў"], [/g‘|g'/gi, "ғ"], [/ts/gi, "ц"],
    [/a/gi, "а"], [/b/gi, "б"], [/d/gi, "д"], [/e/gi, "е"], [/f/gi, "ф"], [/g/gi, "г"],
    [/h/gi, "ҳ"], [/i/gi, "и"], [/j/gi, "ж"], [/k/gi, "к"], [/l/gi, "л"], [/m/gi, "м"],
    [/n/gi, "н"], [/o/gi, "о"], [/p/gi, "п"], [/q/gi, "қ"], [/r/gi, "р"], [/s/gi, "с"],
    [/t/gi, "т"], [/u/gi, "у"], [/v/gi, "в"], [/x/gi, "х"], [/y/gi, "й"], [/z/gi, "з"]
  ];
  function toKir(text) {
    var out = text;
    LAT2KIR.forEach(function (pair) { out = out.replace(pair[0], pair[1]); });
    return out;
  }

  var langSwitch = document.querySelector("[data-lang-switch]");
  var i18nEls = document.querySelectorAll("[data-i18n]");
  var i18nLiteralEls = document.querySelectorAll("[data-i18n-literal]");
  i18nEls.forEach(function (n) { n.dataset.i18nUz = n.textContent; });
  i18nLiteralEls.forEach(function (n) { n.dataset.i18nUz = n.getAttribute("data-i18n-literal") || n.textContent; });

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang === "ru" ? "ru" : "uz");
    i18nEls.forEach(function (n) {
      var key = n.getAttribute("data-i18n"), entry = I18N[key];
      if (lang === "uz" || !entry) { n.textContent = n.dataset.i18nUz; return; }
      n.textContent = lang === "ru" ? entry.ru : entry.kir;
    });
    i18nLiteralEls.forEach(function (n) {
      var src = n.dataset.i18nUz;
      n.textContent = lang === "kir" ? toKir(src) : src;
    });
    if (langSwitch) {
      langSwitch.querySelectorAll("button").forEach(function (b) {
        b.setAttribute("aria-pressed", b.getAttribute("data-lang") === lang ? "true" : "false");
      });
    }
  }
  if (langSwitch) {
    var savedLang = "uz";
    try { savedLang = localStorage.getItem("sm-lang") || "uz"; } catch (e) {}
    applyLang(savedLang);
    langSwitch.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-lang]");
      if (!b) return;
      var lang = b.getAttribute("data-lang");
      applyLang(lang);
      try { localStorage.setItem("sm-lang", lang); } catch (err) {}
    });
  }

  /* ---------- E'lon banneri: hisoblagich va yopish ---------- */
  var banner = document.querySelector("[data-banner]");
  if (banner) {
    var key = "sm-banner-" + (banner.getAttribute("data-banner-key") || "");
    var closed = false;
    try { closed = localStorage.getItem(key) === "1"; } catch (e) {}
    if (closed) banner.classList.add("is-hidden");
    var closeBtn = banner.querySelector("[data-banner-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        banner.classList.add("is-hidden");
        try { localStorage.setItem(key, "1"); } catch (err) {}
      });
    }
    var cd = banner.querySelector("[data-countdown]");
    if (cd) {
      var target = new Date(cd.getAttribute("data-countdown") + "T23:59:59").getTime();
      var dEl = cd.querySelector('[data-cd="d"]'), hEl = cd.querySelector('[data-cd="h"]');
      var tickCd = function () {
        var diff = target - Date.now();
        if (diff <= 0) { cd.hidden = true; return; }
        dEl.textContent = Math.floor(diff / 86400000);
        hEl.textContent = Math.floor((diff % 86400000) / 3600000);
      };
      tickCd();
      setInterval(tickCd, 60000);
    }
  }

  /* ---------- AI Ustoz: chat ---------- */
  var chatForm = document.getElementById("chat-form");
  if (chatForm) {
    var chatLog = document.getElementById("chat-log"), chatInput = document.getElementById("chat-input");
    var chatSend = document.getElementById("chat-send"), chatStatus = document.getElementById("chat-status");
    var chatUrl = chatForm.getAttribute("data-url");

    function scrollChat() { chatLog.scrollTop = chatLog.scrollHeight; }
   function renderExistingMarkdown() {
  if (typeof marked === "undefined") return;

  var bubbles = chatLog.querySelectorAll(".chat-assistant .chat-bubble");

  bubbles.forEach(function (bubble) {
    if (bubble.classList.contains("chat-typing")) return;

    // Avval saqlangan original Markdownni olamiz
    var markdown = bubble.dataset.markdown || bubble.textContent || "";

    if (!markdown.trim()) return;

    // Keyingi renderlarda original Markdown yo'qolib ketmasin
    bubble.dataset.markdown = markdown;

    var html = marked.parse(markdown);

    if (typeof DOMPurify !== "undefined") {
      bubble.innerHTML = DOMPurify.sanitize(html);
    } else {
      bubble.innerHTML = html;
    }
  });
}
  function addBubble(role, text) {
  var empty = chatLog.querySelector(".chat-empty");
  if (empty) empty.remove();

  var row = el("div", {
    class: "chat-msg chat-" + role
  });

  var bubble = el("div", {
    class: "chat-bubble"
  });

  text = text || "";

  // Original Markdownni alohida saqlab qo'yamiz.
  // Bu juda muhim: keyinchalik innerHTML o'zgarsa ham
  // Markdownning o'zi yo'qolmaydi.
  if (role === "assistant") {
    bubble.dataset.markdown = text;

    if (typeof marked !== "undefined") {
      var html = marked.parse(text);

      if (typeof DOMPurify !== "undefined") {
        bubble.innerHTML = DOMPurify.sanitize(html);
      } else {
        bubble.innerHTML = html;
      }
    } else {
      bubble.textContent = text;
    }
  } else {
    // User xabari oddiy text
    bubble.textContent = text;
  }

  row.appendChild(bubble);
  chatLog.appendChild(row);

  scrollChat();

  return row;
}
    function addTyping() {
      var row = el("div", { class: "chat-msg chat-assistant" });
      var bubble = el("div", { class: "chat-bubble chat-typing" });
      bubble.innerHTML = "<span></span><span></span><span></span>";
      row.appendChild(bubble);
      chatLog.appendChild(row);
      scrollChat();
      return row;
    }
    scrollChat();
    chatInput.addEventListener("input", function () {
      chatInput.style.height = "auto";
      chatInput.style.height = Math.min(140, chatInput.scrollHeight) + "px";
    });
    chatForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = chatInput.value.trim();
      if (!text || chatSend.disabled) return;
      addBubble("user", text);
      chatInput.value = "";
      chatInput.style.height = "auto";
      chatSend.disabled = true;
      chatStatus.className = "chat-status muted small";
      chatStatus.textContent = "";
      var typing = addTyping();
      postJSON(chatUrl, { text: text }).then(function (res) {
        typing.remove();
        if (res.data && res.data.ok) {
          addBubble("assistant", res.data.reply);
        } else {
          chatStatus.className = "chat-status err";
          chatStatus.textContent = (res.data && res.data.error) || "Xatolik yuz berdi.";
        }
      }).catch(function () {
        typing.remove();
        chatStatus.className = "chat-status err";
        chatStatus.textContent = "Internetga ulanishda xatolik. Qayta urinib ko‘ring.";
      }).then(function () { chatSend.disabled = false; });
    });
    chatInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); chatForm.requestSubmit ? chatForm.requestSubmit() : chatForm.dispatchEvent(new Event("submit", { cancelable: true })); }
    });
  }

  /* ---------- Milliy sertifikat: fan tanlash tekshiruvi ---------- */
  var comboForm = document.getElementById("combo-form");
  if (comboForm) {
    var comboHint = document.getElementById("combo-hint");
    comboForm.addEventListener("submit", function (e) {
      var checked = comboForm.querySelectorAll('input[name="subjects"]:checked').length;
      var min = parseInt((comboHint.textContent.match(/\d+/) || [2])[0], 10);
      if (checked < min) {
        e.preventDefault();
        comboHint.classList.add("err");
        comboHint.textContent = "Kamida " + min + " ta fan tanlang (hozir " + checked + " ta tanlangan).";
      }
    });
  }

  /* ---------- DTM simulyatsiya: 1-fanga qarab 2-fan variantlarini (juftliklarni) ko'rsatish ---------- */
  var dtmForm = document.getElementById("dtm-form");
  if (dtmForm) {
    var y1 = document.getElementById("yonalish1"), y2 = document.getElementById("yonalish2");
    var descBox = document.getElementById("dtm-yonalish-desc");
    var pairsNode = document.getElementById("dtm-pairs-data");
    var PAIRS = pairsNode ? JSON.parse(pairsNode.textContent) : {};

    function resetY2(placeholder) {
      y2.innerHTML = "";
      y2.appendChild(el("option", { value: "" }, placeholder));
    }
    function hideDesc() {
      descBox.hidden = true;
      descBox.textContent = "";
    }
    function syncDtmSelects() {
      var options = PAIRS[y1.value];
      hideDesc();
      if (!options || !options.length) {
        y2.disabled = true;
        resetY2("Avval 1-fanni tanlang…");
        return;
      }
      y2.disabled = false;
      resetY2("Fan tanlang…");
      options.forEach(function (o) {
        var opt = el("option", { value: o.id }, o.icon + " " + o.name);
        if (!o.q_count) opt.disabled = true;
        opt.setAttribute("data-desc", o.desc);
        y2.appendChild(opt);
      });
    }
    y1.addEventListener("change", syncDtmSelects);
    y2.addEventListener("change", function () {
      var opt = y2.options[y2.selectedIndex];
      var desc = opt && opt.getAttribute("data-desc");
      if (desc) {
        descBox.hidden = false;
        descBox.textContent = "Yo‘nalish: " + desc;
      } else {
        hideDesc();
      }
    });
    syncDtmSelects();
    dtmForm.addEventListener("submit", function (e) {
      if (!y1.value || !y2.value) {
        e.preventDefault();
        window.alert("Ikkala fanni ham tanlang.");
      }
    });
  }

  /* ---------- Bosh sahifa: namunaviy savol ---------- */
  var sample = document.getElementById("sample");
  if (sample) {
    var inner = document.getElementById("sample-inner");
    var loadUrl = sample.getAttribute("data-url");
    var checkBase = sample.getAttribute("data-check");

    var showError = function () {
      inner.innerHTML = "";
      inner.appendChild(el("p", { class: "muted" }, "Namunaviy savolni yuklab bo‘lmadi."));
      var retry = el("button", { class: "btn btn-outline btn-sm", type: "button" }, "Qayta urinish");
      retry.addEventListener("click", loadSample);
      inner.appendChild(retry);
    };

    var render = function (q) {
      inner.innerHTML = "";
      var meta = el("div", { class: "sample-meta" });
      meta.appendChild(el("span", { class: "badge" }, q.subject));
      meta.appendChild(el("span", { class: "badge" }, "Namuna savol"));
      inner.appendChild(meta);
      inner.appendChild(el("div", { class: "sample-q" }, q.text));
      var list = el("div", { class: "opt-list" });
      var foot = el("div", { class: "sample-foot" });
      var buttons = [];
      q.options.forEach(function (text, i) {
        var b = el("button", { class: "opt", type: "button" });
        b.appendChild(el("span", { class: "letter" }, LETTERS[i]));
        b.appendChild(el("span", null, text));
        b.addEventListener("click", function () { answer(i); });
        buttons.push(b);
        list.appendChild(b);
      });
      inner.appendChild(list);
      inner.appendChild(foot);

      function answer(i) {
        buttons.forEach(function (b) { b.disabled = true; });
        postJSON(checkBase + q.id + "/tekshir", { choice: i }).then(function (res) {
          var d = res.data;
          buttons[d.correct].classList.add("correct");
          if (!d.ok) buttons[i].classList.add("wrong");
          foot.innerHTML = "";
          var msg = el("div", { class: "sample-msg " + (d.ok ? "ok" : "bad") },
            (d.ok ? "To‘g‘ri! " : "Noto‘g‘ri. ") + (d.explanation || ""));
          foot.appendChild(msg);
          var again = el("button", { class: "btn btn-outline btn-sm", type: "button" }, "Boshqa savol");
          again.addEventListener("click", loadSample);
          foot.appendChild(again);
        }).catch(function () {
          buttons.forEach(function (b) { b.disabled = false; });
        });
      }
    };

    var loadSample = function () {
      fetch(loadUrl, { credentials: "same-origin" })
        .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
        .then(render)
        .catch(showError);
    };
    loadSample();
  }

  /* ---------- Natija sahifasi: saralash ---------- */
  var tabs = document.querySelectorAll(".tab[data-filter]");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var f = tab.getAttribute("data-filter");
        tabs.forEach(function (t) { t.setAttribute("aria-pressed", t === tab ? "true" : "false"); });
        document.querySelectorAll("#review .review-item").forEach(function (item) {
          item.hidden = !(f === "all" || item.getAttribute("data-state") === f);
        });
      });
    });
  }

  /* ---------- Natija sahifasi: "Xatolar ustida ishlash" havolasi ---------- */
  var jumpWrong = document.querySelector("[data-jump-wrong]");
  if (jumpWrong) {
    jumpWrong.addEventListener("click", function (e) {
      e.preventDefault();
      var wrongTab = document.querySelector('.tab[data-filter="wrong"]');
      if (wrongTab) wrongTab.click();
      document.getElementById("review").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ---------- Natija sahifasi: AI Ustozdan tahlil olish ---------- */
  var aiBox = document.getElementById("ai-analysis");
  if (aiBox) {
    var aiBtn = document.getElementById("ai-analysis-btn"), aiText = document.getElementById("ai-analysis-text");
    aiBtn.addEventListener("click", function () {
      aiBtn.disabled = true;
      aiBtn.innerHTML = "Tahlil qilinmoqda…";
      postJSON(aiBox.getAttribute("data-url"), {}).then(function (res) {
        aiText.hidden = false;
        if (res.data && res.data.ok) {
    aiText.className = "ai-analysis-text";

    if (typeof marked !== "undefined") {
        var html = marked.parse(res.data.reply);

        if (typeof DOMPurify !== "undefined") {
            aiText.innerHTML = DOMPurify.sanitize(html);
        } else {
            aiText.innerHTML = html;
        }
    } else {
        aiText.textContent = res.data.reply;
    }

    aiBtn.remove();
        } else {
          aiText.className = "ai-analysis-text err";
          aiText.innerHTML = (res.data && res.data.error) || "Xatolik yuz berdi.";
          aiBtn.disabled = false;
          aiBtn.innerHTML = "🤖 AI Ustozdan tahlil olish";
        }
      }).catch(function () {
        aiText.hidden = false;
        aiText.className = "ai-analysis-text err";
        aiText.innerHTML = "Internetga ulanishda xatolik.";
        aiBtn.disabled = false;
        aiBtn.innerHTML = "🤖 AI Ustozdan tahlil olish";
      });
    });
  }

  /* ---------- Admin: chiqish havolasi ---------- */
  document.querySelectorAll("[data-submit-parent]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); a.closest("form").submit(); });
  });

  /* ---------- Test yechish ---------- */
  var dataNode = document.getElementById("attempt-data");
  if (dataNode) runAttempt(JSON.parse(dataNode.textContent));

  function runAttempt(data) {
    var qs = data.questions;
    var state = {};              // savol id -> {c: tanlov yoki null, f: 0/1}
    Object.keys(data.saved || {}).forEach(function (k) {
      state[k] = { c: data.saved[k].c, f: data.saved[k].f ? 1 : 0 };
    });
    var idx = 0;
    var finishing = false;
    var endAt = Date.now() + data.remaining * 1000;

    var $ = function (id) { return document.getElementById(id); };
    var timer = $("timer"), bar = $("progress-bar"), qCount = $("q-count"), qText = $("q-text");
    var qOptions = $("q-options"), flagBtn = $("flag-btn"), prevBtn = $("prev-btn"), nextBtn = $("next-btn");
    var navGrid = $("nav-grid"), saveState = $("save-state"), finishBtn = $("finish-btn");
    var dialog = $("finish-dialog"), finishSummary = $("finish-summary"), finishWarn = $("finish-warn");

    function get(qid) { return state[qid] || (state[qid] = { c: null, f: 0 }); }
    function answeredCount() {
      return qs.filter(function (q) { var s = state[q.id]; return s && s.c !== null && s.c !== undefined; }).length;
    }
    function flaggedCount() {
      return qs.filter(function (q) { var s = state[q.id]; return s && s.f; }).length;
    }

    function buildNav() {
      navGrid.innerHTML = "";
      qs.forEach(function (q, i) {
        var b = el("button", { class: "nav-btn", type: "button", "aria-label": (i + 1) + "-savol" }, String(i + 1));
        b.addEventListener("click", function () { go(i); });
        navGrid.appendChild(b);
      });
    }
    function paintNav() {
      var btns = navGrid.children;
      qs.forEach(function (q, i) {
        var s = state[q.id] || {};
        var cls = "nav-btn";
        if (s.c !== null && s.c !== undefined) cls += " answered";
        if (s.f) cls += " flagged";
        if (i === idx) cls += " current";
        btns[i].className = cls;
      });
      bar.style.width = (answeredCount() * 100 / qs.length) + "%";
    }

    function render() {
      var q = qs[idx], s = get(q.id);
      qCount.textContent = "Savol " + (idx + 1) + " / " + qs.length;
      qText.textContent = q.text;
      qOptions.innerHTML = "";
      q.options.forEach(function (text, i) {
        var b = el("button", { class: "opt" + (s.c === i ? " selected" : ""), type: "button", role: "radio", "aria-checked": s.c === i ? "true" : "false" });
        b.appendChild(el("span", { class: "letter" }, LETTERS[i]));
        b.appendChild(el("span", null, text));
        b.addEventListener("click", function () { choose(i); });
        qOptions.appendChild(b);
      });
      flagBtn.setAttribute("aria-pressed", s.f ? "true" : "false");
      flagBtn.textContent = s.f ? "Belgi olib tashlash" : "Belgilab qo‘yish";
      prevBtn.disabled = idx === 0;
      nextBtn.textContent = idx === qs.length - 1 ? "Yakunlash" : "Keyingi";
      paintNav();
    }

    function go(i) { idx = Math.max(0, Math.min(qs.length - 1, i)); render(); }

    function choose(i) {
      var q = qs[idx], s = get(q.id);
      s.c = (s.c === i) ? null : i;   // qayta bosilsa, tanlov bekor qilinadi
      render();
      save(q.id);
    }
    function toggleFlag() {
      var q = qs[idx], s = get(q.id);
      s.f = s.f ? 0 : 1;
      render();
      save(q.id);
    }

    var pending = 0;
    function save(qid) {
      var s = get(qid);
      pending++;
      saveState.className = "save-state";
      saveState.textContent = "Saqlanmoqda…";
      postJSON(data.urls.save, { q: qid, c: s.c, f: s.f }).then(function (res) {
        pending--;
        if (res.status === 409) { finish(true); return; }
        if (res.status >= 400) throw new Error();
        if (!pending) saveState.textContent = "Javob saqlandi";
      }).catch(function () {
        pending--;
        saveState.className = "save-state err";
        saveState.textContent = "Saqlab bo‘lmadi. Internetni tekshiring, yakunlashda barcha javoblar qayta yuboriladi.";
      });
    }

    function tick() {
      var left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      var m = Math.floor(left / 60), s = left % 60;
      timer.textContent = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
      timer.className = "timer" + (left <= 30 ? " danger" : (left <= 120 ? " warn" : ""));
      if (left === 0 && !finishing) finish(true);
    }

    function openFinish() {
      var unanswered = qs.length - answeredCount(), flagged = flaggedCount();
      finishSummary.textContent = "Javob berilgan: " + answeredCount() + " / " + qs.length + ".";
      var notes = [];
      if (unanswered) notes.push(unanswered + " ta savolga javob berilmagan.");
      if (flagged) notes.push(flagged + " ta savol belgilangan.");
      finishWarn.hidden = !notes.length;
      finishWarn.textContent = notes.join(" ");
      if (dialog.showModal) dialog.showModal();
      else if (window.confirm("Testni yakunlaysizmi?")) finish(false);
    }

    function finish(auto) {
      if (finishing) return;
      finishing = true;
      if (dialog.open) dialog.close();
      saveState.className = "save-state";
      saveState.textContent = auto ? "Vaqt tugadi, natija hisoblanmoqda…" : "Natija hisoblanmoqda…";
      finishBtn.disabled = true;
      postJSON(data.urls.finish, { answers: state }).then(function (res) {
        if (res.data && res.data.redirect) window.location.href = res.data.redirect;
        else throw new Error();
      }).catch(function () {
        finishing = false;
        finishBtn.disabled = false;
        saveState.className = "save-state err";
        saveState.textContent = "Yakunlab bo‘lmadi. Internetni tekshirib, qayta urinib ko‘ring.";
        if (auto) setTimeout(function () { finish(true); }, 3000);
      });
    }

    prevBtn.addEventListener("click", function () { go(idx - 1); });
    nextBtn.addEventListener("click", function () { if (idx === qs.length - 1) openFinish(); else go(idx + 1); });
    flagBtn.addEventListener("click", toggleFlag);
    finishBtn.addEventListener("click", openFinish);
    $("finish-cancel").addEventListener("click", function () { dialog.close(); });
    $("finish-confirm").addEventListener("click", function () { finish(false); });

    document.addEventListener("keydown", function (e) {
      if (dialog.open || e.ctrlKey || e.metaKey || e.altKey) return;
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if (e.key >= "1" && e.key <= "4") {
        if (qs[idx].options.length > Number(e.key) - 1) choose(Number(e.key) - 1);
      } else if (e.key === "ArrowRight") { go(idx + 1); }
      else if (e.key === "ArrowLeft") { go(idx - 1); }
    });

    window.addEventListener("beforeunload", function (e) {
      if (!finishing) { e.preventDefault(); e.returnValue = ""; }
    });

    buildNav();
    render();
    tick();
    setInterval(tick, 250);
  }
})();

