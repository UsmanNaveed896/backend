import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
export default () => {
    const params = useParams();
    const navigate = useNavigate();
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
    const handleEditApi = (e) => {
        e.preventDefault();
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
        axios.patch(`https://sore-moth-tank-top.cyclic.app/event/edit/${params.id}`, payLoad)
            .then(() => {
                navigate('/')
            })
    }
    useEffect(() => {
        axios.get(`https://sore-moth-tank-top.cyclic.app/event/${params.id}`)
            .then((res) => {
                let filter = res.data.answers.findIndex(x => x.status == true);
                let duplicate = { ...saveContent }
                duplicate.question = res?.data?.question
                duplicate.option1 = res?.data?.answers?.[0].option1
                duplicate.option2 = res?.data?.answers?.[1].option2
                duplicate.option3 = res?.data?.answers?.[2].option3
                duplicate.option4 = res?.data?.answers?.[3].option4
                duplicate.status = filter == 0 ? "A" : filter == 1 ? "B" : filter == 2 ? "C" : "D"
                setSaveContent(duplicate)
            })
    }, [])
    const { question, option1, option2, option3, option4, status } = saveContent;
    return (
        <>
            <div className="container w-25">
                <div className="bg-white p-5">
                    <div className="">
                        <div className="">
                            <h5 className="">Edit Attendance</h5>
                        </div>
                        <div className=" ">
                            <form onSubmit={(e) => handleEditApi(e)}>
                                <div class="py-2 h5 mt-4">
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea1" class="form-label">Write Your Question Here</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                                            name="question" value={question} onChange={(e) => handleInputChange(e)}
                                        ></textarea>

                                    </div>
                                </div>

                                <div class="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
                                    <div className='d-flex w-100 justify-space-between'>
                                        <label class="multiple-choice">
                                            <span class="fs-5">A.</span>   <input className='p-2 w-75' type="Text" placeholder="Write Correct Option Here"
                                                name="option1" value={option1} onChange={(e) => handleInputChange(e)}
                                            />

                                        </label>
                                        <label class="options">True
                                            <input type="radio" name="radio" value={"A"} checked={status == "A"} onChange={() => setSaveContent(st => ({
                                                ...st,
                                                status: "A"
                                            }))} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='d-flex w-100 justify-space-between'>
                                        <label class="multiple-choice">
                                            <span class="fs-5">B.</span>   <input className='p-2 w-75' type="Text" placeholder="Write Correct Option Here"
                                                name="option2" value={option2} onChange={(e) => handleInputChange(e)}
                                            />

                                        </label>
                                        <label class="options">True
                                            <input type="radio" name="radio" value={"B"} checked={status == "B"} onChange={() => setSaveContent(st => ({
                                                ...st,
                                                status: "B"
                                            }))} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='d-flex w-100 justify-space-between'>
                                        <label class="multiple-choice">
                                            <span class="fs-5">C.</span>   <input className='p-2 w-75' type="Text" placeholder="Write Correct Option Here"
                                                name="option3" value={option3} onChange={(e) => handleInputChange(e)}
                                            />

                                        </label>
                                        <label class="options">True
                                            <input type="radio" name="radio" value={"C"} checked={status == "C"} onChange={() => setSaveContent(st => ({
                                                ...st,
                                                status: "C"
                                            }))} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className='d-flex w-100 justify-space-between'>
                                        <label class="multiple-choice">
                                            <span class="fs-5">D.</span>   <input className='p-2 w-75' type="Text" placeholder="Write Correct Option Here"
                                                name="option4" value={option4} onChange={(e) => handleInputChange(e)}
                                            />

                                        </label>
                                        <label class="options">True
                                            <input type="radio" name="radio" value={"D"} checked={status == "D"} onChange={() => setSaveContent(st => ({
                                                ...st,
                                                status: "D"
                                            }))} />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <div class="d-flex justify-content-evenly pt-3">
                                        <div id="prev">
                                            <button class="btn btn-primary" onClick={() => (navigate('/'))} >Close</button>
                                        </div>
                                        <div class="ml-auto mr-sm-5">
                                            <button class="btn btn-success" type="submit" onClick={(e) => { handleEditApi(e) }}>Save</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}