/* ============================================================
   MOON VALLEY — Moon AI
   Real AI assistant: uses an OpenAI-compatible LLM when an API
   key is configured, otherwise falls back to the local knowledge
   engine (offline, data-driven). Answers questions, suggests
   item builds and estimates drop chances.
   ============================================================ */
(function () {
  "use strict";

  var CONTENT = window.MV_CONTENT || {};
  var I18N = window.MV_I18N || {};
  var lang = (localStorage.getItem("mv_lang") || "en");

  function t(key, fb) { return (I18N[lang] && I18N[lang][key]) || (I18N.en && I18N.en[key]) || fb || key; }
  function loc(item) { return (item && (item[lang] || item.en)) || item; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }

  /* ---------- settings ---------- */
  var SETTINGS_KEY = "moonai-settings";
  function loadSettings() {
    try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"); } catch (e) { return {}; }
  }
  function saveSettings(s) { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch (e) {} }
  var settings = loadSettings();
  settings.endpoint = settings.endpoint || "https://api.openai.com/v1/chat/completions";
  settings.model = settings.model || "gpt-4o-mini";
  settings.apiKey = settings.apiKey || "";

  /* ---------- knowledge index (local engine) ---------- */
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
    var best = null;
    items.forEach(function (it) { if (ql.indexOf(it.name.toLowerCase()) >= 0) best = it; });
    if (best) return best;
    var tokens = ql.split(/\s+/).filter(function (x) { return x.length > 2; });
    var scored = items.map(function (it) {
      var n = it.name.toLowerCase(), s = 0;
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

  /* ---------- local engine ---------- */
  function localAnswer(q) {
    var ql = q.toLowerCase();
    if (/^(hi|hello|oi|olá|ola|hey)\b/.test(ql)) {
      return "Moon AI online (local mode). I can answer questions about Moon Valley, suggest item builds, and estimate drop chances. Configure an API key in Settings (gear) for a full AI. Try: \"best build for Nyfheris\", \"where does Aurora Plate drop\", \"tell me about Frostvale\".";
    }
    if (/\b(drop|chance|loot|farm|onde|where|obter|get|dropa)\b/.test(ql)) {
      var item = findItem(q);
      var hits = [];
      KB.droplist.forEach(function (d) {
        var dl = loc(d);
        (d.drops || []).forEach(function (dr) {
          var drl = loc(dr);
          var match = (item && drl.name.toLowerCase() === item.name.toLowerCase()) || ql.indexOf(drl.name.toLowerCase()) >= 0;
          if (match) hits.push("• " + drl.name + " — " + dr.rarity + ", " + dr.chance + " from " + dl.name + " (" + dl.region + ", " + d.kind + ")");
        });
      });
      if (hits.length) return "Drop estimate:\n" + hits.join("\n");
      var srcs = KB.droplist.map(function (d) { var l = loc(d); return "• " + l.name + " (" + l.region + ", " + d.kind + ")"; });
      return "No specific drop matched. Known sources:\n" + srcs.join("\n") + "\n\nAsk: \"where does Aurora Plate drop\".";
    }
    if (/\b(combina|build|combo|setup|melhor|best|builds)\b/.test(ql)) {
      var cls = findClass(q) || KB.classes[0];
      var cl = loc(cls);
      var weapons = KB.armory.filter(function (a) { return a.kind === "weapon"; }).slice(0, 1);
      var armors = KB.armory.filter(function (a) { return a.kind === "armor"; }).slice(0, 1);
      var trinkets = KB.armory.filter(function (a) { return a.kind === "item"; }).slice(0, 1);
      var rings = ((KB.equipment.categories.find(function (c) { return c.key === "ring"; }) || {}).items) || [];
      var necks = ((KB.equipment.categories.find(function (c) { return c.key === "necklace"; }) || {}).items) || [];
      var pickRing = rings.length ? rings[Math.floor(Math.random() * rings.length)] : null;
      var pickNeck = necks.length ? necks[Math.floor(Math.random() * necks.length)] : null;
      var lines = ["Suggested build for **" + cl.name + "** (" + cl.role + "):"];
      if (weapons.length) lines.push("Weapon: " + loc(weapons[0]).name + " — " + loc(weapons[0]).type);
      if (armors.length) lines.push("Armor: " + loc(armors[0]).name + " — " + loc(armors[0]).type);
      if (trinkets.length) lines.push("Trinket: " + loc(trinkets[0]).name);
      if (pickRing) lines.push("Ring: " + pickRing.name);
      if (pickNeck) lines.push("Necklace: " + pickNeck.name);
      lines.push("\nTip: pair high-damage weapons with epic armor; use legendary trinkets for endgame. Ask \"drop chance of X\" to farm the pieces.");
      return lines.join("\n");
    }
    var r = findRegion(q);
    if (r) {
      var l = loc(r);
      var detail = (l.detail || []).join(" ");
      return "**" + l.name + "** — " + l.biome + "\n" + l.desc + (detail ? "\n" + detail : "");
    }
    var c = findClass(q);
    if (c) {
      var l = loc(c);
      var stats = (l.stats || []).map(function (s) { return s.label + ": " + s.value; }).join(", ");
      var traits = (l.traits || []).map(function (t) { return t.label + " — " + t.value; }).join("; ");
      return "**" + l.name + "** (" + l.role + ")\n" + l.text + (stats ? "\nStats: " + stats : "") + (traits ? "\nTraits: " + traits : "");
    }
    var it = findItem(q);
    if (it) {
      if (it.type === "armory") {
        var l = loc(it.item);
        var stats = (l.stats || []).map(function (s) { return s.label + " " + s.value; }).join(", ");
        return "**" + l.name + "** (" + it.item.kind + ", " + it.item.rarity + ")\n" + l.text + (stats ? "\n" + stats : "");
      }
      if (it.type === "shop") {
        var l = loc(it.item);
        var price = it.item.currency === "BRL" ? "R$ " + it.item.price.toFixed(2).replace(".", ",") : (it.item.price + " Moon Shards");
        return "**" + l.name + "** (" + it.item.kind + ", " + it.item.tier + ")\n" + l.text + "\nPrice: " + price;
      }
      if (it.type === "equip") return "**" + it.name + "** — " + (it.cat ? (loc(it.cat) + " " + it.cat.kanji) : "Equipment");
    }
    if (/rank|elo|tier|patent|league/i.test(ql)) {
      var tiers = KB.ranked.map(function (t) { return t.key + " (rank " + t.rank + ", " + t.min + "–" + (t.max || "∞") + " moons)"; });
      return "Ranked tiers (low → high):\n• " + tiers.join("\n• ");
    }
    if (/feature|system|gameplay/i.test(ql)) {
      return KB.features.map(function (f) { var l = loc(f); return "• " + l.title + " — " + l.text; }).join("\n");
    }
    if (/news|update|chronicle/i.test(ql)) {
      return KB.news.slice(0, 3).map(function (n) { var l = loc(n); return "• " + l.title + " (" + n.date + ")"; }).join("\n");
    }
    if (/book|lore|volume/i.test(ql)) {
      return KB.books.map(function (b) { var l = loc(b); return "• " + l.title + " — " + l.status; }).join("\n");
    }
    if (/help|ajuda|commands|comandos/i.test(ql)) {
      return "Moon AI commands:\n• Ask about any region, class, item, skin, frame, ring or necklace.\n• \"best build for <class>\" → item combo suggestion.\n• \"where does <item> drop\" / \"drop chance of <item>\" → drop estimate.\n• \"ranked tiers\" → ladder info.\n• \"features\" / \"news\" / \"books\" → lists.\n• Open Settings (gear) to connect a real LLM (OpenAI-compatible).";
    }
    var corpus = [];
    KB.regions.forEach(function (r) { var l = loc(r); corpus.push(l.name + " " + l.desc); });
    KB.classes.forEach(function (c) { var l = loc(c); corpus.push(l.name + " " + l.text); });
    KB.armory.forEach(function (a) { var l = loc(a); corpus.push(l.name + " " + l.text); });
    var matches = corpus.filter(function (s) { return ql.split(/\s+/).some(function (w) { return w.length > 3 && s.toLowerCase().indexOf(w) >= 0; }); });
    if (matches.length) return "I found some related info:\n• " + matches.slice(0, 4).join("\n• ");
    return "I'm not sure about that yet. Try asking about a region, class, item, drop, or build. Type \"help\" for commands.";
  }

  /* ---------- system prompt for real LLM ---------- */
  function buildSystemPrompt() {
    var regions = KB.regions.map(function (r) { var l = loc(r); return l.name + " (" + l.biome + "): " + l.desc; }).join(" | ");
    var classes = KB.classes.map(function (c) { var l = loc(c); return l.name + " - " + l.role + ": " + l.text; }).join(" | ");
    var armory = KB.armory.map(function (a) { var l = loc(a); return l.name + " (" + a.kind + ", " + a.rarity + ")"; }).join(", ");
    var drops = KB.droplist.map(function (d) { var l = loc(d); return l.name + " [" + l.region + "]: " + (d.drops || []).map(function (dr) { return loc(dr).name + " " + dr.chance; }).join(", "); }).join(" | ");
    return "You are Moon AI, the official AI assistant of the game Moon Valley (dark-fantasy MMO). " +
      "Answer helpfully and concisely. You may answer in the user's language (English or Portuguese). " +
      "Game data: Regions: " + regions + ". Classes: " + classes + ". " +
      "Armory items: " + armory + ". " +
      "Droplist: " + drops + ". " +
      "Ranked tiers: " + KB.ranked.map(function (t) { return t.key + " (rank " + t.rank + ")"; }).join(", ") + ". " +
      "Equipment categories: " + (KB.equipment.categories || []).map(function (c) { return c.key + " (" + (c.items ? c.items.length : (c.names ? c.names.length : 0)) + ")"; }).join(", ") + ". " +
      "If asked about builds, suggest item combinations from the armory + equipment. If asked about drops, give chances from the droplist. " +
      "If you don't know something, say so honestly. Keep answers focused and well-formatted.";
  }

  /* ---------- LLM call ---------- */
  function callLLM(messages, onChunk, onDone, onError) {
    if (!settings.apiKey) { onError("no-key"); return; }
    var body = {
      model: settings.model,
      messages: messages,
      stream: true,
      temperature: 0.7
    };
    fetch(settings.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + settings.apiKey
      },
      body: JSON.stringify(body)
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = "";
      function pump() {
        reader.read().then(function (r) {
          if (r.done) { onDone(); return; }
          buffer += decoder.decode(r.value, { stream: true });
          var lines = buffer.split("\n");
          buffer = lines.pop();
          lines.forEach(function (line) {
            line = line.trim();
            if (!line || line === "data: [DONE]") return;
            if (line.indexOf("data: ") === 0) {
              try {
                var j = JSON.parse(line.slice(6));
                var delta = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
                if (delta) onChunk(delta);
              } catch (e) {}
            }
          });
          pump();
        }).catch(onError);
      }
      pump();
    }).catch(onError);
  }

  /* ---------- UI ---------- */
  function buildUI() {
    if (document.getElementById("moonai-widget")) return;
    var wrap = document.createElement("div");
    wrap.id = "moonai-widget";
    wrap.innerHTML =
      '<button id="moonai-toggle" type="button" aria-label="Moon AI" title="Moon AI">🌙 AI</button>' +
      '<div id="moonai-panel" hidden>' +
        '<div id="moonai-head"><span>Moon AI</span><div class="moonai-head-actions"><button id="moonai-settings-btn" type="button" title="Settings">⚙</button><button id="moonai-close" type="button" aria-label="Close">×</button></div></div>' +
        '<div id="moonai-settings" hidden>' +
          '<label>API endpoint (OpenAI-compatible)</label><input id="moonai-endpoint" type="text">' +
          '<label>Model</label><input id="moonai-model" type="text">' +
          '<label>API key</label><input id="moonai-apikey" type="password" placeholder="sk-...">' +
          '<div class="moonai-settings-actions"><button id="moonai-save" type="button">Save</button><button id="moonai-cancel" type="button">Cancel</button></div>' +
          '<p class="moonai-settings-note">Leave the key empty to use the offline engine. Keys are stored only in this browser.</p>' +
        '</div>' +
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
    var settingsPanel = document.getElementById("moonai-settings");
    var settingsBtn = document.getElementById("moonai-settings-btn");
    var endpointInput = document.getElementById("moonai-endpoint");
    var modelInput = document.getElementById("moonai-model");
    var apiKeyInput = document.getElementById("moonai-apikey");

    function addMsg(text, who) {
      var div = document.createElement("div");
      div.className = "moonai-msg moonai-msg--" + who;
      var html = esc(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
      div.innerHTML = html;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
      return div;
    }

    toggle.addEventListener("click", function () {
      panel.hidden = !panel.hidden;
      if (!panel.hidden && log.childElementCount === 0) {
        addMsg(settings.apiKey
          ? "Moon AI online (LLM mode). Ask me anything about Moon Valley."
          : "Moon AI online (offline mode). I can answer questions, suggest builds and estimate drops. Open ⚙ to connect a real LLM.", "ai");
      }
      if (!panel.hidden) input.focus();
    });
    close.addEventListener("click", function () { panel.hidden = true; });
    var openBtn = document.getElementById("moonai-open-btn");
    if (openBtn) openBtn.addEventListener("click", function () { if (panel.hidden) toggle.click(); });

    settingsBtn.addEventListener("click", function () {
      settingsPanel.hidden = !settingsPanel.hidden;
      if (!settingsPanel.hidden) {
        endpointInput.value = settings.endpoint;
        modelInput.value = settings.model;
        apiKeyInput.value = settings.apiKey;
      }
    });
    document.getElementById("moonai-cancel").addEventListener("click", function () { settingsPanel.hidden = true; });
    document.getElementById("moonai-save").addEventListener("click", function () {
      settings.endpoint = endpointInput.value.trim() || settings.endpoint;
      settings.model = modelInput.value.trim() || settings.model;
      settings.apiKey = apiKeyInput.value.trim();
      saveSettings(settings);
      settingsPanel.hidden = true;
      addMsg(settings.apiKey ? "Settings saved. LLM mode enabled." : "Settings saved. Offline mode.", "ai");
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      addMsg(v, "user");
      input.value = "";
      if (settings.apiKey) {
        var aiDiv = addMsg("…", "ai");
        var accumulated = "";
        var messages = [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: v }
        ];
        callLLM(messages,
          function (chunk) { accumulated += chunk; aiDiv.innerHTML = esc(accumulated).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>"); log.scrollTop = log.scrollHeight; },
          function () { if (!accumulated) aiDiv.textContent = "(empty response)"; },
          function (err) {
            var msg = (err && err.message) ? err.message : String(err);
            if (err === "no-key") msg = "no key";
            aiDiv.textContent = "LLM error: " + msg + " — falling back to offline engine.";
            setTimeout(function () { addMsg(localAnswer(v), "ai"); }, 200);
          }
        );
      } else {
        setTimeout(function () { addMsg(localAnswer(v), "ai"); }, 120);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildUI);
  } else {
    buildUI();
  }
})();
