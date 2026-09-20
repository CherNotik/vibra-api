module.exports = async function handler(req, res) {
  // Разрешаем CORS запросы с твоего фронтенда
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: "Missing 'url' parameter" });
  }

  try {
    const decodedUrl = decodeURIComponent(url);
    
    // Автоматически добавляем твой YouTube API ключ, если его нет в запросе
    const finalUrl = decodedUrl.includes("key=") 
      ? decodedUrl 
      : `${decodedUrl}${decodedUrl.includes("?") ? "&" : "?"}key=AIzaSyB4P5Bo8tbY6dGDuiDjr_J4-xc8lGO5m_E`;

    const response = await fetch(finalUrl, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });
    
    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
};
