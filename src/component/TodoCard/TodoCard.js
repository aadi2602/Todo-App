import React from 'react'
import './TodoCard.css'
import ImgDel from './delete.png'

function TodoCard({ index, task,category, deleteItem }) {

  const CATEGORY_EMOGI_MAP ={
    Learning: "📚",
    Work: "💼",
    Personal: "🏠",
    Shopping: "🛒",
    Health: "🏥",
    Other: "📁"
  }

  const CATEGORY_COLORS = {
    Learning: "#f1c40f",
    Work: "#3498db",
    Personal: "#2ecc71 ",
    Shopping: "#e74c3c",
    Health: "#9b59b6",
    Other: "#34495e"
  }

  return (
    <div className='todo-card'>
      <img src={ImgDel} alt='Delete' className='delete-icon' onClick={()=>{
        deleteItem(index)
      }}/>
      {task}

      <span className='category' style={{
        backgroundColor: CATEGORY_COLORS[category]
      }}>
      {CATEGORY_EMOGI_MAP[category]} {category}
      </span>

      
    </div>
  )
}

export default TodoCard