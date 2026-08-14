function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', onConfirm, onCancel, busy }) {
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '16px',
      }}
      onClick={onCancel}
    >
      <div
        className="repo-card"
        style={{ maxWidth: '420px', width: '100%', margin: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirm-dialog-title" style={{ marginTop: 0 }}>
          {title}
        </h3>
        <p style={{ fontSize: '14px', color: '#555', marginBottom: '20px' }}>{message}</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button type="button" onClick={onCancel} disabled={busy}>
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            style={{
              backgroundColor: '#721c24',
              color: '#fff',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '4px',
              cursor: busy ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {busy ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
