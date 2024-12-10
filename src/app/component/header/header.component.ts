// import { Component } from '@angular/core';
// import { EventEmitter } from '@angular/core';
// import { BlogComponent } from '../blog/blog.component';
// import { Output } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })


// export class HeaderComponent {

//     sortoption: string = 'mostRecent';
//     showFavorites: boolean = false;
  
//     @Output() searchEvent = new EventEmitter<string>();
//     @Output() sortChangeEvent = new EventEmitter<string>();

//     @Output() addBlogEvent = new EventEmitter<void>();
//     @Output() toggleFavoritesEvent = new EventEmitter<boolean>();
    

//     onSearch(event: Event): void {
//       const target = event.target as HTMLInputElement;
//       this.searchEvent.emit(target.value);
//     }
  
//     onSortChange(sortOption: string): void {
//       this.sortChangeEvent.emit(sortOption);
//     }
  
//     addBlog(): void {
//       this.addBlogEvent.emit();
//     }
  
//     toggleFavorites(): void {
//       this.showFavorites = !this.showFavorites;
//       this.toggleFavoritesEvent.emit(this.showFavorites);
//     }
    
//   }
  

import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  sortoption: string = 'mostRecent';
  showFavorites: boolean = false;
  isBlogRoute: boolean = false; // Determines if the current route is Blog

  @Output() searchEvent = new EventEmitter<string>();
  @Output() sortChangeEvent = new EventEmitter<string>();
  @Output() addBlogEvent = new EventEmitter<void>();
  @Output() toggleFavoritesEvent = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check the current route initially
    this.updateRoute(this.router.url);

    // Update route whenever the navigation ends
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateRoute(event.urlAfterRedirects);
      }
    });
  }

  // Helper to check if the route is Blog
  private updateRoute(url: string): void {
    this.isBlogRoute = url.includes('/blog');
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchEvent.emit(target.value);
  }

  onSortChange(sortOption: string): void {
    this.sortChangeEvent.emit(sortOption);
  }

  addBlog(): void {
    this.addBlogEvent.emit();
  }

  toggleFavorites(): void {
    this.showFavorites = !this.showFavorites;
    this.toggleFavoritesEvent.emit(this.showFavorites);
  }

}
