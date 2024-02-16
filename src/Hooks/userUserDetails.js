export default function useUserDetails(){
    const sessionUser=sessionStorage.getItem("ImmintegralUser");
//     if(!sessionUser){
// localStorage.clear();
// sessionStorage.clear();
// window.location.reload();
//     }
//const user=JSON.parse(sessionUser);
return {sessionUser};
}