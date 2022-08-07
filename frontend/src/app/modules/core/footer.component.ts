import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <style>
      footer{
        position: absolute;
        left: 0;
        width: 100%;
        text-align: center;
      }
    </style>
    <footer class="text-center mt-2">
        <p>&copy; HoRa 2022. All right reserved</p>
    </footer>
  `
})
export class FooterComponent {}
