import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropFileComponent } from './drop-file.component';

describe('DropFileComponent', () => {
  let component: DropFileComponent;
  let fixture: ComponentFixture<DropFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
