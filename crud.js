
async function fetchAndUpdate()
{
    const table=document.createElement("table");

    let head= document.createElement("thead");

    let hRow=document.createElement("tr");

    let h1=document.createElement("th");
    h1.textContent="Name";
    
    let h2=document.createElement("th");
    h2.textContent="Age";
    let h3=document.createElement("th");
    h3.textContent="Gender";
    let h4=document.createElement("th");
    h4.textContent="Marks";
    let h5=document.createElement("th");
    h5.textContent="Cohort";
    let h6=document.createElement("th");
    h6.textContent="Edit";
    let h7=document.createElement("th");
    h7.textContent="Delete";

    hRow.append(h1,h2,h3,h4,h5,h6,h7);

    head.append(hRow);


    let res= await fetch(`http://localhost:3000/students`);

    let data= await res.json();
    let body= document.createElement("tbody");
    data.forEach(student => {
        let row= document.createElement("tr");

        let cell1=document.createElement("td");
        cell1.innerText=student.name;

        let cell2=document.createElement("td");
        cell2.innerText=student.age;
        let cell3=document.createElement("td");
        cell3.innerText=student.gender;
        let cell4=document.createElement("td");
        cell4.innerText=student.marks;
        let cell5=document.createElement("td");
        cell5.innerText=student.cohort;
        let cell6=document.createElement("td");
        let editBut=document.createElement("button");
        editBut.innerText="Edit";
        cell6.append(editBut);
        editBut.addEventListener("click",function(){
            localStorage.setItem("studentId",student.id);

            window.location.href="edit.html"
        })


        let cell7=document.createElement("td");
        let delBut=document.createElement("button");
        delBut.innerText="Delete";
        cell7.append(delBut)

        delBut.addEventListener("click",deleteStudent)

        async function deleteStudent(){
            try {
                let res = fetch(`http://localhost:3000/students/${student.id}`,{
                    method:"DELETE",
                    headers:{
                        "Content-Type":"Application/json"
                    }
                })
                
            } catch (error) {
                console.log(error);
            }
        }
        row.append(cell1,cell2,cell3,cell4,cell5,cell6,cell7);

        body.append(row);
    });

    table.append(head,body);

    document.querySelector("#container").append(table)
    console.log(data);

}
fetchAndUpdate();






async function addStudent(){
    event.preventDefault();
    let name=document.querySelector("#name").value;
    let age=document.querySelector("#age").value;
    let gender=document.querySelector("#gender").value;
    let marks=document.querySelector("#marks").value;
    let cohort=document.querySelector("#cohort").value;


    let body={
        name,
        age,
        gender,
        marks,
        cohort
    }
    console.log(body);
    let res= await fetch(`http://localhost:3000/students`,{
        method:"POST",
        body: JSON.stringify(body),
        headers:{
            "Content-Type":"Application/json"
        }
    });

    // let data =await res.json();


}