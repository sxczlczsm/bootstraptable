/**********************表格控件Begin 2015-10-26********************************/
var _dataGridQueryParam = [];
$.fn.dataGrid = function (option) {
    var alias = $(this).attr('id');
    var chooseRowData;
    var rowIndex;
    var columnIndex;
    var classes = "table table-bordered table-striped myTable";
    var url;
    var columns;
    var jsonData;
    var pagination = false;//是否显示分页
    var pageNumber;//当前页数
    var pageSize;//当前页码
    var pageList;//页码选项
    var sortName;//排序字段
    var sortOrder;//排序类型
    var ajaxData;//查询参数
    var buttonList;//按钮
    var detailView = false;//是否显示子节点
    var detailFormatter = function (chooseRowData, rowIndex) { return ''; };//行展开事件
    var onClickRow = function (chooseRowData, rowIndex, row) { return false; };//行点击事件
    var onExpandRow = function (chooseRowData, rowIndex) { return ''; }
    var onDblClickRow = function (chooseRowData, rowIndex, row) { return false; };//行双击事件
    var singleSelect = true;//只能选择一行
    var checkOnSelect = false;//如果为true，当用户点击行的时候该复选框就会被选中或取消选中
    var onCheck = function (chooseRowData, rowIndex, row) { return false; };//选中事件
    var onUncheck = function (chooseRowData, rowIndex, row) { return false; };//取消选中事件
    var showFooter = false;//是否显示底部合计
    var callback;
    if (typeof option === 'string') {
        //刷新
        if (option == "refresh" && _dataGridQueryParam[alias] != null) {
            jsonData = '';
            classes = _dataGridQueryParam[alias].classes;
            url = _dataGridQueryParam[alias].url;
            columns = _dataGridQueryParam[alias].columns;
            sortName = _dataGridQueryParam[alias].sortName;
            sortOrder = _dataGridQueryParam[alias].sortOrder;
            pageNumber = $('#divPage_' + alias + ' input[name="txtCurPage"]').val();
            pageSize = $('#divPage_' + alias + ' .page-size').html();
            pageList = _dataGridQueryParam[alias].pageList;
            ajaxData = _dataGridQueryParam[alias].ajaxData;
            pagination = _dataGridQueryParam[alias].pagination;
            buttonList = _dataGridQueryParam[alias].button;
            detailView = _dataGridQueryParam[alias].detailView;
            detailFormatter = _dataGridQueryParam[alias].detailFormatter;
            onExpandRow = _dataGridQueryParam[alias].onExpandRow;
            onClickRow = _dataGridQueryParam[alias].onClickRow;
            onDblClickRow = _dataGridQueryParam[alias].onDblClickRow;
            singleSelect = _dataGridQueryParam[alias].singleSelect;
            checkOnSelect = _dataGridQueryParam[alias].checkOnSelect;
            onCheck = _dataGridQueryParam[alias].onCheck;
            onUncheck = _dataGridQueryParam[alias].onUncheck;
            showFooter = _dataGridQueryParam[alias].showFooter;
            callback = _dataGridQueryParam[alias].callback;
        }
            //获取选中数据
        else if (option == "getSelected" && _dataGridQueryParam[alias] != null) {
            jsonData = _dataGridQueryParam[alias].jsonData;
            rowIndex = $('#' + alias + ' > tbody > tr[class="success"]').attr('data-index');
            return jsonData.message == undefined ? jsonData[rowIndex] : jsonData.message[rowIndex];
        }
        else if (option == "getRows") {
            jsonData = _dataGridQueryParam[alias].jsonData;
            return jsonData.length == undefined ? jsonData.rows : jsonData;
        } else if (option == "getChecked") {
            var checekedData = [];
            jsonData = _dataGridQueryParam[alias].jsonData;
            jsonData = jsonData.message == undefined ? jsonData : jsonData.message;
            $('#' + alias).find('tbody tr[class="success"]').each(function (i) {
                checekedData[i] = jsonData[$(this).attr('data-index')];
            });
            return checekedData;
        }else if(option == "getData"){
        	jsonData = _dataGridQueryParam[alias].jsonData;
        	return jsonData.message;
        }
        
    } else {
        classes = option.classes != undefined ? option.classes : classes;
        url = option.url;
        columns = option.columns;
        pagination = option.pagination == undefined ? false : option.pagination;//是否显示分页
        pageNumber = option.pageNumber;//当前页数
        pageSize = option.pageSize;//当前页码
        pageList = option.pageList;//页码选项
        sortName = option.sortName;//排序字段
        sortOrder = option.sortOrder;//排序类型
        if(option.ajaxData != undefined){
        	ajaxData = option.ajaxData;//查询参数
        }else{
        	ajaxData = new Object();
        }
        buttonList = option.button;
        detailView = option.detailView == undefined ? false : option.detailView;
        onClickRow = option.onClickRow;
        detailFormatter = option.detailFormatter;
        onExpandRow = option.onExpandRow;
        onDblClickRow = option.onDblClickRow;
        singleSelect = option.singleSelect == undefined ? singleSelect : option.singleSelect;
        checkOnSelect = option.checkOnSelect == undefined ? checkOnSelect : option.checkOnSelect;
        onCheck = option.onCheck == undefined ? onCheck : option.onCheck;
        onUncheck = option.onUncheck == undefined ? onUncheck : option.onUncheck;
        showFooter = option.showFooter == undefined ? showFooter : option.showFooter;
        callback = option.callback;
    }
    ajaxData.page = pageNumber; 
    ajaxData.size = pageSize;
    ajaxData.sortField = sortName; 
    ajaxData.sortType = sortOrder;  
    ajaxData.deleted = false;
    
    if (url != '') {
        $.ajax({
            url: url,
            data: ajaxData,
            type: 'POST',
            async: false,
            success: function (data) {
//                jsonData = JSON.parse(data);
            	jsonData = data;
                _dataGridQueryParam[alias] = {};
                _dataGridQueryParam[alias].ajaxData = ajaxData;
                _dataGridQueryParam[alias].url = url;
                _dataGridQueryParam[alias].columns = columns;
                _dataGridQueryParam[alias].classes = classes;
                _dataGridQueryParam[alias].pageSize = pageSize;
                _dataGridQueryParam[alias].pageList = pageList;
                _dataGridQueryParam[alias].sortName = sortName;
                _dataGridQueryParam[alias].sortOrder = sortOrder;
                _dataGridQueryParam[alias].pagination = pagination;
                _dataGridQueryParam[alias].button = buttonList;
                _dataGridQueryParam[alias].detailView = detailView;
                _dataGridQueryParam[alias].detailFormatter = detailFormatter;
                _dataGridQueryParam[alias].onExpandRow = onExpandRow;
                _dataGridQueryParam[alias].jsonData = jsonData;
                _dataGridQueryParam[alias].onClickRow = onClickRow;
                _dataGridQueryParam[alias].onDblClickRow = onDblClickRow;
                _dataGridQueryParam[alias].singleSelect = singleSelect;
                _dataGridQueryParam[alias].onCheck = onCheck;
                _dataGridQueryParam[alias].onUncheck = onUncheck;
                _dataGridQueryParam[alias].showFooter = showFooter;
                _dataGridQueryParam[alias].checkOnSelect = checkOnSelect;
                _dataGridQueryParam[alias].callback = callback;
                $('#divPage_' + alias).remove();
            }
        });
    }
    var page = jsonData.page;//当前页数
    var total = jsonData.total;//当前总行数
    //初始化表格样式
    var tab = $(this).addClass(classes);
    var rowData = jsonData.message == undefined ? jsonData : jsonData.message;
    //初始化表头
    var tabHeader = '<thead>';
    var tabBody = '<tbody>';
    var tfoot = '<tfoot>';
    if (detailView && rowData.length > 0) {
        tabHeader += '<th></th>';
    }
    var trHidden = '';
    $(columns).each(function (i) {
        if (columns[i].visible) {
            trHidden = 'trHidden';
        } else {
            trHidden = '';
        }
        if (sortName == columns[i].field || sortName == columns[i].realField) {
            if (columns[i].sortable)
                tabHeader += '<th name="th_' + columns[i].field + '" class="' + trHidden + ' sort ' + sortOrder + '" data-option="{ sortable:\'' + (columns[i].sortable == undefined ? false : columns[i].sortable) + '\'}" onclick="SortByField(\'' 
                + columns[i].field + '\', \'' + alias + (columns[i].realField == undefined ? '\')">' : ('\', \'' + columns[i].realField + '\')">')) + (jsonData.title != undefined ? jsonData.title[i] : columns[i].title) + '</th>';
            else
                tabHeader += '<th name="th_' + columns[i].field + '" class="' + trHidden + '">' + (jsonData.title != undefined ? jsonData.title[i] : columns[i].title) + '</th>';
        }
        else {
            //复选框
            if (columns[i].field == "ck") {
                tabHeader += '<th style="width:20px"><div class="mychecker-line"><div class="mychecker"></div></div></th>';
            } else {
                if (columns[i].sortable)
                    tabHeader += '<th name="th_' + columns[i].field + '" class="' + trHidden + '" data-option="{ sortable:\'' + (columns[i].sortable == undefined ? false : columns[i].sortable) + '\'}" onclick="SortByField(\'' 
                    + columns[i].field + '\', \'' + alias + (columns[i].realField == undefined ? '\')">' : ('\', \'' + columns[i].realField + '\')">')) + (jsonData.title != undefined ? jsonData.title[i] : columns[i].title) + '</th>';
                else
                    tabHeader += '<th name="th_' + columns[i].field + '" class="' + trHidden + '">' + (jsonData.title != undefined ? jsonData.title[i] : columns[i].title) + '</th>';
            }
        }
    });
    //初始化表格内容
    $(rowData).each(function (j) {
        tabBody += '<tr data-index="' + j + '">';
        var textAlign = 'left';
        if (detailView) {
            tabBody += '<td><a class="detailView" style="cursor: pointer;"><i class="glyphicon glyphicon-plus"></i></a></td>';
        }
        $(columns).each(function (i) {
            textAlign = columns[i].align;
            if (columns[i].visible) {
                trHidden = 'trHidden';
            } else {
                trHidden = '';
            }

            if (columns[i].formatter != undefined) {
            	if(columns[i].detail){
            		tabBody += '<td ' + 'detail="true" tdIndex="' + i + '" class="' + trHidden + '" style="text-align: ' + textAlign + '">' + columns[i].formatter(rowData[j][columns[i].field], rowData[j], j) + '</td>';
            	}else{
            		tabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + '">' + columns[i].formatter(rowData[j][columns[i].field], rowData[j], j) + '</td>';
            	}
            } else {
            	if(columns[i].field == 'statusName'){
            		if(rowData[j]['statusCode'] == '001001'){
            			rowData[j][columns[i].field] = '启用';
            		}else{
            			rowData[j][columns[i].field] = '关闭';
            		}
            	}
                //复选框
                if (columns[i].field == "ck") {
                	if(rowData[j][columns[i].relatedFiled] == true){
                		tabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + ';width:20px;"><div class="mychecker-line"><div class="mychecker" checked="checked">&#10004;</div></div></td>';
                	}else{
                		tabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + ';width:20px;"><div class="mychecker-line"><div class="mychecker"></div></div></td>';
                	}
                	
                    
                } else if(columns[i].rate == true){
                	tabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + '">' + (rowData[j][columns[i].field] == null ? "" : rowData[j][columns[i].field] + '%') + '</td>';
                } else if(columns[i].value != undefined){
                	tabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + '">' + columns[i].value + '</td>';
            	} else if(columns[i].index == true){
            		tabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + '">' + (j + 1 + (page - 1) * pageSize) + '</td>';
            	} else {
            		if(columns[i].detail){
            			tabBody += '<td ' + 'detail="true" tdIndex="' + i + '" class="' + trHidden + '" style="text-align: ' + textAlign + '">' + (rowData[j][columns[i].field] == null ? "" : rowData[j][columns[i].field]) + '</td>';
            		}else{
            			tabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + '">' + (rowData[j][columns[i].field] == null ? "" : rowData[j][columns[i].field]) + '</td>';
            		}
                }
            }
        });
        tabBody += '</tr>';
    });
    //显示底部统计数据
    if (rowData.length > 0 && showFooter) {
        var footerData = jsonData.footer;
        tfoot += '<tr><td colspan="' + columns.length + '"></td></tr><tr>';
        var textAlign = 'left';
        var footerTabBody = '';
        $(columns).each(function (i) {
            textAlign = columns[i].align;
            if (columns[i].visible) {
                trHidden = 'trHidden';
            } else {
                trHidden = '';
            }
            
            if(i == 0){
            	footerTabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + '">' + '合计' + '</td>';
            }else if (columns[i].formatter != undefined) {
                footerTabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + '">' + (footerData[0][columns[i].field] == undefined ? "" : columns[i].formatter(footerData[0][columns[i].field])) + '</td>';
            }else {
                footerTabBody += '<td class="' + trHidden + '" style="text-align: ' + textAlign + '">' + (footerData[0][columns[i].field] == undefined ? "" : footerData[0][columns[i].field]) + '</td>';
            }
        });
        tfoot += footerTabBody;
        tfoot += '</tr>'
    }
    if (rowData.length == 0) {
        tabBody += '<tr><td colspan="' + columns.length + '" style="text-align:center;">没有找到匹配的记录</td></tr>';
    }
    tabBody += '</tbody>';
    tabHeader += '</thead>';
    tfoot += '</tfoot>';
    $(this).html(tabHeader + tabBody + tfoot);
    //显示分页
    if (pagination) {
        //总页数
        var totalPages = Math.floor(total / pageSize) + (total % pageSize > 0 ? 1 : 0);
        totalPages = totalPages < 1 ? 1 : totalPages;
        var pageinationList = PageHtml(totalPages, pageNumber);
        var pageLists = '<ul class="dropdown-menu">';
        $(pageList).each(function (i) {
            if (pageSize == pageList[i])
                pageLists += '<li lang="' + pageList[i] + '" onclick="ChangePageList(this)" class="active"><a href="javascript:void(0);">' + pageList[i] + '</a></li>';
            else
                pageLists += '<li lang="' + pageList[i] + '" onclick="ChangePageList(this)"><a href="javascript:void(0);">' + pageList[i] + '</a></li>';
        });
        pageLists += '</ul>';
        var divPage = '<div id="divPage_' + alias + '" class="container-fluid"><div class="row"><div class="col-md-8 myPage">\
                        当前第 ' + page + ' 页，总共 ' + total + ' 条记录每页显示 <span class="btn-group dropup">\
                        <button data-toggle="dropdown" class="btn btn-default dropdown-toggle" type="button" aria-expanded="true"><span class="page-size">' + pageSize + '</span> <span class="caret"></span></button>\
                        ' + pageLists + '</span> 条记录</div>' + pageinationList + '</div>';
        $(this).parent().append(divPage);

        //表格按权限初始化按钮
        if (buttonList != undefined) {
            $(buttonList).each(function (i) {
                $(operatorPowerJson).each(function (j) {
                    //权限按钮
                    if (operatorPowerJson[j].functionValue == buttonList[i].id) {
                        if ($('#divPage_' + alias + ' .myPage').find('a[id="' + buttonList[i].id + '"]').attr('id') == undefined) {
                            var buttonHtml = '<a id="' + buttonList[i].id + '" class="btn btn-default myButton" title="' + buttonList[i].value + '" ><i class="' + buttonList[i].iconCls + '"></i></a>';
                            $('#divPage_' + alias + ' .myPage').append(buttonHtml);
                            $("#" + buttonList[i].id).bind('click', function (e) {
                                buttonList[i].handler(e);
                            });
                        }
                    }
                });
                //非权限按钮
                if (buttonList[i].id == undefined || buttonList[i].id == "") {
                    var buttonHtml = '<a id="' + buttonList[i].value + '" class="btn btn-default myButton" title="' + buttonList[i].value + '" ><i class="' + buttonList[i].iconCls + '"></i></a>';
                    $('#divPage_' + alias + ' .myPage').append(buttonHtml);
                    $("#" + buttonList[i].value).bind('click', function (e) {
                        buttonList[i].handler(e);
                    });
                }
            });
        }
    }
    GetBodyHeight();
    //行展开事件
    var aclick = false;
    if (detailFormatter != null) {
        $('#' + alias + ' tbody tr a.detailView').click(function () {
            var tr = $(this).parent().parent();
            if ($(this).find('i').hasClass("glyphicon-plus")) {
                rowIndex = tr.attr('data-index');
                chooseRowData = rowData[rowIndex];
                var detailHtml = '<tr><td colspan="' + (columns.length + 1) + '">';
                detailHtml += detailFormatter(chooseRowData, rowIndex);
                detailHtml += '</td></tr>';
                $(this).find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
                tr.after(detailHtml);
                onExpandRow(chooseRowData, rowIndex);
            } else {
                $(this).find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
                tr.next().remove();
            }
            aclick = true;
        });
    }
    //复选框点击事件
    var cklick = false;
    $('#' + alias + ' tbody tr div.mychecker').click(function () {
    	if ($(this).attr('checked') == 'checked') {
            $(this).html('').removeAttr('checked');
        }else {
            $(this).html('&#10004;').attr('checked', 'checked');
        }
    	
        var tr = $(this).parent().parent().parent();
        rowIndex = tr.attr('data-index');
        chooseRowData = rowData[rowIndex];
        if ($(this).text() == "") {
        	if(checkOnSelect){
        		tr.attr('class', '');
        	}
            onUncheck(chooseRowData, rowIndex, tr);
        }
        else {
        	if(checkOnSelect){
        		tr.attr('class', 'success');
        	}
            onCheck(chooseRowData, rowIndex, tr);
        }
        cklick = true;
    });
    
    $('#' + alias + ' th div.mychecker').click(function () {
    	if ($(this).attr('checked') == 'checked') {
            $(this).html('').removeAttr('checked');
            $('#' + alias + ' tbody tr div.mychecker').html('').removeAttr('checked');
        }else {
            $(this).html('&#10004;').attr('checked', 'checked');
            $('#' + alias + ' tbody tr div.mychecker').html('&#10004;').attr('checked', 'checked');
        }
    	
    });
    
  //单元格点击事件
    $('#' + alias + ' tbody tr td[detail=true]').click(function () {
    	rowIndex = $(this).parent().attr('data-index');
    	columnIndex = $(this).attr('tdIndex');
        chooseRowData = rowData[rowIndex];
        if (columns[columnIndex].onClickRow != null){
        	columns[columnIndex].onClickRow(chooseRowData);
        }
    });

    //行点击事件
    $('#' + alias + ' tbody tr').click(function () {
        if (aclick) {
            aclick = false;
            return;
        }
        if (cklick) {

            cklick = false;
            return;
        }
        rowIndex = $(this).attr('data-index');
        chooseRowData = rowData[rowIndex];
        if (onClickRow != null)
            onClickRow(chooseRowData, rowIndex, $(this));

        //行多选判断
        if (singleSelect) {
            if (checkOnSelect) {
                $(this).parent().find('tr').attr('class', '');
                $(this).parent().find('div.mychecker').each(function () {
                    $(this).html('').removeAttr('checked');
                })
                var ck = $(this).find('.mychecker');
                if (ck.text() == "") {
                    ck.html('&#10004;').attr('checked', 'checked');
                    $(this).attr('class', 'success');
                    onCheck(chooseRowData, rowIndex, $(this));
                } else {
                    ck.html('').removeAttr('checked');
                    $(this).attr('class', '');
                    onUncheck(chooseRowData, rowIndex, $(this));
                }
            } else {
                if ($(this).attr('class') != "success") {
                    $(this).parent().find('tr').attr('class', '');
                    $(this).attr('class', 'success');
                }
            }

        } else {
            if (checkOnSelect) {
                var ck = $(this).find('.mychecker');
                if (ck.text() == "") {
                    ck.html('&#10004;').attr('checked', 'checked');
                    $(this).attr('class', 'success');
                    onCheck(chooseRowData, rowIndex, $(this));
                } else {
                    ck.html('').removeAttr('checked');
                    $(this).attr('class', '');
                    onUncheck(chooseRowData, rowIndex, $(this));
                }
            } else {
                if ($(this).attr('class') != "success") {
                    $(this).attr('class', 'success');
                } else {
                    $(this).attr('class', '');
                }
            }
        }
    });

    //行双击事件
    $('#' + alias + ' tbody tr').dblclick(function () {
        rowIndex = $(this).attr('data-index');
        chooseRowData = rowData[rowIndex];
        if (onDblClickRow != undefined)
            onDblClickRow(chooseRowData, rowIndex, $(this));
    });
    
    if(callback != undefined){
    	callback();
    }
    

}
//初始化页码Html
function PageHtml(totalPage, CurPage) {
    var curPages = parseInt(CurPage);
    var pageHtml = '<div class="col-md-4 text-right myPageination"><input type="hidden" name="txtCurPage" value="' + curPages + '" /><ul id="pageList" class="pagination" style="margin-top:8px;margin-right:0;">';
    var numList = '';
    var startPage = 1;
    var endPage = totalPage <= 5 ? totalPage : 5;
    if (curPages > 3) {
        if (curPages == totalPage) {
            startPage = totalPage - 4 == 0 ? 1 : totalPage - 4;
            endPage = totalPage;
        }
        else if ((curPages + 1) == totalPage) {
            startPage = curPages - 3;
            endPage = totalPage;
        }
        else {
            startPage = curPages - 2;
            endPage = curPages + 2;
        }
    }
    for (var i = startPage; i <= endPage; i++) {
        if (i == curPages)
            numList += '<li class="active"><a href="javascript:void(0)" lang="' + i + '" onclick="GoPage(this)">' + i + '</a></li>';
        else
            numList += '<li><a href="javascript:void(0)" lang="' + i + '" onclick="GoPage(this)">' + i + '</a></li>';
    }
    if (curPages == 1)
        pageHtml += '<li class="disabled"><a href="javascript:void(0)"><<</a></li><li class="disabled"><a href="javascript:void(0)" ><</a><li>';
    else
        pageHtml += '<li><a href="javascript:void(0)" lang="1" onclick="GoPage(this)"><<</a></li><li><a href="javascript:void(0)" lang="' + (curPages - 1) + '" onclick="GoPage(this)"><</a><li>';
    pageHtml += numList;
    if (curPages == totalPage)
        pageHtml += '<li class="disabled"><a href="javascript:void(0)">></a></li><li class="disabled"><a href="javascript:void(0)">>></a></li>';
    else
        pageHtml += '<li><a href="javascript:void(0)" lang="' + (curPages + 1) + '" onclick="GoPage(this)">></a></li><li><a href="javascript:void(0)" lang="' + totalPage + '" onclick="GoPage(this)">>></a></li>';
    pageHtml += '</ul></div>';
    return pageHtml;
}
//转页码
function GoPage($this) {
    var alias = $($this).parent().parent().parent().parent().parent().attr('id').replace('divPage_', '');
    var curPage = $('#' + alias).find('input[id="txtCurPage"]').val();//$('#pageList li[class="active"]').find('a').attr('lang');
    var page = $($this).attr('lang');
    if (curPage != page) {

        $("#divPage_" + alias + " input[name=txtCurPage]").val(page);
        $("#" + alias).dataGrid("refresh");
    }
}
//转换每页显示行数
function ChangePageList($this) {
    var alias = $($this).parent().parent().parent().parent().parent().attr('id').replace('divPage_', '');
    $('#divPage_' + alias + ' .page-size').html($($this).attr('lang'));
    $("#divPage_" + alias + " input[name=txtCurPage]").val(1);
    $("#" + alias).dataGrid("refresh");
}
//排序方法
function SortByField(field, alias, realField) {
    var _this = $('#' + alias + ' th[name="th_' + field + '"]');
//    var alias = $(_this).parent().parent().parent().attr('id');
    var sortable = eval('(' + $(_this).attr('data-option') + ')').sortable;
    if (sortable == "true") {
        var sortOrder = '';
        if ($(_this).hasClass("sort")) {
            if ($(_this).hasClass("asc")) {
                $(_this).removeClass("asc").addClass("desc");
            } else {
                $(_this).removeClass("desc").addClass("asc");
            }
        } else {
            $('th').removeClass();
            $(_this).addClass("sort desc");
        }
        if ($(_this).hasClass("desc")) {
            sortOrder = 'desc';
        } else {
            sortOrder = 'asc';
        }
        if(realField == undefined){
        	_dataGridQueryParam[alias].sortName = field;
        }else{
        	_dataGridQueryParam[alias].sortName = realField;
        }
        _dataGridQueryParam[alias].sortOrder = sortOrder;
        $("#" + alias).dataGrid("refresh");
    }
}
/**********************表格控件End 2015-10-26**********************************/




