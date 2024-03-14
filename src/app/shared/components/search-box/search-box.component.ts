import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { unsubscribe } from 'diagnostics_channel';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSubscription?: Subscription;

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  searchTag(newSearch: string) {
    this.onValue.emit(newSearch);
  }

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  onkeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
