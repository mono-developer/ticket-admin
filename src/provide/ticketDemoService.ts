

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TicketDataService {

  public categoryList: any;
  public profileData: any;

  constructor(public http: Http) {

    this.profileData = [
      {
        id: 0,
        event_name: 'World Music',
        category: 'Music',
        date: '22-24 March 2018',
        location: 'Street West USA',
        url: 'assets/img/backgrounds/gallery-1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor.Suspendisse in sem justo.Integer laoreet magna nec elit suscipit, aclaoreet nibh euismod.Aliquam hendrerit lorem at elit facilisis rutrum.Ut at ullamcorper velit.Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero.Aenean feugiat non eros quis feugiat.'
      },
      { id: 1,
        event_name: 'Perfect Concert',
        category: 'Concert',
        date: '19-20 April 2018',
        location: 'Street West USA',
        url: '../../../assets/img/backgrounds/gallery-2.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor.Suspendisse in sem justo.Integer laoreet magna nec elit suscipit, aclaoreet nibh euismod.Aliquam hendrerit lorem at elit facilisis rutrum.Ut at ullamcorper velit.Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero.Aenean feugiat non eros quis feugiat.'
      },
      { id: 2,
        event_name: 'Actress Solor',
        category: 'Music',
        date: '20-24 March 2018',
        location: 'Street West USA',
        url: '../../../assets/img/backgrounds/gallery-3.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor.Suspendisse in sem justo.Integer laoreet magna nec elit suscipit, aclaoreet nibh euismod.Aliquam hendrerit lorem at elit facilisis rutrum.Ut at ullamcorper velit.Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero.Aenean feugiat non eros quis feugiat.'
      },
      { id: 3,
        event_name: 'Lunch',
        category: 'Family',
        date: '18-26 March 2018',
        location: 'Street West USA',
        url: '../../../assets/img/backgrounds/gallery-1.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor.Suspendisse in sem justo.Integer laoreet magna nec elit suscipit, aclaoreet nibh euismod.Aliquam hendrerit lorem at elit facilisis rutrum.Ut at ullamcorper velit.Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero.Aenean feugiat non eros quis feugiat.'
      },
      { id: 4,
        event_name: 'Melody Songs',
        category: 'Music',
        date: '01-07 April 2018',
        location: 'Street West USA',
        url: '../../../assets/img/backgrounds/gallery-2.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor.Suspendisse in sem justo.Integer laoreet magna nec elit suscipit, aclaoreet nibh euismod.Aliquam hendrerit lorem at elit facilisis rutrum.Ut at ullamcorper velit.Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero.Aenean feugiat non eros quis feugiat.'
      },
      { id: 5,
        event_name: 'Base Ball',
        category: 'Sport',
        date: '02-11 April 2018',
        location: 'Street West USA',
        url: '../../../assets/img/backgrounds/gallery-3.jpg',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor.Suspendisse in sem justo.Integer laoreet magna nec elit suscipit, aclaoreet nibh euismod.Aliquam hendrerit lorem at elit facilisis rutrum.Ut at ullamcorper velit.Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero.Aenean feugiat non eros quis feugiat.'
      }
    ]

    this.categoryList = [
      {
        id: 0,
        name: 'MUSIC',
        icon: 'library_music',
        color: 'lightgreen',
        description: 'A mobile first responsive template with material design.'
      },
      {
        id: 1,
        name: 'CONCERTS',
        icon: 'queue_music',
        color: 'cornflowerblue',
        description: 'Comes with light and dark options. Suitable for the universe'
      },
      { id: 2,
        name: 'FAMILY',
        icon: 'group',
        color: 'skyblue',
        description: 'Extra ordinary setting pannel with lots of awesome features.'
      },
      { id: 3,
        name: 'THEATER',
        icon: 'device_hub',
        color: 'fuchsia',
        description: 'Easy customizable framework using bootstrap sass.'
      },
      { id: 4,
        name: 'SPORT',
        icon: 'fitness_center',
        color: 'chartreuse',
        description: 'Extra ordinary setting pannel with lots of awesome features.'
      },
      { id: 5,
        name: 'CIRCUS',
        icon: 'music_note',
        color: 'cyan',
        description: 'A mobile first responsive template with material design.'
      },
      { id: 6,
        name: 'OTHERS',
        icon: 'info_outline',
        color: 'chartreuse',
        description: 'Comes with light and dark options. Suitable for the universe.'
      },
    ];
  }



}
