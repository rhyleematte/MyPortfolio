/**
 * URL of the project PDF, or a legacy redirect URL if no PDF is configured.
 * Requires projects-data.js loaded before this file on pages that use it.
 * @param {string} projectId - Key from PROJECT_SAMPLES (e.g. "daloy-api").
 */
function samplePageUrl(projectId) {
    const sample = typeof PROJECT_SAMPLES !== "undefined" ? PROJECT_SAMPLES[projectId] : null;
    if (sample && sample.pdfUrl) {
        return sample.pdfUrl;
    }
    return "sample.html?id=" + encodeURIComponent(projectId);
}

/** Opens the project PDF in a new tab. */
function openProjectSample(projectId) {
    window.open(samplePageUrl(projectId), "_blank", "noopener,noreferrer");
}

window.openProjectSample = openProjectSample;
window.samplePageUrl = samplePageUrl;
