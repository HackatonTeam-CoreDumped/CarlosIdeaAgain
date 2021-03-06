import { Storage } from '@ionic/storage';
import { User } from './interfaces/user';
import { APIService } from './api.service';
import { AuthserviceService } from './authservice.service';
import {Component} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

  pages = [
    {
      title: 'Noticias',
      url: '/core/home',
      icon: 'home'
    },
    {
      title: 'Buscador',
      url: '/buscausers',
      icon: 'contacts'
    },
    {
      title: 'Foros',
      url: '/lista-foros',
      icon: 'ios-chatbubbles'
    },
    {
      title: 'Talleres',
      url: '/talleres',
      icon: 'ios-construct'
    },
    {
      title: 'Hackatones',
      url: '/hackathons',
      icon: 'laptop'
    },
    {
      title: 'Tutoriales',
      url: '/tutoriales',
      icon: 'ios-book'
    },
    {
      title: 'Calendario',
      url: '/calendario',
      icon: 'calendar'
    },
    {
      title: 'Empleo',
      url: '/empleo',
      icon: 'paper'
    }
  ];

  selectedPath = '';
  picture: string;
  username: string;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private service: APIService,
    private auth: AuthserviceService,
    private storage: Storage
  ) {

    this.initializeApp();

    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
    this.auth.getEmail().then((email) => {
      this.service.tieneCuenta(email).then(promise => {
        promise.subscribe((data: User) => {
          this.picture = data.user.picture;
          this.username = data.user.username;
        });
      }).catch(() => {
        this.picture = './assets/profileCore.jpg';
        this.username = 'Usuario';
      });
    });
  }

  goToProfile() {
    this.router.navigateByUrl('core/profile');
  }

  logOut() {
    this.storage.clear();
    this.router.navigateByUrl('login');
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
