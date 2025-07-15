import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMessagesComponent } from './show-messages.component';

describe('ShowMessagesComponent', () => {
  let component: ShowMessagesComponent;
  let fixture: ComponentFixture<ShowMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
