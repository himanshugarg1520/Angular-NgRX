// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { BlogModel } from './store/Blog/Blog.model';
// import { tap } from 'rxjs';
// import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

// @Injectable({
//   providedIn: 'root'
// })
// export class MasterService {

//   constructor(private http: HttpClient, private snakbar: MatSnackBar) { 

//   }

//   getallBlogs():Observable<BlogModel[]>{
//     return this.http.get<BlogModel[]>('http://localhost:3000/Blogs')
//   } 

//   createBlog(bloginput: BlogModel){
//     return this.http.post("http://localhost:3000/Blogs", bloginput).pipe(
//       tap(()=>{
//         this.http.get<BlogModel>('http://localhost:3000/Blogs?_limit=1&_sort=id&_order=desc')
//       })
//     )
//   }

//   UpdateBlog(bloginput: BlogModel){
//     return this.http.put("http://localhost:3000/Blogs/"+bloginput.id, bloginput);
//   }
  
//   DeleteBlog(blogid: number){
//     return this.http.delete("http://localhost:3000/Blogs/"+blogid)
//   }


//   // showSnackbarAlert(message: string, actionresult: string='Fail'): MatSnackBarRef<any> {
//   //   return this.snakbar.open(message, 'Close', {
//   //       duration: 3000,  // Duration in milliseconds
//   //   });
//   // }


// }




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogModel } from './store/Blog/Blog.model';
import { tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}

  // Fetch all blogs
  getallBlogs(): Observable<BlogModel[]> {
    return this.http.get<BlogModel[]>('http://localhost:3000/Blogs');
  }

  // Create a new blog
  createBlog(bloginput: BlogModel): Observable<BlogModel> {
    return this.http.post<BlogModel>("http://localhost:3000/Blogs", bloginput).pipe(
      tap(() => {
        // Optionally, we can also fetch the latest blog after creation to update UI
        this.http.get<BlogModel>('http://localhost:3000/Blogs?_limit=1&_sort=id&_order=desc')
          .subscribe(latestBlog => {
            console.log('Latest Blog:', latestBlog);
            this.showSnackbarAlert('Blog created successfully!', 'Close');
          });
      }),
      catchError(error => {
        this.showSnackbarAlert('Error creating blog', 'Retry');
        throw error;  // Re-throw the error
      })
    );
  }

  // Update an existing blog
  UpdateBlog(bloginput: BlogModel): Observable<BlogModel> {
    return this.http.put<BlogModel>(`http://localhost:3000/Blogs/${bloginput.id}`, bloginput).pipe(
      tap(() => {
        this.showSnackbarAlert('Blog updated successfully!', 'Close');
      }),
      catchError(error => {
        this.showSnackbarAlert('Error updating blog', 'Retry');
        throw error;
      })
    );
  }

  // Delete a blog
  DeleteBlog(blogid: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/Blogs/${blogid}`).pipe(
      tap(() => {
        this.showSnackbarAlert('Blog deleted successfully!', 'Close');
      }),
      catchError(error => {
        this.showSnackbarAlert('Error deleting blog', 'Retry');
        throw error;
      })
    );
  }

  // Display Snackbar alert
  private showSnackbarAlert(message: string, action: string = 'Close') {
    this.snackbar.open(message, action, {
      duration: 3000,  // Duration in milliseconds
    });
  }
}
