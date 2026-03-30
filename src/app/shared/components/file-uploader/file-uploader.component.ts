import { CommonModule } from '@angular/common';
import { Component, output, signal } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';

@Component({
  selector: 'app-file-uploader',
  imports: [CommonModule, NgxFileDropModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css'
})
export class FileUploaderComponent {
  files = signal<File[]>([]);
  onFilesReady = output<File[]>();
  onClose = output<void>();

  public dropped(files: NgxFileDropEntry[]) {
      const currentFiles: File[] = [];

      for (const droppedFile of files) {
        if (droppedFile.fileEntry.isFile) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            currentFiles.push(file);
            // Emitimos cuando hayamos procesado todos los archivos soltados
            if (currentFiles.length === files.length) {
              this.files.set(currentFiles);
              this.onFilesReady.emit(currentFiles);
            }
          });
        }
      }
    }

    onCloseClick(){
      this.onClose.emit(); // Emite el evento al hacer click en la X
    }


}
