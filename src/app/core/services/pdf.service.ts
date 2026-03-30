import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/pdf' // URL del servidor NestJS

  constructor() { }

  // Enviar varios archivos a UNIR

  mergePdfs(files: File[]) {
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    return this.http.post(`${this.apiUrl}/merge`, formData, { responseType: 'blob' });
  }

  splitPdf(file: File, range: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('range', range);
    return this.http.post(`${this.apiUrl}/split`, formData, { responseType: 'blob' })
  }


  addWatermark(file: File, text: string) {
    const formData = new FormData();
    formData.append('file', file); // Coincide con @UploadedFile('file')
    formData.append('text', text); // Coincide con @Body('text')
    return this.http.post(`${this.apiUrl}/watermark`, formData, { responseType: 'blob'});
  }

  // Método auxiliar para descargar el archivo que viene del Backend
  downloadFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName
    link.click();
    window.URL.revokeObjectURL(url);
  }


  // Imagen a PDF
  imageToPdf(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/image-to-pdf`, formData, { responseType: 'blob' });
  }

}
