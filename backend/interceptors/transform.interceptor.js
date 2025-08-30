"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
function convertScreamingSnakeToCamelCase(input) {
    if (Array.isArray(input)) {
        return input.map((item) => convertScreamingSnakeToCamelCase(item));
    }
    else if (input !== null && typeof input === 'object') {
        const newObj = {};
        Object.keys(input).forEach((key) => {
            newObj[toCamelCase(key)] = convertScreamingSnakeToCamelCase(input[key]);
        });
        return newObj;
    }
    return input;
}
function isCamelCase(str) {
    return /[a-z][A-Z]/.test(str);
}
function toCamelCase(str) {
    if (isCamelCase(str)) {
        return str;
    }
    return str.toLowerCase().replace(/(_[a-z])/g, ($1) => {
        return $1.toUpperCase().replace('_', '');
    });
}
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next
            .handle()
            .pipe((0, operators_1.map)((data) => convertScreamingSnakeToCamelCase(data)));
    }
};
TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
exports.TransformInterceptor = TransformInterceptor;
//# sourceMappingURL=transform.interceptor.js.map