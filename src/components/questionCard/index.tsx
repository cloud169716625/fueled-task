import React, { useEffect } from 'react'
import ExpanArrowIcon from '../../assets/icon/ExpanArrow.svg'
import CloseIcon from '../../assets/icon/Close.svg'
import PlusIcon from '../../assets/icon/Plus.svg'
import DownIcon from '../../assets/icon/DownIcon.svg'
import Delete from '../../assets/icon/Delete.svg'
import UpIcon from '../../assets/icon/UpIcon.svg'
import './style.css'

interface QuesionCardProps {
  dataCnt: any
  id: Number
  index: Number
  handleAddQuestionData: (data: any) => void
  handleRemove: (data: any) => void
}

interface AnswerCompProps {
  item: any
  type: String
  index?: Number
  handleAnswers: (data: any) => void
  handleDeleteAnswer: (data: any) => void
}

function AnswerComp({
  item,
  type,
  index,
  handleAnswers,
  handleDeleteAnswer,
}: AnswerCompProps) {
  const [data, setData] = React.useState('')
  const [data2, setData2] = React.useState('')
  const [id, setId] = React.useState(1)
  const [indexNum, setIndexNum] = React.useState<any>(1)

  const handleChangeData = (e: any) => {
    setData(e.target.value)
  }

  const handleClick = (e: any) => {
    const temp = {
      answerId: id,
      answer: data,
    }
    if (e.target.checked) {
      handleAnswers(temp)
    } else {
      handleAnswers({
        answerId: id,
        answer: '',
      })
    }
  }

  const handleChangeData2 = (e: any) => {
    const temp2 = {
      answerId: id,
      answer: e.target.value,
    }
    handleAnswers(temp2)
  }

  const handleRemove = () => {
    handleDeleteAnswer({
      answerId: id,
      answer: '',
    })
  }

  React.useEffect(() => {
    setData2(item?.answer)
    setData(item?.answer)
    setId(item?.answerId)
    if (index) {
      setIndexNum(index)
    }
  }, [item?.answer, item?.answerId])

  return (
    <div className="checkbox-item">
      {type === 'checkbox' ? (
        <input onClick={handleClick} type="checkbox" className="checkbox" />
      ) : type === 'radio' ? (
        <input onClick={handleClick} type="radio" className="checkbox" />
      ) : (
        <span>{indexNum}. </span>
      )}
      <input
        placeholder="First Option"
        value={data}
        onChange={
          type === 'checkbox' || type === 'radio'
            ? handleChangeData
            : handleChangeData2
        }
        className="optionInput"
      />
      <img
        src={CloseIcon}
        onClick={handleRemove}
        alt="close"
        className="closeIcon"
      />
    </div>
  )
}

