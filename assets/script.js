document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll(".pdl-tab");
    const groups = document.querySelectorAll(".pdl-group");

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

    // Auto-open the first tab in order
    if (tabs.length > 0) {
        tabs[0].click();
    }
});
