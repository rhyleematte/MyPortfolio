/**
 * Legacy /sample?id=… URLs: send the browser straight to the project PDF (or home).
 */
(function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    function go(url) {
        window.location.replace(url);
    }

    if (!id) {
        go("index.html");
        return;
    }

    const sample = typeof PROJECT_SAMPLES !== "undefined" ? PROJECT_SAMPLES[id] : null;
    if (sample && sample.pdfUrl) {
        go(sample.pdfUrl);
        return;
    }

    go("index.html");
})();