export default function QuestionCard({
  dataCnt,
  id,
  index,
  handleAddQuestionData,
  handleRemove,
}: QuesionCardProps) {
  const [selected, setSelected] = React.useState('Short Answer')
  const [showState, setShowState] = React.useState(false)
  const [question, setQuestion] = React.useState('')
  const [answers, setAnswers] = React.useState([
    {
      answerId: 1,
      answer: '',
    },
  ])
  const submitData = {
    id: id,
    question: question,
    answers: answers,
  }

  const handleSelect = (data: string) => {
    setSelected(data)
    setShowState(false)
    setAnswers([
      {
        answerId: 1,
        answer: '',
      },
    ])
  }

  const handleAnswers = (data: any) => {
    let updatedData = answers?.map((item: any) => {
      if (item?.answerId === data?.answerId) {
        return { ...item, answer: data?.answer }
      }
      return item
    })
    setAnswers(updatedData)
    handleAddQuestionData(submitData)
  }

  const handleDeleteAnswer = (data: any) => {
    setAnswers(answers.filter((item) => item.answerId !== data?.answerId))
  }

  const handleAddOption = () => {
    const temp = {
      answerId: answers?.length + 1,
      answer: '',
    }

    setAnswers([...answers, temp])
  }

  const handleQuestionChange = (e: any) => {
    setQuestion(e.target.value)
  }

  const handleShortAnswer = (e: any) => {
    setAnswers([
      {
        answerId: 1,
        answer: e.target.value,
      },
    ])
    handleAddQuestionData(submitData)
  }

  const handleDeleteCard = () => {
    handleRemove({
      id: id,
      question: '',
      answers: [],
    })
  }

  useEffect(() => {
    handleAddQuestionData(submitData)
  }, [submitData?.question, submitData?.answers?.length])

  return (
    <div className="cardContainer">
      <div className="cardDiv">
        <div className="fullWidth">
          <span className="desc">Question</span>
          <input
            onChange={handleQuestionChange}
            className="questionInput"
            placeholder="What do you want to ask?"
          />
        </div>
        <div className="divider" />
        <div className="fullWidth">
          <span className="answer-text">Answer</span>
          <div className="custom-select-container">
            <div
              className="select-header"
              onClick={() => setShowState(!showState)}
            >
              {selected}
              <img src={ExpanArrowIcon} alt="icon" />
            </div>
            {showState && (
              <ul className="select-options">
                <li onClick={() => handleSelect('Short Answer')}>
                  Short Answer
                </li>
                <li onClick={() => handleSelect('Paragraph')}>Paragraph</li>
                <li onClick={() => handleSelect('Checkboxes')}>Checkboxes</li>
                <li onClick={() => handleSelect('Multi Choice')}>
                  Multi Choice
                </li>
                <li onClick={() => handleSelect('Dropdown')}>Dropdown</li>
              </ul>
            )}
          </div>
          {selected === 'Short Answer' ? (
            <input
              placeholder="Short answer text"
              onChange={handleShortAnswer}
              className="shortInput"
            />
          ) : selected === 'Paragraph' ? (
            <textarea
              placeholder="Long answer text"
              className="textArea"
              rows={4}
              onChange={handleShortAnswer}
            />
          ) : selected === 'Checkboxes' ? (
            <>
              {answers?.map((item: any, key: any) => (
                <AnswerComp
                  key={key}
                  item={item}
                  handleDeleteAnswer={handleDeleteAnswer}
                  handleAnswers={handleAnswers}
                  type="checkbox"
                />
              ))}
              <button className="add-button" onClick={handleAddOption}>
                <img src={PlusIcon} alt="plus" className="plusIcon" />
                ADD OPTION
              </button>
            </>
          ) : selected === 'Multi Choice' ? (
            <>
              {answers?.map((item: any, key: any) => (
                <AnswerComp
                  key={key}
                  item={item}
                  handleAnswers={handleAnswers}
                  handleDeleteAnswer={handleDeleteAnswer}
                  type="radio"
                />
              ))}
              <button className="add-button" onClick={handleAddOption}>
                <img src={PlusIcon} alt="plus" className="plusIcon" />
                ADD OPTION
              </button>
            </>
          ) : (
            <>
              {answers?.map((item: any, key: any) => (
                <AnswerComp
                  key={key}
                  index={key + 1}
                  item={item}
                  handleDeleteAnswer={handleDeleteAnswer}
                  handleAnswers={handleAnswers}
                  type="multi"
                />
              ))}
              <button className="add-button" onClick={handleAddOption}>
                <img src={PlusIcon} alt="plus" className="plusIcon" />
                ADD OPTION
              </button>
            </>
          )}

          <div className="divider" />
          <div className="flexDiv">
            <span>
              {index} of {dataCnt}
            </span>
            <div className="iconDiv">
              <img src={UpIcon} alt="up" className="icon-btn" />
              <img src={DownIcon} alt="down" className="icon-btn" />
              <img
                src={Delete}
                alt="delete"
                className="icon-btn"
                onClick={handleDeleteCard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
