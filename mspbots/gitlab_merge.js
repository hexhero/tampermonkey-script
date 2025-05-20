// ==UserScript==
// @name         Fast Merge
// @namespace    https://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Leo Yang
// @match        https://gitlab.mspbots.ai/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mspbots.ai
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var pathname = window.location.pathname;
    if(pathname.lastIndexOf('/-/') != -1){
        pathname = pathname.substr(0,pathname.lastIndexOf('-')) + '-/merge_requests/new'
    }else{
        pathname = pathname + '/-/merge_requests/new'
    }

    var margeDiv = document.createElement('div');
    var projectId = document.getElementsByTagName("body")[0].getAttribute('data-project-id');
    var confs = [
//        {
//            name:'new',
//            url:pathname
//        },
        {
            name:'🚀master → INT',
            url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=master&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=INT`
        },
        {
            name:'🚀main → INT',
            url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=main&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=INT`
        },
        {
            name:'🚀hotfix → release',
            url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=hotfix&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=release`
        },
        {
            name:'🚀master → release',
            url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=master&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=release`
        },
        {
            name:'🚀main → release',
            url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=main&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=release`
        },
        {
            name:'🚀INT → release',
            url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=INT&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=release`
        }
    ]
    var dom = document.querySelector('li[data-track-label="merge_requests_menu"] .sidebar-sub-level-items')
    dom.setAttribute('class','sidebar-sub-level-items')
    for (var i in confs){
        var conf = confs[i]
        var _template =
`
<li data-track-label="audit_events" class=""><a aria-label="${conf.name}" class="gl-link" data-qa-selector="sidebar_menu_item_link" data-qa-menu-item="${conf.name}" href="${conf.url}"><span>
${conf.name}
</span>
</a></li>
`
        dom.appendChild(new DOMParser().parseFromString(_template,'text/html').documentElement.getElementsByTagName('li')[0])

    }
})();
