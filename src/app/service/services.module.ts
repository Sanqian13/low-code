import { NgModule } from "@angular/core";
import { PlatformLocation } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [],
})
export class ServicesModule {
  constructor(public location: PlatformLocation) {}
  public static getBackendUrl(): string {
    return location.origin+'/wrd/infomonitor';
  }

}