/**********************下拉框控件Begin 2015-10-26********************************/
var selectTextLength = 0;//文字内容长度
$.fn.selectChosen = function (option) {
    var $this = $(this);
    var selOption;
    var taget;
    var selectedValue = '';
    var disabled = false;
    selectTextLength = 0;
    var addAll = false;
    if(option.addAll != undefined){
    	addAll = option.addAll;
    }
    if (typeof option === 'string') {
        if (option == 'getValue') {
            return $('#selector_' + $this.attr('id')).val();
        }
        else if (option == 'getTextValue') {
            return $('#selector_' + $this.attr('id')).next().find('span').text();
        }
    }
    else {
        if (option != undefined) {
            if (option.disabled != undefined)
                disabled = option.disabled;
            if (option.setValue != undefined) {
                $($this.find('option')).each(function () {
                    $(this).removeAttr('selected');
                    if ($(this).val() == option.setValue) {
                        $(this).attr('selected', 'selected');
                    }
                });
            }
            else if (option.url != undefined) {
                if (option.selectedValue != undefined)
                    selectedValue = option.selectedValue;
                var valueField = option.valueField;
                var textField = option.textField;
                $.ajax({
                    url: option.url,
                    async: false,
                    success: function (data) {
                        var rowData = data.message;
                        $this.empty();
                        var optionHtml = '';
                        var selected = '';
                        if(addAll){
                            $this.append('<option selected="selected" value="">全部</option>');
                        	selected = '<option value="';
                        }else{
                        	selected = '<option selected="selected" value="';
                        }
                        
                        $(rowData).each(function (i) {
                            if (selectedValue === '' && i == 0)
                                optionHtml += selected + (rowData[i][valueField] == undefined ? "" : rowData[i][valueField]) + '">' + rowData[i][textField] + '</option>';
                            else if (selectedValue === rowData[i][valueField])
                                optionHtml += selected + (rowData[i][valueField] == undefined ? "" : rowData[i][valueField]) + '">' + rowData[i][textField] + '</option>'
                            else
                                optionHtml += '<option value="' + (rowData[i][valueField] == undefined ? "" : rowData[i][valueField]) + '">' + rowData[i][textField] + '</option>'
                        });
                        $this.append(optionHtml);
                    }
                });
            }
            else if (option.jsonData != undefined) {
                if (option.selectedValue != undefined)
                    selectedValue = option.selectedValue;
                var valueField = option.valueField;
                var textField = option.textField;
                var rowData = option.jsonData;
                $this.empty();
                var optionHtml = '';
                $(rowData).each(function (i) {
                    if (selectedValue == '' && i == 0)
                        optionHtml += '<option selected="selected" value="' + (rowData[i][valueField] == undefined ? "" : rowData[i][valueField]) + '">' + rowData[i][textField] + '</option>';
                    else if (selectedValue == rowData[i][valueField])
                        optionHtml += '<option selected="selected" value="' + (rowData[i][valueField] == undefined ? "" : rowData[i][valueField]) + '">' + rowData[i][textField] + '</option>'
                    else
                        optionHtml += '<option value="' + (rowData[i][valueField] == undefined ? "" : rowData[i][valueField]) + '">' + rowData[i][textField] + '</option>'
                });
                $this.append(optionHtml);
            }
        }
    }

    selOption = $this.find('option');
    taget = $this.attr('id');
    var selectorResultHtml = '<ul class="mySelector_result">';
    var selectedTest = '';
    $(selOption).each(function (i) {
        selectorResultHtml += '<li data-value="' + $(selOption[i]).attr('value') + '">' + $(selOption[i]).html() + '</li>';
        if (selectTextLength < $(selOption[i]).html().length)
            selectTextLength = $(selOption[i]).html().length;
        if ($(selOption[i]).attr('selected') == 'selected') {
            selectedTest = $(selOption[i]).html();
            selectedValue = $(selOption[i]).val();
        }
    });
    selectorResultHtml += '</ul>'
    var aBtn = '<a onclick="Chosen(this)" class="btn btn-default " href="javascript:void(0)"><span>' + selectedTest + '</span></a>';
    if (disabled) {
        aBtn = '<a disabled="disabled" class="btn btn-default " href="javascript:void(0)"><span>' + selectedTest + '</span></a>';
    }
    var divSelectHtml = '<div name="' + taget + '" class="mySelector"><input name="' + taget + '"  type="hidden" value="" id="selector_' + taget + '" />' + aBtn + '\
                        <div class="mySelector_panel"><div class="mySelector_search"><input type="text" autocomplete="off"></div>' + selectorResultHtml + '</div></div>';
    $this.hide();
    $('#' + taget).next('[class="mySelector"]').remove();
    $('#' + taget).after(divSelectHtml);
    $('#selector_' + taget).val(selectedValue);

    //最长文字内容自动调整控件宽度
    if (option.width != undefined) {
        var width = option.width;
        $('div[name="' + taget + '"] a').css('width', width + 'px').css('background-position', (width - 20) + 'px 0');
        $('div[name="' + taget + '"] .mySelector_search input').css('width', (width - 10) + 'px')
        $('div[name="' + taget + '"] .mySelector_panel').css('width', width + 'px');
    } else {
        if (selectTextLength > 0) {
            $('div[name="' + taget + '"] a').css('width', selectTextLength * 24 + 'px').css('background-position', (selectTextLength * 24 - 20) + 'px 0');
            $('div[name="' + taget + '"] .mySelector_search input').css('width', (selectTextLength * 24 - 10) + 'px')
            $('div[name="' + taget + '"] .mySelector_panel').css('width', selectTextLength * 24 + 'px');
        }
    }

    //模糊搜索
    $(this).next().find('.mySelector_search input').eq(0).keyup(function () {
        var inputValue = $(this).val();
        $('#' + taget).next().find('.mySelector_result li').each(function () {
            if ($(this).html().indexOf(inputValue) >= 0) {
                $(this).show();
            } else {
                $(this).hide();
            }
        })
    });

    $(this).next().find('.mySelector_result li').each(function () {
        $(this).mouseover(function () {
            $(this).addClass('active');
        }).mouseout(function () {
            $(this).removeClass('active');
        }).click(function () {
            $('div[name="' + taget + '"] a span').text($(this).text());
            $('.mySelector_panel').hide();
            $('#selector_' + taget).val($(this).attr('data-value'));
            $('#' + taget).val($(this).attr('data-value'));
            //下来框改变时
            if (option.onChange != undefined) {
                option.onChange();
            }
        });
    });
    //点击其他空白处，隐藏
    $("body").bind("click", function (evt) {
        if ($(evt.target).parents('.mySelector').length == 0) {
            $('.mySelector_panel').hide();
        }
    });
    //下来框改变时
    if (option.onChange != undefined) {
        option.onChange();
    }

}
//下拉框选择事件
function Chosen(object) {
    $(object).next().toggle();
    $('.mySelector_panel').each(function () {
        if ($(this).parent().attr('name') != $(object).parent().attr('name')) {
            $(this).hide();
        }
    });
}
/**********************下拉框控件End 2015-10-26**********************************/



