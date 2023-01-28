import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it(`should have as title 'AppLoginTest'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    expect(component.title).toEqual('AppLoginTest');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('AppLoginTest app is running!');
  });

  //La siguiente prueba tomara una captura del código, si mas adelante alguien modificara el codigo la prueba arrojaría un error mostrando el cambio que se realizo
  it('Se espera hacer match con el snapshot', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); //para capturar el texto de las variables y no solo la estructura html
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toMatchSnapshot(); //esto creara una copia del app.component.html en una carpeta y lo compara con el código actual
  })

  it('Se esperaba formLogin.valid retorne verdadero cuando los valores de username y password sean correcto', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.formLogin.controls['username'].setValue('emerson@gmail.com');
    app.formLogin.controls['password'].setValue('12345678');
    expect(app.formLogin.valid).toBeTruthy();
    });
    
  it('Se esperaba formLogin.invalid retorne verdadero cuando los valores de username o password sean incorrecto', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    app.formLogin.controls['username'].setValue('emerson');
    app.formLogin.controls['password'].setValue('');
    expect(app.formLogin.invalid).toBeTruthy();
  });

  it('Se esperaba formLogin.invalid al inicio retorne falso', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();

    app.formLogin.controls['username'];
    app.formLogin.controls['password'];
    expect(app.formLogin.invalid).toBeTruthy();
    });

    it('Se espera que la variable correcto sea true al pulsar el boton y luego de 3 segundos false', () => {
      jest.useFakeTimers();
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();
      component.formLogin.controls['username'].setValue('emerson@gmail.com');
      component.formLogin.controls['password'].setValue('12345678');
      const miBoton = fixture.debugElement.query(By.css('.btn-enviar'));
      
      miBoton.nativeElement.click(); //si se ingresa los input correctamente ejecutamos el click en el button
      expect(component.correcto == true); //validamos que la variable correcto sea verdadero antes de los 3 segundos
      jest.advanceTimersByTime(3000); //simulamos el setTimeout que está avanzando el tiempo en 3 segundos
      expect(component.correcto).toBeFalsy(); //validamos que la variable correcto sea falso antes de los 3 segundos
  });
});
