let tei = document.getElementById("folio");
let tei_xml = tei.innerHTML;
let folio_xml = tei_xml + ".xml";

let page = document.getElementById("page");
let number = Number(page.innerHTML);

var mirador = Mirador.viewer({
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
      layers: false,
    }
  },
  workspaceControlPanel: { enabled: false },
  windows: [{
    loadedManifest: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json",
    canvasIndex: number,
    thumbnailNavigationPosition: 'off'
  }]
});

async function applyXSLT(xmlPath, xslPath, targetId) {
  const target = document.getElementById(targetId);

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

    // Only clear AFTER we successfully have a result
    target.innerHTML = "";
    target.appendChild(resultFragment);

  } catch (err) {
    console.error(`XSLT error for ${targetId}:`, err);
    target.innerHTML = `<div style="padding:10px;border:1px solid #c00;color:#c00;">
      Error loading ${targetId}. Open Console (F12) for details.
    </div>`;
  }
}

function documentLoader() {
  applyXSLT(folio_xml, "Frankenstein_text.xsl", "text");
}

function statsLoader() {
  applyXSLT(folio_xml, "Frankenstein_meta.xsl", "stats");
}

documentLoader();
statsLoader();

function selectHand(event) {
  // we will implement this AFTER everything displays correctly
}
