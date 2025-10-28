import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function TeacherPanel(){
  const [students, setStudents] = useState([])
  const [message, setMessage] = useState('')
  const [target, setTarget] = useState('')

  useEffect(()=>{ (async ()=>{
    const token = localStorage.getItem('udaan_token')
    try{
      const res = await axios.get('/api/teacher/students', { headers: { Authorization: `Bearer ${token}` } })
      setStudents(res.data)
    }catch(err){ console.warn(err) }
  })() },[])

  const send = async () =>{
    const token = localStorage.getItem('udaan_token')
    await axios.post('/api/teacher/feedback', { studentId: target, message }, { headers: { Authorization: `Bearer ${token}` } })
    setMessage('')
    alert('Feedback sent')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Teacher Panel</h2>
      <div className="bg-white p-4 rounded shadow mb-4">
        <h3 className="font-semibold">Students</h3>
        <ul>
          {students.map(s=> <li key={s._id} className="py-1">{s.name} — {s.email}</li>)}
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Send Motivational Feedback</h3>
        <select className="w-full p-2 border rounded my-2" value={target} onChange={e=>setTarget(e.target.value)}>
          <option value="">Select student</option>
          {students.map(s=> <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
        <textarea className="w-full p-2 border rounded" rows={3} value={message} onChange={e=>setMessage(e.target.value)} />
        <button onClick={send} className="mt-2 bg-udaanPink p-2 rounded">Send</button>
      </div>
    </div>
  )
}