/**********************提示框控件Begin 2015-10-27********************************/
var modalNum = 0;
$.MsgBox = {
    Alert: function (title, msg) {
        DialogHtml("alert", title, msg);
        btnOk();  //alert只是弹出消息，因此没必要用到回调函数callback
        btnNo();
    },
    Alert: function (title, msg, callback) {
        DialogHtml("alert", title, msg);
        btnOk(callback);  //alert只是弹出消息，因此没必要用到回调函数callback
        btnNo();
    },
    Confirm: function (title, msg, callback) {
        DialogHtml("confirm", title, msg);
        btnOk(callback);
        btnNo();
    },
    ShowDialog: function (title, msg, width, showFooter, callback, top, left) {
        DialogHtml("ShowDialog", title, msg, width, showFooter, top, left);
        btnOk(callback);
        btnNo();
    }
}
//生成Html
function DialogHtml(type, title, msg, width, showFooter, top, left) {
    modalNum = $('div.myModal').length;
    modalNum += 1;
    var widthStyle = '';
    var showFooterStyle = '';
    var topStyle = '';
    if (width != '' || width != undefined)
        widthStyle = 'style="width:' + width + 'px"';
    if (showFooter)
        showFooterStyle = 'style="display:none;"';
    var dialogHtml = '<div class="modal fade myModal" id="myModal' + modalNum + '" tabindex="-1" role="dialog"  move="false" data-backdrop="static"\
            aria-hidden="true" ><div class="modal-dialog"><div class="modal-content" ' + widthStyle + '>\
            <div class="modal-header myHeader"><button type="button" class="close"data-dismiss="modal" aria-hidden="true" ' + ' index="' + modalNum + '">&times;\
            </button><h4 class="modal-title">' + title + '</h4></div><div class="modal-body">' + msg + '</div>\
            <div class="modal-footer"' + showFooterStyle + '>';
    dialogHtml += '<button type="button" id="btnOk' + modalNum + '" class="btn btn-primary"' + ' index="' + modalNum + '">确定</button>';
    if (type != "alert")
        dialogHtml += '<button type="button" id="btnNo' + modalNum + '" class="btn btn-default"' + ' index="' + modalNum + '">取消</button>';
    dialogHtml += '</div></div></div></div>';
    $('body').append(dialogHtml);
    if (type == "ShowDialog") {
        if (top != undefined || top != "")
            $('#myModal' + modalNum).css('top', top + '%');
        if (left != undefined || left != "")
            $('#myModal' + modalNum).css('left', left + '%');
    } else {
        $('#myModal' + modalNum).css('top', '10%');
    }
    $('.modal-body').css('max-height', $(window).height() * 0.8);
    drag('#myModal' + modalNum);
    $('#myModal' + modalNum).modal('show');
}

