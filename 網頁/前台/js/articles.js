var articleId = 1;
var memberId = 1;
var articleTypeId = 1;
var articleTitle = "";
var articlePostContent = "";
var articlePostTime = "";
var articleModified = "";
var articleLike = 1;
var articleStatus = "";
var saveMemberName = "";
// var saveArticleTypeContent = "";
var savearticleTitle = sessionStorage.getItem("saveArticleTitle");
const saveMemberId = sessionStorage.getItem("memberId");


$(document).ready(async function init() {
    console.log("js載入成功");
    if(saveMemberId==null){
        var button = document.querySelector('button.btn_createArticle');
        button.setAttribute('disabled','disabled');
        // $("button.btn_addArticle").addClass("-disabled")
    }
    try {
        const response = await $.ajax({
            url: "http://localhost:8080/Front-end/Article",
            type: "Post",
            data: {
                "action": "showAll"
            },
            dataType: "json"
        });

        let repeat = Array();
        let list_button = "";
        repeat.push("");

        for (let i = 0; i < response.length; i++) {
            let list_html = "";
            let articleId = response[i].articleId;
            let memberId = response[i].memberId;
            let articleTypeId = response[i].articleTypeId;
            let articleTitle = response[i].articleTitle;
            let articlePostTime = response[i].articlePostTime;
            let articleLike = response[i].articleLike;
            let articleStatus = response[i].articleStatus;

            const memberResponse = await $.ajax({
                url: "http://localhost:8080/Front-end/Article",
                type: "Post",
                data: {
                    "memberId": memberId,
                    "action": "getMemberName"
                },
                dataType: "json"
            });

            let saveMemberName = memberResponse.mnemberName;

            const articleTypeResponse = await $.ajax({
                url: "http://localhost:8080/Front-end/Article",
                type: "Post",
                data: {
                    "articleTypeId": articleTypeId,
                    // "action": "searchIDAndContent",
                    "type": "Number"
                },
                dataType: "json"
            });

            const commentResponse = await $.ajax({
                url: "http://localhost:8080/Front-end/Article",
                type: "Post",
                data: {
                    "articleId": articleId,
                    "action": "showComment"
                },
                dataType: "json",
            });

            let saveCommentCount = commentResponse.length

            saveArticleTypeContent = articleTypeResponse.articleTypeContent;

            if (articleStatus == "0") {
                let repeatLength = repeat.length;
                for (let i = 0; i < repeatLength; i++) {
                    if (!repeat.includes(saveArticleTypeContent)) {
                        repeat.push(saveArticleTypeContent);
                        list_button = `<button class="searchArticleType">#${saveArticleTypeContent}</button>`;
                        $("div.btn").append(list_button);
                    }
                }

                list_html += `<tr class="tr">
                    <td>
                        <a><p class="ID -none">${articleId}</p><p class="article text-start">讚數:${articleLike} &ensp;&ensp;留言:${saveCommentCount} &ensp;&ensp;#${saveArticleTypeContent}</p><p class="article text-center">${articleTitle}</p><p class="article text-end">${articleDateTime} by${saveUserName1}</p></a>
                    </td>
                </tr>`;
                $("#type > table > tbody").append(list_html);
            }
        }
    } catch (error) {
        console.log(error);
    }
});


