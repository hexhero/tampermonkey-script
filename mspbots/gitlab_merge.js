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

    var projectId = document.getElementsByTagName("body")[0].getAttribute('data-project-id');
    var confs = [
        {
            name:'🚀master → INT',
            url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=master&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=INT`
        },
        {
            name:'🚀main → INT',
            url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=main&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=INT`
        },
        // {
        //     name:'🚀hotfix → release',
        //     url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=hotfix&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=release`
        // },
        // {
        //     name:'🚀master → release',
        //     url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=master&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=release`
        // },
        // {
        //     name:'🚀main → release',
        //     url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=main&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=release`
        // },
        // {
        //     name:'🚀INT → release',
        //     url:`${pathname}?merge_request[source_project_id]=${projectId}&merge_request[source_branch]=INT&merge_request[target_project_id]=${projectId}&merge_request[target_branch]=release`
        // }
    ]

    var margeDiv = document.createElement('div');
    // 创建浮动面板样式
    margeDiv.style.position = 'fixed';
    margeDiv.style.bottom = '80px';
    margeDiv.style.left = '30px';
    margeDiv.style.zIndex = '9999';
    margeDiv.style.background = '#fff';
    margeDiv.style.border = '1px solid #ccc';
    margeDiv.style.borderRadius = '8px';
    margeDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    margeDiv.style.padding = '12px 16px';
    margeDiv.style.minWidth = '180px';

    // 标题
    var title = document.createElement('div');
    title.textContent = '快速合并';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '8px';
    margeDiv.appendChild(title);

    // 添加a标签
    confs.forEach(function(conf) {
        var a = document.createElement('a');
        a.textContent = conf.name;
        a.href = conf.url;
        a.target = '_blank';
        a.style.display = 'block';
        a.style.margin = '6px 0';
        a.style.color = '#007bff';
        a.style.textDecoration = 'none';
        a.onmouseover = function() { a.style.textDecoration = 'underline'; };
        a.onmouseout = function() { a.style.textDecoration = 'none'; };
        margeDiv.appendChild(a);
    });

    // 添加到页面
    document.body.appendChild(margeDiv);

})();
