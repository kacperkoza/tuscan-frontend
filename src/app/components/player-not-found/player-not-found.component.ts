import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-player-not-found',
  templateUrl: './player-not-found.component.html',
  styleUrls: ['./player-not-found.component.css']
})
export class PlayerNotFoundComponent {

  constructor(private router: Router) {
  }

  returnToHomePage() {
    this.router.navigateByUrl(`/`);
  }
}
