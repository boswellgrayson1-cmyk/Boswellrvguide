document.addEventListener('DOMContentLoaded', function () {
    var consentKey = 'boswell_cookie_consent';
    var measurementId = window.GA_MEASUREMENT_ID || 'G-YVX5B5X9G1';

    function getStoredConsent() {
        try {
            return localStorage.getItem(consentKey);
        } catch (error) {
            return null;
        }
    }

    function setStoredConsent(value) {
        try {
            localStorage.setItem(consentKey, value);
        } catch (error) {
        }
    }

    function loadGoogleAnalytics() {
        if (!measurementId || window.__boswellGaLoaded) {
            return;
        }

        window.__boswellGaLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', measurementId);

        var gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
        document.head.appendChild(gaScript);
    }

    function hideBanner() {
        var existingBanner = document.querySelector('.cookie-banner');
        if (existingBanner) {
            existingBanner.remove();
        }
    }

    function showBanner() {
        if (document.querySelector('.cookie-banner')) {
            return;
        }

        var banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = '<div class="cookie-banner-content"><p>We use cookies and analytics to improve your experience and measure traffic. You can accept or decline analytics tracking.</p><div class="cookie-banner-actions"><button type="button" class="cookie-banner-btn">Accept</button><button type="button" class="cookie-banner-btn secondary">Decline</button></div></div>';
        document.body.appendChild(banner);

        var acceptButton = banner.querySelector('.cookie-banner-btn');
        var declineButton = banner.querySelector('.cookie-banner-btn.secondary');

        acceptButton.addEventListener('click', function () {
            setStoredConsent('accepted');
            loadGoogleAnalytics();
            hideBanner();
        });

        declineButton.addEventListener('click', function () {
            setStoredConsent('declined');
            hideBanner();
        });
    }

    function injectPreferencesLink() {
        var footer = document.querySelector('footer');
        if (!footer || footer.querySelector('.cookie-preferences-link')) {
            return;
        }

        var wrapper = document.createElement('p');
        var link = document.createElement('a');
        link.href = '#';
        link.className = 'cookie-preferences-link';
        link.textContent = 'Cookie Preferences';

        link.addEventListener('click', function (event) {
            event.preventDefault();
            showBanner();
        });

        wrapper.appendChild(link);
        footer.appendChild(wrapper);
    }

    injectPreferencesLink();

    var storedConsent = getStoredConsent();
    if (storedConsent === 'accepted') {
        loadGoogleAnalytics();
        return;
    }

    if (storedConsent !== 'declined') {
        showBanner();
    }
});