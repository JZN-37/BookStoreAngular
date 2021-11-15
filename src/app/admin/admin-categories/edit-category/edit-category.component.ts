import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/books/services/book.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  bookData: any;
  duplicateBookData: any;
  categoryData: any;
  duplicateCategoryData: any;
  status: any;
  categoryList: any[] = []
  booksSubscription: Subscription | undefined = undefined;
  imgName : any;
  isUpdated: boolean = false;
  updateReqSent: boolean = false;
  isDeleted: boolean = false;

  constructor( private bookService: BookService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    let catId = this.route.snapshot.paramMap.get('id');

    this.bookService.getCategoryById(catId)
      .subscribe( ( res: any) => {
        console.log(res);
        this.categoryData = res
      })
    // await this.delay(50);  
    // this.booksSubscription = this.bookService.getCategories()
    //   .subscribe( (res: any) => {
    //     console.log(res);
    //     this.categoryList = res
    //     for (var i = 0; i < this.categoryList.length; i++) {
    //       if (this.bookData.BCatId == this.categoryList[i].CatId){
    //         this.bookData.BCat = this.categoryList[i].CatName
    //         console.log(this.bookData.BCat)
    //       }
    //     }
    //   });

    
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  handleEditCategoryModalOpen(): void {
    
    this.duplicateCategoryData = { ...this.categoryData };  // Shallow Copy
    console.log(this.duplicateCategoryData);
    this.isUpdated = false;
  }

  async handleUpdate(){
    console.log(this.duplicateCategoryData); // before sending to the service
    this.updateReqSent = true;
    this.duplicateCategoryData.CatImgPath = "../../../assets/images/" + this.imgName;
    console.log(this.duplicateCategoryData.CatImgPath)
    this.status = await this.bookService.updateCategory(this.duplicateCategoryData);
    console.log(this.status);

    //if(this.status == "Success"){
      this.isUpdated = true;
    //}
  }

  handleDelete(){
    this.bookService.deleteCategory(this.categoryData);
    this.isDeleted = true;
  }

  handleUpload(event : any){
    console.log(event.target.files[0].name);
    this.imgName = event.target.files[0].name;
  }
}
