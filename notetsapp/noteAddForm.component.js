"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
var note_service_1 = require('./note.service');
var router_1 = require('@angular/router');
var AppAddFormComponent = (function () {
    function AppAddFormComponent(noteService, router, route) {
        this.noteService = noteService;
        this.router = router;
        this.route = route;
        this.stsLst = ['任务', '笔记', '任务等待', '任务进行', '任务完成', '其他'];
        this.submitted = false;
        this.note = {};
        this.addResult = '';
        this.addedNote = {};
        this.editNote = {};
    }
    AppAddFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.map(function (p) { return p['note']; }).subscribe(function (note) {
            _this.editNote = note ? JSON.parse(note) : false;
            if (_this.editNote) {
                // edit
                _this.note.content = _this.editNote.content;
                _this.note.name = _this.editNote.name;
                _this.note.sts = _this.editNote.sts;
                _this.note._id = _this.editNote._id;
                _this.note.time = _this.editNote.time;
            }
            else {
                // add
                _this.note.time = _this.Format(new Date, "yyyy-MM-dd");
                _this.note.content = '便利贴内容';
                _this.note.name = '便利贴标题';
                _this.note.sts = _this.stsLst[0];
            }
        });
        //this.noteService.getAllNote().then(notes => this.notes=notes);
    };
    AppAddFormComponent.prototype.onSubmit = function () {
        var _this = this;
        if (!this.editNote) {
            // add
            this.noteService.addNote(this.note).then(function (result) {
                _this.addResult = JSON.stringify(result);
                _this.addedNote = result.ops ? result.ops[0] : {};
                _this.submitted = true;
            });
        }
        else {
            // edit
            this.noteService.editNote(this.note).then(function (result) {
                _this.addResult = JSON.stringify(result);
                _this.addedNote = result.ops ? result.ops[0] : {};
                _this.addedNote = _this.note;
                _this.submitted = true;
            });
        }
    };
    AppAddFormComponent.prototype.noteFormInit = function () {
        this.note.time = this.Format(new Date, "yyyy-MM-dd");
        this.note.content = '便利贴内容';
        this.note.name = '便利贴标题';
        this.note.sts = this.stsLst[0];
    };
    AppAddFormComponent.prototype.doReadd = function () {
        this.note.time = this.Format(new Date, "yyyy-MM-dd");
        this.note.content = '便利贴内容';
        this.note.name = '便利贴标题';
        this.note.sts = this.stsLst[0];
        this.submitted = !this.submitted;
    };
    AppAddFormComponent.prototype.doReedit = function () {
        this.editNote.content = this.addedNote.content;
        this.editNote.name = this.addedNote.name;
        this.editNote.sts = this.addedNote.sts;
        this.editNote._id = this.addedNote._id;
        this.editNote.time = this.addedNote.time;
        this.note.content = this.editNote.content;
        this.note.name = this.editNote.name;
        this.note.sts = this.editNote.sts;
        this.note._id = this.editNote._id;
        this.note.time = this.editNote.time;
        this.submitted = !this.submitted;
    };
    AppAddFormComponent.prototype.doEditReset = function () {
        this.note.content = this.editNote.content;
        this.note.name = this.editNote.name;
        this.note.sts = this.editNote.sts;
        this.note._id = this.editNote._id;
        this.note.time = this.editNote.time;
    };
    AppAddFormComponent.prototype.Format = function (date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
    AppAddFormComponent = __decorate([
        core_1.Component({
            selector: 'noteAdd',
            templateUrl: '/noteDetail.html',
            styleUrls: ['stylesheets/bootstrap.min.css'],
            styles: [
                "\n    textarea{min-height:200px}\n    .ng-valid[required], .ng-valid.required  {\n      border-left: 5px solid #42A948; /* green */\n    }\n    .ng-invalid:not(form)  {\n      border-left: 5px solid #a94442; /* red */\n    }\n    .info{\n      padding:10px;\n      background:rgba(255,160,122,0.7);\n    }\n  "
            ]
        }), 
        __metadata('design:paramtypes', [note_service_1.noteService, router_1.Router, router_1.ActivatedRoute])
    ], AppAddFormComponent);
    return AppAddFormComponent;
}());
exports.AppAddFormComponent = AppAddFormComponent;
