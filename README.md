### GDPR Cookie Consent.
A custom javascript code that displays a GDPR-compliant cookie consent UI. It is built in vanilla js so it work without Jquery.

### Example of cookie conset in Default Styling
<img width="1440" alt="Screen Shot 2022-04-08 at 8 49 52 PM" src="https://user-images.githubusercontent.com/87696933/162469675-4887a059-6431-4206-b242-c3ea8f310294.png">

### Installation
1. Copy the required [html elements](https://github.com/sagargg/gdprCookieJs/blob/master/index.html#L23-L64) into you're code base.
2. Import [css resource ](https://github.com/sagargg/gdprCookieJs/blob/master/cookie.css) into you're code base. By default it has basic styling but you can update as per your needs. 
3. Import [js resource ](https://github.com/sagargg/gdprCookieJs/blob/master/cookie.js) into you're code base.
4. Hold the cookie being added from the third party apps or js script  `type="text/plain"` and also provide cookie type `data-cookie-type="analytics"`. 
5. You can specify own cookie type in cookies object like `necessary`, `functional` etc. See the example below. 
```javascript 
<script type="text/plain" data-cookie-type="analytics">
  document.getElementById('ga-gtag').src = 'https://www.googletagmanager.com/gtag/js?id=UA-164233680-1'
  window.dataLayer = window.dataLayer || []
	function gtag() {
		dataLayer.push(arguments)
	}
	gtag('js', new Date())
	gtag('config', 'UA-164233680-1')
	
</script>
```
6. Create cookie object with reqired information

``` javascript
Cookies = [{
        type: 'necessary',
        description: 'Necessary cookies enable core functionality such as security, network management, and accessibility.  
              You may disable these by changing your browser settings, but this may affect how the website functions.',
        cookies: []
    },
    {
        type: 'analytics',
        description: 'Analytical cookies are used to understand how visitors interact with the website. These cookies help 
             provide information on metrics such as the number of visitors, bounce rate, traffic source, etc',
        cookies: [{
                name: '_ga',
                duration: '2 year',
                description: 'The _ga cookie, installed by Google Analytics, calculates visitor, session and 
                campaign data and also keeps track of site usage for the site\'s analytics report. The cookie 
                stores information anonymously and assigns a randomly generated number to recognize unique visitors.'
            },
            {
                name: '_gid',
                duration: '1 year',
                description: 'Installed by Google Analytics, _gid cookie stores information on how visitors use a 
                website, while also creating an analytics report of the website\'s performance. Some of the data that
                are collected include the number of visitors, their source, and the pages they visit anonymously.'
            },
            {
                name: '_gat_gtag_UA-164233680-1',
                duration: '1 year',
                description: 'A variation of the _gat cookie set by Google Analytics and Google Tag Manager to allow 
                website owners to track visitor behaviour and measure site performance. The pattern element in the name 
                contains the unique identity number of the account or website it relates to.'
            }
        ]
    }
]
```
5. Instantiate and initilize cookie consent providing cookies infomation object.
``` javascript 
  var CKC = new CookiesConsent(Cookies)
  CKC.init()
```

### License
This plugin is available under the [MIT license](https://github.com/acoustep/gdpr-cookie/blob/master/LICENSE.md).


