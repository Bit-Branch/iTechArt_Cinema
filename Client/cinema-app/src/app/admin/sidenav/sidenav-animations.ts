import { trigger, state, style, transition, animate } from '@angular/animations';

export const animations = [
  trigger(
    'onSideNavChange',
    [
      state(
        'close',
        style(
          {
            'min-width': '50px'
          }
        )
      ),
      state(
        'open',
        style(
          {
            'min-width': '200px'
          }
        )
      ),
      transition('close => open', animate('150ms ease-in')),
      transition('open => close', animate('150ms ease-in'))
    ]
  ),

  trigger(
    'onMainContentChange',
    [
      state(
        'close',
        style(
          {
            'margin-left': '62px'
          }
        )
      ),
      state(
        'open',
        style(
          {
            'margin-left': '200px'
          }
        )
      ),
      transition('close => open', animate('150ms ease-in')),
      transition('open => close', animate('150ms ease-in'))
    ]
  ),

  trigger(
    'animateText',
    [
      state(
        'hide',
        style(
          {
            'display': 'none',
            opacity: 0
          }
        )
      ),
      state(
        'show',
        style(
          {
            'display': 'block',
            opacity: 1
          }
        )
      ),
      transition('close => open', animate('150ms ease-in')),
      transition('open => close', animate('150ms ease-out'))
    ]
  )
];
