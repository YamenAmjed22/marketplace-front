import { Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { CheckOTPComponent } from './components/check-otp/check-otp.component';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ProductsComponent } from './products/products.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutComponent } from './components/about/about.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { ServiceComponent } from './components/servicePage/service.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: RegistrationComponent
    },
    {
        path: 'checkotp',
        component: CheckOTPComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path:'homepage',
        component:HomePageComponent
    },{
        path:'products',
        component:ProductsComponent
    },
    {
        path:'contact',
        component:ContactUsComponent
    },
    {
        path:'about',
        component:AboutComponent
    },
    {
        path:'addProducts', 
        component:AddNewProductComponent
    },
    {
        path:'service',
        component:ServiceComponent
    },{
        path:'cart',
        component:CartComponent
    }

];
