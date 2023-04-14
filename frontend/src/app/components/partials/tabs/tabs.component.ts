import {
  AfterViewInit,
  Component,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.tabs.first.isActive = true;
  }
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  selectTab(tab: TabComponent) {
    this.tabs.forEach((tab) => {
      tab.isActive = false;
    });
    tab.isActive = true;
  }
}
