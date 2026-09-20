export default function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  // Декодируем URL и добавляем API ключ
  const decodedUrl = decodeURIComponent(url);
  const finalUrl = decodedUrl.includes("key=") 
    ? decodedUrl 
    : `${decodedUrl}${decodedUrl.includes("?") ? "&" : "?"}key=AIzaSyB4P5Bo8tbY6dGDuiDjr_J4-xc8lGO5m_E`;

  fetch(finalUrl, {
    headers: { "User-Agent": "Mozilla/5.0" }
  })
    .then(response => response.json())
    .then(data => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
}
