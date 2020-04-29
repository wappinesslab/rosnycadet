import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpeechesPage } from './speeches.page';

describe('SpeechesPage', () => {
  let component: SpeechesPage;
  let fixture: ComponentFixture<SpeechesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeechesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
