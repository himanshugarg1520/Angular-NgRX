// import { Component, OnInit } from '@angular/core';
// import { Router,ActivatedRoute, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'Angular-NgRX';


//   currentRoute: string = '';
//   isLoading: boolean = false;  

//   constructor(private router: Router) { }

//   ngOnInit(): void {
//     this.router.events.pipe(
//       filter(event => event instanceof NavigationEnd) 
//     ).subscribe(() => {
//       this.currentRoute = this.router.url; 
//     });

//     setTimeout(() => {
//       this.isLoading = false;  
//     }, 3000);
//   }

//   isCounterRoute(): boolean {
//     return this.currentRoute.includes('counter');
//   }

//   isBlogRoute(): boolean {
//     return this.currentRoute.includes('blog');
//   }
// }









// import { Component, OnInit } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs';
// import * as BlogActions from '../../src/app/shared/store/Blog/Blog.actions'

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   title = 'Angular-NgRX';

//   currentRoute: string = '';
//   isLoading: boolean = true;
//   searchText: string = '';
//   sortOrder: string = 'asc';  

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     // Listen for route navigation
//     this.router.events.pipe(
//       filter(event => event instanceof NavigationEnd)
//     ).subscribe(() => {
//       this.currentRoute = this.router.url;
//       this.isLoading = false;  
//     });

//     setTimeout(() => {
//       this.isLoading = false; 
//     }, 3000);  
//   }

//   onSearchTextChanged(searchText: string): void {
//     this.searchText = searchText;
//    }

//   onSortChanged(sortOrder: string): void {
//     this.sortOrder = sortOrder;
//   }

//   isCounterRoute(): boolean {
//     return this.currentRoute.includes('counter');
//   }

//   isBlogRoute(): boolean {
//     return this.currentRoute.includes('blog');
//   }

  
// }



import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BlogModel } from './shared/store/Blog/Blog.model';
import { loadblog, loadblogfail } from './shared/store/Actions/Blog.actions';
import { getblog } from './shared/store/Reducer/selector/Blog.selector';
import { loadspinner } from './shared/store/Actions/App.Action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading: boolean = false;
  filteredBlogs: BlogModel[] = [];
  blogList$: Observable<BlogModel[]>;

  constructor(private store: Store) {
    this.blogList$ = this.store.select(getblog); // Get the blog list from the store
  }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs() {
    this.isLoading = true;  
    this.store.dispatch(loadblog());  

    this.blogList$.subscribe({
      next: (blogs) => {
        if (blogs && blogs.length > 0) {
          this.filteredBlogs = [...blogs];  
          this.isLoading = false; 
        }
      },
      error: () => {
        this.isLoading = false;  
        this.store.dispatch(loadblogfail({ Errortext: 'Failed to load blogs' }));
      }
    });
  }

//    onSearchEvent(searchText: string) {
//     if (searchText) {
//       this.filteredBlogs = this.filteredBlogs.filter(blog =>
//         blog.title.toLowerCase().includes(searchText.toLowerCase())
//       );
//     } else {
//       this.loadBlogs();  
//     }
//   }

//    onSortChangeEvent(sortOption: string) {
//     if (sortOption === 'date') {
//       this.filteredBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
//     } else if (sortOption === 'title') {
//       this.filteredBlogs.sort((a, b) => a.title.localeCompare(b.title));
//     }
//   }

//    onAddBlogEvent() {
//     console.log('Add Blog Event Triggered');
//   }

//  onToggleFavoritesEvent(event: { isFavorite: boolean, blogId: number }): void {
//   const { isFavorite, blogId } = event;
//   console.log(isFavorite, blogId);
//  }

 

}
