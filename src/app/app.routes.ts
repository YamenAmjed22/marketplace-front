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
import { AuthGuard } from './components/auth.guard';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ShowMessagesComponent } from './show-messages/show-messages.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { adminAuthGuard } from './admin/admin-auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: WelcomePageComponent
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
        path: 'registration',
        component: RegistrationComponent
    },
    {
        path: 'homepage',
        component: HomePageComponent,
        canActivate: [AuthGuard]
    }, {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'contact',
        component: ContactUsComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'about',
        component: AboutComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'service',
        component: ServiceComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'admin/login',
        component: AdminLoginComponent
    },
    {
        path: 'admin/dashboard',
        component: AdminDashboardComponent,
        canActivate: [adminAuthGuard],
        children: [
            {
                path: 'addProducts',
                component: AddNewProductComponent
            },
            {
                path: 'contactusMessages',
                component: ShowMessagesComponent
            },
            {
                path: '',
                redirectTo: 'addProducts',
                pathMatch: 'full'
            }
        ]
    }
];

