const myProductName = "opmlToGitHub", myVersion = "0.4.0"; 

const opmlToJs = require ("opmltojs");
const request = require ("request");
const utils = require ("daveutils");
const fs = require ("fs");
const davegithub = require ("davegithub"); 

var urlOpmlFile = "http://electricserver.scripting.com/users/davewiner/electric/nightlyArchive.opml";

const config = {
	username: "scripting",
	repo: "test1",
	password: "", //overwritten when we load config.json
	committer: {
		name: "Dave Winer",
		email: "dave.winer@gmail.com"
		},
	message: "Demo of opmlToGitHub",
	userAgent: "Dave's opmlToGitHub demo app",
	titleHeaderMarkdown: "# ",
	topLevelHeaderMarkdown: "### "
	};

function uploadToGithub (path, data, type, callback) {
	const options = {
		username: config.username,
		repo: config.repo,
		password: config.password,
		repoPath: path,
		data: data,
		type: (type === undefined) ? "text/plain" : type,
		committer: config.committer,
		message: config.message,
		userAgent: config.userAgent
		};
	davegithub.uploadFile (options, function (err, response, body) {
		console.log ("uploadToGithub: path == " + path + ", status == " + response.statusCode);
		if (callback !== undefined) {
			callback ();
			}
		});
	}
function opmlToMarkdown (opmltext, options, callback) {
	var mdtext = "", indentlevel = 0;
	function add (s) {
		mdtext += utils.filledString ("\t", indentlevel) + s + "\n\n";
		}
	function addSubs (head) {
		for (var i = 0; i < head.subs.length; i++) {
			var sub = head.subs [i];
			add (sub.text);
			}
		}
	opmlToJs.parse (opmltext, function (theOutline) {
		if (theOutline === undefined) {
			console.log ("There was an error parsing the OPML text.");
			}
		else {
			add (config.titleHeaderMarkdown + theOutline.opml.head.title);
			for (var i = 0; i < theOutline.opml.body.subs.length; i++) {
				var topHead = theOutline.opml.body.subs [i];
				add (config.topLevelHeaderMarkdown + topHead.text);
				addSubs (topHead);
				}
			if (callback !== undefined) {
				callback (mdtext);
				}
			}
		});
	}

fs.readFile ("config.json", function (err, data) { //contains the github password, primarily but could override elements of config
	if (err) {
		console.log ("error opening config.json == " + err.message);
		}
	else {
		const jstruct = JSON.parse (data);
		for (var x in jstruct) {
			config [x] = jstruct [x];
			}
		console.log ("config == " + utils.jsonStringify (config));
		request (urlOpmlFile, function (err, response, data) {
			opmlToMarkdown (data, config, function (mdtext) {
				uploadToGithub ("test.md", mdtext, "text/markdown");
				});
			});
		}
	});