$("#type").on("click", "button.search", function (e) {

    var task_name_search = $("input.text_search").val().trim(); // 將輸入的文字存下來
    if ($("input.text_search").val().trim() != "") { // 如果輸入的文字扣掉空格不為空值的話就執行
        if (!$(this).hasClass("-disabled")) { // 如果新增按鈕的class沒有"-disabled"就執行
            $.ajax({
                url: "http://localhost:8080/Front-end/Article",
                type: "Post",
                data: {
                    "articleTitle": task_name_search,
                    "action": "searchTitle"
                },
                dataType: "json",
                success: function (data) {
                    $("#type").find("button.btn_limit").remove(); // 刪除分頁按鈕
                    $("#type").find("button.btn_limit2").remove(); // 刪除分頁按鈕
                    $("#type > table > tbody").find("tr").remove(); // 刪除原網頁表格
                    if (data.length <= 10) {
                        for (let i = 0; i < data.length; i++) {
                            let list_html = "";
                            let articleId = data[i].articleId;
                            let memberID = data[i].memberID;
                            let articleTypeId = data[i].articleTypeId;
                            let articleTitle = data[i].articleTitle;
                            let articlePostTime = data[i].articlePostTime;
                            let articleLike = data[i].articleLike;
                            let articleStatus = data[i].articleStatus;

                            $.ajax({
                                url: "http://localhost:8080/Front-end/Article",
                                type: "Post",
                                data: {
                                    "userID": userID,
                                    "action": "getMemberUserName"
                                },
                                dataType: "json",
                                success: function (data) {
                                    // console.log(data);
                                    let saveMemberName = data.memberName;
                                    $.ajax({
                                        url: "http://localhost:8080/Back-end/ArticleType",
                                        type: "Post",
                                        data: {
                                            "articleTypeId": articleTypeId,
                                            "action": "searchIDAndContent",
                                            "type": "Number"
                                        },
                                        dataType: "json",
                                        success: function (data) {
                                            saveArticleTypeContent = data.articleTypeContent;
                                            if (articleStatus == "0") {
                                                list_html += `<tr class="tr">
                                                <td>
                                                    <a><p class="ID -none">${articleID}</p><p class="article text-start">讚數:${articleLike} &ensp;&ensp;留言:0 &ensp;&ensp;#${saveArticleTypeContent}</p><p class="article text-center">${articleTitle}</p><p class="article text-end">${articleDateTime} by${saveUserName1}</p></a>
                                                </td>
                                                </tr>`;
                                                $("#type > table > tbody").append(list_html); // 加入網頁表格中
                                            }
                                        },
                                    })
                                }
                            });
                        }

                    } else if (data.length > 10) {
                        for (let i = 0; i < 10; i++) {
                            let list_html = "";
                            let articleId = data[i].articleId;
                            let memberID = data[i].memberID;
                            let articleTypeId = data[i].articleTypeId;
                            let articleTitle = data[i].articleTitle;
                            let articlePostTime = data[i].articlePostTime;
                            let articleLike = data[i].articleLike;
                            let articleStatus = data[i].articleStatus;

                            $.ajax({
                                url: "http://localhost:8080/Front-end/Article",
                                type: "Post",
                                data: {
                                    "userID": userID,
                                    "action": "getMemberName"
                                },
                                dataType: "json",
                                success: function (data) {
                                    // console.log(data);
                                    let saveMemberName = data.memberName;
                                    $.ajax({
                                        url: "http://localhost:8080/Back-end/ArticleType",
                                        type: "Post",
                                        data: {
                                            "articleTypeID": articleTypeID,
                                            "action": "searchIDAndContent",
                                            "type": "Number"
                                        },
                                        dataType: "json",
                                        success: function (data) {
                                            saveArticleTypeContent = data.articleTypeContent;
                                            if (articleStatus == "0") {
                                                list_html += `<tr class="tr">
                                                <td>
                                                    <a><p class="ID -none">${articleId}</p><p class="article text-start">讚數:${articleLike} &ensp;&ensp;留言:0 &ensp;&ensp;#${saveArticleTypeContent}</p><p class="article text-center">${articleTitle}</p><p class="article text-end">${articleDateTime} by${saveUserName1}</p></a>
                                                </td>
                                                </tr>`;
                                                $("#type > table > tbody").append(list_html); // 加入網頁表格中
                                            }
                                        },
                                    })
                                }
                            });
                        }
                    }
                }
            });

        } else {
            alert("搜尋不可為空");
        }
    }
});