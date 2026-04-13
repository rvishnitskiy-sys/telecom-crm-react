import { useState } from 'react'
import { Modal } from './Modal'
import { SEGMENTS } from '../data/defaultData'

export function AddProspectForm({ onSave, onClose }) {
  const [name, setName] = useState('')
  const [segment, setSegment] = useState('')
  const [country, setCountry] = useState('')
  const [website, setWebsite] = useState('')

  function handleSave() {
    if (!name.trim()) return
    onSave({ name, segment, country, website })
    onClose()
  }

  return (
    <Modal title="Add prospect" onClose={onClose}>
      <div className="form-group">
        <label>Company name</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. KPN"/>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Segment</label>
          <select value={segment} onChange={e => setSegment(e.target.value)}>
            <option value="" disabled>Select segment...</option>
            {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Country</label>
          <input value={country} onChange={e => setCountry(e.target.value)} placeholder="Netherlands"/>
        </div>
      </div>
      <div className="form-group">
        <label>Website</label>
        <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="kpn.com"/>
      </div>
      <div className="modal-actions">
        <button className="btn" onClick={onClose}>Cancel</button>
        <button className="btn btn-primary" onClick={handleSave}>Save prospect</button>
      </div>
    </Modal>
  )
}
