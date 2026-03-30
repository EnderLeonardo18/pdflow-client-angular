import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MergeComponent } from './features/merge/merge.component';
import { SplitComponent } from './features/split/split.component';
import { EditComponent } from './features/edit/edit.component';
import { ConvertComponent } from './features/convert/convert.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home'},         // Inicio
  { path: 'merge', component: MergeComponent, title: 'Unir PDF'},   // localhost:4200/merge
  { path: 'split', component: SplitComponent, title: 'Dividir PDF'},   // localhost:4200/split
  { path: 'edit', component: EditComponent, title: 'Marca de Agua PDF' },
  { path: 'convert', component: ConvertComponent, title: 'Convertir Imagen a PDF'},
  { path: '**', redirectTo:'' }
];
