import { Component, inject, signal } from '@angular/core';
import { PdfService } from '../../core/services/pdf.service';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from '../../shared/components/file-uploader/file-uploader.component';
import { BaseToolComponent } from '../../shared/base-tool.component';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-merge',
  imports: [CommonModule, FileUploaderComponent, DragDropModule],
  templateUrl: './merge.component.html',
  styleUrl: './merge.component.css'
})
export class MergeComponent extends BaseToolComponent{
  private pdfService = inject(PdfService);

  // Signal para los archivos a unir
  files = signal<File[]>([]);

  // Signal para almacenar la URL del PDF resultante
  resultPdfUrl = signal<SafeResourceUrl | null>(null);

  handleFiles(selectedFiles: File[]) {
    // this.files.set(selectedFiles);
    this.files.update(current => [...current, ...selectedFiles])
    this.isUploaderVisible.set(false); // Cerramos el uploader al recibir el archivo
  }


  moveUp(index: number) {
    if (index > 0) {
      this.files.update(list => {
        const newList = [...list];
        [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
        return newList;
      });
    }
  }

  moveDown(index: number) {
    if (index < this.files().length - 1) {
      this.files.update(list => {
        const newList = [...list];
        [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
        return newList;
      });
    }
  }

  removeFile(index: number) {
    this.files.update(list => list.filter((_, i) => i !== index));
  }



  processMerge() {
   if (this.files().length < 2) return alert('Selecciona al menos 2 archivos');
       this.startProcessing(); // Activa spinner y bloquea UI

       // Enviamos el array de archivos (que ya está ordenado por la Signal)
       this.pdfService.mergePdfs(this.files()).subscribe({
        next: (blob) => {
          // 1. Creamos una URL temporal del navegador para el Blob recibido
          const blobUrl = URL.createObjectURL(blob);
          //  this.pdfService.downloadFile(blob, 'unido_docucraft.pdf');

          // 2. La sanitizamos usando el método de BaseTool para que el iframe la acepte
          const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);

          // 3. Guardamos la URL en la Signal para mostrarla en el HTML
          this.resultPdfUrl.set(safeUrl);

           this.stopProcessing();
        },
        error: (err) => {
          console.error('Error al procesar el PDF:', err);
          this.stopProcessing();
          alert('Hubo un error al generar el PDF')
        }
      });
  }

  // Esta función se encarga de reordenar cuando sueltas el archivo
  drop(event: CdkDragDrop<File[]>){
    const currentFile = [...this.files()]; // Copiamos el array de la Signal
    moveItemInArray(currentFile, event.previousIndex, event.currentIndex);
    this.files.set(currentFile); // Actualizamos la Signal con el nuevo orden
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
