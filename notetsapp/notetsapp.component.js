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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var AppComponent = (function () {
    function AppComponent(location, route) {
        this.location = location;
        this.route = route;
        this.notes = [];
        this.title = '我的便利贴';
    }
    AppComponent.prototype.ngOnInit = function () {
        //to do
    };
    AppComponent.prototype.goBack = function () {
        if (!this.location.isCurrentPathEqualTo('/'))
            this.location.back();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: '.noteMain',
            template: "\n\t<h1>{{title}}</h1>\n\t<nav>\n\t\t<a routerLink=\"/noteList\" routerLinkActive=\"active\">\u5217\u8868</a>\n\t\t<a routerLink=\"/noteAdd\" routerLinkActive=\"active\">\u6DFB\u52A0</a>\n\t\t<a href=\"javascript:void(0)\"(click)=\"goBack()\" *ngIf=\"!this.location.isCurrentPathEqualTo('/')\">\u8FD4\u56DE</a>\n\t</nav>\n\t<br />\n\t<router-outlet></router-outlet>\n\t<div [hidden]=\"!location.isCurrentPathEqualTo('/')\" style='text-align:center;position:absolute;top:10%;z-index:-1;width:90%;'><img src='images/pic.jpg' /></div>\n  ",
            styles: [
                "\n\tnav a {\n\t  padding: 5px 10px;\n\t  text-decoration: none;\n\t  margin-top: 10px;\n\t  display: inline-block;\n\t  background-color: #eee;\n\t  border-radius: 4px;\n\t}\n\tnav a:visited, a:link {\n\t  color: #607D8B;\n\t}\n\tnav a:hover {\n\t  color: #039be5;\n\t  background-color: #CFD8DC;\n\t}\n\tnav a.active {\n\t  background-color: #039be5;\n\t  color: #eee;\n\t}\n  "
            ]
        }), 
        __metadata('design:paramtypes', [common_1.Location, router_1.ActivatedRoute])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
