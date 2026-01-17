export default function InputField({ label, value, onChange }) {
  return (
    <div className="input-field">
      <label className="input-label">{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        className="input"
      />
    </div>
  )
}