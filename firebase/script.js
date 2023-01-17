
import { initializeApp} from "firebase/app";

import {getFirestore,collection,getDocs,addDoc,deleteDoc,doc,updateDoc, onSnapshot,} from "firebase/firestore"
import {getAuth,createUserWithEmailAndPassword,signOut,signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDQOCRPl_2Hzt0mjvWx0_p7Pyb09OaoeA4",
  authDomain: "fir-temel-f2123.firebaseapp.com",
  projectId: "fir-temel-f2123",
  storageBucket: "fir-temel-f2123.appspot.com",
  messagingSenderId: "751230594510",
  appId: "1:751230594510:web:587bc0b9fb1a099b888f9f",
  measurementId: "G-HQHKQ488RM"
};

//************************************************************************ */
//************************************************************************
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//console.log(app)
const database=getFirestore(app)
console.log(database)
const auth=getAuth(app);


//* DATABASEDEN YANİ FİRESTORE DAN VERİLERİMİZİ READ  KISMI READ READ:onSnapshot(ref,(snapshot)=>{})

const ref=collection(database,"kullanıcılar") //referansını aldık verilerimizin veriler adındaki collectionumuzun kaydettikya
//gerçek zamanlı anında güncellenen veriyi okuma onSnaphsot()FONKSİYONU
onSnapshot(ref,(snapshot)=>{//bu fonksiyon icinde ()=> okuyoruz verileri
    const kullanıcılar=snapshot.docs.map(doc=>({
        id:doc.id,
        ...doc.data(),
    }))
    console.log(kullanıcılar) //data her değiştiginde onSnapshot calısır ekrana basılacak anında yani!


})



/*//BU METOT GERCEK ZAMANLI VERİ OKUMUYOR BİR VERİ EKLEDİK OKUMAK İSTEDİGİMİZDE EKRANI YENİLEMEK GEREK OLAMZ
getDocs(ref).then(snapshot=>{
    console.log(snapshot)//tüm dataları iceren yani=>veriler bu  10 tane  icnde kişi var 
   const verilerim= snapshot.docs.map((doc=>({
        id:doc.id,
        ...doc.data(),
    })))
    console.log(verilerim) //TÜM VERİLEİRMİZ BURDA
}).catch((error)=>{console.log(error)})
*/

//^ VERİ EKLEME KISMI FİRESOTRE WRİTE DATA Writeee=addDoc(ref,kullanıcı).then() //kullanıcı tek yani tek tek ekliyoruz 
const addform=document.getElementById("add");
addform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const kullanıcı={
        kullanıcıadı:addform.name.value,
        sifre:addform.sifre.value,
        yas:addform.yas.value,
    }
 console.log(kullanıcı)
 addDoc(ref,kullanıcı).then(()=>{
    alert("Döcüman eklendi")
 }).catch((error)=>{console.log(error)})

})

//! Veri silme-Delete

const deleteform=document.getElementById("delete"); 

//doc metodu  dabasedeki veriler collectionundan silmek istedigin verinin id si ni girerek o veriyi siler

deleteform.addEventListener("submit",(e)=>{
 const docRef=doc(database,"kullanıcılar",deleteform.id.value)
    e.preventDefault()
deleteDoc(docRef).then(()=>{
    alert("Döcüman silindi")
})
})

//? Veri  Güncelleme-Update UPDATE=updateDoc(güncellenecekref,kullanıcı).then()
const updateform=document.getElementById("update");
updateform.addEventListener("submit",(e)=>{
    e.preventDefault();
    const id=updateform.id.value;
    const kullanıcı={
        kullanıcıadı:updateform.name.value,
        sifre:updateform.name.value,
        yas:updateform.yas.value,
    }
    const docRef=doc(database,"kullanıcılar",id);//güncellenecek verinin referansını alıyoruz

//referansın oldugu yere kullanıcılar verisini yazıyoruz üstüne yazıyor orada olanın
updateDoc(docRef,kullanıcı).then(()=>{
    alert("Döcüman güncellendi")
})

})



//& Sign Up Hesap Oluşturma Kısmı yeni bir hesap!!! createUserWithEmailAndPassword(auth,email,password).then((user)=>{})

const signUpForm=document.getElementById("signup")
signUpForm.addEventListener("submit",(e)=>{
e.preventDefault();
const email=signUpForm.email.value;//signup id sinin altındaki email id li element in value degeri!!
const sifre=signUpForm.sifre.value;
const isim=signUpForm.isim.value;

//const isim=signInForm.isim.value;
//console.log("sifreee")
//promise döndürüyor ve giriş yapan kişinin bilgilerini içeren obje döndürüyor user dedim
createUserWithEmailAndPassword(auth,email,sifre).then((user)=>{
  console.log("Kullanıcı SignUp ",user) //Fd {user: nd, providerId: null, _tokenResponse: {…}, operationType: 'signIn'}
user.user.displayName=isim; 
console.log(user.user.displayName)
signUpForm.email.value=""
signUpForm.sifre.value=""
signUpForm.isim.value=""
//her kayıt olandan sonra alan temizlensin
}).catch((error)=>{
    console.log(error);
})
console.log(email,sifre)
})

//^ÖNEMLİ UYARI auth.signOut().then().. diye de kullanabilrisn aynısı  YUKARIDAKİLER İÇİNDE GEÇERLİ auth  dışarda olup bir eksik parametreli şekilde yazabilrsin mesela
//! auth.createUserWithEmailAndPassword(email,sifre) gibi!!!!

//! SignOut kısmı çıkış yapma ,SignUp ile giriş  signOut(auth).then()...

const signOutbtn=document.getElementById("signoutbtn");
signOutbtn.addEventListener("click",()=>{
   
    signOut(auth).then(()=>{
        console.log("User SignOut")
        console.log("heeey")
    }).catch((error)=>{console.log(error)})

})

//^ Signİn kısmı Kullanıcı giriş kısmı!!  signInWithEmailAndPassword(auth,emailipassword).then((user)=>{})
const signInForm=document.getElementById("signin");
const siginuser=document.getElementById("siginuser");
console.log(signInForm)
signInForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email=signInForm.email.value;
    const sifre=signInForm.sifre.value;
    

signInWithEmailAndPassword(auth,email,sifre).then((user)=>{
    console.log("User logged in ",user) //user bir obje burda

}).catch((error)=>{console.log(error)})
signInForm.email.value="";
signInForm.sifre.value=""

})


//& auth state change listener kullanıcının durumunu giriş yaptımı veya cıktımı dinleyen onAuthStateChanged() metotudur.

//KULLANICI GİRDİMİ ÇIKTIMI DİYE !!!SÜREKLİ KONTROL EDEN onAuthStateChanged(auth,(user)=>{})
onAuthStateChanged(auth,(user)=>{
    if(!user){
        console.log("kullanıcı cıkış yaptı")
    }
    else{
        console.log("Giren Kullanıcı",user)
       
    }
    //^signup yaptıktan sonra giriş yapıyor yine kullanıcı kayıt sonrası giriş yapmış oluyor, signup sonrası giriş yaptı der consola!!
})//2.paremetre kullanıcı durumu değiştiginde uygulanacak fonksiyondur.
