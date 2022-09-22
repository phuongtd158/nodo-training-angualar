import {environment} from "../../../environments/environment";

export const ApiConstant = {
    login: `${environment.service.authDomain}/api/login`,
    logout: `${environment.service.authDomain}/api/logout`,
    category: `${environment.service.apiDomain}/api/categories`,
    product: `${environment.service.apiDomain}/api/products`,
    author: 'http://localhost:8080/api/tacgia',
    publisher: 'http://localhost:8080/api/nxb',
    book: 'http://localhost:8080/api/sach',
    reader: 'http://localhost:8080/api/bandoc',
    borrowBook: 'http://localhost:8080/api/muonsach',
};