function drag(id){
    $(id).mousemove(function (e) {
    	var x = e.pageX - $(id).attr('x');
    	var y = e.pageY - $(id).attr('y');
        if($(id).attr('move') == "true"){
        	$(id).css({"top" : y, "left" : x}); 
        }
    });

    $(id).mousedown(function (e) {
    	if(e.target.nodeName == 'DIV'){
	    	$(id).attr('move', 'true');
	    	var _x = e.pageX - parseInt($(id).css("left")); 
	    	var _y = e.pageY - parseInt($(id).css("top"));
	    	$(id).attr('x', _x);
	    	$(id).attr('y', _y);
    	}
    });
    
    $(id).mouseup(function (event) {
    	$(id).attr('move', 'false');
    });
}

//确定按钮事件
var btnOk = function (callback) {
    $("#btnOk" + modalNum).click(function () {
        $('body').removeClass('modal-open');
        var localNum = $(this).attr('index');
        $('#myModal' + localNum).next().remove();
        $('#myModal' + localNum).remove();
        if (localNum == "1"){
        	$('body').css('paddingRight', '');            
        }
        if (typeof (callback) == 'function') {
            callback();
        }
    });
}
//取消按钮事件
var btnNo = function () {
    $('#btnNo' + modalNum + ',.close[index="' + modalNum + '"]').click(function () {
        $('body').removeClass('modal-open');
        var localNum = $(this).attr('index');
        $('#myModal' + localNum).next().remove();
        $('#myModal' + localNum).remove();
        if (localNum == "1"){
            $('body').css('paddingRight', '');
        }
    });
}
/**********************提示框控件End 2015-10-27**********************************/




