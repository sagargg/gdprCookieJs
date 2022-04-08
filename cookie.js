class CookiesConsent {
	constructor(ckcCookies) {
		this.cookiesList = ckcCookies
		this.selected = []
		this.ckcCookie = {
			timestamp: null,
			consents_approved: this.selected
		}
	}

	init() {
		var callback = this

		// Check if cookie consent has to be displayed.
		this.showCookieConsent();

		// Allow scrips if cookies are already selected. 
		this.initializeCookie();

		// Add custom cookie addordion based on cookie list.
		var cookieeContainer = document.getElementsByClassName("ckc-accordion-wrapper")[0];
		var cookieAccordion = ''
		this.cookiesList.forEach(cookie => {
			cookieAccordion += `
            <div class="ckc-accordion-item">
                    <div class="ckc-accordion-header">
                            <div class="ckc-accordion-title">
                                    <h3>${cookie.type}</h3>
                                    <label class="ckc-preference-slider" 	${cookie.type === 'necessary' ? 'style="opacity:60%;"' : ''}>
                                            <input type="checkbox" class="ckc-cookie-input-toggle" data-target="${cookie.type}" 
                                            ${cookie.type === 'necessary' ? 'checked disabled' : ''}>
                                            <span></span>
                                    </label>
                            </div>
                            <p>${cookie.description}</p>
                    </div>
                    <div class="ckc-accordion-panel">
                        ${this.generateCookieTable(cookie.cookies)}
                    </div>
            </div>`
			cookieeContainer.innerHTML = cookieAccordion;
		})

		// Show hide cookie list in accordion
		var acc = document.getElementsByClassName("ckc-accordion-header");
		var i;
		for (i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function () {
				this.classList.toggle("active");
				var panel = this.nextElementSibling;
				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			});
		}
		var toggleCustomize = document.getElementsByClassName("ckc-button-customize");
		toggleCustomize[0].addEventListener('click', function (event) {
			var customize = document.getElementsByClassName("ckc-preference-container")
			customize[0].classList.toggle("ckc-preference-show");
		});

		// get selected cookie from UI
		var toggleCookieInput = document.querySelectorAll(".ckc-cookie-input-toggle");
		toggleCookieInput.forEach(function (input) {
			input.addEventListener('change', function () {
				if (this.checked) {
					callback.selected.push(this.getAttribute('data-target'))
				} else {
					callback.selected.pop(this.getAttribute('data-target'))
				}
			});
		})


		// On save selected cookies action 
		var preferenceSave = document.getElementsByClassName("ckc-preference-save-btn")[0];
		preferenceSave.addEventListener('click', function () {
			callback.saveSelectedCookie()
		})

		// On allow all cookies action
		var elAllowCookieAction = document.getElementsByClassName("ckc-button-accept")[0];
		elAllowCookieAction.addEventListener('click', function () {
			callback.selected = callback.cookiesList.map(cookie => cookie.type);
			callback.AllowAllCookie()
		});
	}

	saveSelectedCookie() {
		// save analytics cookie if it's selected
		this.selected.forEach(function (type) {
			var scripts = document.querySelectorAll(`[data-cookie-type=\'${type}\'`);
			scripts.forEach(function (el) {
				el.type = 'application/javascript'
				el.parentNode.insertBefore(el, el)
			})
		})
		this.ckcCookie.timestamp = new Date().toISOString()
		this.ckcCookie.consents_approved = this.selected
		this.setCcookie(JSON.stringify(this.ckcCookie), 365)
		this.showCookieConsent()
	}

	AllowAllCookie() {
		this.selected.forEach(function (type) {
			var scripts = document.querySelectorAll(`[data-cookie-type=\'${type}\'`);
			scripts.forEach(function (el) {
				el.type = 'application/javascript'
				el.parentNode.insertBefore(el, el)
			})
		});
		this.ckcCookie.timestamp = new Date().toISOString();
		this.ckcCookie.consents_approved = this.selected
		this.setCcookie(JSON.stringify(this.ckcCookie), 365);
		this.showCookieConsent();
	}

	setCcookie(ckcCookieValue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = '_ckc' + "=" + encodeURIComponent(ckcCookieValue) + ";" + expires + ";path=/";
	};

	getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	};

	showCookieConsent() {
		var cookie = this.getCookie('_ckc')
		var cookieConsent = document.getElementsByClassName("ckc-container")[0];
		if (cookie) {
			cookieConsent.hidden = true;
		} else {
			cookieConsent.hidden = false;
		}
	}

	initializeCookie() {
		var cookie = this.getCookie('_ckc')
		if (cookie) {
			var consentsApproved = JSON.parse(cookie).consents_approved
			this.cookiesList = consentsApproved
			consentsApproved.forEach(function (type) {
				var scripts = document.querySelectorAll(`[data-cookie-type=\'${type}\'`);
				scripts.forEach(function (el) {
					el.type = 'application/javascript'
					el.parentNode.insertBefore(el, el)
				})
			})
		}
	}

	generateCookieTable(cookie) {
		if (!cookie.length) return ''
		var rowString = ''

		cookie.forEach(cc => {
			rowString += `<tr>
                    <td>${cc.name}</td>
                    <td>${cc.duration} </td>
                    <td>${cc.description}</td>
                 </tr>`
		})
		var cookieTable = `
                    <table class="ckc-cookie-table">
                        <thead>
                            <tr>
                                <th>Cookie</th>
                                <th>Duration</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowString}
                        </tbody>
                    </table>
                    `
		return cookieTable
	}
}
