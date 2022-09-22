import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublisherListComponent} from "./publisher-list/publisher-list.component";

const routes: Routes = [
    {
        path: '',
        component: PublisherListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublisherRoutingModule {
}
