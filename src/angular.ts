import {Component, NgModule, ReflectiveInjector, Inject, Provider, InjectionToken, NgModuleFactory} from '@angular/core';
import {JitCompiler, COMPILER_PROVIDERS} from '@angular/compiler';
import {BrowserModule} from '@angular/platform-browser';
import {ServerModule} from '@angular/platform-server';

const compiler: JitCompiler = ReflectiveInjector.resolveAndCreate(COMPILER_PROVIDERS).get(JitCompiler);

const CONTEXT = new InjectionToken<Object>('CONTEXT');

function componentFromTemplate(template: string): any {
  @Component({selector: 'ng-rendered', template})
  class Temporary {
    constructor(@Inject(CONTEXT) context: Object) {
      Object.keys(context).forEach(key => this[key] = context[key]);
    }
  }

  return Temporary;
}

export function provideContext(context: Object): Provider[] {
  return [{
    provide: CONTEXT,
    useValue: context
  }];
}

export function moduleFromTemplate(template: string, modules: any[]): NgModuleFactory<any> {
  const Cmp = componentFromTemplate(template);

  @NgModule({
    imports: [
      BrowserModule.withServerTransition({appId: 'ng-rendered'}),
      ServerModule,
      ...modules,
    ],
    bootstrap: [
      Cmp,
    ],
    declarations: [
      Cmp,
    ],
  })
  class Module {}
  return compiler.compileModuleSync(Module);
}
