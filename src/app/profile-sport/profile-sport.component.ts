import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { PackService } from '../pack.service';
import { UtilService } from '../util.service';
import { Lesion } from '../models/lesion.model';
import { Hassle } from '../models/hassle.model';
import { Sport } from '../models/sport-model';
import { HistorySport } from '../models/history-sport.model';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { ProfileSport } from '../models/profile-sport.model';
import { ErrorHttp } from '../models/errorHttp.model';
import { Servers } from '../models/servers-class.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile-sport',
  templateUrl: './profile-sport.component.html',
  styleUrls: ['./profile-sport.component.css']
})
export class ProfileSportComponent implements OnInit {
  msg: string;
  uuseremailavail = false;
  date = new Date();

  userdata: {
    _id: number;
    Fname: string;
    lname: string;
    uemail: string;
    userage: Number;
    usergender: Number;
    gender: String;
    userpass: string;
    userphone: number;
    level: string;
    pack: string;
    istrain: boolean;
    isdietplan: boolean;
    isbath: boolean;
    date: string;
  };

  useriid: any = localStorage.getItem('loggeduser');
  hasslee: Hassle[];
  lesion: Lesion[];
  sports: Sport[];
  model = { id: '1' };
  optionsPlan: any[] = [{ id: true, nombre: 'Sí' }, { id: false, nombre: 'No' }];
  favoriteSeason: boolean;
  historysport: Array<HistorySport> = [];
  idDeporteSeleccionado: number;
  edad: number;
  anio: number;
  horaSemana: number;
  ciudad: string;
  arrayLesion: Array<any> = [];
  arrayHasslee: Array<any> = [];
  categoryHasslee: any = []
  categoryLesion: any = []
  profileSport: ProfileSport = { idDeportista: null, vo2Max: null, ftpActual: null, lesiones: null, molestias: null, historiasDeportivas: null };
  idDeportista: number;
  codeError: number;
  servers: Servers;
  albumForm!: FormGroup;
  sportSelected: any;
  lblTittleModal: string = 'Agregar Historia deportiva';
  sinSeleccionar: any = 0;
  idDeportistaConsulta: number;

  constructor(
    public userSer: UsersService,
    public activeRoute: ActivatedRoute,
    public pac: PackService,
    public rooter: Router,
    public utilServ: UtilService,
    private formBuilder: FormBuilder
  ) {

    console.log('constructorrrrr')


    this.albumForm = this.formBuilder.group({
      hassleefn: new FormControl('', [Validators.required]),
      lesionfn: new FormControl('', [Validators.required]),
      vo2Max: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      ftpActual: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    })
    this.utils();

  }

