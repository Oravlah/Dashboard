import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FooterComponent from '../footer/footer.component';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
