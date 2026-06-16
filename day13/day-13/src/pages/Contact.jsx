import { useState } from 'react'
import './Pages.css'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    else if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'
    return newErrors
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
    } else {
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setForm({ name: '', email: '', message: '' })
    setErrors({})
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="page contact-page">
        <div className="success-box">
          <div className="success-icon">✅</div>
          <h2>Message Sent!</h2>
          <p>Thanks, <strong>{form.name}</strong>! We'll reply to <strong>{form.email}</strong> soon.</p>
          <button className="btn btn-primary" onClick={handleReset}>Send Another</button>
        </div>
      </div>
    )
  }

  return (
    <div className="page contact-page">
      <h1>Contact Us</h1>
      <p className="subtitle">Fill out the form and we'll get back to you!</p>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Your Name</label>
          <input type="text" name="name" placeholder="Enter your name" value={form.name} onChange={handleChange} className={errors.name ? 'error' : ''} />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea name="message" placeholder="Write your message here..." value={form.message} onChange={handleChange} rows={5} className={errors.message ? 'error' : ''} />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary full-width">Send Message 🚀</button>
      </form>
    </div>
  )
}

export default Contact