
// import { Component, Inject, OnInit } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { BlogModel } from 'src/app/shared/store/Blog/Blog.model';
// import { AppstateModel } from 'src/app/shared/store/Global/AppState.Model';
// import { Store } from '@ngrx/store';
// import { addblog, updateblog } from 'src/app/shared/store/Blog/Blog.actions';
// import { getblogbyid } from 'src/app/shared/store/Blog/Blog.selector';
// import { loadspinner } from 'src/app/shared/store/Global/App.Action';

// @Component({
//   selector: 'app-addblog',
//   templateUrl: './addblog.component.html',
//   styleUrls: ['./addblog.component.css']
// })
// export class AddblogComponent implements OnInit {
//   pagetitle = '';
//   editblogid = 0;
//   editdata!: BlogModel;

//   blogForm = this.builder.group({
//     id: [0],
//     title: ['', Validators.required],
//     description: ['', Validators.required],
//     status: ['draft'],
//   });

//   constructor(
//     private dialogref: MatDialogRef<AddblogComponent>,
//     private builder: FormBuilder,
//     private store: Store<AppstateModel>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}

//   ngOnInit(): void {
//     this.pagetitle = this.data.title;

//     if (this.data.isedit) {
//       this.editblogid = this.data.id;
//       this.store.select(getblogbyid(this.editblogid)).subscribe(_data => {
//         this.editdata = _data;
//         this.blogForm.setValue({
//           id: this.editdata.id,
//           title: this.editdata.title,
//           description: this.editdata.description,
//           status: this.editdata.status || 'draft',

//         });
//       });
//     }
//   }

//   closepopup(): void {
//     this.dialogref.close();
//   }

//   saveAsDraft(): void {
//     this.saveBlogs('draft');
//   }

//   publishBlog(): void {
//     this.saveBlogs('published');
//   }

//   // saveBlogs(): void {
//   //   if (this.blogForm.valid) {
//   //     const _bloginput: BlogModel = {
//   //       id: this.blogForm.value.id || 0,
//   //       title: this.blogForm.value.title ?? '',
//   //       description: this.blogForm.value.description ?? '',
//   //       likes: 0,
//   //       reactions: {},
//   //       views: 0,
//   //     };

//   //     this.store.dispatch(loadspinner({ isloaded: true }));

//   //     setTimeout(() => {
//   //       if (this.data.isedit) {
//   //         this.store.dispatch(updateblog({ bloginput: _bloginput }));
//   //       } else {
//   //         this.store.dispatch(addblog({ bloginput: _bloginput }));
//   //       }
//   //       this.closepopup();
//   //     }, 1000);
//   //   }
//   // }


//   private saveBlogs(status: 'draft' | 'published'): void{
//     if (this.blogForm.valid) {
//       const _bloginput: BlogModel = {
//         id: this.blogForm.value.id || 0,
//         title: this.blogForm.value.title ?? '',
//         description: this.blogForm.value.description ?? '',
//         likes: 0,
//         reactions: {},
//         views: 0,
//         status: status,
//         date: new Date().toISOString(),
//       };

//       this.store.dispatch(loadspinner({ isloaded: true }));

//       setTimeout(() => {
//         if (this.data.isedit) {
//           this.store.dispatch(updateblog({ bloginput: _bloginput }));
//         } else {
//           this.store.dispatch(addblog({ bloginput: _bloginput }));
//         }
//         this.closepopup();
//       }, 1000);

//     }
//   }

// }





import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BlogModel } from 'src/app/shared/store/Blog/Blog.model';
import { AppstateModel } from 'src/app/shared/store/Global/AppState.Model';
import { Store } from '@ngrx/store';
import { addblog, updateblog } from 'src/app/shared/store/Actions/Blog.actions';
import { getblogbyid } from 'src/app/shared/store/Reducer/selector/Blog.selector';
import { loadspinner } from 'src/app/shared/store/Actions/App.Action';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {
  pagetitle = '';
  editblogid = 0;
  editdata!: BlogModel;

  blogForm = this.builder.group({
    id: [0],
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['draft'],
  });

  constructor(
    private dialogref: MatDialogRef<AddblogComponent>,
    private builder: FormBuilder,
    private store: Store<AppstateModel>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.pagetitle = this.data.title;

    if (this.data.isedit) {
      this.editblogid = this.data.id;
      this.store.select(getblogbyid(this.editblogid)).subscribe(_data => {
        this.editdata = _data;
        this.blogForm.setValue({
          id: this.editdata.id,
          title: this.editdata.title,
          description: this.editdata.description,
          status: this.editdata.status || 'draft',

        });
      });
    }
  }

  closepopup(): void {
    this.dialogref.close();
  }

  saveAsDraft(): void {
    this.saveBlogs('draft');
  }

  publishBlog(): void {
    this.saveBlogs('published');
  }

  // saveBlogs(): void {
  //   if (this.blogForm.valid) {
  //     const _bloginput: BlogModel = {
  //       id: this.blogForm.value.id || 0,
  //       title: this.blogForm.value.title ?? '',
  //       description: this.blogForm.value.description ?? '',
  //       likes: 0,
  //       reactions: {},
  //       views: 0,
  //     };

  //     this.store.dispatch(loadspinner({ isloaded: true }));

  //     setTimeout(() => {
  //       if (this.data.isedit) {
  //         this.store.dispatch(updateblog({ bloginput: _bloginput }));
  //       } else {
  //         this.store.dispatch(addblog({ bloginput: _bloginput }));
  //       }
  //       this.closepopup();
  //     }, 1000);
  //   }
  // }


  private saveBlogs(status: 'draft' | 'published'): void{
    if (this.blogForm.valid) {

      let generatedId: number;
  
      if (this.data.isedit) {
        // Retain the current ID for edits
        generatedId = this.blogForm.value.id as number;
      } else {
        // Get the next sequential ID for new blogs
        const blogs: BlogModel[] = this.data.blogList || []; // Replace this.data.blogList with your actual blog list
        const maxId = blogs.reduce((max, blog: BlogModel) => Math.max(max, blog.id || 0), 0);
        generatedId = maxId + 1; // Increment the highest ID by 1 to avoid collisions
      }
  
      const _bloginput: BlogModel = {
        id: generatedId,
        title: this.blogForm.value.title ?? '',
        description: this.blogForm.value.description ?? '',
        likes: 0,
        reactions: {},
        views: 0,
        status: status,
        date: new Date().toISOString(),
      };
  
      // Show loading spinner while processing
      this.store.dispatch(loadspinner({ isloaded: true }));
  
      setTimeout(() => {
        if (this.data.isedit) {
          // If editing, dispatch the update action
          this.store.dispatch(updateblog({ bloginput: _bloginput }));
        } else {
          // If new, dispatch the add action
          this.store.dispatch(addblog({ bloginput: _bloginput }));
        }
        this.closepopup(); // Close the popup after the operation
      }, 1000);
    }
  }



  
  

}
