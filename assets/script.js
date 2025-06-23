document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll(".pdl-tab");
    const groups = document.querySelectorAll(".pdl-group");
    const searchInput = document.getElementById("pdl-search");
    const resultsTab = document.getElementById("pdl-tab-results");
    const resultsList = resultsTab ? resultsTab.querySelector("ul") : null;

    // Tab click behavior
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const letter = this.getAttribute('data-letter');

            groups.forEach(group => group.style.display = 'none');
            tabs.forEach(t => t.classList.remove('active'));

            const target = document.getElementById('pdl-tab-' + letter);
            if (target) target.style.display = 'block';
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

                document.querySelectorAll('.pdl-group ul li').forEach(li => {
                    const text = li.textContent.toLowerCase();
                    if (text.includes(query)) {
                        resultsList.appendChild(li.cloneNode(true));
                    }
                });

                if (resultsList.children.length > 0) {
                    resultsTab.style.display = 'block';
                    resultsTab.style.display = 'block';
                }
            } else {
                resultsTab.style.display = 'none';
                resultsList.innerHTML = '';
                if (tabs.length > 0) tabs[0].click();
            }
        });
    }
});
