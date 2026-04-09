const KEY = 'HX6lpZGO3pQmUX3XKKiI7DYLHvnu0JUSjWlIgIHe6bMiZunPISPD1l4Q'

export async function searchPexels(query, perPage = 1, orientation = 'landscape') {
  try {
    const r = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=${orientation}`,
      { headers: { Authorization: KEY } }
    )
    if (!r.ok) return []
    const data = await r.json()
    return data.photos || []
  } catch {
    return []
  }
}

export async function getPhoto(id) {
  try {
    const r = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
      headers: { Authorization: KEY },
    })
    if (!r.ok) return null
    return await r.json()
  } catch {
    return null
  }
}
