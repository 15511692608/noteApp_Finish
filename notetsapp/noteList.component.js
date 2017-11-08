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
var AppListComponent = (function () {
    function AppListComponent(noteService, router, route) {
        this.noteService = noteService;
        this.router = router;
        this.route = route;
        this.notes = [];
    }
    AppListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.noteService.getAllNote().then(function (notes) { return _this.notes = notes; });
    };
    AppListComponent.prototype.doEdit = function (editNote) {
        this.router.navigate(['/noteEdit', JSON.stringify(editNote)]);
    };
    AppListComponent.prototype.doDel = function (delNote) {
        var _this = this;
        this.noteService.delNote(delNote).then(function (result) {
            _this.noteService.getAllNote().then(function (notes) { return _this.notes = notes; });
        });
    };
    AppListComponent.prototype.doShow = function (noteId) {
        this.router.navigate(['/noteShow', noteId]);
    };
    AppListComponent = __decorate([
        core_1.Component({
            selector: 'noteList',
            /*animations: [
              trigger(
                'openClosePanel',
                [
                  state('close, void', style({opacity:'0.2',top:'90%'})),
                  state('open', style({opacity:'1',top:'40%'})),
                  transition(
                      'close <=> open', [animate(500)])
                ]),
              trigger(
                'openCloseHero',
                [
                  state('close, void', style({opacity:'0',top:'-100%'})),
                  state('open', style({opacity:'1',top:'10%'})),
                  transition(
                      'close <=> open', [animate(500)]),
                  transition(
                      'void => open', [animate(500)])
                ])
              ],*/
            templateUrl: '/noteList.html',
            styleUrls: ['stylesheets/noteList.css']
        }), 
        __metadata('design:paramtypes', [note_service_1.noteService, router_1.Router, router_1.ActivatedRoute])
    ], AppListComponent);
    return AppListComponent;
}());
exports.AppListComponent = AppListComponent;
