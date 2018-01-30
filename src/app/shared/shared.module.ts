import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FooterLayoutComponent, LoginLayoutComponent, MainLayoutComponent } from './layouts';
import { TitleCasePipe, CommaStylePipe, OrderByPipe } from './pipes';
import { ModalComponent } from './modal';
import { AuthGuard, AuthService } from './auth';
import { CoreApiService } from './core-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    TitleCasePipe,
    CommaStylePipe,
    OrderByPipe,
    MainLayoutComponent,
    LoginLayoutComponent,
    FooterLayoutComponent,
    ModalComponent
  ],
  exports: [
    TitleCasePipe,
    CommaStylePipe,
    OrderByPipe,
    MainLayoutComponent,
    LoginLayoutComponent,
    FooterLayoutComponent,
    ModalComponent
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuard,
        AuthService,
        CoreApiService
      ]
    };
  };
}
