# 1. Crear el proyecto (CSS normal, con Rutas, sin SSR)
ng new docucraft-client-angular --routing --style=css --ssr=false

# 2. Entrar a la carpeta
cd docucraft-client-angular

# 3. Instalar librerías de utilidad
npm install ngx-file-drop lucide-angular

# 4. Generar la estructura modular
# Servicios
ng generate service core/services/pdf --flat

# Componentes de UI y Vistas
ng generate component shared/components/navbar
ng generate component shared/components/file-uploader 
ng generate component features/home 
ng generate component features/merge 
ng generate component features/split 
ng generate component features/edit
ng generate component features/convert