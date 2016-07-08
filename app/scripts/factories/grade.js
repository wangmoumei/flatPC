angular.module('flatpcApp')
.factory('GradeService',['$http', 'AppConfig',function($http, AppConfig){
    var getListByFlat = function (param) {
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/get_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&flatid=' + (param.flatid || "") + '&semesterid=' + (param.semesterid || "")
                + '&currentweek=' + (param.currentweek || "");
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/get_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&flatid=' + (param.flatid || "") + '&date=' + ( new Date(param.date).Format('yyyy-MM-dd') || new Date().Format('yyyy-MM-dd'));
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/get_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&flatid=' + (param.flatid || "") + '&date=' + (new Date(param.date + '-01').Format('yyyy-MM') || new Date().Format('yyyy-MM'));
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/get_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&flatid=' + (param.flatid || "") + '&checkid=' + (param.checkid || "");
                break;
            default:
                break;
        }
        
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var setGrade = function (param,type) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        param.adminid = param.adminid || AppConfig.adminid;
        type = type || param.type || 0;
        var url = "";
        switch (type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/add_room_score/';
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/add_room_score/';
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/add_room_score/';
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/add_room_score/';
                break;
            default:
                break;
        }
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var editGrade = function (param,type) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        param.adminid = param.adminid || AppConfig.adminid;
        type = type || param.type || 0;
        var url = "";
        switch (type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/edit_room_score/';
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/edit_room_score/';
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/edit_room_score/';
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/edit_room_score/';
                break;
            default:
                break;
        }
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var getGrade = function (param) {
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/get_room_message/?';
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/get_room_message/?';
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/get_room_message/?';
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/get_room_message/?';
                break;
            default:
                break;
        }
        url = url + 'token=' + AppConfig.token
        + '&roomscoreid=' + param.roomscoreid;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var getGradeImgs = function (param) {
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/get_pictures/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&roomid=' + param.roomid
                + '&semesterid=' + (param.semesterid || "") + '&currentweek=' + (param.currentweek || "");
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/get_pictures/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&roomid=' + param.roomid + '&date=' + ( new Date(param.date).Format('yyyy-MM-dd') || new Date().Format('yyyy-MM-dd'));
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/get_pictures/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&roomid=' + param.roomid + '&date=' + (new Date(param.date + '-01').Format('yyyy-MM') || new Date().Format('yyyy-MM'));
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/get_pictures/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&roomid=' + param.roomid  + '&checkid=' + (param.checkid || "");
                break;
            default:
                break;
        }
        
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var uploadImg = function (param,type) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        param.adminid = param.adminid || AppConfig.adminid;
        type = type || param.type || 0;
        var url = "";
        switch (type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/upload_picture/';
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/upload_picture/';
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/upload_picture/';
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/upload_picture/';
                break;
            default:
                break;
        }
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var setBedGrade = function (param,type) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        param.adminid = param.adminid || AppConfig.adminid;
        type = type || param.type || 0;
        var url = "";
        switch (type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/add_bed_score/';
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/add_bed_score/';
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/add_bed_score/';
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/add_bed_score/';
                break;
            default:
                break;
        }
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var editBedGrade = function (param,type) {
        param.token = param.token || AppConfig.token;
        type = type || param.type || 0;
        var url = "";
        switch (type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/edit_bed_score/';
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/edit_bed_score/';
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/edit_bed_score/';
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/edit_bed_score/';
                break;
            default:
                break;
        }
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var getBedGrade = function (param) {
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/get_bed_message/?'
                + 'semesterid=' + (param.semesterid || "") + '&currentweek=' + (param.currentweek || "");
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/get_bed_message/?'
                + 'date=' + ( new Date(param.date).Format('yyyy-MM-dd') || new Date().Format('yyyy-MM-dd'));
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/get_bed_message/?'
                + 'date=' + (new Date(param.date + '-01').Format('yyyy-MM') || new Date().Format('yyyy-MM'));
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/get_bed_message/?'
                 + '&checkid=' + (param.checkid || "");
                break;
            default:
                break;
        }
        url = url + '&token=' + AppConfig.token + '&roomid=' + param.roomid;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var getList = function(param){
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/score_search/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&semesterid=' + (param.semesterid || "") + '&currentweek=' + (param.currentweek || "");
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/dayscore_search/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&date=' + ( new Date(param.date).Format('yyyy-MM-dd') || new Date().Format('yyyy-MM-dd'));
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/score_search/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&date=' + (new Date(param.date + '-01').Format('yyyy-MM') || new Date().Format('yyyy-MM'));
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/score_search/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                 + '&checkid=' + (param.checkid || "");
                break;
            default:
                break;
        }

        url = url
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.floorid?('&floorid='+param.floorid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'')
       // + (param.studentnumber?('&studentnumber='+param.studentnumber):'')
       // + (param.name?('&name='+param.name):'')
        + (param.roomname?('&roomname='+param.roomname):'')
       // + (param.grade?('&grade='+param.grade):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var download = function (param) {
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/score_search_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&semesterid=' + (param.semesterid || "") + '&currentweek=' + (param.currentweek || "");
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/score_search_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&date=' + ( new Date(param.date).Format('yyyy-MM-dd') || new Date().Format('yyyy-MM-dd'));
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/score_search_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&date=' + (new Date(param.date + '-01').Format('yyyy-MM') || new Date().Format('yyyy-MM'));
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/score_search_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                 + '&checkid=' + (param.checkid || "");
                break;
            default:
                break;
        }
        url = url
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.floorid?('&floorid='+param.floorid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.studentnumber?('&studentnumber='+param.studentnumber):'')
        + (param.name?('&name='+param.name):'')
        + (param.roomname?('&roomname='+param.roomname):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url,param).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var getTopList = function(param){
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/ranking_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&semesterid=' + (param.semesterid || "") + '&currentweek=' + (param.currentweek || "");
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/ranking_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&date=' + ( new Date(param.date).Format('yyyy-MM-dd') || new Date().Format('yyyy-MM-dd'));
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/ranking_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&date=' + (new Date(param.date + '-01').Format('yyyy-MM') || new Date().Format('yyyy-MM'));
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/ranking_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                 + '&checkid=' + (param.checkid || "");
                break;
            default:
                break;
        }
        url = url
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.tobed?('&tobed='+param.tobed):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var downloadTopList = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
                url = AppConfig.WEB_ROOT + 'evaluation/weekscore/ranking_list_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&semesterid=' + (param.semesterid || "") + '&currentweek=' + (param.currentweek || "");
                break;
            case 1:
                url = AppConfig.WEB_ROOT + 'evaluation/dayscore/ranking_list_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&date=' + ( new Date(param.date).Format('yyyy-MM-dd') || new Date().Format('yyyy-MM-dd'));
                break;
            case 2:
                url = AppConfig.WEB_ROOT + 'evaluation/monthscore/ranking_list_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&date=' + (new Date(param.date + '-01').Format('yyyy-MM') || new Date().Format('yyyy-MM'));
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/ranking_list_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&checkid=' + (param.checkid || "");
                break;
            default:
                break;
        }
        url = url
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.tobed?('&tobed='+param.tobed):'');
        return $http.get(url,param).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var getStatistics = function(param){
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
            case '0':
                url = AppConfig.WEB_ROOT + 'evaluation/statistics/get_week_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&schoolyearid=' + (param.schoolyearid || '') 
                + (param.semesterid?('&semesterid='+param.semesterid):'');
                break;
            case 1:
            case '1':
                url = AppConfig.WEB_ROOT + 'evaluation/statistics/get_day_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&startdate=' + (param.starttime || new Date().Format('yyyy-MM-dd'))
                + '&enddate=' + (param.endtime || new Date().Format('yyyy-MM-dd'));
                break;
            case 2:
            case '2':
                url = AppConfig.WEB_ROOT + 'evaluation/statistics/get_month_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&startdate=' + (param.startmonth || new Date().Format('yyyy-MM-dd'))
                + '&enddate=' + (param.endmonth || new Date().Format('yyyy-MM-dd'));
                break;
            case 3:
                
                break;
            default:
                break;
        }
        url = url
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'');
        // alert(url);
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var downloadStatistics = function(param){
        param.type = param.type || 0;
        var url = "";
        switch (param.type) {
            case 0:
            case '0':
                url = AppConfig.WEB_ROOT + 'evaluation/statistics/get_week_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&schoolyearid=' + (param.schoolyearid || '') 
                + (param.semesterid?('&semesterid='+param.semesterid):'');
                break;
            case 1:
            case '1':
                url = AppConfig.WEB_ROOT + 'evaluation/statistics/get_day_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&startdate=' + (param.startdate || new Date().Format('yyyy-MM-dd'))
                + '&enddate=' + (param.enddate || new Date().Format('yyyy-MM-dd'));
                break;
            case 2:
            case '2':
                url = AppConfig.WEB_ROOT + 'evaluation/statistics/get_month_export/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + '&startdate=' + (param.startdate || new Date().Format('yyyy-MM-dd'))
                + '&enddate=' + (param.enddate || new Date().Format('yyyy-MM-dd'));
                break;
            case 3:
                
                break;
            default:
                break;
        }
        url = url
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'');
        
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    
    var getSettingList = function(param){
        param = param || {type:0};
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/get_list/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&type=' + (param.type || 0) 
        + (param.isopen?('&isopen=' + param.isopen):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };

    var  dayCompletion= function(param){
            var url = AppConfig.WEB_ROOT +'evaluation/dayscore/dayCompletion/';
            return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        }); 
    };

    var addSetting = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/add_item/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var editSetting = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/edit_item/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var delSetting = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/del_item/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var editSettingType = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/edit_type/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var addSettingTable = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/add_table/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var editSettingTable = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/edit_table/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var delSettingTable = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/del_table/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var basicSetting = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/base_setup/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var getSettingListByTableId = function(param){
        param = param || {type:0};
        var url = AppConfig.WEB_ROOT + 'evaluation/scsetups/get_list_table/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&tableid=' + (param.tableid || 0) 
        + (param.isopen?('&isopen=' + param.isopen):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var getSpotList = function(param){
        param = param || {type:0};
        var url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/get_list_scorecheck/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10) 
        + (param.schoolyearid?('&schoolyearid=' + param.schoolyearid):'')
        + (param.semesterid?('&semesterid=' + param.semesterid):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var addSpot = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/add_scorecheck/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var editSpot = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/edit_scorecheck/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var delSpot = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/del_scorecheck/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    };
    var getFlatByCheckId = function(param){
        param = param || {type:0};
        var url = AppConfig.WEB_ROOT + 'evaluation/scorecheck/get_flatBycheck/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&checkid=' + (param.checkid || 0);
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    return {
        getListByFlat:getListByFlat,
        setGrade:setGrade,
        editGrade:editGrade,
        getGrade:getGrade,
        getGradeImgs:getGradeImgs,
        uploadImg:uploadImg,
        setBedGrade:setBedGrade,
        editBedGrade:editBedGrade,
        getBedGrade:getBedGrade,
        getList:getList,
        download:download,
        getTopList:getTopList,
        downloadTopList:downloadTopList,
        getSettingList:getSettingList,
        addSetting:addSetting,
        editSetting:editSetting,
        delSetting:delSetting,
        editSettingType:editSettingType,
        addSettingTable:addSettingTable,
        editSettingTable:editSettingTable,
        delSettingTable:delSettingTable,
        getStatistics:getStatistics,
        downloadStatistics:downloadStatistics,
        basicSetting:basicSetting,
        getSettingListByTableId:getSettingListByTableId,
        getSpotList:getSpotList,
        addSpot:addSpot,
        editSpot:editSpot,
        delSpot:delSpot,
        getFlatByCheckId:getFlatByCheckId,
        dayCompletion:dayCompletion
    }
}]);