  countries = [{
    id: 1, name: 'France', cities: ['Paris', 'Marseille', 'Nice']
  },
  {
    id: 2, name: 'Germany', cities: ['Hamburg', 'Berlin', 'Munich']
  },
  {
    id: 3, name: 'Italy', cities: ['Roma', 'Milan', 'Napoli']
  },
  ];

  
  ngOnInit(): void {
    console.log(this.useriid);


    // this.utilServ.doListSport().subscribe(
    //   (data: Sport[]) => {
    //     console.log('deportes', data)
    //     this.sports = data;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );

    this.idDeportista = parseInt(localStorage.getItem('loggeduser'));


    console.log('ngOnInit')

    /*
      Consulta si tiene información  del perfil deportivo
    */
    this.userSer.doUserGetProfileSport(this.useriid).subscribe(
      (data: any) => {
        this.utils();
        console.log('doUserGetProfileSport', data);
        this.idDeportistaConsulta = data.idDeportista;
        console.log('idDeportistaConsulta', this.idDeportistaConsulta);
        if (data != undefined) {

          for (let index = 0; index < data.lesiones.length; index++) {
            // if(data.lesiones[index] == 1){
            data.lesiones[index] === 1 ? true : false;
            // }
          }

          for (let index = 0; index < data.molestias.length; index++) {
            // if(data.lesiones[index] == 1){
            data.molestias[index] === 1 ? true : false;
            // }
          }


          this.albumForm = this.formBuilder.group({
            vo2Max: [
              data.vo2Max,
              [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(128),
              ],
            ],
            ftpActual: [
              data.ftpActual,
              [
                Validators.required,
                Validators.minLength(1),
                Validators.maxLength(128),
              ],
            ],
            hassleefn: [
              data.molestias[0],
              [
                Validators.required,
              ],
            ],
            lesionfn: [
              data.lesiones[0],
              [
                Validators.required,
              ],
            ],
          });

          // this.categoryHasslee = data.molestias;
          // console.log('this.categoryHasslee',  this.categoryHasslee);

          this.historysport = data.historiasDeportivas;

          for (let index = 0; index < data.historiasDeportivas.length; index++) {
            const element = data.historiasDeportivas[index];
            if (this.sports === undefined) {
              this.utils();
              console.log('sdsds')
            }
            console.log('Sport', this.sports);
            console.log('pruebasss', this.sports?.filter(x => x.id == data.historiasDeportivas[index].idDeporte)[0].descripcion);
            this.historysport[index].deporte = this.sports?.filter(x => x.id == data.historiasDeportivas[index].idDeporte)[0].descripcion
          }

          console.log('consultaaaDatos', this.historysport)
        }
      },

    );


    this.userSer.getloggedUserData(this.useriid).subscribe(
      (data: any[]) => {
        console.log(data);
        this.userdata = data[0];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  //FIN ng-oninit



  prueba() {
    this.userSer.getServers().subscribe(servers => this.servers = servers);
    //vo2Max = 12;
  }




  onChangeSport(deviceValue: any) {
    this.idDeporteSeleccionado = deviceValue.value;
    console.log('deporteseleccionado', deviceValue.value);
  }

  saveHistorySport() {
    console.log('sports33', this.sports);
    console.log('deporteseleccionadwwo', this.idDeporteSeleccionado);
    this.historysport = this.historysport.filter(x => x.id !== this.idDeporteSeleccionado == undefined ? this.sportSelected : this.idDeporteSeleccionado);
    this.idDeporteSeleccionado = this.idDeporteSeleccionado == undefined ? this.sportSelected : this.idDeporteSeleccionado;
    this.historysport.push({
      idDeporte: this.idDeporteSeleccionado,
      edadInicioPractica: this.edad,
      aniosPractica: this.anio,
      dedicacionHorasSemana: this.horaSemana,
      ciudad: this.ciudad,
      practicadoActualmente: this.favoriteSeason,
      deporte: this.sports?.filter(x => x.id == this.idDeporteSeleccionado)[0].descripcion,
      id: this.historysport.length + 1
    });
    console.log('datostabla', this.historysport);
  }

  editHistorySport(id: number) {
    console.log('position', id);
    this.lblTittleModal = 'Editar Historia deportiva'

    this.sportSelected = this.historysport?.filter(x => x.id == id)[0].idDeporte;
    this.edad = this.historysport?.filter(x => x.id == id)[0].edadInicioPractica;
    this.favoriteSeason = this.historysport?.filter(x => x.id == id)[0].practicadoActualmente;
    this.anio = this.historysport?.filter(x => x.id == id)[0].aniosPractica;
    this.horaSemana = this.historysport?.filter(x => x.id == id)[0].dedicacionHorasSemana;
    this.ciudad = this.historysport?.filter(x => x.id == id)[0].ciudad;
    // this.historysport = this.historysport.splice(id,1);
    console.log('positionSports', this.historysport);
  }

  deleteHistorySport(id: number) {
    console.log('position', id);
    this.historysport = this.historysport.filter(x => x.id !== id);
    // this.historysport = this.historysport.splice(id,1);
    console.log('positionSports', this.historysport);
  }


  checkChangeLesion(id: number) {

    if (this.categoryLesion[id]) {
      this.categoryLesion[id] =! this.categoryLesion[id];
      this.arrayLesion = this.arrayLesion.splice(id, 1);
      console.log('sdss', this.arrayLesion)
    }
    else {
      this.categoryLesion[id] = true;
      this.arrayLesion.push(id);
    }

    console.log('arrayLesion', this.arrayLesion);
  }

  checkChangeHasslee(id: number) {
    console.log('ddddd',id);

    console.log('iiii',this.categoryHasslee)
    if (this.categoryHasslee[id]) {
      this.categoryHasslee[id] =! this.categoryHasslee[id];
      this.arrayHasslee = this.arrayHasslee.splice(id, 1);
      console.log('sdss', this.arrayHasslee)
    }
    else {
      this.categoryHasslee[id] = true;
      this.arrayHasslee.push(id);
    }

    console.log('arrayHaslee', this.arrayHasslee);
  }


  userRegistrationProfileSport(form: ProfileSport) {
    console.log("User Registered");
    // form.value.date=this.date;
    console.log(form.vo2Max);

    this.profileSport.idDeportista = this.idDeportista;
    this.profileSport.vo2Max = form.vo2Max;
    this.profileSport.ftpActual = form.ftpActual;
    this.profileSport.lesiones = this.arrayLesion;
    this.profileSport.molestias = this.arrayHasslee;
    this.profileSport.historiasDeportivas = this.historysport;

    console.log('register-sport', this.profileSport);


    this.rooter.navigateByUrl("/login")

    if (this.idDeportistaConsulta == undefined || this.idDeportistaConsulta == null) {
      this.userSer.doCreateUserRegistrationProfileSport(this.profileSport, this.profileSport.idDeportista).subscribe((data: string) => {
        console.log(data);
        this.msg = data;
        this.albumForm.reset();
      }, (error: any) => {
        console.log(error);
        this.msg = "Something Went Wrong!!";
      });
    } else {
      this.userSer.doUpdateUserRegistrationProfileSport(this.profileSport, this.profileSport.idDeportista).subscribe((data: string) => {
        console.log(data);
        this.msg = data;
        this.albumForm.reset();
      }, (error: any) => {
        console.log(error);
        this.msg = "Something Went Wrong!!";
      });
    }


  }


  addHistorySport() {
    this.lblTittleModal = 'Agregar Historia deportiva';

    this.sportSelected = 0;
    this.edad = null;
    this.favoriteSeason = null;
    this.anio = null;
    this.horaSemana = null;
    this.ciudad = "";
  }

  utils() {


    /*
    Servicio de deportes
    */
    this.utilServ.doListSport().subscribe(
      (data: Sport[]) => {
        console.log('deportes', data)
        this.sports = data;

        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          console.log('Sport', this.sports);
          console.log('pruebasss', this.sports?.filter(x => x.id == data[index].id)[0].descripcion);
          this.historysport[index].deporte = this.sports?.filter(x => x.id == data[index].id)[0].descripcion
        }
        
      },
      (error: any) => {
        console.log(error);
      }
    );
    /*
    Servicio de molestias
    */
    this.utilServ.doListHassle().subscribe(
      (data: Hassle[]) => {
        console.log('molestias', data)
        this.hasslee = data;
      },
      (error: any) => {
        console.log(error);
      }
    );

    /*
    Servicio de lesiones
    */
    this.utilServ.doListLesion().subscribe(
      (data: Lesion[]) => {
        console.log('lesiones', data)
        this.lesion = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