/**********************验证控件Begin 2015-10-29********************************/
$.fn.validation = function (options) {
    var type = options;
    var flag = true;
    //循环页面上的输入控件
    $(this).find('input, textarea,select,.mySelectorTree').each(function () {
        var el = $(this), valid = (el.attr('check-type') == undefined) ? null : el.attr('check-type').split(' ');
        if (valid != null) {
            if (type == "submit") {
                if (!validateField(this, valid)) {
                    var tag = $(this).parent().parent().parent().attr('id');
                    if (tag != undefined) {
                        tag = tag.replace('Enterprise', '').replace('Personal', '');
                        if (tag.indexOf('field') != -1) {
                            tag = $(this).parent().parent().parent().parent().attr('id').replace('Enterprise', '').replace('Personal', '');
                        }
                        var obj = $('a[href="#' + tag + '"]');
                        if (obj != null)
                            obj.click();
                        obj = $('a[data-value="#' + tag + '"]');
                        if (obj != null)
                            obj.click();
                    }
                    flag = false;
                    return false;
                }
            } else {
                //文本框失去焦点时
                $(this).blur(function () {
                    if (!validateField(this, valid)) {
                        flag = false;
                        return false;
                    }
                });
                //下拉框选择改变时
                $(this).change(function () {
                    if (!validateField(this, valid)) {
                        flag = false;
                        return false;
                    }
                });
            }
        }
    });
    return flag;
}
//验证字段
var validateField = function (field, valid) {
    var el = $(field), error = false, errorMsg = '';
    for (i = 0; i < valid.length; i++) {
        var x = true, flag = valid[i], msg = (el.attr('required-message') == undefined) ? null : el.attr('required-message');

        if (flag.substr(0, 1) == '!') {
            x = false;
            flag = flag.substr(1, flag.length - 1);
        }
        var rules = defaults.validRules;
        for (j = 0; j < rules.length; j++) {
            var rule = rules[j];
            if (flag == rule.name) {
                if (rule.validate.call(field, el.val()) == x) {
                    error = true;
                    errorMsg = (msg == null) ? rule.defaultMsg : msg;
                    break;
                }
            }
        }
        if (error) { break; }
    }
    var controls = el.parents('.myControls'), controlGroup = el.parents('.form-group'), errorEl = controlGroup.children('.help-block, .help-inline');
    if (el.attr('class') == 'mySelectorTree') {
        if ($('#selectorTree_' + el.attr('id')).val() == '')
            error = true;
        else
            error = false;
    };

    if (error) {
        if (!controlGroup.hasClass('has-error')) {
            if (errorEl.length > 0) {
                var help = errorEl.text();
                controls.data('help-message', help);
                errorEl.text(errorMsg);
            } else {
                controlGroup.append('<span class="help-inline">' + errorMsg + '</span>');
            }
            controlGroup.addClass('has-error');
        }
        el.focus();//获取焦点
    } else {
        errorEl.remove();
        controlGroup.attr('class', 'form-group');
    }
    return !error;
}
//验证正则表达式
var defaults = {
    validRules: [
                { name: 'required', validate: function (value) { return ($.trim(value) == ''); }, defaultMsg: '请输入内容！' },
                { name: 'number', validate: function (value) { return (!/^[0-9]\d*$/.test(value)); }, defaultMsg: '请输入数字！' },
                { name: 'mail', validate: function (value) { return (!/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(value)); }, defaultMsg: '请输入邮箱地址！' },
                { name: 'char', validate: function (value) { return (!/^[a-z\_\-A-Z]*$/.test(value)); }, defaultMsg: '请输入英文字符！' },
                { name: 'chinese', validate: function (value) { return (!/^[\u4e00-\u9fff]$/.test(value)); }, defaultMsg: '请输入汉字！' },
                { name: 'money', validate: function (value) { return (!/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,4})?))$/.test(value)); }, defaultMsg: '请输入金额！' },
                { name: 'password', validate: function (value) { return (!/(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}/.test(value)); }, defaultMsg: '密码必须为8位字符且包含英文字符与数字!' },
                { name: 'tel', validate: function (value) { return (!/^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value)); }, defaultMsg: '请输入正确电话！' },
                { name: 'mobile', validate: function (value) { return (!/^0?(13[0-9]|15[012356789]|18[012356789]|14[57])[0-9]{8}$/.test(value)); }, defaultMsg: '请输入正确手机！' },
                { name: 'time', validate: function (value) { return (!/^(([0-1]\d)|(2[0-4])):[0-5]\d$/.test(value)); }, defaultMsg: '请输入正确的时间！' }
    ]
}
/**********************验证控件End 2015-10-29**********************************/


