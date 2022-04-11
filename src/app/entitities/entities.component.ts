import { Component } from '@angular/core';

import { entities } from './constants'


@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent {
  entities = entities
}
