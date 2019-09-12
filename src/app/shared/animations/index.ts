import { trigger, state, style, transition, animate } from '@angular/animations';
export const animations = [
    trigger('expandCollapse', [
        state('closed',style({
            display: 'none',
            left: '0px',
            opacity: 0
        })),
        state('open', style({
            display: 'block',
            left: '-50px',
            opacity: 1
        })),
        transition('closed <=> open', [
            style({
                left: '*',
                opacity: '*',
            }),
            animate('0.2s ease-in')
        ])
    ])
];