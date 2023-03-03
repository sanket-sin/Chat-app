import { Component, OnInit } from '@angular/core';
import "firebase/firestore";
import * as firebase from "firebase/compat/app";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseChatService } from 'src/app/service/firebase-chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, map } from 'rxjs';
@Component({
  selector: 'app-chat-one',
  templateUrl: './chat-one.component.html',
  styleUrls: ['./chat-one.component.css']
})
export class ChatOneComponent implements OnInit {
  fileUpload: any;
  room_id: any;
  path: any;
  private basePath = "/Images/";
  messageData: any = [];
  sender_id =  '001';
  receiver_id = '002'
  loader: boolean = false;
  receiver_ids:any




  constructor(
    private router: Router,
    private af: AngularFireStorage,
    // private toast: ToastrService,
    // private localStore: LocalService,
    private route: ActivatedRoute,
    // private apiService: ApiService,
    // private authentication: AuthenticationService,
    private chatService: FirebaseChatService
  ) { }


  form = new FormGroup({
    message: new FormControl("", [Validators.required,]),
    fileUrl: new FormControl("", [Validators.required,]),
  });
  
  ngOnInit(): void {
    this.receiver_ids = this.makeid(2)
    this.newData()
  }


  sendChat(){
    if(this.messageData.length == 0){
      // window.location.reload();
      this.newData()

    }
    if (!this.form.value.message && !this.form.value.fileUrl ) {
      // this.toast.clear();
      // this.toast.error("Please enter a message");
      alert('please fill in all the details')
    }else{
      let chat_data: any;
       let rec =  this.receiver_ids

      chat_data={
        sender_id:this.sender_id,
        reciever_id:this.receiver_id,
        id: this.makeid(2),
        rec: rec,
        timestamp: this.getFirebaseTimestamp(),
        fileUrl: this.fileUpload,
        message: this.form.value.message,
      }
      if (chat_data.fileUrl) {
        chat_data.message = null;
        chat_data.messageType = "Image"; 
        this.fileUpload = '';
        const all_data = {
          // user_id: this.tenant_id,
          // message: this.form.value.message,
          // chat_room_id: this.room_id
        }
        
        this.form.reset();

      } else {
        chat_data.fileUrl = '';
        chat_data.messageType = "Text";  
        const all_data = {
          // user_id: this.tenant_id,
          // message: this.form.value.message,
          // chat_room_id: this.room_id
        }
        
        this.form.reset();

        this.fileUpload = ''
      delete this.path
      this.chatService.sendMessage(this.room_id, chat_data,);
      
      this.fileUpload = ''
      
      this.form.reset();
      }
    }
  }
  upload($event: any) {
    (this.path = $event.target.files[0])
    this.uploadImage()
      // this.form.get("message")?.patchValue(this.path.name);
    // this.uploadImage()
  }

  uploadImage() {
    if (this.path) {
      this.loader = true;
      const file_path = this.basePath + this.getCurrentTime() + ".jpeg";
      const storageRef = this.af.ref(file_path);
      const uploadTask = this.af.upload(file_path, this.path);
      uploadTask
        .snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe((downloadURL) => {
              this.loader = false;
              this.fileUpload = downloadURL;
              if (this.fileUpload != null) {
                this.sendChat();      
                this.form.reset()
              }
              else{
                this.fileUpload = null

              }
            });
          })
        )
        .subscribe();
    } else {
      this.fileUpload = null
      this.sendChat();
      this.form.reset()
    }
  }
  newData(){
    this.room_id =  this.sender_id + "_" + this.receiver_id
    const roomData = {
        sender_id: this.sender_id,
        reciever_id: this.receiver_id,
        id: this.makeid(2),
        timestamp: this.getFirebaseTimestamp(),
        message: this.form.value.message,
    };
    const roomId = this.room_id;
    this.chatService.checkRoomExist(roomId).forEach((doc) => {
      // console.log("------fire----", doc.data());
      if (!doc.data()) {
        this.chatService.create(roomData, roomId).then(() => {
          console.log("Created new item successfully!");
        });
      } else {
        this.chatService.getMessage(this.room_id).snapshotChanges().pipe(map((changes) =>
              changes.map((c) => ({
                id: c.payload.doc.id,
                ...c.payload.doc.data(),
              }))
            )
          )
          .subscribe((data) => {
            this.messageData = data;

            console.log("---3333--", this.messageData);
          });
      }
    });
  }
  getCurrentTime() {
    const d = new Date();
    const n = d.toUTCString();
    const date = new Date(n);
    const milliseconds = date.getTime(); //1440516958
    return milliseconds;
  }
  getFirebaseTimestamp() {
    const timestamp = firebase.default.firestore.FieldValue.serverTimestamp();
    return timestamp;
    // console.log("this is timestap", timestamp);
  }
  makeid(length: any) {
    var result = "";
    var characters =
      "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
