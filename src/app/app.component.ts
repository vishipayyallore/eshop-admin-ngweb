import { Component } from '@angular/core';
import config from '~config'
import { environment } from '~/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  environment=environment
  title = config.appName;
}
