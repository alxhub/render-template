import {renderModuleFactory} from '@angular/platform-server';
import {provideContext, moduleFromTemplate} from './angular';

const document = `
<!doctype html>
<html>
  <head>
    <title>Rendered with Angular</title>
  </head>
  <body>
    <ng-rendered></ng-rendered>
  </body>
</html>`;

export function ngStatic(template: string, modules: any[] = []): (context: Object) => Promise<string> {
  const factory = moduleFromTemplate(template, modules);
  return (context: Object) => renderModuleFactory(factory, {document, url: '/', extraProviders: [
    provideContext(context),
  ]});
}
