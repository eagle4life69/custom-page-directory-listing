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

            groups.forEach(group => {
                const items = group.querySelectorAll('li');
                let hasVisibleItem = false;

                items.forEach(li => {
                    const text = li.textContent.toLowerCase();
                    const match = text.includes(query);
                    li.style.display = match ? '' : 'none';
                    if (match) hasVisibleItem = true;
                });

                group.style.display = hasVisibleItem ? 'block' : 'none';
            });

            // Clear tab highlighting if searching
            if (query.length > 0) {
                tabs.forEach(t => t.classList.remove('active'));
            } else {
                // Restore first tab if search is cleared
                if (tabs.length > 0) {
                    tabs[0].click();
                }
            }
        });
    }
});
