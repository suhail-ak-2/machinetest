import { Component, ChangeDetectorRef, AfterViewInit,OnInit } from '@angular/core';
import { LocalDataSource } from "ng2-smart-table";
import { ServicesService } from "../../../services.service";
import { SmartTableData } from "../../../@core/data/smart-table";
import { View } from './view';

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./view.component.html",
  styles: [
    `
      nb-card {
        transform: translate3d(0, 0, 0);
      }

      :host nb-tab {
        padding: 1.25rem;
      }
    `
  ]
})
export class ViewComponent {
  Login:View[];
  data: any;
  event:any;
  settings = {
    actions:{add:false},
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:'<i class="nb-save"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID'
      },
      username: {
        title: 'username'
      },
      email: {
        title: 'email'
      },
      password: {
        title:'password'
      },
      phone: {
        title: 'phone'
      }
    }
  };

  constructor( private auth: ServicesService) {
  
  }
 

 ngOnInit() {
    this.auth.getData().subscribe((data1: View[]) => {
      this.Login = data1;
    });
  }

  ondelete(event) {
     if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
       console.log(event.data);
       console.log(event.data._id);
     // console.log(event.data);
      this.auth.deleteuser(event.data._id)
       .subscribe(res => {console.log("Selected user details has been deleted");
        
         });
        } else {
      event.confirm.reject();
    }
  }


}