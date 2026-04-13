import { useState } from 'react'
import { Modal } from './Modal'
import { STAGES } from '../data/defaultData'

export function AddOpportunityForm({ prospects, contacts, onSave, onClose }) {
  const [name, setName] = useState('')
  const [prospectId, setProspectId] = useState('')
  const [keyContactId, setKeyContactId] = useState('')
  const [stage, setStage] = useState('')
  const [value, setValue] = useState('')

  const prospectContacts = contacts.filter(c => c.prospectId === parseInt(prospectId))

  function handleProspectChange(newId) {
    setProspectId(newId)
    setKeyContactId('')
  }

  function handleSave() {
    if (!name.trim() || !prospectId || !stage) return
    onSave({
      name,
      prospectId: parseInt(prospectId),
      keyContactId: parseInt(keyContactId) || null,
      value: parseInt(value) || 0,
      stage,
    })
    onClose()
  }

  function contactPlaceholder() {
    if (!prospectId) return 'Select a prospect first'
    if (prospectContacts.length === 0) return 'No contacts for this prospect'
    return 'Select contact...'
  }

  return (
    <Modal title="Add opportunity" onClose={onClose}>
      <div className="form-group">
        <label>Opportunity name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="BSS Modernization"/>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Prospect</label>
          <select value={prospectId} onChange={e => handleProspectChange(e.target.value)}>
            <option value="" disabled>Select prospect...</option>
            {prospects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Key contact</label>
          <select
            value={keyContactId}
            onChange={e => setKeyContactId(e.target.value)}
            disabled={!prospectId || prospectContacts.length === 0}
          >
            <option value="" disabled>{contactPlaceholder()}</option>
            {prospectContacts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Value (€)</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="100000"/>
        </div>
        <div className="form-group">
          <label>Stage</label>
          <select value={stage} onChange={e => setStage(e.target.value)}>
            <option value="" disabled>Select stage...</option>
            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="modal-actions">
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save opportunity</button>
      </div>
    </Modal>
  )
}
