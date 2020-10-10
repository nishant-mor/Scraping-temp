const puppeteer = require('puppeteer');
const async1 = require('async');
var names = require('./names');

var TOTAL = 4;

async function hit(name, email, url, cb) {
	console.log("email : ", email);
	console.log("name: ", name);
	setTimeout(function (argument) {
		return cb();
	}, 5000);
	const browser = await puppeteer.launch({
		headless: true,
	});
	const page = await browser.newPage();
	await page.goto(url, {
		waitUntil: 'load',
		timeout: 0
	});

	await page.click('body > div.body-widget > div > div > div.popup-blocks-container > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div > form > fieldset.center > div > ul > li:nth-child(1) > a');

	//await page.waitForSelector('[name="email"]'); 
	await page.waitForSelector('[name="name"]');

	await page.focus('[name="name"]'); // Focus on Email
	await page.keyboard.type(name);

	await page.keyboard.press('Tab', {
		delay: 100
	});
	await page.keyboard.type(email);

	// Continue Click 
	//await page.click('body > div.body-widget > div > div > div.popup-blocks-container > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div > form > div > span:nth-child(1) > button > span.ng-scope');

	await page.waitForSelector('body > div.body-widget > div > div > div.popup-blocks-container > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div > form > div > span:nth-child(1) > button > span.ng-scope');
	await new Promise(r => setTimeout(r, 1000)) // add wait ;

	await page.click('body > div.body-widget > div > div > div.popup-blocks-container > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div > form > div > span:nth-child(1) > button > span.ng-scope');

	await new Promise(r => setTimeout(r, 1000)) // add wait ;

	await page.click('#em4283736 > a > span.text.user-links.ng-scope');
	await new Promise(r => setTimeout(r, 1000)) // add wait ;

	await page.click('#em4283736 > div > div > form > div.form-compact__content.center > div:nth-child(2) > a');

	await browser.close();


};


function generate_email(name) {

	var min = 10000;
	var max = 100000000;
	var random1 = Math.floor(Math.random() * (+max - +min) + +min);
	var random2 = Math.floor(Math.random() * (+max - +min) + +min);


	var prov = ['gmail.com', 'hotmail.com', 'yahoomail.com'];
	name = name.replace('/', '');
	name = name.replace('@', '');
	name = name.replace(',', '');
	name = name.replace('\\', '');
	name = name.replace('.', '');

	var out = name.split(' ');
	out.push(Math.floor(Math.random() * 1000));
	if (Math.floor(Math.random() * 2)) {
		out.push(random1);
	}
	if (Math.floor(Math.random() * 2)) {
		out.push(random2);
	}
	if (Math.floor(Math.random() * 2)) {
		out.push('.');
	}
	if (Math.floor(Math.random() * 2)) {
		out.push('-');
	}
	out.sort(function () {
		return .5 - Math.random();
	});
	if (out[0] == '.' || out[0] == '-') {
		out[0] = '1';
	}
	if (out[out.length - 1] == '.' || out[out.length - 1] == '-') {
		out[out.length - 1] = '1';
	}
	var f_email = out.join('').replace(' ', '');
	if (f_email[f_email.length - 1] == '.' || f_email[f_email.length - 1] == '-') {
		f_email[f_email.length - 1] = '1';
	}
	f_email = f_email + '@' + prov[Math.floor(Math.random() * prov.length)];

	return f_email;
}

var count = 0;
(async function () {
	var url = process.env.URL || "https://wn.nr/7t5hSS";

	names.sort(function () {
		return .5 - Math.random();
	});

	async1.eachSeries(names, function (user, callback) {
		if (count > TOTAL) return callback();
		count++;
		var name = user.name;
		var email = generate_email(name);
		name = name.replace('/', '');
		name = name.replace('@', '');
		name = name.replace(',', '');
		name = name.replace('\\', '');
		hit(name, email, url , function (err, res) {
			console.log(err, res);
			setTimeout(function () {
				return callback()
			}, 1000);
		});
	});

})();