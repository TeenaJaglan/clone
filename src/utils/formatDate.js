 const FormDate =(date)=> {
    // return new Date(date).toLocaleDateString("en-US",{month: "long", day:"numeric", year: "numeric"});
        return new Date(date);
}
export const toStringDate=(date)=>{

return  new Date(date).toLocaleDateString("en-US",{month: "long", day:"numeric", year: "numeric"});
}
export default FormDate;