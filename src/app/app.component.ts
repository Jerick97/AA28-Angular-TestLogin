import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AppLoginTest';
  correcto : boolean = false;
  public formLogin!: FormGroup;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      
    });
  }

  send(): any{
    console.log(this.formLogin.value);

    //Después de 3 Segundos, Reinicia el Form
    setTimeout(() => {
      this.correcto = false;
      this.formLogin.reset();
    }, 3000);

    this.correcto = true;
  }
}
