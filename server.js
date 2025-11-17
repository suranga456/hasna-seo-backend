const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

function simpleGenerate(topic){
  const clean = (topic||'Epic scene').toString().trim();
  const titleA = `${clean} — Epic Cinematic VFX (4K Trailer)`;
  const titleB = `INSANE ${clean.toUpperCase()} | Hollywood Breakdown`;
  const shortDesc = `${clean} — cinematic VFX, dust, fire, motion tracking. 4K | Hasna Studio`;
  const longDesc = `Experience "${clean}" like a Hollywood blockbuster.\nFull AI cinematic tools by Hasna Studio.`;
  const words = clean.toLowerCase().split(/[^a-z0-9\u0D80-\u0DFF]+/).filter(Boolean);
  const tags = Array.from(new Set([clean, `${clean} vfx`, `${clean} cinematic`, ...words])).slice(0,20);
  const hashtags = tags.slice(0,10).map(t=> '#' + t.replace(/\s+/g,''));

  return { titleA, titleB, shortDesc, longDesc, tags, hashtags };
}

app.get('/api/health', (req,res)=> res.json({ ok:true, ts: Date.now() }));

app.post('/api/generate', (req,res)=>{
  const { topic } = req.body || {};
  if(!topic || !topic.toString().trim()){
    return res.status(400).json({ success:false, error:'topic required' });
  }
  const out = simpleGenerate(topic);
  return res.json({ success:true, data: out });
});

app.listen(PORT, ()=> console.log(`Backend running on ${PORT}`));
