import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {RouterModule,Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
//import { MatTableModule } from '@angular/material';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './user/header/header.component';
import { FooterComponent } from './user/footer/footer.component';
import { SelectFlightComponent } from './user/select-flight/select-flight.component';
import { SelectSeatComponent } from './user/select-seat/select-seat.component';
import { FlightSearchResultComponent } from './user/flight-search-result/flight-search-result.component';
import { SelectFlightService } from './user/services/selectFlight.service';
import { UserFormComponent } from './user/user-form/user-form.component';
import { BookingService } from './user/services/booking.service';
import { UserService } from './user/services/user.service';
import { PrintComponent } from './user/print/print.component';
import { AdminComponent } from './user/admin/admin.component';

const userRoute:Routes=[
{path:'',component:SelectFlightComponent},
{path:'search',component:FlightSearchResultComponent},
{path:'user-form',component:UserFormComponent},
  { path: 'print', component: PrintComponent },
  { path: 'admin', component: AdminComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    SelectFlightComponent,
    SelectSeatComponent,
    FlightSearchResultComponent,
    UserFormComponent,
    PrintComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(userRoute),
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [
    SelectFlightService,
    BookingService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
