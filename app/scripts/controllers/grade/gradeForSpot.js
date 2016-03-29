angular.module('flatpcApp')
.controller('GradeForSpotCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','TermService','$filter','GradeService','RoomService','PublicService','RuleService',
function($scope,AppConfig,$rootScope,FlatService,TermService,$filter,GradeService,RoomService,PublicService,RuleService) {
    
    $scope.media = {
        source:0,
        tab:1,
        setTab:function(n) {
            this.tab = n;
            this.epage = 1;
            refresh();
        },
        type:3,
        flatid:'',
        flatid1:'',
        liveareaid:'',
        campusid:'',
        studentnumber:'',
        name:'',
        roomname:'',
        search:2,
        orderfield:'',
        ordertype:'',
        tobed:0,
        setRule:function (n) {
            this.tobed = n;
            refresh();
        },
        epage:1,
        pageCount:1,
        recordCount:0,
        pagesize:10,
        setPage:function(n){
            if(this.epage + n >0 && this.epage + n <= this.pageCount){
                this.epage += n;
                refresh();
            } 
        },
        setPageSize:function(n){
            this.pagesize = n;
            refresh();
        },
        setOrder : function(name){
            if(this.orderfield == name)
            {
                this.ordertype = this.ordertype=="asc"?"desc":"asc";
            }else{
                this.orderfield = name;
                this.ordertype = "asc";
            }
            refresh();
        },
        setSearch : function(search){
            this.studentnumber = this.search?'':search;
            this.name = this.search == 1?search:'';
            this.roomname = this.search == 2?search:'';
            // console.log(this);
            refresh();
        },
        yearIndex:0,
        termIndex:0,
        week:0,
        weekList:[],
        setWeek:function (week) {
            this.week = week;
            refresh();
        },
        setYear:function (n) {
            n = n || 1;
            if(n < 0){
                if(this.termIndex > 0){
                    this.termIndex--;
                }else{
                    if(this.yearIndex < $rootScope.treeTerm.length - 1){
                        this.yearIndex++;
                        this.termIndex = $rootScope.treeTerm[this.yearIndex].semesterList.length-1;
                    }
                    else return;
                }
            }else{
                if(this.termIndex < $rootScope.treeTerm[this.yearIndex].semesterList.length - 1){
                    this.termIndex++;
                }else{
                    if(this.yearIndex > 0){
                        this.yearIndex --;
                        this.termIndex = 0;
                    }
                    else return;
                }
            }
            $scope.media.weekList  = $filter('sliceWeek')($rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex]);
            refresh();
        },
        getYear:function (n) {
            n = n || 0;
            if(!$rootScope.treeTerm) return {};
            try {
                if( n < 0){
                    if(this.termIndex > 0){
                        return {
                            year:$rootScope.treeTerm[this.yearIndex].year,
                            term:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex-1].semesterName
                        }
                    }else{
                        if(this.yearIndex < $rootScope.treeTerm.length - 1){
                            if($rootScope.treeTerm[this.yearIndex+1].semesterList.length>0)
                                return {
                                    year:$rootScope.treeTerm[this.yearIndex+1].year,
                                    term:$rootScope.treeTerm[this.yearIndex+1].semesterList[$rootScope.treeTerm[this.yearIndex+1].semesterList.length-1].semesterName
                                };
                            else
                                return {
                                    year:null,
                                    term:null
                                };
                        }else{
                            return {
                                year:null,
                                term:null
                            }
                        }
                    }
                }else{
                    if(this.termIndex < $rootScope.treeTerm[this.yearIndex].semesterList.length - 1){
                        return {
                            year:$rootScope.treeTerm[this.yearIndex].year,
                            term:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex+1].semesterName
                        }
                    }else{
                        if(this.yearIndex > 0){
                            return {
                                year:$rootScope.treeTerm[this.yearIndex-1].year,
                                term:$rootScope.treeTerm[this.yearIndex-1].semesterList[0].semesterName
                            }
                        }else{
                            return {
                                year:null,
                                term:null
                            }
                        }
                    }
                }
            } catch (error) {
                return {
                    year:null,
                    term:null
                }
            }
            
        },
        title:'',
        campus:'',
        liveArea:'',
        show:function (type,item,campus,liveArea) {
            this.type = type;
            this.flatid1 = item.flatId || '';
            this.liveareaid = item.liveAreaId || '';
            this.campusid = item.campusId || '';
            this.title = item.title;
            this.campus = campus?campus.title : '';
            this.liveArea = liveArea?liveArea.title:'';
                    
            if(this.tab == 1){
                if(type==3){
                    this.flatid = item.flatId;
                    refresh();
                }
            }
            else{
                refresh();
            }
        },
        downloadGrade:function(){
            if(this.tab == 2){
                GradeService.download({
                    epage:this.epage,
                    pagesize:this.pagesize,
                    liveareaid:this.liveareaid,
                    campusid:this.campusid,
                    studentnumber:this.studentnumber,
                    name:this.name,
                    roomname:this.roomname,
                    orderfield:this.orderfield,
                    ordertype:this.ordertype,
                    flatid:this.flatid1,
                    semesterid:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex].semesterId,
                    currentweek:this.week,
                    type:0
                }).success(function (data) {
                    $rootScope.loading = false;
                    if(data.code == 0){
                        location.href = data.data.fileUrl;
                    }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    //console.log(data);
                });
            }else if(this.tab == 3){
                GradeService.downloadTopList({
                    epage:this.epage,
                    pagesize:this.pagesize,
                    liveareaid:this.liveareaid,
                    campusid:this.campusid,
                    studentnumber:this.studentnumber,
                    orderfield:this.orderfield,
                    ordertype:this.ordertype,
                    flatid:this.flatid1,
                    semesterid:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex].semesterId,
                    currentweek:this.week,
                    tobed:this.tobed,
                    type:0
                }).success(function (data) {
                    $rootScope.loading = false;
                    if(data.code == 0){
                        location.href = data.data.fileUrl;
                    }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    //console.log(data);
                });
            }
        }
    }
    
    
    $scope.cardMedia = {
        tab:1,
        setTab:function (n) {
            if(n < 1 || n > 4) return;
            this.tab = n;
            switch(n){
                case 1:
                    if(this.room){
                        return;
                    }
                case 2:
                    if(this.bed){
                        return;
                    }
                    break;
                case 3:
                    if(this.img){
                        return;
                    }
                    break;
            }
            this.getData(n)
        },
        item:null,
        room:null,
        bed:null,
        img:null,
        rule:null,
        //typeid:0,
        //tableid:0,
        getNext:function (item) {
            item = item || this.item;
            try{
                var newItem = null;
                if(item && typeof item.index == 'number'){
                    if(item.index < $scope.flat.floorList[item.parent].roomList[item.indexParent].length - 1 ){
                        newItem = $scope.flat.floorList[item.parent].roomList[item.indexParent][item.index+1] || null;
                    }
                    else{
                        if(item.indexParent < $scope.flat.floorList[item.parent].roomList.length - 1){
                            newItem = $scope.flat.floorList[item.parent].roomList[item.indexParent+1][0] || null;
                        }else{
                            if(item.parent < $scope.flat.floorList.length - 1){
                                newItem = $scope.flat.floorList[item.parent+1].roomList[0][0] || null;
                            }
                            else{
                                newItem =  null; 
                            }
                                
                        }
                    }
                    if(newItem && newItem.isLive){
                        return this.getNext(newItem);
                    }else
                        return newItem;
                }
                else return null;
            }
            catch(e){
                return null;
                // throw e;
            }
        },
        getPrev:function (item) {
            item = item || this.item;
            try{
                var newItem = null;
                if(item && typeof item.index == 'number'){
                    if(item.index > 0){
                        newItem = $scope.flat.floorList[item.parent].roomList[item.indexParent][item.index-1] || null;
                    }
                    else{
                        if(item.indexParent > 0){
                            newItem = $scope.flat.floorList[item.parent].roomList[item.indexParent-1][$scope.flat.floorList[item.parent].roomList[this.room.indexParent-1].length-1] || null;
                        }else{
                            if(item.parent > 0)
                                newItem = $scope.flat.floorList[item.parent-1].roomList[$scope.flat.floorList[item.parent-1].roomList.length-1][$scope.flat.floorList[item.parent-1].roomList[$scope.flat.floorList[item.parent-1].roomList.length-1].length - 1] || null;
                            else
                                newItem = null; 
                        }
                    }
                    if(newItem && newItem.isLive){
                        return this.getPrev(newItem);
                    }else
                        return newItem;
                }
                else return null;
            }
            catch(e){
                return null;
                //throw e;
                
            }
        },
        setData : function (n) {
            var item = null;
            if(n){
                item = this.getNext();
            }else{
                item = this.getPrev();
            }
            if(item){
                this.item = item;
                return this.getData();
            }
                
        },
        dataInit : function (item,parent) {
            //打分初始化相关
            this.item = item;
            this.tab = 1;
            // console.log(item);
            this.img = null;
            this.bed = null;
            this.room = null;
            this.rule = null;
            return this.getData();
        },
        getData:function (n) {
            var that = this;
            this.tab = n || this.tab;
            
            switch (this.tab) {
                case 1:
                    if(this.item.roomScoreId){
                        $rootScope.loading = true;
                        return GradeService.getGrade({
                            token:AppConfig.token,
                            roomscoreid:this.item.roomScoreId,
                            type:0
                        }).success(function (data) {
                            $rootScope.loading = false;
                            if(data.code == 0){
                                that.room = data.data;
                                that.getSum(true);
                            }
                            else
                                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            //console.log(data);
                        });
                    }
                    else{
                        if($rootScope.treeGrade[0] && $rootScope.treeGrade[0].typeList && $rootScope.treeGrade[0].typeList[0].itemList)
                        {
                            that.room = $rootScope.treeGrade[0].typeList[0].itemList;
                            that.getSum(true);
                            //$rootScope.treeGrade[0].tableId;
                            //$rootScope.treeGrade[0].typeList[0].typeId;
                        }    
                        else
                            that.room = [];
                        
                        console.log($rootScope.treeGrade[0]);
                        
                    }
                    break;
                case 2:
                    $rootScope.loading = true;
                    return GradeService.getBedGrade({
                        token:AppConfig.token,
                        roomid:this.item.roomId,
                        semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                        currentweek:$scope.media.week,
                        type:0
                    }).success(function (data) {
                        $rootScope.loading = false;
                        if(data.code == 0){
                            that.bed = data.data;
                            that.bedscoreid = 1;
                            if(data.data.length>0){
                                that.bed.forEach(function (bed) {
                                    if(bed.itemList.length < 1){
                                        that.bedscoreid = 0;
                                        bed.itemList = [];
                                        bed.totalScore = 0;
                                        var options = [];
                                        if($rootScope.treeGrade[0] && $rootScope.treeGrade[0].typeList && $rootScope.treeGrade[0].typeList[0].itemList)
                                        {
                                            options = $rootScope.treeGrade[0].typeList[1].itemList;
                                            //$rootScope.treeGrade[0].tableId;
                                            //$rootScope.treeGrade[0].typeList[1].typeId;
                                        }    
                                        else
                                            options = [];
                                            console.log(options);
                                        options.forEach(function (item) {
                                            if(item.subNodes){
                                                item.subNodes.forEach(function (item1) {
                                                    bed.itemList.push({
                                                        typeId:item1.typeId,
                                                        title:item1.title,
                                                        maxScore:item1.standardType?-1:item1.fullMark,
                                                        score:item1.standardType?-1:item1.fullMark
                                                    })
                                                    bed.totalScore += item1.standardType?1:item1.fullMark;
                                                })
                                            }else{
                                                bed.itemList.push({
                                                    typeId:item.typeId,
                                                    title:item.title,
                                                    maxScore:item.standardType?-1:item1.fullMark,
                                                    score:item.standardType?-1:item1.fullMark
                                                })
                                                bed.totalScore += item.standardType?1:item1.fullMark;
                                            }
                                        })
                                    }
                                })
                            }
                        }
                        else
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        //console.log(data);
                    });
                case 3:
                    $rootScope.loading = true;
                    return GradeService.getGradeImgs({
                        token:AppConfig.token,
                        roomid:this.item.roomId,
                        semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                        currentweek:$scope.media.week,
                        type:0
                    }).success(function (data) {
                        $rootScope.loading = false;
                        
                        if(data.code == 0){
                            that.img = data.data;
                        }
                        else
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        //console.log(data);
                    });
                case 4:
                    $rootScope.loading = true;
                    return RuleService.getListByRoom({
                        token:AppConfig.token,
                        schoolcode:AppConfig.schoolCode,
                        specialid:this.item.roomId+'_'+$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId+'_'+$scope.media.week
                    }).success(function (data) {
                        $rootScope.loading = false;
                        
                        if(data.code == 0){
                            that.rule = data.data;
                        }
                        else
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        //console.log(data);
                    });
            }
            return null;
        },
        getSum:function(reset) {
            try{
                if(this.room){
                    var sum = 0;
                    this.room.forEach(function (category) {
                        if(category.itemList)
                            category.itemList.forEach(function (item) {
                                if(item.standardType){
                                    if(item.score == -1) sum+=1;
                                }else{
                                    sum+= item.score;
                                }
                                
                            })
                        else if(category.subNodes)
                            category.subNodes.forEach(function (item) {
                                if(item.standardType){
                                    if(item.score == -1) sum+=1;
                                    item.score = reset?-1 : (item.score || -1);
                                }else{
                                    sum+= item.score;
                                    item.score = reset?item.fullMark : (item.score || item.fullMark);
                                }
                            })
                    })
                    return sum;
                }
                return 0;
            }
            catch(e){
                return 0;
            }
        },
        getBedSum:function (bed) {
            try{
                if(bed && bed.itemList){
                    bed.totalScore = 0;
                    for(var i=0;i < bed.itemList.length;i++){
                        if(bed.itemList[i].standardType && bed.itemList.score == -1){
                            bed.totalScore+= 1;
                        }else
                            bed.totalScore+= bed.itemList[i].score;
                    }
                }
                return bed.totalScore;
            }catch(e)
            {
                return 0;    
            }
        },
        grade:function (n,item) {
            if($scope.media.tab == 1 && $rootScope.menuCheck(191)){
                if(item.score < 0){
                    item.score = item.score==-1?-2:-1;
                }else
                if(item.score + n <= (item.fullMark || item.maxScore) && item.score + n >= 0){
                    item.score += n;
                }
            }
        },
        addRule:function (list,item) {
            for(var i=0;i <list.length;i++){
                if(list[i].itemId == item.itemId)return;
            }
            list.push({
                itemId:item.itemId,
                itemName:item.title
            })
        },
        removeRule:function (list,index) {
            list.splice(index,1);
        },
        gradeSave:function (fun) {
            if(this.room)
                this.roomGrade(fun);
            else if(this.bed && this.bed.length>0) this.roomGrade(fun);
            else if(this.img)this.roomGrade(fun);
            else if(this.rule)this.ruleSave(fun);
        },
        roomGrade:function(fun){
            var grades = "[",that = this;
            // console.log(this.room);
            this.room.forEach(function (item,i) {
                var list = item.itemList || item.subNodes;
                console.log(list);
                for(var j = 0;j < list.length; j++){
                    grades += '{"typeid":' + (list[j].typeId || list[j].typeid || list[j].itemId) + ',"score":' + list[j].score +'},';
                }
            })
            if(grades.length > 2)
                grades = grades.substring(0,grades.length-1) + ']';
            else return;
            // console.log(grades); 
            if(grades.length > 0){
                $rootScope.loading = true;
                if(this.item.roomScoreId){
                    GradeService.editGrade({
                        token:AppConfig.token,
                        roomscoreid:this.item.roomScoreId,
                        scoreitem:grades,
                        type:0
                    }).success(function(data){
                        $rootScope.loading = false;
                        if(data.code == 0){
                            if(that.bed && that.bed.length>0){
                                that.bedGrade(fun);
                            }else if(that.img){
                                that.gradeImg(fun);
                            }
                            else if(that.rule)that.ruleSave(fun);
                            else{
                                if(fun && typeof fun == 'function') fun();
                                swal("提示","保存成功！", "success"); 
                                refresh();
                            }
                            that.room = null;
                        }else{
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        }
                    });
                }
                else{
                    
                    GradeService.setGrade({
                        token:AppConfig.token,
                        schoolcode:AppConfig.schoolCode,
                        roomid:this.item.roomId,
                        semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                        currentweek:$scope.media.week,
                        adminid:AppConfig.adminId,
                        scoreitem:grades,
                        type:0
                    }).success(function(data){
                        $rootScope.loading = false;
                        if(data.code == 0){
                            if(that.bed&& that.bed.length>0){
                                that.bedGrade(fun);
                            }else if(that.img){
                                that.gradeImg(fun);
                            }
                            else if(that.rule)that.ruleSave(fun);
                            else{
                                swal("提示","打分成功！", "success"); 
                                refresh();
                                if(fun && typeof fun == 'function') fun();
                            }
                            that.room = null;
                        }else{
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        }
                    });
                }
            }
        },
        bedGrade:function(fun){
            var grades = "[",that = this;
            if(!(that.bed && that.bed.length>0)){
                if(that.img){
                    that.gradeImg(fun);
                }
                else if(that.rule)that.ruleSave(fun);
                return;
            }
            // console.log(this.room);
            this.bed.forEach(function (item,i) {
                var list = item.itemList;
                console.log(list);
                for(var j = 0;j < list.length; j++){
                    grades += '{"typeid":' + (list[j].typeId || list[j].typeid || list[j].itemId) + ',"studentkey":"' + item.studentKey +  '","bedid":"' + item.bedId + '","score":' + list[j].score +'},';
                }
            })
            if(grades.length > 2)
                grades = grades.substring(0,grades.length-1) + ']';
            else return;
            // console.log(grades);
            if(grades.length > 0){
                $rootScope.loading = true;
                if(this.item.bedScoreId){
                    GradeService.editBedGrade({
                        token:AppConfig.token,
                        roomid:this.item.roomId,
                        semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                        currentweek:$scope.media.week,
                        scoreitem:grades,
                        type:0
                    }).success(function(data){
                        $rootScope.loading = false;
                        if(data.code == 0){
                            if(that.img){
                                that.gradeImg(fun);
                            }
                            else if(that.rule)that.ruleSave(fun);
                            else{
                                refresh();
                                swal("提示","保存成功！", "success");
                                if(fun && typeof fun == 'function') fun();
                            }
                            that.bed = null;
                        }else{
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        }
                    });
                }
                else{
                    GradeService.setBedGrade({
                        token:AppConfig.token,
                        schoolcode:AppConfig.schoolCode,
                        roomid:this.item.roomId,
                        semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                        currentweek:$scope.media.week,
                        adminid:AppConfig.adminId,
                        scoreitem:grades,
                        type:0
                    }).success(function(data){
                        $rootScope.loading = false;
                        if(data.code == 0){
                            if(that.img){
                                that.gradeImg(fun);
                            }
                            else if(that.rule)that.ruleSave(fun);
                            else{
                                swal("提示","打分成功！", "success"); 
                                refresh();
                                if(fun && typeof fun == 'function') fun();
                            }
                            that.bed = null;
                        }else{
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        }
                    });
                }
            }
        },
        gradeImg:function(fun){
            
            var imgs = "",that = this;
            this.img.forEach(function (item,i) {
                imgs += (item.fileId || item.fileid) + ',';
                
            })
            if(imgs.length > 0)
                imgs = imgs.substring(0,imgs.length-1);
            else return;
            console.log(imgs);
            $rootScope.loading = true;
            GradeService.uploadImg({
                token:AppConfig.token,
                schoolcode:AppConfig.schoolCode,
                roomid:this.item.roomId,
                semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                currentweek:$scope.media.week,
                adminid:AppConfig.adminId,
                fileids:imgs,
                type:0
            }).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    if(that.rule)that.ruleSave(fun);
                    else{
                        swal("提示","打分成功！", "success"); 
                        refresh();
                        if(fun && typeof fun == 'function') fun();
                        that.img = null;
                    }
                    
                }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        },
        ruleSave:function (fun) {
            var items = "[",that = this;
            this.rule.itemList.forEach(function (item) {
                items += '{"bedid": "","itemid": ' + item.itemId + '},';
            });
            this.rule.bedList.forEach(function (bed) {
                if(bed.itemList)
                    bed.itemList.forEach(function (item) {
                        items += '{"bedid": "' + bed.bedId + '","itemid": ' + item.itemId + '},';
                    });
            });
            if(items.length > 2){
                items = items.substring(0,items.length-1) + ']';
            }else 
                items += "]";
            RuleService.checkByRoom({
                token:AppConfig.token,
                schoolcode:AppConfig.schoolCode,
                roomid:this.item.roomId,
                specialid:this.item.roomId+'_'+$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId+'_'+$scope.media.week,
                adminid:AppConfig.adminId,
                itemlist:items,
                source:0
            }).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示","打分成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function') fun();
                    that.rule = null;
                }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        },
        menuCheck:function(){
            
            
            return false;
        }
    }
    //上传打分图片，并将返回的img url显示
    $scope.uploadImg = function(){
        var files = event.target.files;
        var s = files[0].name.split(".").pop();
        if(s != "jpg" && s != "png" && s != "jpeg"){
            swal('提示', '文件格式不正确！请上传*.jpg或*.png文件', 'error'); 
            return false;
        }
        var form = document.createElement('form');
        form.enctype = 'multipart/form-data';
        var fdata = new FormData(form);
        if (!fdata) { swal('提示', '你的浏览器不支持文件上传！', 'error'); return false; };
        fdata.append('img', files[0]);
        
        fdata.append('token', AppConfig.token);
        fdata.append('schoolcode', AppConfig.schoolCode);
        console.log(fdata);
        $rootScope.loading = true;
        return PublicService.imgUpload(fdata).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.cardMedia.img = $scope.cardMedia.img || [];
                $scope.cardMedia.img.push({
                    picUrl:data.data.serverPath,
                    fileId:data.data.fileId
                });
                console.log($scope.cardMedia.img);
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
        
    }
    
    
    
    //界面初始化相关
    if(!$rootScope.treeTerm)
        TermService.getList().success(function(data){
            console.log(data);
            if(data.code == 0){
                $rootScope.treeTerm = data.data;
                getFlat();
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
        }); 
    else {
        getFlat();
    }
    
    function getFlat() {
       if(!$rootScope.treeFlat){
            FlatService.getList(AppConfig.schoolCode).success(function(data){
                //console.log(data);
                if(data.code == 0){
                    $rootScope.treeFlat = data.data;
                    getSetting();
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
            });
        }
        else
        {
            getSetting();
        }
    };
    function getSetting() {
        if(!$rootScope.treeGrade)
            return GradeService.getSettingList({type:0,isopen:1}).success(function(data){
                if(data.code == 0){
                    $rootScope.treeGrade = data.data;
                    getRule();
                }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        else
            getRule();
    }
    function getRule() {
        var change = function () {
            var list = [];
            $rootScope.treeRule.forEach(function (group) {
                list.push({
                    fid:0,
                    title:group.title
                })
                if(group.subNodes)
                {
                    group.subNodes.forEach(function (item) {
                        list.push(item);
                    })
                }
            })
            return list;
        }
        if(!$rootScope.treeRule)
            return RuleService.getList().success(function(data){
                if(data.code == 0){
                    $rootScope.treeRule = data.data;
                    $scope.rules = change();
                    init();
                }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        else{
            init();
            $scope.rules = change();
        }
    }
    function init() {
        for(var i = 0;i < $rootScope.treeTerm.length;i ++){
            for(var j = 0; j < $rootScope.treeTerm[i].semesterList.length ; j ++ ){
                if(($rootScope.treeTerm[i].semesterList[j].isCurrent) || (i == $rootScope.treeTerm.length-1 && j == $rootScope.treeTerm[i].semesterList.length-1)){
                    $scope.media.yearIndex = i;
                    $scope.media.termIndex = j;
                    $scope.media.week = $rootScope.treeTerm[i].semesterList[j].currentWeek || 1;
                    $scope.media.weekList  = $filter('sliceWeek')($rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex]);
                    console.log($scope.media.weekList);
                    if($rootScope.treeFlat.cmpusList[0]&&$rootScope.treeFlat.cmpusList[0].liveAreaList[0]&&$rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0]&&$rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId){
                        $scope.media.show(3,$rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0],$rootScope.treeFlat.cmpusList[0],$rootScope.treeFlat.cmpusList[0].liveAreaList[0]);
                    }else
                        $rootScope.loading = false;
                    return;
                }
            }
            
        }
        
    };
    function refresh() {
        if($scope.media.flatid.length<1)return;
        $rootScope.loading = true;
        if($scope.media.tab == 1){
            GradeService.getListByFlat({
                flatid:$scope.media.flatid,
                semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                currentweek:$scope.media.week || 1,
                type:0
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    data.list.floorList = data.list.floorList || [];
                    data.list.floorList.forEach(function(list,index){
                        list.roomList = list.roomList || [];
                        list.roomList =  $filter('sliceArray')(list.roomList,10,index);
                        // console.log(index);
                    });
                    $scope.flat = data.list;
                    $scope.flat.flatName = $scope.media.campus + '-' + $scope.media.liveArea + '-' + $scope.media.title;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
                console.log(data);
            })
        }else if($scope.media.tab == 2){
            GradeService.getList({
                epage:$scope.media.epage,
                pagesize:$scope.media.pagesize,
                liveareaid:$scope.media.liveareaid,
                campusid:$scope.media.campusid,
                studentnumber:$scope.media.studentnumber,
                name:$scope.media.name,
                roomname:$scope.media.roomname,
                orderfield:$scope.media.orderfield,
                ordertype:$scope.media.ordertype,
                flatid:$scope.media.flatid1,
                semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                currentweek:$scope.media.week,
                type:0
            }).success(function (data) {
                $rootScope.loading = false;
                
                if(data.code == 0){
                    $scope.rooms = data.list;
                    $scope.media.recordCount = data.list.recordCount;
                    $scope.media.pageCount = data.list.pageCount;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                // console.log(data);
            })
        }else if($scope.media.tab == 3){
            GradeService.getTopList({
                epage:$scope.media.epage,
                pagesize:$scope.media.pagesize,
                liveareaid:$scope.media.liveareaid,
                campusid:$scope.media.campusid,
                studentnumber:$scope.media.studentnumber,
                name:$scope.media.name,
                roomname:$scope.media.roomname,
                orderfield:$scope.media.orderfield,
                ordertype:$scope.media.ordertype,
                flatid:$scope.media.flatid1,
                semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
                currentweek:$scope.media.week,
                tobed:$scope.media.tobed,
                type:0
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    $scope.topList = data.list;
                    $scope.media.recordCount = data.list.recordCount;
                    $scope.media.pageCount = data.list.pageCount;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
                // console.log(data);
            })
        }
    };
    
}]);