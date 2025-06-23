document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll(".pdl-tab");
    const groups = document.querySelectorAll(".pdl-group");
    const searchInput = document.getElementById("pdl-search");
    const resultsTab = document.getElementById("pdl-tab-results");
    const resultsList = resultsTab ? resultsTab.querySelector("ul") : null;

    // Utility: Animate fade in
    function fadeIn(el, duration = 300) {
        el.style.opacity = 0;
        el.style.display = 'block';
        let last = +new Date();
        const tick = function () {
            el.style.opacity = +el.style.opacity + (new Date() - last) / duration;
            last = +new Date();
            if (+el.style.opacity < 1) {
                requestAnimationFrame(tick);
            }
        };
        tick();
    }

    // Tab click behavior
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const letter = this.getAttribute('data-letter');

            groups.forEach(group => group.style.display = 'none');
            tabs.forEach(t => t.classList.remove('active'));

            const target = document.getElementById('pdl-tab-' + letter);
            if (target) fadeIn(target);
            this.classList.add('active');
        });
    });

    // Auto-open first tab
    if (tabs.length > 0) {
        tabs[0].click();
    }

    // Search functionality with dynamic Results tab
    if (searchInput && resultsTab && resultsList) {
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase();
            resultsList.innerHTML = '';
            resultsTab.style.display = 'none';

            if (query.length > 0) {
                tabs.forEach(t => t.classList.remove('active'));
                groups.forEach(g => g.style.display = 'none');

                let matches = [];

                document.querySelectorAll('.pdl-group ul li').forEach(li => {
                    const text = li.textContent.toLowerCase();
                    if (text.includes(query)) {
                        matches.push(li.cloneNode(true));
                    }
                });

                if (matches.length > 0) {
                    // Sort alphabetically
                    matches.sort((a, b) => {
                        return a.textContent.localeCompare(b.textContent);
                    });

                    matches.forEach(clone => resultsList.appendChild(clone));
                    fadeIn(resultsTab);
                }
            } else {
                resultsTab.style.display = 'none';
                resultsList.innerHTML = '';
                if (tabs.length > 0) tabs[0].click();
            }
        });
    }
});
