import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  //

interface Cuota {
  numeroCuota: number;
  cuotaCapital: number;
  cuotaInteres: number;
  cuotaTotal: number;
}

@Component({
  selector: 'app-registro-solicitud',
  templateUrl: './registro-solicitud.component.html',
  styleUrls: ['./registro-solicitud.component.css']
})
export class RegistroSolicitudComponent implements OnInit {
  solicitudForm: FormGroup;
  respuestaBackend: any;
  tablaAmortizacion: Cuota[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.solicitudForm = this.fb.group({
      monto: ['', [Validators.required, Validators.min(0)]],
      meses: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.solicitudForm.valid) {
      // Realiza la solicitud POST al backend
      const solicitudData = this.solicitudForm.value;

      this.http.post<any>('http://localhost:8080/tu-api/solicitud', solicitudData)
        .subscribe((response) => {
          // Maneja la respuesta del backend
          console.log('Solicitud registrada con éxito:', response);
          this.respuestaBackend = response;

          // Si tu backend devuelve la tabla de amortización, podrías asignarla aquí
          // this.tablaAmortizacion = response.tablaAmortizacion;
        }, (error) => {
          // Maneja los errores
          console.error('Error al registrar la solicitud:', error);
        });
    }
  }
}