/**********************树形下拉框Begin 2015-10-30********************************/
var selectorTreeOptions;
var textLength = 0;//文字内容长度
$.fn.selectorTree = function (option) {
    var $this = $(this);
    if (typeof option === 'string') {
        if (option == 'getValue') {
            return $('#selectorTree_' + $this.attr('id')).val();
        }
    }

    selectorTreeOptions = $.extend({}, $.fn.selectorTree.defaults, option);
    var selectorTreeData;
    if (selectorTreeOptions.url != '') {
        $.ajax({
            url: selectorTreeOptions.url,
            async: false,
            success: function (data) {
                selectorTreeData = data.message;
            }
        });
    }

    var selectorTreeHtml = '<input name="' + $this.attr('id') + '" id="selectorTree_' + $this.attr('id') + '" type="hidden">\
                    <a onclick="Chosen(this)" class="btn btn-default " href="javascript:void(0)"><span>请选择</span></a>\
                    <div class="mySelectorTree_panel"><ul class="mySelectorTree_result">';
    var nodeStr = "";
    for (var i = 0; i < selectorTreeData.length; i++) {
        nodeStr = InitSelectorTree(selectorTreeData[i], nodeStr, 1);
    }
    selectorTreeHtml += nodeStr;
    selectorTreeHtml += '</ul></div>';
    $this.append(selectorTreeHtml);
    if (selectorTreeOptions.selectedValue != '') {
        $('#selectorTree_' + $this.attr('id')).val(selectorTreeOptions.selectedValue);
        var selectedText = $this.find('li[data-value="' + selectorTreeOptions.selectedValue + '"]').attr('data-text');
        $('#selectorTree_' + $this.attr('id')).next().find('span').text(selectedText);
    }


    //最长文字内容自动调整控件宽度
    if (textLength > 0) {
        $('.mySelectorTree a').css('width', textLength * 24 + 'px').css('background-position', (textLength * 22 - 6) + 'px 0');
        $('.mySelectorTree_panel').css('width', textLength * 24 + 'px');
    }

    //展开、收缩效果
    var iclick = false;
    $('.mySelectorTree_result i').click(function () {
        var $this = $(this);
        var dataValue = $this.parent().attr('data-value');
        iclick = true;
        if ($this.hasClass('glyphicon-folder-close')) {
            $('#child_' + dataValue).show();
            $this.removeClass('glyphicon-folder-close').addClass('glyphicon-folder-open');
        } else if ($this.hasClass('glyphicon-folder-open')) {
            $('#child_' + dataValue).hide();
            $this.removeClass('glyphicon-folder-open').addClass('glyphicon-folder-close');
        } else if ($this.hasClass('glyphicon-folder-file')) {
            return false;
        }
    });
    //选择点击
    $('.mySelectorTree_result li').mousemove(function () {
        $(this).addClass('active');
    }).mouseout(function () {
        $(this).removeClass('active');
    }).click(function () {
        if (iclick) {
            iclick = false;
            return false;
        }
        $('#selectorTree_' + $this.attr('id')).val($(this).attr('data-value'))
        $('.mySelectorTree a span').text($(this).attr('data-text'));
        $('.mySelectorTree_panel').hide();

        obj = $('#selectorTree_' + $this.attr('id'));
        selectorTreeOptions.onChange(obj);
    });

    //点击其他空白处，隐藏
    $("body").bind("click", function (evt) {
        if ($(evt.target).parents(".mySelectorTree").length == 0) {
            $('.mySelectorTree_panel').hide();
        }
    });

    obj = $('#selectorTree_' + $this.attr('id'));
    selectorTreeOptions.onChange(obj);
}
//默认option
$.fn.selectorTree.defaults = {
    url: '',
    expandLevel: 1,
    selectedValue: '',
    onChange: function (obj) {
        return false;
    }
}
//拼接内容
function InitSelectorTree(node, nodeStr, expandLevel) {
    var iClasses = '';
    if (expandLevel <= selectorTreeOptions.expandLevel)
        iClasses = 'glyphicon-folder-open';
    else
        iClasses = 'glyphicon-folder-close';
    if (node.hasChildren == false && node.children == null) {
        nodeStr += '<li data-value="' + node.id + '" data-text="' + node.text + '"><i class="glyphicon glyphicon-file"></i>' + node.text + '</li>';
        if (textLength < node.text.length)
            textLength = node.text.length;
    } else {
        if (textLength < node.text.length)
            textLength = node.text.length;
        nodeStr += '<li data-value="' + node.id + '" data-text="' + node.text + '"><i class="glyphicon ' + iClasses + '"></i>' + node.text + '</li>';
        if (iClasses == "glyphicon-folder-close")
            nodeStr += '<ul id="child_' + node.id + '" style="display: none;">';
        else
            nodeStr += '<ul id="child_' + node.id + '">';
        expandLevel++;
        for (var i = 0; i < node.children.length; i++) {
            nodeStr = InitSelectorTree(node.children[i], nodeStr, expandLevel);
        }
        nodeStr += '</ul>';
    }
    return nodeStr;
}
/**********************树形下拉框End 2015-10-30**********************************/



