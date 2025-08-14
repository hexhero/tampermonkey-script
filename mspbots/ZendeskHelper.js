// ==UserScript==
// @name         ZendeskHelper
// @namespace    http://tampermonkey.net/
// @version      2025-08-14
// @description  try to take over the world!
// @author       You
// @match        https://mspbotsai.zendesk.com/agent/tickets/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zendesk.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const currentUrl = window.location.href;
    const match = currentUrl.match(/tickets\/(\d+)/);
    const ticketId = match ? match[1] : null;

    const url = `https://mspbotsai.zendesk.com/api/v2/tickets/${ticketId}?remove_duplicate_fields=true&include=organizations`


    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP 错误！状态码：${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        var org = data.organizations[0]
        // 创建悬浮框元素
        const box = document.createElement('div');
        box.id = 'floating-box';
        box.style.position = 'fixed';
        box.style.bottom = '60px';
        box.style.right = '20px';
        box.style.width = '200px';
        box.style.height = '100px';
        box.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        box.style.color = '#fff';
        box.style.padding = '10px';
        box.style.borderRadius = '8px';
        box.style.zIndex = '9999';
        box.style.cursor = 'move';
        box.innerHTML = `<strong>${org.domain_names[0]} / MRR:${org.organization_fields.total_mrr} </strong><br/>${org.organization_fields.mspbots_tenant_code_org_field}
<br/><a href='zdticket:ticket_analyze ${ticketId} Public_Reply azure '>Public Reply</a> / <a href='zdticket:ticket_analyze ${ticketId} Reply azure '>Reply</a>
<br/><a href='zdticket:ticket_analyze ${ticketId} Common_Reply azure '>Internal Reply</a> / <a href='zdticket:ticket_analyze ${ticketId} RCA azure '>RCA</a>
<br/><a href='zdticket:ticket_analyze ${ticketId} Analyze azure '>Analyze</a>
`;

        document.body.appendChild(box);

        // 添加拖动功能
        let isDragging = false;
        let offsetX, offsetY;

        box.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - box.getBoundingClientRect().left;
            offsetY = e.clientY - box.getBoundingClientRect().top;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                box.style.left = (e.clientX - offsetX) + 'px';
                box.style.top = (e.clientY - offsetY) + 'px';
                box.style.bottom = '';
                box.style.right = '';
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

    })



    
})();