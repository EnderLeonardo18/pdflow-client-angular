import { Component, inject, signal } from '@angular/core';
import { PdfService } from '../../core/services/pdf.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';
import { BaseToolComponent } from '../../shared/base-tool.component';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-split',
  imports: [CommonModule, FormsModule, FileUploaderComponent],
  templateUrl: './split.component.html',
  styleUrl: './split.component.css'
})
export class SplitComponent extends BaseToolComponent {
  private pdfService = inject(PdfService); // Inyectamos el servicio

    // Signal para los archivos a unir
  files = signal<File[]>([]);

  // Signal para almacenar la URL del PDF resultante
  resultPdfUrl = signal<SafeResourceUrl | null>(null);

  selectedFile = signal<File | null>(null);
  range = signal<string>('1-END');

  handleFile(files:File[]) {
    if ( files.length > 0) {
      this.selectedFile.set(files[0]);

      this.isUploaderVisible.set(false); // Cerramos el uploader al recibir el archivo
    }
  }



  removeFile() {
      this.selectedFile.set(null);
    }

  processSplit() {
    const file = this.selectedFile();
    if (!file) return;
    this.startProcessing();

    this.pdfService.splitPdf(file, this.range()).subscribe({
      next: (blob) => {
        // GENERAR VISTA PREVIA
        const blobUrl = URL.createObjectURL(blob);
        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        this.resultPdfUrl.set(safeUrl);
        this.stopProcessing();
      },
      error: (err) => {
        alert('error: Verifica que el rango de la pagina sea el correcto');
        this.stopProcessing();
      }

    })
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
