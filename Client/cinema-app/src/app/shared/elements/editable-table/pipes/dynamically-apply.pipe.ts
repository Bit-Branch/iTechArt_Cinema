import { Injector, Pipe, PipeTransform, Type } from '@angular/core';

/**
 * Pipe for dynamically applying another pipe (if it has been provided in TableColumn definition for current element)
 */
@Pipe({
  name: 'dynamicallyApply'
})
export class DynamicallyApplyPipe implements PipeTransform {
  constructor(private injector: Injector) {
  }

  transform(value: unknown, applyingPipe?: Type<PipeTransform>, pipeArgs: unknown[] = []): unknown {
    // if pipe for transforming has been provided
    // (is it has been declared as a 'pipe' field of TableColumn definition for current value)
    if (applyingPipe) {
      // create instance of this pipe
      const injector = Injector.create({
        name: 'DynamicPipe',
        parent: this.injector,
        providers: [
          { provide: applyingPipe }
        ]
      });
      const pipe = injector.get(applyingPipe);
      // use created instance to transform value
      return pipe.transform(value, ...pipeArgs);
    }
    // else just return initial value
    return value;
  }
}
