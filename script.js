document.addEventListener("DOMContentLoaded", () => {
  const tei = document.getElementById("folio");
  const page = document.getElementById("page");

  if (!tei || !page) {
    console.error("Missing #folio or #page in the HTML.");
    return;
  }

  let XML_BASE = "";
  let XSL_BASE = "";
  let ASSET_BASE = "";

  const folioName = tei.textContent.trim();      
  const folio_xml = XML_BASE + folioName + ".xml";
  const number = Number(page.textContent.trim());

  try {
    Mirador.viewer({
      id: "my-mirador",
      manifests: {
        "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json": {
          provider: "Bodleian Library, University of Oxford"
        }
      },
      window: {
        allowClose: false,
        allowWindowSideBar: true,
        allowTopMenuButton: false,
        allowMaximize: false,
        hideWindowTitle: true,
        panels: {
          info: false,
          attribution: false,
          canvas: true,
          annotations: false,
          search: false,
          layers: false
        }
      },
      workspaceControlPanel: { enabled: false },
      windows: [
        {
          loadedManifest: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json",
          canvasIndex: number,
          thumbnailNavigationPosition: "off"
        }
      ]
    });
  } catch (e) {
    console.error("Mirador failed to initialize:", e);
  }

  async function applyXSLT(xmlPath, xslPath, targetId) {
    const target = document.getElementById(targetId);
    if (!target) {
      console.error(`Missing target element #${targetId}`);
      return null;
    }

    try {
      const [xmlString, xslString] = await Promise.all([
        fetch(xmlPath + "?v=" + Date.now()).then(r => r.text()),
        fetch(xslPath + "?v=" + Date.now()).then(r => r.text())
      ]);

      const parser = new DOMParser();
      const xml_doc = parser.parseFromString(xmlString, "text/xml");
      const xsl_doc = parser.parseFromString(xslString, "text/xml");

      const xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);

      const resultFragment = xsltProcessor.transformToFragment(xml_doc, document);

      target.innerHTML = "";
      target.appendChild(resultFragment);

      return xml_doc;

    } catch (err) {
      console.error(`XSLT error for #${targetId}:`, err);
      target.innerHTML = `<div style="padding:10px;border:1px solid #c00;color:#c00;">
        Error loading <b>${targetId}</b>. Open Console (F12) for details.
      </div>`;
      return null;
    }
  }

  function computeWordCountFromXML(xmlDoc) {
    const ns = "http://www.tei-c.org/ns/1.0";
    const body = xmlDoc.getElementsByTagNameNS(ns, "body")[0];
    if (!body) return 0;

    const raw = (body.textContent || "")
      .replace(/\s+/g, " ")
      .trim();

    if (!raw) return 0;

    return raw.split(" ").filter(Boolean).length;
  }

  function addWordCountToStats(wordCount) {
    const statsDiv = document.getElementById("stats");
    if (!statsDiv) return;

    const ul = statsDiv.querySelector("ul");
    if (!ul) return;

    if (statsDiv.querySelector("#word-count-item")) return;

    const li = document.createElement("li");
    li.id = "word-count-item";
    li.innerHTML = `Word count: <strong>${wordCount}</strong>`;
    ul.appendChild(li);
  }

  applyXSLT(folio_xml, XSL_BASE + "Frankenstein_text.xsl", "text");

  applyXSLT(folio_xml, XSL_BASE + "Frankenstein_meta.xsl", "stats")
    .then((xmlDoc) => {
      if (!xmlDoc) return;
      const wc = computeWordCountFromXML(xmlDoc);
      addWordCountToStats(wc);
    });

  window.selectHand = function (event) {
    const mode = event.target.value;

    const maryNodes = document.querySelectorAll('[data-hand="#MWS"]');
    const percyNodes = document.querySelectorAll('[data-hand="#PBS"]');

    maryNodes.forEach(el => el.classList.remove("highlight-mary"));
    percyNodes.forEach(el => el.classList.remove("highlight-percy"));

    if (mode === "Mary") {
      maryNodes.forEach(el => el.classList.add("highlight-mary"));
    } else if (mode === "Percy") {
      percyNodes.forEach(el => el.classList.add("highlight-percy"));
    }
  };

  let deletionsHidden = false;

  window.toggleDeletions = function () {
    deletionsHidden = !deletionsHidden;
    document.querySelectorAll(".tei-del").forEach(el => {
      el.style.display = deletionsHidden ? "none" : "inline";
    });
  };

  window.readingView = function () {
    document.body.classList.toggle("reading-view");
  };
  let notesHidden = true;

  window.toggleNotes = function () {
    notesHidden = !notesHidden;
    document.querySelectorAll(".tei-note").forEach(el => {
      el.style.display = notesHidden ? "none" : "block";
    });
  };
});