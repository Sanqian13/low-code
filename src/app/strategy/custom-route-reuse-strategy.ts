import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
    storedRouteHandles = new Map<string, DetachedRouteHandle>();

    // 子页面路由
    toRouteList = [
        'health',
        'media',
        'netizen'
    ]

    from = '';
    to = '';

    // 是否是复用路由 如果前后路由地址一致则不跳转
    shouldReuseRoute(to: ActivatedRouteSnapshot, from: ActivatedRouteSnapshot): boolean {
        // console.log('==========路由前后地址==========', from.routeConfig, to.routeConfig);
        // console.log('==========shouldReuseRoute==========', from.routeConfig === to.routeConfig);
        if (from.routeConfig) {
            this.from = this.getPath(from);
        }
        if (to.routeConfig) {
            this.to = this.getPath(to);
        }
        return from.routeConfig === to.routeConfig;
    }

    // 即将离开路由的时候调用，返回true时会调用store方法
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // console.log('==========即将离开to: ==========' + this.to);
        // 如果进入子页面, 则调用store缓存当前路由页
        let f = false;
        this.toRouteList.forEach(url => {
            if (this.to.indexOf(url) >= 0) {
                f = true;
            }
        })
        // this.from, this.to, route
        console.log('==========是否需要缓存shouldDetach==========', f);
        return f;
    }

    // 缓存即将要离开的路由下的组件
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        console.log('==========store==========', detachedTree);
        this.storedRouteHandles.set(this.getPath(route), detachedTree);
    }

    // 恢复store方法缓存的路由下的组件
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        // console.log('==========retrieve==========', this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle);
        return this.storedRouteHandles.get(this.getPath(route)) as DetachedRouteHandle;
    }

    // 进入路由的时候调用，当它返回true时会调用retrieve方法
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const path = this.getPath(route);
        // console.log('==========shouldAttach==========', this.storedRouteHandles.has(path), route);
        return !!this.storedRouteHandles.get(path);
    }

    // 获取路由地址
    private getPath(route: ActivatedRouteSnapshot): string {
        if (route.routeConfig !== null && route.routeConfig.path !== null) {
            return route.routeConfig.path;
        }
        return '';
    }
}