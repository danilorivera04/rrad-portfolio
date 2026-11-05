// Render an isolated desktop-sized copy, never the responsive view or toolbar.
export async function exportCV(view, filename) {
    const { default: html2pdf } = await import('html2pdf.js');
    await document.fonts.ready;

    const stage = document.createElement('div');
    stage.style.cssText = 'position:fixed;left:-10000px;top:0;width:190mm;pointer-events:none;';
    stage.setAttribute('aria-hidden', 'true');
    stage.inert = true;
    const copy = document.createElement('div');
    copy.className = 'cv-view is-exporting';
    copy.dataset.theme = view.dataset.theme;
    const page = view.querySelector('#cv-page').cloneNode(true);
    page.removeAttribute('id');
    page.classList.add('cv-pdf-page');
    copy.append(page);
    stage.append(copy);
    document.body.append(stage);

    let worker;
    try {
        await document.fonts.ready;
        // Resolve inherited variables and fonts before html2pdf clones the DOM.
        // Inline the resolved styles so the PDF does not depend on stylesheet
        // loading or on the viewport/media queries of html2canvas's iframe.
        const elements = [copy, ...copy.querySelectorAll('*')];
        const styles = elements.map((element) => {
            const computed = getComputedStyle(element);
            return Array.from(computed, (name) => [name, computed.getPropertyValue(name)]);
        });
        elements.forEach((element, index) => {
            styles[index].forEach(([name, value]) => element.style.setProperty(name, value));
            element.style.setProperty('transition', 'none');
            element.style.setProperty('animation', 'none');
        });
        // Leave the vertical flow expandable if page-break padding is needed.
        [copy, page, ...page.querySelectorAll('.cv-body, .cv-main, .cv-aside, .section')]
            .forEach((element) => element.style.setProperty('height', 'auto'));

        const backgroundColor = getComputedStyle(page).backgroundColor;
        const backgroundRGB = backgroundColor.match(/[\d.]+/g).slice(0, 3).map(Number);
        const margin = 10;
        worker = html2pdf().set({
            filename,
            // Real page margins are repeated on every sheet. CSS padding alone
            // only pads the beginning/end of the continuous captured document.
            margin: [margin, margin, margin, margin],
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2.5,
                useCORS: true,
                backgroundColor,
                windowWidth: 1200,
                scrollX: 0,
                scrollY: 0,
                logging: false,
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
            pagebreak: {
                mode: ['css'],
                avoid: ['.exp-item', '.cert-item', '.project-item', '.aside-section', '.cv-footer'],
            },
        }).from(copy);
        await worker.toPdf();
        const pdf = await worker.get('pdf');
        const canvas = await worker.get('canvas');
        const pageSize = await worker.get('pageSize');
        fillPDFMargins(pdf, canvas, pageSize, margin, backgroundRGB);
        await worker.save();
    } finally {
        stage.remove();
        // html2pdf normally removes this after capture; also clean up on errors.
        worker?.prop?.overlay?.remove();
    }
}

// html2pdf paints only the content image; the remaining PDF paper is white.
// Fill the margins and unused end of the final sheet without covering content.
export function fillPDFMargins(pdf, canvas, pageSize, margin, backgroundRGB) {
    const pixelsPerPage = Math.floor(canvas.width * pageSize.inner.ratio);
    const pageCount = pdf.getNumberOfPages();
    for (let index = 0; index < pageCount; index++) {
        pdf.setPage(index + 1);
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        const remainingPixels = canvas.height - index * pixelsPerPage;
        const contentHeight = remainingPixels < pixelsPerPage
            ? remainingPixels * pageSize.inner.width / canvas.width
            : pageSize.inner.height;
        const contentBottom = margin + contentHeight;
        pdf.setFillColor(...backgroundRGB);
        pdf.rect(0, 0, width, margin, 'F');
        pdf.rect(0, margin, margin, height - margin, 'F');
        pdf.rect(width - margin, margin, margin, height - margin, 'F');
        pdf.rect(margin, contentBottom, width - 2 * margin, height - contentBottom, 'F');
    }
}
