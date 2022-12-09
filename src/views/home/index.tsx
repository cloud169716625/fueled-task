import React from 'react'
import QuestionCard from '../../components/questionCard'
import PlusIcon from '../../assets/icon/Plus.svg'

export default function Home() {
  const [questionData, setQuestionData] = React.useState([
    {
      id: 1,
      question: '',
      answers: [],
    },
  ])

  const handleAdd = () => {
    let tempData = {
      id: questionData.length + 1,
      question: '',
      answers: [],
    }
    setQuestionData([...questionData, tempData])
  }

  const handleAddQuestionData = (data: any) => {
    let updatedData = questionData?.map((item: any) => {
      if (item?.id === data?.id) {
        return { ...item, question: data?.question, answers: data?.answers }
      }
      return item
    })
    setQuestionData(updatedData)
  }

  const handleRemove = (data: any) => {
    setQuestionData(questionData.filter((item) => item.id !== data?.id))
  }

  const handleSubmit = () => {
    console.log('This is Submit Data------------->', questionData)
  }

  return (
    <div className="root">
      {questionData.map((item: any, key: any) => (
        <QuestionCard
          key={key}
          handleAddQuestionData={handleAddQuestionData}
          handleRemove={handleRemove}
          dataCnt={questionData?.length}
          id={item?.id}
          index={key + 1}
        />
      ))}
      <button onClick={handleAdd} className="add-button">
        <img src={PlusIcon} alt="plus" className="plusIcon" />
        ADD QUESTION
      </button>
      <button
        className="add-button"
        onClick={handleSubmit}
        style={{ background: '#AE0000', color: '#fff' }}
      >
        SAVE & SHARE
      </button>
    </div>
  )
}
