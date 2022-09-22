import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConstant} from '../constants/api-constant';

let httpOptions: any = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret"
    }),
};

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(ApiConstant.login, {
            username,
            password,
        });
    }

    logout(): Observable<any> {
        return this.http.post(ApiConstant.logout, {}, httpOptions);
    }

    //Start Category
    searchCategory(req: any, pageable: any): Observable<any> {
        let options = httpOptions;
        options['params'] = pageable;
        return this.http.post(`${ApiConstant.category}/search`, req, options);
    }

    createCategory(data: any): Observable<any> {
        return this.http.post(ApiConstant.category, data, httpOptions);
    }

    updateCategory(data: any, id: number): Observable<any> {
        return this.http.put(
            `${ApiConstant.category}/${id}`,
            data,
            httpOptions
        );
    }

    deleteCategory(id: number): Observable<any> {
        return this.http.delete(`${ApiConstant.category}/${id}`, httpOptions);
    }

    getAllCategory(): Observable<any> {
        return this.http.get(ApiConstant.category, httpOptions);
    }

    //End Category

    //Start Product
    searchProduct(req: any, pageable: any): Observable<any> {
        httpOptions['params'] = pageable;
        return this.http.post(
            `${ApiConstant.product}/search`,
            req,
            httpOptions
        );
    }

    createProduct(data: any): Observable<any> {
        return this.http.post(ApiConstant.product, data, httpOptions);
    }

    updateProduct(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.product}/${id}`, data, httpOptions);
    }

    deleteProduct(id: number): Observable<any> {
        return this.http.delete(`${ApiConstant.product}/${id}`, httpOptions);
    }

    //End Product

    //Author
    getAllAuthor(): Observable<any> {
        return this.http.get(ApiConstant.author, httpOptions);
    }

    createAuthor(data: any): Observable<any> {
        return this.http.post(ApiConstant.author, data, httpOptions);
    }

    updateAuthor(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.author}/${id}`, data, httpOptions);
    }

    deleteAuthor(id: number): Observable<any> {
        return this.http.delete(`${ApiConstant.author}/${id}`, httpOptions);
    }

    //End Author

    //Publisher
    getAllPublisher(): Observable<any> {
        return this.http.get(ApiConstant.publisher, httpOptions);
    }

    createPublisher(data: any): Observable<any> {
        return this.http.post(ApiConstant.publisher, data, httpOptions);
    }

    updatePublisher(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.publisher}/${id}`, data, httpOptions);
    }

    deletePublisher(id: number): Observable<any> {
        return this.http.delete(`${ApiConstant.publisher}/${id}`, httpOptions);
    }
    //End Publisher

    //Book
    getBook(id: any):Observable<any>{
        return this.http.get(`${ApiConstant.book}/${id}`, httpOptions)
    }

    getAllBook(): Observable<any> {
        return this.http.get(ApiConstant.book, httpOptions);
    }

    createBook(data: any): Observable<any> {
        return this.http.post(ApiConstant.book, data, httpOptions);
    }

    updateBook(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.book}/${id}`, data, httpOptions);
    }

    deleteBook(id: number): Observable<any> {
        return this.http.delete(`${ApiConstant.book}/${id}`, httpOptions);
    }
    //End Book

    //Reader
    getAllReader(): Observable<any> {
        return this.http.get(ApiConstant.reader, httpOptions);
    }

    createReader(data: any): Observable<any> {
        return this.http.post(ApiConstant.reader, data, httpOptions);
    }

    updateReader(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.reader}/${id}`, data, httpOptions);
    }

    deleteReader(id: number): Observable<any> {
        return this.http.delete(`${ApiConstant.reader}/${id}`, httpOptions);
    }
    //End Reader

    //BorrowBook
    getAllBorrowBook(): Observable<any> {
        return this.http.get(ApiConstant.borrowBook, httpOptions);
    }

    createBorrowBook(data: any): Observable<any> {
        return this.http.post(ApiConstant.borrowBook, data, httpOptions);
    }

    updateBorrowBook(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.borrowBook}/${id}`, data, httpOptions);
    }

    deleteBorrowBook(id: number): Observable<any> {
        return this.http.delete(`${ApiConstant.borrowBook}/${id}`, httpOptions);
    }
    //End BorrowBook
}
