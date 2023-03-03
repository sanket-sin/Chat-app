import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOneComponent } from './chat-one.component';

describe('ChatOneComponent', () => {
  let component: ChatOneComponent;
  let fixture: ComponentFixture<ChatOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
