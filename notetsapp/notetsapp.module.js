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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var notetsapp_component_1 = require('./notetsapp.component');
var noteList_component_1 = require('./noteList.component');
var noteAddForm_component_1 = require('./noteAddForm.component');
var noteShow_component_1 = require('./noteShow.component');
var note_service_1 = require('./note.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot([
                    {
                        path: 'noteList',
                        component: noteList_component_1.AppListComponent
                    },
                    {
                        path: 'noteAdd',
                        component: noteAddForm_component_1.AppAddFormComponent
                    },
                    {
                        path: 'noteEdit/:note',
                        component: noteAddForm_component_1.AppAddFormComponent
                    },
                    {
                        path: 'noteShow/:noteId',
                        component: noteShow_component_1.AppShowComponent
                    }
                ]),
                forms_1.FormsModule
            ],
            providers: [note_service_1.noteService],
            declarations: [
                notetsapp_component_1.AppComponent,
                noteList_component_1.AppListComponent,
                noteAddForm_component_1.AppAddFormComponent,
                noteShow_component_1.AppShowComponent
            ],
            bootstrap: [notetsapp_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
