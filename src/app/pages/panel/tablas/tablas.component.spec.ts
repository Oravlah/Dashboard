import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasComponent } from './tablas.component';

describe('TablasComponent', () => {
  let component: TablasComponent;
  let fixture: ComponentFixture<TablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
