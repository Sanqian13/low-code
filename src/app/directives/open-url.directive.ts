import { Directive, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appOpenUrl]'
})
export class OpenUrlDirective {
  @Input() openUrl: string = '';
  //构造函数中使用 ElementRef 来注入宿主 DOM 元素的引用
  constructor() { }

  //监听宿主元素click事件
  @HostListener('click') onClick() {
    console.log('==========url========', this.openUrl)
    if (this.openUrl) {
      window.open(this.openUrl, '_blank');
    }
  }
}
