import { inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export class BaseToolComponent {

  protected sanitizer = inject(DomSanitizer); // Inyectamos el sanitizador aquí

  // Variables de estado usando Signals (Angular 17+)
  isUploaderVisible = signal(false);
  isProcessing = signal(false);

  // Función para abrir/cerrar el cargador
  toggleUploader() {
    this.isUploaderVisible.update(value => !value);
  }

  // Activa el estado de carga y oculta el uploader
  startProcessing() {
    this.isUploaderVisible.set(false);
    this.isProcessing.set(true);
  }

  // Finaliza el estado de carga
  stopProcessing() {
    this.isProcessing.set(false);
  }


  // Metodo común para generar la URL de vista previa
  getSafeUrl(file: File | null): SafeResourceUrl | null {
    if (!file) return null;
    const url = URL.createObjectURL(file);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getSafeImageUrl(file: File | null): string {
    return file ? URL.createObjectURL(file) : '';
  }
}
