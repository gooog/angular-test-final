import {FormsModule} from '@angular/forms';
import {async, ComponentFixture, inject, TestBed, tick} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ SearchComponent ],
        imports: [
            FormsModule
        ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should have two way binding property with input', () => {
        const inputEl = fixture.debugElement.query(By.css('input')).nativeElement;
        expect(component.input).toEqual(inputEl.value);

        inputEl.input = 'test';
        inputEl.dispatchEvent(new Event('input'));
        fixture.whenStable().then(() => {
          expect(component.input).toEqual(inputEl.value);
        });

        component.input = 'test';
        fixture.detectChanges();
        fixture.whenStable().then(() => {
          expect(component.input).toEqual(inputEl.value);
        });
    });

    it('should emit input property value', (done) => {
        component.searchedFor.subscribe(g => {
            fixture.detectChanges();
            expect(g).toEqual(component.input);
            done();
        });
        component.search();
    });

});
