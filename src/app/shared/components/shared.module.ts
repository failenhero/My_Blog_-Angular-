import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    HttpClientModule,
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
          ['clean'],
          [{ 'color': [] }, { 'background': [] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          ['link', 'image', 'video']
        ]
      }
    })
  ],
  exports: [
    HttpClientModule,
    QuillModule
  ]
})

export class SharedModule {

}
