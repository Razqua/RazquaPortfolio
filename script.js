document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const quickAccessItems = document.querySelectorAll('.item');
    const contentAreas = document.querySelectorAll('.tab-content');
    const tabsContainer = document.querySelector('.tabs');
    const resumeDownloadLink = document.getElementById('resume-download-link');
    let tabCounter = 1;

    function switchTab(tabElement, contentId) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        tabElement.classList.add('active');

        contentAreas.forEach(content => {
            if (content.id === contentId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    function createTab(contentId, tabTitle) {
        const newTab = document.createElement('div');
        newTab.className = 'tab';
        newTab.setAttribute('data-content', contentId);
        newTab.innerHTML = `${tabTitle} <span class="tab-close">&times;</span>`;
        tabsContainer.appendChild(newTab);

        newTab.querySelector('.tab-close').addEventListener('click', () => {
            newTab.classList.add('fade-out');
            setTimeout(() => {
                const tabs = document.querySelectorAll('.tab');
                const tabIndex = Array.from(tabs).indexOf(newTab);

                newTab.remove();
                document.getElementById(contentId).classList.remove('active');

                if (tabs.length > 1) {
                    const nextTab = tabs[tabIndex + 1] || tabs[tabIndex - 1];
                    if (nextTab) {
                        switchTab(nextTab, nextTab.getAttribute('data-content'));
                    }
                }

                if (document.querySelectorAll('.tab').length === 0) {
                    document.getElementById('home').classList.add('active');
                    document.querySelector('.sidebar-item[data-content="home"]').classList.add('active');
                }
            }, 300);
        });

        newTab.addEventListener('click', () => {
            switchTab(newTab, contentId);
        });

        switchTab(newTab, contentId);
    }

    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const contentId = item.getAttribute('data-content');

            if (contentId === 'resume') {
                resumeDownloadLink.click();
            } else {
                let existingTab = document.querySelector(`.tab[data-content="${contentId}"]`);
                if (!existingTab) {
                    createTab(contentId, item.textContent.trim());
                } else {
                    switchTab(existingTab, contentId);
                }
            }
        });
    });

    quickAccessItems.forEach(item => {
        item.addEventListener('click', () => {
            const contentId = item.getAttribute('data-content');

            if (contentId === 'resume') {
                resumeDownloadLink.click();
            } else {
                let existingTab = document.querySelector(`.tab[data-content="${contentId}"]`);
                if (!existingTab) {
                    createTab(contentId, item.querySelector('span').textContent.trim());
                } else {
                    switchTab(existingTab, contentId);
                }
            }
        });
    });

    document.querySelector('.sidebar-item[data-content="home"]').click();

    resumeDownloadLink.addEventListener('click', event => {
        event.stopPropagation();
    });
});
