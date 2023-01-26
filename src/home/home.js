import { useState,useEffect } from 'react'
import './home.css'
export default () => {
    const[saveItems,setSaveItems]=useState([]);
    const[show,setShow]=useState(false);
    const [data,setData]=useState([])
    const[saveContent,setSaveContent]=useState({
        question:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
    });
    const handleInputChange=(e)=>{
        setSaveContent(state=>({
            ...state,
            [e.target.name]:e.target.value
        }))
    }

    const saveData=()=>{
        setSaveItems([...saveItems,saveContent])
        localStorage.setItem('data', JSON.stringify(saveItems));
        setSaveContent(saveContent);
    }
    const{question,option1,option2,option3 ,option4}=saveContent;
   useEffect(()=>{
    const items=JSON.parse(localStorage.getItem('data'));
    setData(items)
   },[])
 
   const deleteUser=()=>{
     
   }

console.log(saveItems,"items")
    return (
        <>
            <div class="main container mt-sm-5 my-1">
                <div className="row">
                    <div class='col right'>
                        <div class="question ml-sm-5 pl-sm-5 pt-2">
                            <div className='heading d-flex justify-content-between border border-light p-2'>
                                <h4> Add Question</h4>
                                <i class="fa-solid fa-plus mt-2" onClick={()=>setShow(true)} style={{"cursor":"pointer"}}></i>
                            </div>

                           {show ? <div>
                            <div class="py-2 h5 mt-4"><div class="mb-3">
                                <label for="exampleFormControlTextarea1" class="form-label">Write Your Question Here</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                                name="question" value={question} onChange={(e)=>handleInputChange(e)}
                                ></textarea>
                               <div className='float-end  p-2'><i class="fa-solid fa-close mt-2" style={{"cursor":"pointer"}} onClick={()=>setShow(false)}></i>
                            </div></div> 
                            </div>

                            <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                <label class="multiple-choice">
                                    <span class="fs-5">A.</span>   <input className='p-2 w-75' type="Text" placeholder="Write Correct Option Here"
                                    name="option1" value={option1} onChange={(e)=>handleInputChange(e)}
                                    />

                                </label>
                                <label class="multiple-choice">
                                    <span class="fs-5">B.</span>   <input className='p-2 w-75' type="Text"  placeholder="Write Correct Option Here" 
                                    name="option2" value={option2} onChange={(e)=>handleInputChange(e)}
                                    />
                                </label>
                                <label class="multiple-choice">
                                    <span class="fs-5">C.</span>   <input className='p-2 w-75' type="Text"  placeholder="Write Correct Option Here" 
                                     name="option3" value={option3} onChange={(e)=>handleInputChange(e)}
                                    />
                                </label>
                                <label class="multiple-choice">
                                    <span class="fs-5">D.</span>   <input className='p-2 w-75' type="Text"  placeholder="Write Correct Option Here" 
                                    name="option4" value={option4} onChange={(e)=>handleInputChange(e)}
                                    />
                                </label>
                                <div class="d-flex justify-content-evenly pt-3">
                            <div id="prev">
                                <button class="btn btn-primary">Previous</button>
                            </div>
                            <div class="ml-auto mr-sm-5">
                                <button class="btn btn-success" onClick={()=>saveData()}>Save</button>
                            </div>
                        </div>
                            </div>
                            </div>:""}

                        </div>
                       
                        
                    </div>
                    <div className='col left'>
                       
                                <div class="question ml-sm-5 pl-sm-5 pt-2">
                                <div class="py-2 h5"><b>Q. which option best describes your job role?</b></div>
                                <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                    <label class="options">Small Business Owner or Employee
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="options">Nonprofit Owner or Employee
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="options">Journalist or Activist
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="options">Other
                                        <input type="radio" name="radio" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                       
                      
                        <div class="d-flex align-items-center pt-3">
                            <div id="prev">
                                <button class="btn btn-primary">Previous</button>
                            </div>
                            <div class="ml-auto mr-sm-5">
                                <button class="btn btn-success">Next</button>
                            </div>
                        </div>
                    </div>
                </div>



                {
                    data?.map((index,i)=>(
                        <div class='col crud mt-4 w-50 '>
                        <div className="icons d-flex justify-content-end p-2" style={{"cursor":"pointer"}}>
                        <i class="fa-regular fa-eye p-2"></i>
                        <i class="fa-regular fa-pen-to-square p-2"></i>
                        <i class="fa-solid fa-trash p-2" onClick={()=>{
                            const newFormValues = [...data]
                            newFormValues.splice(i, 1)
                            setData(newFormValues)
                        }}></i>
                        </div>
    
                        
                        <div class="question ml-sm-5 pl-sm-5 p-2 ">
                            <div class="py-2 h5"><b>Q. {index.question}</b></div>
                            <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                <label class="options">Small Business Owner or Employee
                                    <input type="radio" name="radio" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="options">Nonprofit Owner or Employee
                                    <input type="radio" name="radio" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="options">Journalist or Activist
                                    <input type="radio" name="radio" />
                                    <span class="checkmark"></span>
                                </label>
                                <label class="options">Other
                                    <input type="radio" name="radio" />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </div>
                        <div class="d-flex align-items-center pt-3">
                            <div id="prev">
                                <button class="btn btn-primary">Previous</button>
                            </div>
                            <div class="ml-auto mr-sm-5">
                                <button class="btn btn-success">Next</button>
                            </div>
                        </div>
    
                    </div>
                    ))
                }
               
            </div>
        </>
    )
}