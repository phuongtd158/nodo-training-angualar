import {Routes} from '@angular/router';


export const content: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../components/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'eCommerce',
        loadChildren: () => import('../../components/ecommerce/ecommerce.module').then(m => m.ECommerceModule)
    },
    {
        path: 'crypto-currencies',
        loadChildren: () => import('../../components/crypto-currencies/crypto-currencies.module').then(m => m.CryptoCurrenciesModule)
    },
    {
        path: 'elements',
        loadChildren: () => import('../../components/elements/elements.module').then(m => m.ElementsModule)
    },
    {
        path: 'advanced-ui',
        loadChildren: () => import('../../components/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
    },
    {
        path: 'apps',
        loadChildren: () => import('../../components/apps/apps.module').then(m => m.AppsModule)
    },
    {
        path: 'tables',
        loadChildren: () => import('../../components/tables/tables.module').then(m => m.TablesModule)
    },
    {
        path: 'icons',
        loadChildren: () => import('../../components/icons/icons.module').then(m => m.IconsModule)
    },
    {
        path: 'forms',
        loadChildren: () => import('../../components/forms/forms.module').then(m => m.FormModule)
    },
    {
        path: 'charts',
        loadChildren: () => import('../../components/chart/chart.module').then(m => m.ChartModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('../../components/pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'utilities',
        loadChildren: () => import('../../components/utilities/utilities.module').then(m => m.UtilitiesModule)
    },
    {
        path: 'category-management',
        loadChildren: () => import('../../pages/category-management/category.module').then(m => m.CategoryModule)
    },
    {
        path: 'product-management',
        loadChildren: () => import('../../pages/product-management/product.module').then(m => m.ProductModule)
    },
    {
        path: 'category-mapping-management',
        loadChildren: () => import('../../pages/category-mapping-management/category-mapping.module').then(m => m.CategoryMappingModule)
    },
    {
        path: 'training',
        loadChildren: () => import('../../pages/angular-training/angular-training.module').then(m => m.AngularTrainingModule)
    },
    {
        path: 'author-management',
        loadChildren: () => import('../../pages/author/author.module').then(m => m.AuthorModule)
    },
    {
        path: 'publisher-management',
        loadChildren: () => import('../../pages/publisher/publisher.module').then(m => m.PublisherModule)
    },
    {
        path: 'book-management',
        loadChildren: () => import('../../pages/book/book.module').then(m => m.BookModule)
    },
    {
        path: 'reader-management',
        loadChildren: () => import('../../pages/reader/reader.module').then(m => m.ReaderModule)
    },
    {
        path: 'borrow-book-management',
        loadChildren: () => import('../../pages/borrow-book/borrow-book.module').then(m => m.BorrowBookModule)
    },
    {
        path: 'option',
        loadChildren: () => import('../../pages/option-management/option-management.module').then(m => m.OptionManagementModule)
    },
];
