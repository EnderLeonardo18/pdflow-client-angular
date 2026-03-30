import { Component, inject, signal } from '@angular/core';
import { PdfService } from '../../core/services/pdf.service';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';
import { BaseToolComponent } from '../../shared/base-tool.component';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-convert',
  imports: [CommonModule, FileUploaderComponent],
  templateUrl: './convert.component.html',
  styleUrl: './convert.component.css'
})
export class ConvertComponent extends BaseToolComponent {
  private pdfService = inject(PdfService);

    // Signal para los archivos a unir
  files = signal<File[]>([]);

    // Signal para almacenar la URL del PDF resultante
  resultPdfUrl = signal<SafeResourceUrl | null>(null);

  selectedFile = signal<File | null>(null);

  handleFile(files: File[]) {
    if (files.length > 0) {
      this.selectedFile.set(files[0]);

      this.isUploaderVisible.set(false); // Cerramos el uploader al recibir el archivo
    }
  }

  // Eliminamos el archivo seleccionado y resetear vista
  removeFile(){
    this.selectedFile.set(null);
    this.isUploaderVisible.set(true);
  }

  processConversion() {
    const file = this.selectedFile();
    if (!file) return;

    this.startProcessing(); // Activamos spinner global
    this.pdfService.imageToPdf(file).subscribe({
      next: (blob) => {
        // GENERAR VISTA PREVIA
        const blobUrl = URL.createObjectURL(blob);
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        this.resultPdfUrl.set(safeUrl);
        this.stopProcessing();
      },
      error: (err) => {
        alert('Error al convertir');
        this.stopProcessing();
      }
    });
  }




    // Método para volver a empezar
    resetTool(){
      this.files.set([]); // Limpia los archivos para empezar de nuevo
      this.resultPdfUrl.set(null);
      this.isUploaderVisible.set(true);
    }

      // En lugar de resetTool que borraba todo, usamos esta para volver atrás
    editAgain() {
      this.resultPdfUrl.set(null); // Solo quitamos el resultado, los 'files' se quedan intactos
    }

    // Opcional: mantén resetTool por si de verdad quieren limpiar todo
    fullReset() {
      this.files.set([]);
      this.resultPdfUrl.set(null);
    }



}
