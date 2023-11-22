import { Component,ViewChild,ElementRef} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonModal,AlertController } from '@ionic/angular';
import { ApiService } from '../servicios/api.service';
import { AutenticacionService } from '../servicios/autenticacion.service';






@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private router: Router, public alertController : AlertController, private auth: AutenticacionService, private api: ApiService) {}

  public mensaje = ""
  public estado: String = "";

  public alertButtons = ['OK'];
  user = {
    mail: "",
    password: "",
    confirmarpass: ""
  }

  cred : any = {
    mail : "",
    password : ""
  }

  enviarInformacion() {
    console.log(typeof this.cred)
    console.log(this.cred.password)
    const email = this.cred.mail
    const password = this.cred.password
    this.api.enviarcred(email,password).subscribe(
      (response) => {
        // Manejar la respuesta exitosa (guardar token, redirigir, etc.)
        console.log('Login exitoso:', response);
      },
      (error) => {
        // Manejar el error (mostrar mensaje de error, etc.)
        console.log(Response)
        console.error('Código de estado HTTP:', error.status);
        console.error('Error en el login:', error);
      }
    );
  }
  
// async enviarInformacion() {

//   this.api.Obtenernick().subscribe((usernames) => {
//     const databaseUsername = usernames['username'].replace(/\\n/g, '');
//     const usernamesArray = JSON.parse(databaseUsername.replace(/'/g, "\"").split(',')); //Utilizamos JSON.parse para convertir de un string a array

//     let Credenciales = false;

//     do {
//       for (let index = 0; index < usernamesArray.length; index++) {

//         const element = usernamesArray[index];
//         console.log(element)

//         if (this.user.usuario === element) {

//           this.api.Obtenerpass().subscribe((passwords)=>{

//             const databasePassword = passwords['contraseña'];
//             const passArray = JSON.parse(databasePassword.replace(/'/g, "\""));
      
//             for (let index = 0; index < passArray.length; index++) {

//               const element2 = passArray[index];

//               if (this.user.password === element2) {
//                 Credenciales = true
//                 break;
//               }
//             }
//           })
//         }else {
//           this.alertController.create({
//             header: 'Credenciales incorrectas.',
//             message: 'Usuario y/o contraseña incorrecto(s).',
//             buttons: ['Aceptar'],
//           });
//           console.log('Error: Usuario no encontrado');
//         }
//       }     
//     } while (Credenciales = false);



// })

// }


  async mostrarConsola() {
    console.log(this.user);
    if (this.user.mail != "" && this.user.password != "") {
      this.mensaje = "Usuario Conectado.";
    } else {
      const alert = await this.alertController.create({
        header: 'Credenciales incorrectas.',
        message: 'Correo y/o contraseña incorrecto(s).',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    this.auth.register(this.user.mail, this.user.password, this.user.confirmarpass).then((a: any)=> {
      if(a){
        this.estado = "Este correo ya existe";
      }else{
        this.mensaje = "Registro exitoso";
        this.modal.dismiss(this.user.mail, 'confirm');
      }
    })
  } 

  /* async confirm() {
    if (this.user.usuario != "" && this.user.password != "" && this.user.password == this.user.confirmarpass ) {
      this.estado = "Usuario ya existe.";
      this.modal.dismiss(null, 'confirmar');
    } else {
      const alert = await this.alertController.create({
        header: 'Formulario incompleto.',
        message: 'Porfavor complete todos los campos.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }  */

  async irarestablecer(){
    this.router.navigate(['restablecerpass'])
  }

}


