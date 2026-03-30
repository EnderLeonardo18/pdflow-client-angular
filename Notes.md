# 1. Crear el proyecto (CSS normal, con Rutas, sin SSR)
```bash
ng new docucraft-client-angular --routing --style=css --ssr=false
```

# 2. Entrar a la carpeta
```bash
cd docucraft-client-angular
```

# 3. Manejo de Drag and Drop (Arrastrar y soltar archivos)
```bash
npm install ngx-file-drop
```

### Biblioteca de iconos modernos (Lucide)
```bash
npm install lucide-angular
```

### Kit de herramientas para comportamientos de UI y accesibilidad
```bash
npm install @angular/cdk
```

# 4. Generar la estructura modular
### Servicios
```bash
ng generate service core/services/pdf --flat
```

# 5.  Componentes de UI y Vistas

```bash
ng generate component shared/components/navbar
ng generate component shared/components/file-uploader
ng generate component features/home 
ng generate component features/merge 
ng generate component features/split 
ng generate component features/edit
ng generate component features/convert
```
