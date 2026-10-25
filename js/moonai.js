/* ============================================================
   MOON VALLEY — Moon AI
   In-browser assistant: answers questions about the Vale,
   suggests item builds and estimates drop chances.
   Works offline against the structured CONTENT data.
   ============================================================ */
(function () {
  "use strict";

  var CONTENT = window.MV_CONTENT || {};
  var I18N = window.MV_I18N || {};
  var lang = (localStorage.getItem("mv_lang") || "en");

  function t(key, fb) { return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || fb || key; }
  function loc(item) { return (item && (item[lang] || item.en)) || item; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }

  /* ---------- knowledge index ---------- */
  var KB = {
    regions: CONTENT.regions || [],
    classes: CONTENT.classes || [],
    armory: CONTENT.armory || [],
    equipment: CONTENT.equipment || { categories: [], supreme: [] },
    shop: CONTENT.shop || [],
    ranked: (CONTENT.ranked && CONTENT.ranked.tiers) || [],
    droplist: CONTENT.droplist || [],
    news: CONTENT.news || [],
    books: CONTENT.books || [],
    features: CONTENT.features || []
  };

  function allItems() {
    var out = [];
    KB.armory.forEach(function (a) { out.push({ type: "armory", name: loc(a).name, item: a }); });
    (KB.equipment.categories || []).forEach(function (c) {
      (c.items || []).forEach(function (it) { out.push({ type: "equip", name: it.name, item: it, cat: c }); });
      (c.names || []).forEach(function (n) { out.push({ type: "equip", name: n, item: { name: n }, cat: c }); });
    });
    KB.shop.forEach(function (s) { out.push({ type: "shop", name: loc(s).name, item: s }); });
    return out;
  }

  function findItem(q) {
    var items = allItems();
    var ql = q.toLowerCase();
    // exact-ish name match
    var best = null;
    items.forEach(function (it) {
      if (ql.indexOf(it.name.toLowerCase()) >= 0) best = it;
    });
    if (best) return best;
    // partial token match
    var tokens = ql.split(/\s+/).filter(function (x) { return x.length > 2; });
    var scored = items.map(function (it) {
      var n = it.name.toLowerCase();
      var s = 0;
      tokens.forEach(function (tk) { if (n.indexOf(tk) >= 0) s += tk.length; });
      return { it: it, s: s };
    }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; });
    return scored.length ? scored[0].it : null;
  }

  function findRegion(q) {
    var ql = q.toLowerCase();
    return KB.regions.find(function (r) { var l = loc(r); return ql.indexOf((l.name || "").toLowerCase()) >= 0 || ql.indexOf(r.id) >= 0; });
  }
  function findClass(q) {
    var ql = q.toLowerCase();
    return KB.classes.find(function (c) { var l = loc(c); return ql.indexOf((l.name || "").toLowerCase()) >= 0 || ql.indexOf(c.id) >= 0; });
  }

  /* ---------- responders ---------- */
  function answerGreeting() {
    return "Moon AI online. I can answer questions about Moon Valley, suggest item builds, and estimate drop chances. Try: \"best build for Nyfheris\", \"where does Aurora Plate drop\", \"tell me about Frostvale\".";
  }

  function answerRegion(r) {
    var l = loc(r);
    var detail = (l.detail || []).join(" ");
    return "**" + l.name + "** — " + l.biome + "\n" + l.desc + (detail ? "\n" + detail : "");
  }
  function answerClass(c) {
    var l = loc(c);
    var stats = (l.stats || []).map(function (s) { return s.label + ": " + s.value; }).join(", ");
    var traits = (l.traits || []).map(function (t) { return t.label + " — " + t.value; }).join("; ");
    return "**" + l.name + "** (" + l.role + ")\n" + l.text + (stats ? "\nStats: " + stats : "") + (traits ? "\nTraits: " + traits : "");
  }
  function answerArmory(a) {
    var l = loc(a);
    var stats = (l.stats || []).map(function (s) { return s.label + " " + s.value; }).join(", ");
    return "**" + l.name + "** (" + l.type + ", " + a.rarity + ")\n" + l.text + (stats ? "\n" + stats : "");
  }
  function answerShop(s) {
    var l = loc(s);
    var price = s.currency === "BRL" ? "R$ " + s.price.toFixed(2).replace(".", ",") : (s.price + " Moon Shards");
    return "**" + l.name + "** (" + s.kind + ", " + s.tier + ")\n" + l.text + "\nPrice: " + price;
  }
  function answerEquip(it, cat) {
    return "**" + it.name + "** — " + (cat ? (loc(cat) + " " + cat.kanji) : "Equipment") + "\nArt: " + (it.art || "—");
  }

  function answerDrop(q) {
    var ql = q.toLowerCase();
    // find mentioned item
    var item = findItem(q);
    // search droplist
    var hits = [];
    KB.droplist.forEach(function (d) {
      var dl = loc(d);
      (d.drops || []).forEach(function (dr) {
        var drl = loc(dr);
        var match = (item && drl.name.toLowerCase() === item.name.toLowerCase()) ||
                    ql.indexOf(drl.name.toLowerCase()) >= 0;
        if (match) hits.push({ source: dl.name, region: dl.region, kind: d.kind, drop: drl, rarity: dr.rarity, chance: dr.chance });
      });
    });
    if (hits.length) {
      var lines = hits.map(function (h) {
        return "• " + h.drop.name + " — " + h.rarity + ", " + h.chance + " from " + h.source + " (" + h.region + ", " + h.kind + ")";
      });
      return "Drop estimate:\n" + lines.join("\n");
    }
    // no item match: list all bosses/mobs
    var srcs = KB.droplist.map(function (d) { var l = loc(d); return "• " + l.name + " (" + l.region + ", " + d.kind + ")"; });
    return "No specific drop matched. Known sources:\n" + srcs.join("\n") + "\n\nAsk: \"where does Aurora Plate drop\" or \"drop chance of Lunar Signet\".";
  }

  function answerCombo(q) {
    var cls = findClass(q);
    // default class = first if none
    if (!cls) cls = KB.classes[0];
    var cl = loc(cls);
    // pick armory items by class tone
    var toneMap = { blood: "blood", iron: "iron", arcane: "arcane", moon: "moon", gold: "gold", ice: "ice" };
    // simple: recommend armory items whose rarity is epic/legendary + matching equipment
    var weapons = KB.armory.filter(function (a) { return a.kind === "weapon"; }).slice(0, 3);
    var armors = KB.armory.filter(function (a) { return a.kind === "armor"; }).slice(0, 2);
    var trinkets = KB.armory.filter(function (a) { return a.kind === "item"; }).slice(0, 2);
    var rings = (KB.equipment.categories.find(function (c) { return c.key === "ring"; }) || {}).items || [];
    var necks = (KB.equipment.categories.find(function (c) { return c.key === "necklace"; }) || {}).items || [];
    var pickRing = rings.length ? rings[Math.floor(Math.random() * rings.length)] : null;
    var pickNeck = necks.length ? necks[Math.floor(Math.random() * necks.length)] : null;
    var lines = [];
    lines.push("Suggested build for **" + cl.name + "** (" + cl.role + "):");
    if (weapons.length) lines.push("Weapon: " + loc(weapons[0]).name + " — " + loc(weapons[0]).type);
    if (armors.length) lines.push("Armor: " + loc(armors[0]).name + " — " + loc(armors[0]).type);
    if (trinkets.length) lines.push("Trinket: " + loc(trinkets[0]).name);
    if (pickRing) lines.push("Ring: " + pickRing.name);
    if (pickNeck) lines.push("Necklace: " + pickNeck.name);
    lines.push("\nTips: pair high-damage weapons with epic armor; use legendary trinkets for endgame. Ask \"drop chance of X\" to farm the pieces.");
    return lines.join("\n");
  }

  function answerQA(q) {
    var ql = q.toLowerCase();
    var r = findRegion(q);
    if (r) return answerRegion(r);
    var c = findClass(q);
    if (c) return answerClass(c);
    var it = findItem(q);
    if (it) {
      if (it.type === "armory") return answerArmory(it.item);
      if (it.type === "shop") return answerShop(it.item);
      if (it.type === "equip") return answerEquip(it.item, it.cat);
    }
    // ranked
    if (/rank|elo|tier|patent|league/i.test(ql)) {
      var tiers = KB.ranked.map(function (t) { return t.key + " (rank " + t.rank + ", " + t.min + "–" + (t.max || "∞") + " moons)"; });
      return "Ranked tiers (low → high):\n• " + tiers.join("\n• ");
    }
    // features
    if (/feature|system|gameplay/i.test(ql)) {
      return KB.features.map(function (f) { var l = loc(f); return "• " + l.title + " — " + l.text; }).join("\n");
    }
    // news
    if (/news|update|chronicle/i.test(ql)) {
      return KB.news.slice(0, 3).map(function (n) { var l = loc(n); return "• " + l.title + " (" + n.date + ")"; }).join("\n");
    }
    // books
    if (/book|lore|volume/i.test(ql)) {
      return KB.books.map(function (b) { var l = loc(b); return "• " + l.title + " — " + l.status; }).join("\n");
    }
    // help
    if (/help|ajuda|commands|comandos/i.test(ql)) {
      return "Moon AI commands:\n• Ask about any region, class, item, skin, frame, ring or necklace.\n• \"best build for <class>\" → item combo suggestion.\n• \"where does <item> drop\" / \"drop chance of <item>\" → drop estimate.\n• \"ranked tiers\" → ladder info.\n• \"features\" / \"news\" / \"books\" → lists.";
    }
    // fallback search across all text
    var corpus = [];
    KB.regions.forEach(function (r) { var l = loc(r); corpus.push(l.name + " " + l.desc); });
    KB.classes.forEach(function (c) { var l = loc(c); corpus.push(l.name + " " + l.text); });
    KB.armory.forEach(function (a) { var l = loc(a); corpus.push(l.name + " " + l.text); });
    var matches = corpus.filter(function (s) { return ql.split(/\s+/).some(function (w) { return w.length > 3 && s.toLowerCase().indexOf(w) >= 0; }); });
    if (matches.length) {
      return "I found some related info:\n• " + matches.slice(0, 4).join("\n• ");
    }
    return "I'm not sure about that yet. Try asking about a region, class, item, drop, or build. Type \"help\" for commands.";
  }

  function respond(text) {
    var ql = text.toLowerCase();
    if (/^(hi|hello|oi|olá|ola|hey)\b/.test(ql)) return answerGreeting();
    if (/\b(drop|chance|loot|farm|onde|where|obter|get|dropa)\b/.test(ql)) return answerDrop(text);
    if (/\b(combina|build|combo|setup|melhor|best|builds)\b/.test(ql)) return answerCombo(text);
    return answerQA(text);
  }

  /* ---------- UI ---------- */
  function buildUI() {
    if (document.getElementById("moonai-widget")) return;
    var wrap = document.createElement("div");
    wrap.id = "moonai-widget";
    wrap.innerHTML =
      '<button id="moonai-toggle" type="button" aria-label="Moon AI" title="Moon AI">🌙 AI</button>' +
      '<div id="moonai-panel" hidden>' +
        '<div id="moonai-head"><span>Moon AI</span><button id="moonai-close" type="button" aria-label="Close">×</button></div>' +
        '<div id="moonai-log"></div>' +
        '<form id="moonai-form"><input id="moonai-input" type="text" placeholder="Ask Moon AI..." autocomplete="off"><button type="submit">Send</button></form>' +
      '</div>';
    document.body.appendChild(wrap);

    var toggle = document.getElementById("moonai-toggle");
    var panel = document.getElementById("moonai-panel");
    var log = document.getElementById("moonai-log");
    var form = document.getElementById("moonai-form");
    var input = document.getElementById("moonai-input");
    var close = document.getElementById("moonai-close");

    function addMsg(text, who) {
      var div = document.createElement("div");
      div.className = "moonai-msg moonai-msg--" + who;
      // simple markdown: bold **x**
      var html = esc(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
      div.innerHTML = html;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
    }

    toggle.addEventListener("click", function () {
      panel.hidden = !panel.hidden;
      if (!panel.hidden && log.childElementCount === 0) {
        addMsg(answerGreeting(), "ai");
      }
      if (!panel.hidden) input.focus();
    });
    close.addEventListener("click", function () { panel.hidden = true; });
    var openBtn = document.getElementById("moonai-open-btn");
    if (openBtn) openBtn.addEventListener("click", function () { if (panel.hidden) toggle.click(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      addMsg(v, "user");
      input.value = "";
      setTimeout(function () { addMsg(respond(v), "ai"); }, 120);
    });

    // greet on first open handled above
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildUI);
  } else {
    buildUI();
  }
})();
