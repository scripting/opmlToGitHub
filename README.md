# opmlToGitHub

A Node demo app that reads an OPML file, converts it to Markdown, and uploads it to GitHub. 

### Why

I write my readme files with <a href="http://littleoutliner.com/">LO2</a>, its native file format is OPML. I wanted an easy way to publish these files to GitHub. This code is incorporated in the <a href="https://github.com/scripting/oldSchoolNightly/blob/master/oldschoolnightly.js">oldSchoolNightly</a> app. 

### What it does

It reads the OPML for a readme file I wrote documenting how my nightly archiving script works, converts it to Markdown and uploads it to a <a href="https://github.com/scripting/test1/blob/master/test.md">test</a> repository. 

### How to test

In the config struct, change <i>username</i> and <i>repo</i> to point to a repository of your own on GitHub. 

Edit config.json, replace the value of <i>password</i> with your GitHub password. Highly recommend you never type the text of your password into source code. 

Change the other elements of config to reflect your own usage.

### Questions

If you have a question post an issue <a href="https://github.com/scripting/opmlToGitHub/issues">here</a>. 

