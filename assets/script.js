document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll(".pdl-tab");
    const groups = document.querySelectorAll(".pdl-group");
    const searchInput = document.getElementById("pdl-search");

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

    // Search functionality
if (searchInput) {
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        const resultsTab = document.getElementById('pdl-tab-results');
        const resultsList = resultsTab.querySelector('ul');
        resultsList.innerHTML = '';

        if (query.length > 0) {
            tabs.forEach(t => t.classList.remove('active'));
            groups.forEach(group => group.style.display = 'none');

            let matchCount = 0;
            document.querySelectorAll('.pdl-group ul li').forEach(li => {
                const text = li.textContent.toLowerCase();
                if (text.includes(query)) {
                    const clone = li.cloneNode(true);
                    resultsList.appendChild(clone);
                    matchCount++;
                }
            });

            if (matchCount > 0) {
                resultsTab.style.display = 'block';
            } else {
                resultsTab.style.display = 'none';
            }

        } else {
            // Reset to first alphabetical tab
            resultsTab.style.display = 'none';
            if (tabs.length > 0) tabs[0].click();
        }
    });
}
});
