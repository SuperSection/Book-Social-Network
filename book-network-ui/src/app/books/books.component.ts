import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./components/menu/menu.component";

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './pages/main/main.component.html',
  styleUrl: './pages/main/main.component.scss'
})
export class MainComponent {
}