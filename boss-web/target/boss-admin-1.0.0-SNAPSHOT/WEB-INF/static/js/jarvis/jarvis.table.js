/**
 * JARVIS.MVC.TABLE 组件
 *
 * @author lijunlin
 */
(function ($$, NS) {
    var $$_NS = $$.register(NS);

    /**
     * dataTable对象标识符
     */
    $$_NS.datatableIdentifier;
    /**
     * datatable checkbox对象标识符
     */
    $$_NS.checkboxIdentifier;
    /**
     * datatable checkbox item对象标识符
     */
    $$_NS.checkboxItemIdentifier;

    /**
     * 表对象
     */
    $$_NS.dataTableObject;
    $$_NS.dataKey = "data";

    /**
     * 初始化
     */
    $$.addConstructor(function () {
        //初始化dataTable对象
        $$_NS.datatableIdentifier = $$.MVC.context["objectIdentifierCode"] + "_table";
        $$_NS.checkboxIdentifier = $$.MVC.context["objectIdentifierCode"] + "_chk";
        $$_NS.checkboxItemIdentifier = $$.MVC.context["objectIdentifierCode"] + "_chk_item";

        $$.log("datatableIdentifier = " + $$_NS.datatableIdentifier);
        $$.log("checkboxIdentifier = " + $$_NS.checkboxIdentifier);
        $$.log("checkboxItemIdentifier = " + $$_NS.checkboxItemIdentifier);
    });

    /**
     * 使用dataTables插件展示表格数据
     * @param params 参数(详细查看dataTables配置)
     */
    $$_NS.dataTable = function (params) {
        $$.log("Invoke table.dataTable()");
        //checkbox全选反选功能
        $('table th input:checkbox').on('click', function () {
            var that = this;
            $(this).closest('table').find('tr > td:first-child input:checkbox')
                .each(function () {
                    this.checked = that.checked;
                    $(this).closest('tr').toggleClass('selected');
                });
        });

        //默认配置
        var def_opts = {
            sAjaxSource: $$.MVC.URL.selectJSONPage,
            fnServerData: function (url, data, callback, oSettings) {
                var def_options = {
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    cache: false
                };

                $$.MVC.doRequest(url, data,
                    function (response) {
                        if (response[$$.MVC.response["status"]] == false) {//服务出现异常
                            alert(response[$$.MVC.response["message"]]);
                            $$.unmask();
                            return;
                        }
                        oSettings.sAjaxDataProp = $$_NS.dataKey;
                        callback(response[$$.MVC.response["body"]]);
                        $$.unmask();
                    },
                    def_options
                );
            },
            oLanguage: {
                "sLengthMenu": $$.MESSAGE.datatable["sLengthMenu"],
                "sLengthMenu": $$.MESSAGE.datatable["sLengthMenu"],
                "sZeroRecords": $$.MESSAGE.datatable["sZeroRecords"],
                "sInfo": $$.MESSAGE.datatable["sInfo"],
                "sInfoEmpty": $$.MESSAGE.datatable["sInfoEmpty"],
                "sInfoFiltered": $$.MESSAGE.datatable["sInfoFiltered"],
                "oPaginate": $$.MESSAGE.datatable["oPaginate"]
            },
            bProcessing: false,
            bServerSide: true,
            bFilter: false,
            bSort: false,
            aLengthMenu: [20, 50, 100],
            iDisplayLength: 20
        };
        var options = $.extend(true, {}, def_opts, params || {});
        $$_NS.dataTableObject = $("#" + $$_NS.datatableIdentifier).dataTable(options);
    };

    /**
     * 重新绘制表格
     */
    $$_NS.resetTable = function (oTable, flag) {
        if (flag) {
            var oSettings = oTable.fnSettings();
            oSettings._iDisplayStart = 0;
        }
        oTable.fnClearTable(0);
        oTable.fnDraw();
    };

    /**
     * 获取ID字段
     */
    $$_NS.getIdColumn = function (data) {
        var string = "<label><input value='" + data + "' name='" + $$_NS.checkboxItemIdentifier + "' type='checkbox' class='ace' />" +
            "<span class='lbl'></span></label>";
        return string;
    };

    /**
     * 添加查询条件
     */
    $$_NS.pushQueryCondition = function (aoData, column, sColumn) {
        if ($$.isNotEmpty($("#" + sColumn).val())) {
            aoData.push({"name": column, "value": $("#" + sColumn).val()});
        }
    };
})(GLOBAL_NS, "TABLE");