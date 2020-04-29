import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RosnycadetPage } from './rosnycadet.page';

describe('RosnycadetPage', () => {
  let component: RosnycadetPage;
  let fixture: ComponentFixture<RosnycadetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosnycadetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RosnycadetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
