import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './home.css'
export default () => {
    const navigate = useNavigate()
    const [value, setValue] = useState();
    const [show, setShow] = useState(false);
    const [getData, setGetData] = useState([])
    const [saveContent, setSaveContent] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        status: ""
    });
    const handleInputChange = (e) => {
        setSaveContent(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }
    const handlePostApi = () => {
        let payLoad = {
            question: question,
            answers: [
                {
                    option1: option1,
                    status: status == "A" ? true : false,
                },
                {
                    option2: option2,
                    status: status == "B" ? true : false,
                },
                {
                    option3: option3,
                    status: status == "C" ? true : false,
                },
                {
                    option4: option4,
                    status: status == "D" ? true : false,
                },
            ]
        }
        axios.post("https://sore-moth-tank-top.cyclic.app/event/add", payLoad)
            .then((res) => {
                handleGetApi()
            })
    };
    useEffect(() => {
        handleGetApi()
    }, [])
    const handleGetApi = () => {

        axios.get("https://sore-moth-tank-top.cyclic.app/event/Q")
            .then((res) => {
                setGetData(res);
            })
    }

    const deleteQuestion = (id) => {
        axios.delete(`https://sore-moth-tank-top.cyclic.app/event/delete/${id}`)
            .then((res) => {
                handleGetApi()
            })
    }
    const { question, option1, option2, option3, option4, status } = saveContent;
    return (
        <>
        {/* SECTION 1 ADD QUESTIONS */}
            <div class="main container mt-sm-5 my-1">
                <div className="row">
                    <div class='col right'>
                        <div class="question ml-sm-5 pl-sm-5 pt-2">

                            <div className='heading d-flex justify-content-between border border-light p-2'>
                                <h4> Add Question</h4>
                                <i class="fa-solid fa-plus mt-2" onClick={() => setShow(true)} style={{ "cursor": "pointer" }}></i>
                            </div>

                            {show ? <div>
                                <div class="py-2 h5 mt-4"><div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Write Your Question Here</label>
                                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                        name="question" value={question} onChange={(e) => handleInputChange(e)}
                                    ></textarea>
                                    <div className='float-end  p-2'><i class="fa-solid fa-close mt-2" style={{ "cursor": "pointer" }} onClick={() => setShow(false)}></i>
                                    </div>
                                </div>
                                </div>
                                <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                    <div className='d-flex w-100 justify-space-between'>
                                        <label class="multiple-choice">
                                            <span class="fs-5">A.</span>   <input className='p-2 w-75' type="Text" placeholder="Write Option "
                                                name="option1" value={option1} onChange={(e) => handleInputChange(e)}
                                            />

                                        </label>
                                        <label class="options">True
                                            <input type="radio" name="radio" onChange={() => setSaveContent(st => ({
                                                ...st,
                                                status: "A"
                                            }))} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='d-flex w-100 justify-space-between'>
                                        <label class="multiple-choice">
                                            <span class="fs-5">B.</span>   <input className='p-2 w-75' type="Text" placeholder="Write Option "
                                                name="option2" value={option2} onChange={(e) => handleInputChange(e)}
                                            />
                                        </label>
                                        <label class="options">True
                                            <input type="radio" name="radio"
                                                onChange={() => setSaveContent(st => ({
                                                    ...st,
                                                    status: "B"
                                                }))}
                                            />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='d-flex w-100 justify-space-between'>
                                        <label class="multiple-choice">
                                            <span class="fs-5">C.</span>   <input className='p-2 w-75' type="Text" placeholder="Write Option e"
                                                name="option3" value={option3} onChange={(e) => handleInputChange(e)}
                                            />
                                        </label>
                                        <label class="options">True
                                            <input type="radio" name="radio"
                                                onChange={() => setSaveContent(st => ({
                                                    ...st,
                                                    status: "C"
                                                }))}
                                            />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='d-flex w-100 justify-space-between'>
                                        <label class="multiple-choice">
                                            <span class="fs-5">D.</span>   <input className='p-2 w-75' type="Text" placeholder="Write Option "
                                                name="option4" value={option4} onChange={(e) => handleInputChange(e)}
                                            />
                                        </label>
                                        <label class="options">True
                                            <input type="radio" name="radio"
                                                onChange={() => setSaveContent(st => ({
                                                    ...st,
                                                    status: "D"
                                                }))}
                                            />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="d-flex justify-content-evenly pt-3">
                                        <div id="prev">
                                            <button class="btn btn-primary">Previous</button>
                                        </div>
                                        <div class="ml-auto mr-sm-5">
                                            <button class="btn btn-success" onClick={() => { handlePostApi() }}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div> : ""};
                        </div>
                    </div>

                    {/*Section # Display Questions */}

                    <div className='col left'>
                        <h5>Note: Correct Answers Will Be Highlighted As Green</h5>
                        {
                            getData?.data?.event?.map((detail) => (
                                <div class="question ml-sm-5 pl-sm-5 pt-2">
                                    <div class="py-2 h5"><b>Q. {detail?.question}</b></div>

                                    <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                        <label class="options">{detail?.answers?.[0]?.option1}
                                            <input type="radio" name="radio" onChange={() => (setValue(detail?.answers?.[0]))} />
                                            <span class="checkmark" style={value?.status == true ? {} : { backgroundColor: '#555' }}></span>
                                        </label>
                                        <label class="options">{detail?.answers?.[1]?.option2}
                                            <input type="radio" name="radio" onChange={() => (setValue(detail?.answers?.[1]))} />
                                            <span class="checkmark" style={value?.status == true ? {} : { backgroundColor: '#555' }}></span>
                                        </label>
                                        <label class="options">{detail?.answers?.[2]?.option3}
                                            <input type="radio" name="radio" onChange={() => (setValue(detail?.answers?.[2]))} />
                                            <span class="checkmark" style={value?.status == true ? {} : { backgroundColor: '#555' }}></span>
                                        </label>
                                        <label class="options">{detail?.answers?.[3]?.option4}
                                            <input type="radio" name="radio" onChange={() => (setValue(detail?.answers?.[3]))} />
                                            <span class="checkmark" style={value?.status == true ? {} : { backgroundColor: '#555' }}></span>
                                        </label>
                                    </div>
                                </div>
                            ))
                        };

                    </div>
                    {/* Section # Display question ends */}
                </div>


                    {/* Section DELETE And EDIT */}

                <div class='col crud mt-4 w-50 mb-6 '>
                    {
                        getData?.data?.event?.map((detail) => (
                            <div className='aa'>
                                <div className="icons d-flex justify-content-end p-2 border border-light p-2" style={{ "cursor": "pointer" }}>
                                    <i class="fa-regular fa-eye p-2"></i>
                                    <i class="fa-regular fa-pen-to-square p-2"
                                        onClick={() => (navigate(`editpage/${detail._id}`, { state: detail }))}
                                    ></i>
                                    <i class="fa-solid fa-trash p-2"
                                        onClick={() => (deleteQuestion(detail?._id))}
                                    ></i>
                                </div>
                                <div class="question ml-sm-5 pl-sm-5 p-2  ">
                                    <div class="py-2 h5"><b>Q.{detail.question} </b></div>
                                    {
                                        detail.answers?.map((info) => (
                                            <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                                <label class="options">
                                                    {info?.option1}
                                                    {info?.option2}
                                                    {info?.option3}
                                                    {info?.option4}
                                                    <input type="radio" name="radio" />
                                                    <span class="checkmark"></span>
                                                </label>
                                            </div>
                                        ))
                                    };
                                </div>
                            </div>
                        ))
                    };
                </div>
                 {/* Section DELETE And EDIT ENDS*/}
            </div>

        </>
    )
}