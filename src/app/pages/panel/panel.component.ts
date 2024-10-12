import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export default class PanelComponent {

}
