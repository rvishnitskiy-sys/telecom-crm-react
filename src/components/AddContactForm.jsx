import { useState } from 'react'
import { Modal } from './Modal'

export function AddContactForm({ prospects, onSave, onClose }) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [prospectId, setProspectId] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  function handleSave() {
    if (!name.trim() || !prospectId) return
    onSave({ name, role, prospectId: parseInt(prospectId), email, phone })
    onClose()
  }

  return (
    <Modal title="Add contact" onClose={onClose}>
      <div className="form-row">
        <div className="form-group">
          <label>Full name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Anna Ivanova"/>
        </div>
        <div className="form-group">
          <label>Role / Title</label>
          <input value={role} onChange={e => setRole(e.target.value)} placeholder="CTO"/>
        </div>
      </div>
      <div className="form-group">
        <label>Prospect</label>
        <select value={prospectId} onChange={e => setProspectId(e.target.value)}>
          <option value="" disabled>Select prospect...</option>
          {prospects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="anna@company.com"/>
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+31 6 ..."/>
        </div>
      </div>
      <div className="modal-actions">
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save contact</button>
      </div>
    </Modal>
  )
}
