function ContactEmail({ email }) {
  const href = 'mailto:' + email
  return (
    <a href={href} style={{ color: '#185FA5', textDecoration: 'none' }}>
      {email}
    </a>
  )
}

export function ContactsTable({ contacts, prospects }) {
  function getProspect(prospectId) {
    return prospects.find(p => p.id === prospectId)
  }

  if (!contacts.length) {
    return <div className="empty" style={{ padding: '3rem' }}>No contacts yet.</div>
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Contact</th>
          <th>Prospect</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact => {
          const prospect = getProspect(contact.prospectId)
          return (
            <tr key={contact.id}>
              <td>
                <div style={{ fontWeight: 500 }}>{contact.name}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{contact.role}</div>
              </td>
              <td>{prospect ? prospect.name : '—'}</td>
              <td><ContactEmail email={contact.email} /></td>
              <td>{contact.phone}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
