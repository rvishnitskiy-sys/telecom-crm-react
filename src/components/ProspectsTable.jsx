import { STAGES } from '../data/defaultData'

function highestStage(opportunities) {
  if (!opportunities.length) return null
  return opportunities.reduce(function(best, o) {
    return STAGES.indexOf(o.stage) > STAGES.indexOf(best.stage) ? o : best
  }).stage
}

function StageBadge({ stage }) {
  if (!stage) {
    return <span className="badge badge-none">No opportunities</span>
  }
  const cls = 'badge badge-' + stage.toLowerCase()
  return <span className={cls}>{stage}</span>
}

function ProspectWebsite({ website }) {
  if (!website) return <span>-</span>
  const url = 'https://' + website
  return (
    <a href={url} target="_blank" rel="noreferrer" style={{ color: '#185FA5', textDecoration: 'none' }}>
      {website}
    </a>
  )
}

export function ProspectsTable({ prospects, contacts, opportunities }) {
  function getContacts(prospectId) {
    return contacts.filter(function(c) { return c.prospectId === prospectId })
  }

  function getOpportunities(prospectId) {
    return opportunities.filter(function(o) { return o.prospectId === prospectId })
  }

  if (!prospects.length) {
    return <div className="empty" style={{ padding: '3rem' }}>No prospects yet.</div>
  }

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Prospect</th>
          <th>Country</th>
          <th>Website</th>
          <th style={{ textAlign: 'center' }}>Contacts</th>
          <th style={{ textAlign: 'center' }}>Opportunities</th>
          <th>Best stage</th>
          <th style={{ textAlign: 'right' }}>Total value</th>
        </tr>
      </thead>
      <tbody>
        {prospects.map(function(prospect) {
          const prospectContacts = getContacts(prospect.id)
          const prospectOpps = getOpportunities(prospect.id)
          const totalValue = prospectOpps.reduce(function(s, o) { return s + o.value }, 0)
          const best = highestStage(prospectOpps)
          const totalFormatted = totalValue ? ('EU' + totalValue.toLocaleString()) : '-'

          return (
            <tr key={prospect.id}>
              <td>
                <div style={{ fontWeight: 500 }}>{prospect.name}</div>
                <div style={{ fontSize: '11px', color: '#888' }}>{prospect.segment}</div>
              </td>
              <td>{prospect.country}</td>
              <td><ProspectWebsite website={prospect.website} /></td>
              <td style={{ textAlign: 'center' }}>{prospectContacts.length}</td>
              <td style={{ textAlign: 'center' }}>{prospectOpps.length}</td>
              <td><StageBadge stage={best} /></td>
              <td style={{ textAlign: 'right', fontWeight: 500 }}>{totalFormatted}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
