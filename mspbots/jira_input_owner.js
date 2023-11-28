// ==UserScript==
// @name         Jira Auto Input User
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jira.mspbots.ai/browse/MB*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mspbots.ai
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    window.onload = function () {
        //        $('#customfield_11201-field').focus(function(){
        //            consloe.log(11111111111111)
        //            $('#customfield_11201-field').val('Leo Yang')
        //        })
        setInterval(dev_name, 2000)
    }

    var dev_name = function () {
        var dev = document.getElementById('customfield_11201-field');
        var qa = document.getElementById('customfield_11200-field');
        dev.onfocus = function () {
            dev.value = 'Leo Yang'
        }
        qa.onfocus = function () {
            qa.value = 'Leo Yang'
        }

    }
})();