/**********************树形控件Begin 2015-11-03********************************/
var treeOptions;
var _treeData = {};
var iclick = false;
var ckclick = false;
var tagetChecked = '';
$.fn.Tree = function (option) {
    var $this = $(this);
    if (typeof option == 'string') {
        if (option == 'getChecked') {
            var nodes = [];
            var node;
            $('.myTree_panel div[class="mychecker"]').each(function () {
                if ($(this).attr('checked') == 'checked') {
                    var li = $(this).parent().parent();
                    var taget = li.attr('data-value');
                    for (var i = 0; i < _treeData.length; i++) {
                        node = GetChildData(_treeData[i], taget, node);
                        nodes.push(node);
                    }
                }
            });
            return nodes;
        }
        return false;
    }
    treeOptions = $.extend({}, $.fn.Tree.defaults, option);
    if (treeOptions.url != '') {
        $.ajax({
            url: treeOptions.url,
            async: false,
            success: function (data) {
                _treeData = data.message;
            }
        });
    }

    var treeHtml = '<ul class="myTree_panel">';
    var nodeStr = "";
    for (var i = 0; i < _treeData.length; i++) {
        tagetChecked = '';
        nodeStr = InitTree(_treeData[i], nodeStr, 1);
    }
    tagetChecked = tagetChecked.substr(0, tagetChecked.length - 1);//checkbox选中的ID字符串
    treeHtml += nodeStr;
    treeHtml += '</ul>';
    $this.append(treeHtml);
    //checkbox选中判断
    if (tagetChecked != "") {
        var tagetCheckedStr = tagetChecked.split(',');
        for (var i = 0; i < tagetCheckedStr.length; i++) {
            $('li[data-value="' + tagetCheckedStr[i] + '"]').find('.mychecker').html('&#10004;').attr('checked', 'checked');
            var node = $('#child_' + tagetCheckedStr[i]);
            if (node.length > 0) {
                node.find('.mychecker').each(function () {
                    $(this).html('&#10004;').attr('checked', 'checked');
                });
            }
            checkBoxChangeCss();
        }
    }
    //展开、收缩效果
    iClick();
    //选择点击
    liClick();
    //chekBox点击事件
    ckClick();
}

