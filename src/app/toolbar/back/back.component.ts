import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { BrowsingService } from 'src/app/services/browsing.service';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent {
  faArrowLeft = faArrowLeft;
  faHome = faHome;
  faHeadphones = faHeadphones;
  
  constructor(
    public browsingService :BrowsingService
  ) {

  }
}
