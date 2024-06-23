import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from '../data/data.service';
import { SideBarData } from '../models/models';
interface MainMenu {
  menu: MenuItem[];
}

interface MenuItem {
  menuValue: string;
  showSubRoute: boolean;  
}
@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  public toggleSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isMiniSidebar') || "false"
  );

  public toggleMobileSideBar: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('isMobileSidebar') || "false"
  );

  public expandSideBar: BehaviorSubject<string> = new BehaviorSubject<string>("false");

  constructor(private data: DataService) {
   
  }


  public filterMenuByRoles(): any {
    const userRoles: string[] = JSON.parse(sessionStorage.getItem('roles') || '[]');

    this.data.sideBar = this.data.sideBar.filter((mainMenu: SideBarData) => {
      const filteredMenu = mainMenu.menu.filter((menuItem) =>
        this.filterMenuItemByRoles(menuItem, userRoles)
      );
      mainMenu.menu = filteredMenu;
      return filteredMenu.length > 0;
    });
    return this.data.sideBar;
  }

  private filterMenuItemByRoles(menuItem: any, userRoles: string[]): boolean {
    if (menuItem.roles) {
      return userRoles.some((role) => menuItem.roles?.includes(role));
    } else if (menuItem.subMenus) {
      menuItem.subMenus = menuItem.subMenus.filter((subMenu: any) =>
        this.filterMenuItemByRoles(subMenu, userRoles)
      );
      return menuItem.subMenus.length > 0;
    } else {
      return true;
    }
  }
  public switchSideMenuPosition(): void {
    if (localStorage.getItem('isMiniSidebar')) {
      this.toggleSideBar.next("false");
      localStorage.removeItem('isMiniSidebar');
      this.data.sideBar.map((mainMenus: MainMenu) => {
        mainMenus.menu.map((resMenu: MenuItem) => {
          const menuValue = sessionStorage.getItem('menuValue');
          if (menuValue && menuValue == resMenu.menuValue) {
            resMenu.showSubRoute = true;
          }
        });
      });
    } else {
      this.toggleSideBar.next('true');
      localStorage.setItem('isMiniSidebar', 'true');
      this.data.sideBar.map((mainMenus: MainMenu) => {
        mainMenus.menu.map((resMenu: MenuItem) => {
          resMenu.showSubRoute = false;
        });
      });
    }
    this.filterMenuByRoles();

  }

  public switchMobileSideBarPosition(): void {
    if (localStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next("false");
      localStorage.removeItem('isMobileSidebar');
    } else {
      this.toggleMobileSideBar.next("true");
      localStorage.setItem('isMobileSidebar', 'true');
    }

  }
}