//默认option
$.fn.Tree.defaults = {
    url: '',
    expandLevel: 1,//展开层级，默认展开第一层
    //allData: true,//加载所有数据，默认是
    checkBox: false,
    onClick: function (data) {
        return false;
    },
    onCheck: function (data, row) {
        return false;
    }
}
//拼接Html
function InitTree(node, nodeStr, expandLevel) {
    if (node.checked)
        tagetChecked += node.id + ',';
    var iClasses = '';
    var checkBoxHtml = '';
    if (treeOptions.checkBox) {
        checkBoxHtml += '<div class="mychecker-line"><div class="mychecker" onclick="checkboxClick(this)" hide-value='+node.value+'></div></div>';
    }
    if (expandLevel <= treeOptions.expandLevel)
        iClasses = 'typcn-folder-open';
    else
        iClasses = 'typcn-folder';
    if (node.hasChildren == false && node.children == null) {
        nodeStr += '<li data-value="' + node.id + '" data-text="' + node.text + '">' + checkBoxHtml + '<i class="typcn typcn-document-text"></i><a>' + node.text + '</a></li>';
        if (textLength < node.text.length)
            textLength = node.text.length;
    } else {
        if (textLength < node.text.length)
            textLength = node.text.length;
        nodeStr += '<li data-value="' + node.id + '" data-text="' + node.text + '">' + checkBoxHtml + '<i class="typcn ' + iClasses + '"></i><a>' + node.text + '</a></li>';

        //显示所有数据
        expandLevel++;
        if (iClasses == "typcn-folder")
            nodeStr += '<ul id="child_' + node.id + '" style="display: none;">';
        else
            nodeStr += '<ul id="child_' + node.id + '">';
        
        if(node.children !=null){
        	for (var i = 0; i < node.children.length; i++) {
                nodeStr = InitTree(node.children[i], nodeStr, expandLevel);
            }
        }
        nodeStr += '</ul>';
        //if (expandLevel <= (treeOptions.expandLevel + 1) || treeOptions.allData) {
        //}
    }
    return nodeStr;
}
//获取子数据
function GetChildData(treeData, dataValue, nodeData) {
    if (treeData.id == dataValue) {
        nodeData = treeData;
    }
    else {
    	try{
			for (var j = 0; j < treeData.children.length; j++) {
                nodeData = GetChildData(treeData.children[j], dataValue, nodeData);
            }
    	}catch(err){
    	}
		
    }
    return nodeData;
}
//i标签点击事件
function iClick() {
    $('.myTree_panel i').off('click').on('click', function () {
        var $this = $(this);
        var dataValue = $this.parent().attr('data-value');
        iclick = true;
        if ($this.hasClass('typcn-folder')) {
            $('#child_' + dataValue).show();
            $this.removeClass('typcn-folder').addClass('typcn-folder-open');
            //if ($('.myTree').height() > (winHeight - footHeight - navHeight))
            //    $('.content').removeAttr('style');
            GetBodyHeight();
        } else if ($this.hasClass('typcn-folder-open')) {
            $('#child_' + dataValue).hide();
            $this.removeClass('typcn-folder-open').addClass('typcn-folder');
            //if ($('.myTree').height() < (winHeight - footHeight - navHeight))
            //    $('.content').height(winHeight - footHeight - navHeight);
            GetBodyHeight();
        } else if ($this.hasClass('glyphicon-folder-file')) {
            return false;
        }
    });
}
//li点击事件
function liClick() {
    $('.myTree_panel li').mousemove(function () {
        $(this).addClass('active');
    }).mouseout(function () {
        $(this).removeClass('active');
    }).click(function () {
        if (iclick) {
            iclick = false;
            return false;
        }
        if (ckclick) {
            ckclick = false;
            return false;
        }
        //点击获取当前数据
        var rowData;
        var dataValue = $(this).attr('data-value');
        for (var i = 0; i < _treeData.length; i++) {
            rowData = GetChildData(_treeData[i], dataValue, rowData);
        }
        treeOptions.onClick(rowData);
    });
}
//checkBox点击事件
function ckClick() {
    $('.mychecker').click(function () {
        ckclick = true;
        var li = $(this).parent().parent();
        var ul = li.parent();
        var taget;
        if (ul.attr('id') != undefined)
            taget = ul.attr('id').replace('child_', '');
        if ($(this).attr('checked') == 'checked') {
            $('#child_' + li.attr('data-value')).find('div[class="mychecker"]').html('&#10004;').attr('checked', 'checked');
        } else {
            $('#child_' + li.attr('data-value')).find('div[class="mychecker"]').html('').removeAttr('checked');
        }
        checkBoxChangeCss();//
        //点击获取当前数据
        var rowData;
        var dataValue = li.attr('data-value');
        for (var i = 0; i < _treeData.length; i++) {
            rowData = GetChildData(_treeData[i], dataValue, rowData);
        }
        treeOptions.onCheck(rowData, li);
    });
}

//未全选时，父级checkbox显示阴影样式判断
function checkBoxChangeCss() {
    //未全选时，父级checkbox显示阴影样式
    var fill = false;
    $('.myTree_panel div[class="mychecker"]').each(function () {
        var li = $(this).parent().parent();
        var ul = li.parent();
        var taget;
        if (ul.attr('id') != undefined)
            taget = ul.attr('id').replace('child_', '');
        var chNum = ul.find('div[class="mychecker"]').length;
        var chNewNum = 0;
        $(ul.find('div[class="mychecker"]')).each(function () {
            if ($(this).attr('checked') != 'checked') {
                fill = true;
                chNewNum++;
            }
        });
        if (chNum == chNewNum) {
            $('li[data-value="' + taget + '"] .mychecker').html('');
        }
        else {
            if (fill) {
                $('li[data-value="' + taget + '"] .mychecker').html('<div class="mychecker-fill"></div>').removeAttr('checked');
                fill = false;
            } else {
                $('li[data-value="' + taget + '"] .mychecker').html('&#10004;').attr('checked', 'checked');
            }
        }
    });
}
/**********************树形控件End 2015-11-03**********************************/

