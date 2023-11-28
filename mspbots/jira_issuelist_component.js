// ==UserScript==
// @name         Ticket View
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jira.mspbots.ai/issues/?jql=**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mspbots.ai
// @grant        none

// ==/UserScript==

(function () {
    'use strict';

    var source = `
<div>
    <style>
        .plug_main {
            /* 内容居中 */
            text-align: center;

        }

        .plug_main span{
            margin-left: 30px;
        }
    </style>

    <div class="plug_main">
        <span class="plug_users">
            | <input type="checkbox" name="Leo.Yang" id="1"> Leo.Yang 
            <input type="checkbox" name="Vow.Meng" id="2"> Vow.Meng
            <input type="checkbox" name="Jerry.Sun" id="3"> Jerry.Sun 
            <input type="checkbox" name="Yuki.Wang" id="4"> Yuki.Wang |
        </span>
        <span>
            <input type="checkbox" name="TBD" id="TBD"> TBD
        </span>
    </div>

</div>
`
    var tardiv = $(".issue-search-header").children().eq(0);
    tardiv.after($(source))

    $("input[type='checkbox']").change(function () {
        var arr = [];
        $(".plug_users input[type='checkbox']:checked").each(function () {
            arr.push($(this).attr("name"));
        });
        var tbd = ' AND fixVersion != TBD'
        // 判断TBD是否被选中
        if ($("#TBD").is(":checked")) {
            tbd = ''
        }
        var str = arr.join(",");
        var url = `project = 10000 AND status  not in (Closed, Reviewed) AND assignee in (${str}) ${tbd} ORDER BY assignee ASC, fixVersion ASC, created ASC`
        //在当前页打开url
        if (str.length > 0)
            $('#advanced-search').val(url)
    })

})();