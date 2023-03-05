import {useEffect, useState} from 'react'
// import API from './axios';
import axios from 'axios';
import {MathJaxContext } from "better-react-mathjax";

const API = "https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID="
const qID = ["AreaUnderTheCurve_901", "BinomialTheorem_901", "DifferentialCalculus2_901"];

const App = () => {

  const [myData, setMyData] = useState([]);
  // const [isError, setIsError ] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Function for button
  const changeQuestion =() =>{
      setCurrentQuestion(currentQuestion+1);
      console.log(setCurrentQuestion)
  }
  const getApiData = async (url) =>{

    const res = await axios.get(url)
    console.log(res.data);
    setMyData(res.data);
    }
    useEffect(()=>{
      getApiData(`${API}`+qID[currentQuestion]);
    }, [setCurrentQuestion])
    
  return (
    <>
    <div className='main-container'>
    <h3>JEE NEET Exam</h3>
    <h4>Section: Maths</h4>
    <div className='container'>
      <div className='questions'>
        {myData.map((qns)=>{
        const {id, ChapterID, Question, QuestionID } = qns;
        return (
                  <div className='=card' key={id}>
                    <div>
                    <span id='question-id'>Question ID: {qns.QuestionID}</span>
                    </div>
                    <div>
                    <span id='question-text'>Question: <MathJaxContext>{qns.Question}</MathJaxContext></span>
                    </div>
                  </div>
                )
              })
            }
      </div>
    </div>
    <button onClick={changeQuestion}>NEXT</button>
    </div>
    </>
  )}
export default App;