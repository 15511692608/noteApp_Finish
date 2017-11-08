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
var AppShowComponent = (function () {
    function AppShowComponent(noteService, router, route) {
        this.noteService = noteService;
        this.router = router;
        this.route = route;
        this.note = {};
    }
    AppShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.map(function (p) { return p['noteId']; }).subscribe(function (noteId) {
            _this.noteService.getNote(noteId).then(function (note) {
                _this.note = note && note.length > 0 ? note[0] : false;
                if (_this.note)
                    _this.note.content = _this.note.content.replace(/\n/g, '<br/>');
            });
        });
    };
    AppShowComponent = __decorate([
        core_1.Component({
            selector: 'noteShow',
            templateUrl: '/noteShow.html',
            styleUrls: ['stylesheets/bootstrap.min.css'],
            styles: [
                "\n    .info{\n      padding:10px;\n      background:rgba(255,160,122,0.9);\n      font-size:20px;\n    }\n  "
            ]
        }), 
        __metadata('design:paramtypes', [note_service_1.noteService, router_1.Router, router_1.ActivatedRoute])
    ], AppShowComponent);
    return AppShowComponent;
}());
exports.AppShowComponent = AppShowComponent;
