let studentId= localStorage.getItem("studentId")
async function editInput(){
    try {
        let res= await fetch(`http://localhost:3000/students/${studentId}`);

        let student= await res.json();

        let form= document.createElement("form");

        let name=document.createElement("input");
        name.value=student.name;
        let br1=document.createElement("br");
        let age=document.createElement("input");
        age.value=student.age;
        let br2=document.createElement("br");
        let gender=document.createElement("input");
        gender.value=student.gender;
        let br3=document.createElement("br");
        let marks=document.createElement("input");
        marks.value=student.marks;
        let br4=document.createElement("br");
        let cohort=document.createElement("input");
        cohort.value=student.cohort;
        let br5=document.createElement("br");
        let edit=document.createElement("input");
        edit.type="submit";
        edit.addEventListener("click",editStudent);
     
        form.append(name,br1,age,br2,gender,br3,marks,br4,cohort,br5,edit);

        document.querySelector("#container").append(form);

        async function editStudent(){
            event.preventDefault();
            name=name.value;
            age=age.value;
            gender=gender.value;
            marks=marks.value;
            cohort=cohort.value;
            let body={
                name,
                age,
                gender,
                marks,
                cohort
            }

            let res= await fetch(`http://localhost:3000/students/${studentId}`,{
                method:"PUT",
                body:JSON.stringify(body),
                headers:{
                    "Content-Type":"Application/json"
                }
            })
            console.log(body);
            window.location.href="crud.html";
        }


    } catch (error) {
        console.log(error);
    }
}

editInput();

  