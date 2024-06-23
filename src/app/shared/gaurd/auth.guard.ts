import { Injectable } from '@angular/core';
import {
  
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../routes/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      
      return this.checkRoles(route);
  }

  private checkRoles(route : ActivatedRouteSnapshot):boolean {

    const isAuthenticated = localStorage.getItem('authenticated');
    const userRoles = JSON.parse(sessionStorage.getItem('roles') || '[]');
    
    if (!isAuthenticated) {
      this.router.navigate([routes.login]);
      return false;
    }

    const routeRoles = route.routeConfig?.data?.['roles'] as Array<string>;

    // const routeRoles = route.routeConfig
    // ?.map(childRoute => childRoute.data?.['roles'])
    // ?.flat()
    // ?.filter(role => role) as Array<string>;

  if (!routeRoles || routeRoles.length === 0) {
    return true;
  }

  const hasRole = userRoles.some((role: string) => routeRoles.includes(role));
  console.log(hasRole);
  if (hasRole) {
    return true;
  } else {
    this.router.navigate([routes.error404]); // navigate to an unauthorized page or some other route
    return false;
  }


  }
}
