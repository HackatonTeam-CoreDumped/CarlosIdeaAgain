import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', loadChildren: './tabs/tabs.module#TabsPageModule'},
    {path: 'login', loadChildren: './login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
    {path: 'nuevos-usuarios', loadChildren: './nuevos-usuarios/nuevos-usuarios.module#NuevosUsuariosPageModule'},
    {path: 'about', loadChildren: './about/about.module#AboutPageModule'},
    {path: 'lista-foros', loadChildren: './foro/lista-foros/lista-foros.module#ListaForosPageModule'},
    {path: 'lista-preguntas', loadChildren: './foro/lista-preguntas/lista-preguntas.module#ListaPreguntasPageModule'},
    {path: 'lista-respuestas', loadChildren: './foro/lista-respuestas/lista-respuestas.module#ListaRespuestasPageModule'},
    {path: 'respuesta', loadChildren: './foro/respuesta/respuesta.module#RespuestaPageModule'},
    {path: 'crear-foro', loadChildren: './foro/crear-foro/crear-foro.module#CrearForoPageModule'},
    {path: 'post', loadChildren: './foro/post/post.module#PostPageModule'},
    {path: 'servicios', loadChildren: './servicios/servicios.module#ServiciosPageModule'},
    { path: 'nevera', loadChildren: './nevera/nevera.module#NeveraPageModule' },
  { path: 'talleres', loadChildren: './talleres/talleres.module#TalleresPageModule' },
  { path: 'tutoriales', loadChildren: './tutoriales/tutoriales.module#TutorialesPageModule' },
  { path: 'calendario', loadChildren: './calendario/calendario.module#CalendarioPageModule' },
  { path: 'hackathons', loadChildren: './hackathons/hackathons.module#HackathonsPageModule' },
  { path: 'empleo', loadChildren: './empleo/empleo.module#EmpleoPageModule' },
  { path: 'modal-page', loadChildren: './talleres/modal-page/modal-page.module#ModalPagePageModule' },
  { path: 'buscausers', loadChildren: './buscausers/buscausers.module#BuscausersPageModule' },
  { path: 'verperfil', loadChildren: './verperfil/verperfil.module#VerperfilPageModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
