import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule} from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from "@angular/forms";
import { MatIconModule} from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
    exports:[
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule, 
        MatFormFieldModule,
        FormsModule,
        MatDialogModule,
        MatIconModule,
        MatDialogModule
    ]
})


export class materialModule{

}