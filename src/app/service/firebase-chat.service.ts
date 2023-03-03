import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { doc } from 'firebase/firestore';
import 'firebase/firestore'
import * as firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class FirebaseChatService {


  private dbPath = '/Chats'; 

  anysRef: AngularFirestoreCollection<any>;
  chatReference:any
  messageReference: any;
  // this.chatReference.collection('Messages')

  constructor(private db: AngularFirestore) {
    this.anysRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<any> {
    return this.anysRef;
  }

  create(roomData: any,roomId:any): any {
    // this.chatReference = this.db.collection('Chat').doc(this.activeChat);
    //this.chatReference = this.db.collection('Chat');
		//this.messageReference = this.chatReference.collection('Messages');
    //return this.chatReference.doc(8888).add({...any })
  
     return this.anysRef.doc(roomId).set({ ...roomData });
   // return this.messageReference=this.anysRef.doc(roomId).collection('Messages').add(roomData)
  }

  update(roomData: any,roomId:any): Promise<void> {
    return this.anysRef.doc(roomId).update({ ...roomData });
  }

  delete(id: string): Promise<void> {
    return this.anysRef.doc(id).delete();
  }
  checkRoomExist(roomId: string) {
   // return this.anysRef.doc(roomId).get()
   return this.anysRef.doc(roomId).get()
  //  .where("jobSeekerId", '==', this.jobSeekerId)
  //  .where("jobId", '==', this.job.id)
  //  .get().then(querySnapshot => {
  //    querySnapshot.forEach(doc => {
  //    console.log(doc.data())
  //    console.log('already exists')
  //    this.applyStatus = true
   //})
  }
  getMessage(roomId:any){
    //this.chatReference = this.db.collection('Chat');
    const chatReference = this.anysRef.doc(roomId);

		return  chatReference.collection('Messages',ref => ref.orderBy('timestamp'));
    // console.log('messsss',this.messageReference);
    
    // return this.messageReference

  }
  sendMessage(roomId:any,messageObj:any){
   return this.messageReference=this.anysRef.doc(roomId).collection('Messages').doc(messageObj.id).set(messageObj)


  }

  addField(roomId:any,messageObj:any,id:any){
    return this.messageReference=this.anysRef.doc(roomId).set(messageObj)
 
 
   }

// console.log(makeid(5));
  getFirebaseTimestamp(){
    const timestamp = firebase.default.firestore.FieldValue.serverTimestamp()
    

  }
}
