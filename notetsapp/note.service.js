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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
require('rxjs/add/operator/map');
require('rxjs/add/operator/switchMap');
var noteService = (function () {
    function noteService(http) {
        this.http = http;
    }
    noteService.prototype.getAllNote = function () {
        return this.http.get('/mongodb/getAllNote').toPromise().then(function (res) {
            return JSON.parse(res.text());
        }).catch(this.handleError);
    };
    noteService.prototype.getNote = function (noteId) {
        return this.http.post('/mongodb/getNote', { _id: noteId }).toPromise().then(function (res) {
            return JSON.parse(res.text());
        }).catch(this.handleError);
    };
    noteService.prototype.addNote = function (note) {
        return this.http.post('/mongodb/addNote', note).toPromise().then(function (res) {
            return JSON.parse(res.text());
        }).catch(this.handleError);
    };
    noteService.prototype.delNote = function (note) {
        return this.http.post('/mongodb/delNote', note).toPromise().then(function (res) {
            return JSON.parse(res.text());
        }).catch(this.handleError);
    };
    noteService.prototype.editNote = function (note) {
        return this.http.post('/mongodb/editNote', note).toPromise().then(function (res) {
            return JSON.parse(res.text());
        }).catch(this.handleError);
    };
    noteService.prototype.handleError = function (error) {
        console.error(error);
        return {};
    };
    noteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], noteService);
    return noteService;
}());
exports.noteService = noteService;
