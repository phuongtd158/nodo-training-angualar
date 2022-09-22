import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BorrowBookListComponent} from "./borrow-book-list/borrow-book-list.component";

const routes: Routes = [
    {
        path: '',
        component: BorrowBookListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BorrowBookRoutingModule {
}
