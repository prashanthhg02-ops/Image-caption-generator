import { useRef, useState } from 'react'
import './index.css'

const sampleImage = 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85'

const captionSets = {
  Warm: ['A quiet moment, beautifully in focus.', 'Little details, big feeling.', 'Making space for the good stuff.'],
  Playful: ['Main character energy, no notes.', 'Proof that ordinary can be a whole mood.', 'Currently accepting compliments and good light.'],
  Minimal: ['In the moment.', 'A study in light and stillness.', 'Simple things, well seen.'],
  Poetic: ['Where the day softens at the edges.', 'Light found a place to linger.', 'A small scene with a long afterglow.'],
}

function App() {
  const [image, setImage] = useState(sampleImage)
  const [fileName, setFileName] = useState('morning-light.jpg')
  const [tone, setTone] = useState('Warm')
  const [length, setLength] = useState('Short')
  const [captions, setCaptions] = useState(captionSets.Warm)
  const [copied, setCopied] = useState('')
  const inputRef = useRef(null)

  const generateCaptions = () => {
    const suffix = length === 'Long' ? ' Let the little things lead the way.' : ''
    setCaptions(captionSets[tone].map((caption) => `${caption}${suffix}`))
  }

  const handleFile = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setImage(URL.createObjectURL(file))
  }

  const copyCaption = async (caption) => {
    await navigator.clipboard?.writeText(caption)
    setCopied(caption)
    window.setTimeout(() => setCopied(''), 1600)
  }

  return (
    <main className="app-shell">
      <header className="topbar"><a className="wordmark" href="/" aria-label="Caption Lab home"><span className="wordmark-mark">✦</span> caption lab</a><div className="topbar-right"><span className="connection"><span className="status-dot" /> AIML model ready</span><button className="avatar" type="button" aria-label="Open account menu">JD</button></div></header>
      <section className="intro"><div><p className="eyebrow">IMAGE CAPTION GENERATOR <span>✦</span></p><h1>Give your image<br /><em>a little more to say.</em></h1><p className="intro-copy">Thoughtful captions for the moments worth sharing.<br />Powered by your image, tuned by you.</p></div><div className="intro-note"><span>01</span><p>Upload a photo.<br />Find the words.</p></div></section>
      <section className="studio-grid">
        <div className="image-panel panel"><div className="panel-heading"><span>YOUR IMAGE</span><button className="text-button" type="button" onClick={() => inputRef.current?.click()}>Replace image <span>↗</span></button></div><button className="image-frame" type="button" onClick={() => inputRef.current?.click()} aria-label="Choose an image"><img src={image} alt="Selected image preview" /><span className="image-overlay">Change image <strong>+</strong></span></button><input ref={inputRef} className="visually-hidden" type="file" accept="image/*" onChange={handleFile} /><div className="file-meta"><span className="file-icon">▧</span><div><strong>{fileName}</strong><small>Ready to caption</small></div><span className="check">✓</span></div></div>
        <div className="controls-panel panel"><div className="panel-heading"><span>MAKE IT YOURS</span><span className="step-label">02 / 02</span></div><div className="control-group"><label>What’s the feeling?</label><div className="segmented">{Object.keys(captionSets).map((option) => <button key={option} className={tone === option ? 'active' : ''} type="button" onClick={() => setTone(option)}>{option}</button>)}</div></div><div className="control-group"><label>Caption length</label><div className="length-row">{['Short', 'Long'].map((option) => <button key={option} className={`length-option ${length === option ? 'active' : ''}`} type="button" onClick={() => setLength(option)}><span className="radio">{length === option ? '●' : '○'}</span>{option}<small>{option === 'Short' ? 'One-liner' : 'A little more story'}</small></button>)}</div></div><button className="generate-button" type="button" onClick={generateCaptions}><span>Generate captions</span><span>✦</span></button><p className="ai-note"><span>✦</span> AIML vision model will read the mood, color, and story in your image.</p></div>
      </section>
      <section className="results-section"><div className="results-heading"><div><p className="eyebrow">YOUR CAPTIONS <span>✦</span></p><h2>Pick the one that feels like you.</h2></div><span className="result-count">{captions.length} suggestions</span></div><div className="caption-list">{captions.map((caption, index) => <article className="caption-card" key={caption}><span className="caption-number">0{index + 1}</span><p>{caption}</p><button type="button" onClick={() => copyCaption(caption)} aria-label={`Copy caption ${index + 1}`}>{copied === caption ? 'Copied ✓' : 'Copy ↗'}</button></article>)}</div></section>
      <footer><span>Caption Lab <strong>·</strong> built for better posts</span><span>Model: <strong>AIML Vision</strong></span></footer>
    </main>
  )
}

export default App
